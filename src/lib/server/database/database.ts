import { PrismaClient } from "@prisma/client";
// import initAutoBackups from "./backupDb";
// import { writeFileSync } from "node:fs";

export const prisma = new PrismaClient();

// const posts = await prisma.post.findMany();
// const postsStrings: string[] = [];
// posts.forEach((post) => {
// 	postsStrings.push(JSON.stringify(post));
// });

// const shortcuts = await prisma.shortcut.findMany();
// const shortcutsStrings: string[] = [];
// shortcuts.forEach((post) => {
// 	shortcutsStrings.push(JSON.stringify(post));
// });

// const thingy = {
// 	posts: posts,
// 	shortcuts: shortcuts
// };

// writeFileSync(`./postsOutput${Date.now()}.json`, JSON.stringify(thingy));

// const doBackups = process.env.DO_BACKUPS?.toLowerCase() === "true";
// const interval = process.env.BACKUP_INTERVAL ? parseInt(process.env.BACKUP_INTERVAL) : 43200000;
// const intervalHours = interval / (1000 * 60 * 60);
// console.log(
// 	`${doBackups ? `Doing backups with an interval of ${intervalHours} hours (${interval}ms)` : "Not doing backups. Be careful!"}`
// );
// if (doBackups) initAutoBackups(interval);
