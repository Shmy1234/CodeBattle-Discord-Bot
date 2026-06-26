create table if not exists challenges (
  id text primary key,
  guild_id text not null,
  challenger_id text not null,
  opponent_id text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  topic text not null,
  problem text not null,
  status text not null default 'active' check (status in ('active', 'submitted', 'evaluating', 'completed', 'cancelled', 'evaluation_failed')),
  winner_id text,
  evaluation_error text,
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id bigserial primary key,
  challenge_id text not null references challenges(id) on delete cascade,
  guild_id text not null,
  user_id text not null,
  channel_id text,
  message_id text,
  answer text not null,
  submitted_at timestamptz not null default now()
);

alter table submissions add column if not exists channel_id text;
alter table submissions add column if not exists message_id text;
alter table submissions add column if not exists language text check (language in ('javascript', 'typescript'));

alter table challenges drop constraint if exists challenges_status_check;
alter table challenges add constraint challenges_status_check
  check (status in ('active', 'submitted', 'evaluating', 'completed', 'cancelled', 'evaluation_failed'));

create unique index if not exists submissions_one_per_user_idx
  on submissions (guild_id, challenge_id, user_id);

create table if not exists scores (
  guild_id text not null,
  user_id text not null,
  points integer not null default 0,
  primary key (guild_id, user_id)
);

create table if not exists submission_evaluations (
  id bigserial primary key,
  challenge_id text not null references challenges(id) on delete cascade,
  guild_id text not null,
  user_id text not null,
  language text not null check (language in ('javascript', 'typescript')),
  test_suite_version text not null,
  passed_count integer not null,
  total_count integer not null,
  median_runtime_ms numeric not null,
  peak_memory_kb integer not null,
  estimated_time_complexity text not null,
  estimated_space_complexity text not null,
  code_quality_score numeric not null,
  correctness_summary text not null,
  feedback jsonb not null,
  confidence numeric not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now(),
  unique (guild_id, challenge_id, user_id)
);

create table if not exists challenge_verdicts (
  id bigserial primary key,
  challenge_id text not null unique references challenges(id) on delete cascade,
  guild_id text not null,
  winner_id text not null,
  loser_id text not null,
  reason text not null,
  tie_breaker text,
  test_suite_version text not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now()
);

create index if not exists challenges_guild_status_created_idx
  on challenges (guild_id, status, created_at desc);

create index if not exists submissions_guild_challenge_idx
  on submissions (guild_id, challenge_id);

create index if not exists submission_evaluations_guild_challenge_idx
  on submission_evaluations (guild_id, challenge_id);

alter table challenges enable row level security;
alter table submissions enable row level security;
alter table scores enable row level security;
alter table submission_evaluations enable row level security;
alter table challenge_verdicts enable row level security;

create or replace function finalize_challenge_evaluation(
  p_guild_id text,
  p_challenge_id text,
  p_winner_id text,
  p_loser_id text,
  p_reason text,
  p_tie_breaker text,
  p_test_suite_version text,
  p_provider text,
  p_model text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update challenges
  set status = 'completed', winner_id = p_winner_id, evaluation_error = null
  where guild_id = p_guild_id
    and id = p_challenge_id
    and status = 'evaluating';

  if not found then
    return false;
  end if;

  insert into challenge_verdicts (
    challenge_id, guild_id, winner_id, loser_id, reason, tie_breaker,
    test_suite_version, provider, model
  ) values (
    p_challenge_id, p_guild_id, p_winner_id, p_loser_id, p_reason, p_tie_breaker,
    p_test_suite_version, p_provider, p_model
  );

  insert into scores (guild_id, user_id, points)
  values (p_guild_id, p_winner_id, 1)
  on conflict (guild_id, user_id)
  do update set points = scores.points + 1;

  return true;
end;
$$;
