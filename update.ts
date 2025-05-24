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

intro(`Welcome!`);
const gitHelp = await $`git --help`;
console.log(gitHelp.text());

if (env.DEVELOPMENT === "true") {
	log.error("In development, exiting");
	outro("Exited Early");
	process.exit(0);
}
const results: [{ stage: string; result: string }] = [{ stage: "dev", result: "Not in dev" }];

s.start("Pulling from git");
const stash = await stage("stash", "git stash");
results.push(stash.result);
const pull = await stage("pull", "git pull -s recursive -X theirs");
results.push(pull.result);
s.stop("Success!");

s.start("Bun installing...");
const bunInstall = await stage("bunInstall", "bun install");
results.push(bunInstall.result);
s.stop("Success!");

s.start("Applying Prisma migrations...");
const prismaMigrate = await stage("prismaMigrate", "bunx prisma migrate deploy");
results.push(prismaMigrate.result);
const prismaGenerate = await stage("prismaGenerate", "bunx prisma generate");
results.push(prismaGenerate.result);
s.stop("Success!");

s.start("Building...");
const build = await stage("build", "bun run build");
results.push(build.result);
s.stop("Success!");

s.start("Restarting pm2");
const pm2Restart = await stage("pm2Restart", "pm2 restart thevoid");
results.push(pm2Restart.result);
s.stop("Success!");

outro(`You're all set!`);
