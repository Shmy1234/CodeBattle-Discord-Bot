create table if not exists challenges (
  id text primary key,
  guild_id text not null,
  challenger_id text not null,
  opponent_id text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  topic text not null,
  problem text not null,
  status text not null default 'active' check (status in ('active', 'submitted', 'completed', 'cancelled')),
  winner_id text,
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

create unique index if not exists submissions_one_per_user_idx
  on submissions (guild_id, challenge_id, user_id);

create table if not exists scores (
  guild_id text not null,
  user_id text not null,
  points integer not null default 0,
  primary key (guild_id, user_id)
);

create index if not exists challenges_guild_status_created_idx
  on challenges (guild_id, status, created_at desc);

create index if not exists submissions_guild_challenge_idx
  on submissions (guild_id, challenge_id);

alter table challenges enable row level security;
alter table submissions enable row level security;
alter table scores enable row level security;
