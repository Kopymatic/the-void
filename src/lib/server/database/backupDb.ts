import sqlite3 from "better-sqlite3";
import fs from "fs";
import fsPromises from "fs/promises";
import crypto from "crypto";

const dbPath = process.env.DATABASE_URL?.replace("file:./../", "")!!;
const backupsJsonPath = "data/backups/backups.json";

let prevDbHash: string | undefined;

export const makeDir = (dir: string) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	return dir;
};

export const backup = async (boot: boolean = false) => {
	//Here we load the backups.json file to allow us track backups later
	const backupsJson = await readBackupsJson();
	const backups = backupsJson.backups;

	const db = sqlite3(dbPath);
	const dbHash: string = await getHash(dbPath);
	if (dbHash === prevDbHash) {
		console.log("Database hasnt changed since last backup, skipping!");
		return;
	}
	prevDbHash = dbHash;

	//Grab the size of the db for backups.json purposes
	const size = getSize(dbPath);

	//Here i a date string to use as the directory name, so that i can easily differentiate the backup times
	const date = new Date().toISOString();
	const directory = makeDir(`data/backups/${dbHash}`);

	//Here i make a path for the backup, the boot portion is so that i can know which were created on a boot of the database
	const backupPath = `${directory}/${boot ? "boot-" : ""}${date}.db.bak`;

	console.log(`Creating backup at ${backupPath}`);
	await db.backup(backupPath);
	console.log("Success!");

	backups.push({
		date,
		hash: dbHash,
		boot: boot,
		path: backupPath,
		sizeMb: size
	});
	const totalBackups = backups.length;
	let totalSizeMb = 0;
	backups.forEach(({ sizeMb }) => {
		totalSizeMb += sizeMb;
	});
	backupsJson.stats = { totalBackups, totalSizeMb };
	writeBackupsJson({ ...backupsJson, backups });
};

const getSize = (path: string): number => {
	const stats = fs.statSync(path);
	const sizeBytes = stats.size;
	return sizeBytes / (1024 * 1024);
};

const getHash = (path: string): Promise<string> =>
	new Promise((resolve, reject) => {
		const hash = crypto.createHash("sha256");
		const rs = fs.createReadStream(path);
		rs.on("error", reject);
		rs.on("data", (chunk: any) => hash.update(chunk));
		rs.on("end", () => resolve(hash.digest("hex")));
	});

const readBackupsJson = async () => {
	const file = await fsPromises.readFile(backupsJsonPath, { flag: "a+" });
	let json;
	try {
		json = JSON.parse(file.toString());
	} catch (e) {}
	if (!json) return defaultBackupsJsonFile;
	return json as backupsJsonFile;
};

const writeBackupsJson = async (backupsJson: backupsJsonFile) => {
	const newJson = JSON.stringify(backupsJson);
	await fsPromises.writeFile(backupsJsonPath, newJson);
};

type backup = {
	path: string;
	hash: string;
	date: string;
	sizeMb: number;
	boot: boolean;
};

type backupsJsonFile = {
	stats: {
		totalBackups: number;
		totalSizeMb: number;
	};
	backups: backup[];
};

const defaultBackupsJsonFile: backupsJsonFile = {
	stats: {
		totalBackups: 0,
		totalSizeMb: 0
	},
	backups: []
};

export default function initAutoBackups(interval: number) {
	backup(true);
	setInterval(() => backup(false), interval);
}
