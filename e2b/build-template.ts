import "dotenv/config";
import { defaultBuildLogger, Template } from "e2b";

const templateName = process.env.E2B_SANDBOX_TEMPLATE || "codebattle-node-22";
const template = Template().fromNodeImage("22");

await Template.build(template, templateName, {
  cpuCount: 1,
  memoryMB: 256,
  onBuildLogs: defaultBuildLogger()
});

console.log(`Built E2B sandbox template: ${templateName}`);
