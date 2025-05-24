import { intro, log, outro, spinner } from "@clack/prompts";
import { $, env } from "bun";

const stage = async (
	stage: string,
	command: string
): Promise<{ output: $.ShellOutput; result: { stage: string; result: string } }> => {
	const output = await $`${{ raw: command }}`.quiet(); //https://github.com/oven-sh/bun/issues/17315#issuecomment-2657986379
	const result = { stage: stage, result: output.text() };
	return { output, result };
};

const s = spinner();

intro(`Welcome to the updater!`);
if (env.DEVELOPMENT === "true") {
	log.error("In development, exiting");
	outro("Exited Early");
	process.exit(0);
}
const results: [{ stage: string; result: string }] = [{ stage: "dev", result: "Not in dev" }];

s.start("Pulling from git");
const stash = await stage("stash", "git stash");
results.push(stash.result);
log.step("Stashed any changes...");
const pull = await stage("pull", "git pull -s recursive -X theirs");
results.push(pull.result);
log.step("Pulled from remote...");
const commit = await stage("getCommit", "git rev-parse --short HEAD");
results.push(commit.result);
log.step(`Updating to commit ${commit.output.text().trim()}`);
s.stop("Successfully pulled from git!");

s.start("Bun installing...");
const bunInstall = await stage("bunInstall", "bun install");
results.push(bunInstall.result);
s.stop("Successfully installed packages!");

s.start("Applying Prisma migrations...");
const prismaMigrate = await stage("prismaMigrate", "bunx prisma migrate deploy");
results.push(prismaMigrate.result);
log.step("Applied any migrations...");
const prismaGenerate = await stage("prismaGenerate", "bunx prisma generate");
results.push(prismaGenerate.result);
log.step("Generated prisma package...");
s.stop("Successfully applied prisma migrations!");

s.start("Building...");
const build = await stage("build", "bun run build");
results.push(build.result);
s.stop("Successfully built!");

s.start("Restarting pm2");
const pm2Restart = await stage("pm2Restart", "pm2 restart thevoid");
results.push(pm2Restart.result);
s.stop("Successfully restarted pm2!");

outro(`Everything should be updated!`);
