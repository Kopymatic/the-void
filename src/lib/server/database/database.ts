import { PrismaClient } from '@prisma/client';
import sqlite3 from 'better-sqlite3';
import fs from 'fs';
import crypto from 'crypto';

const dbPath = process.env.DATABASE_URL?.replace('file:./../', '')!!;
let backupHash: string | undefined;

export const makeDir = (dir: string) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	return dir;
};

export const prisma = new PrismaClient();

export const backup = async (boot: boolean = false) => {
	const db = sqlite3(dbPath);
	const dbHash: string = await getHash(dbPath);
	backupHash = dbHash;
	console.log(dbHash);
	const directory = makeDir(`data/backups/${dbHash}`);
	console.log(directory);
	const backupName = `${directory}/${boot ? 'boot-' : ''}${new Date().toISOString()}.db.bak`;
	console.log(`Creating backup at ${backupName}`);
	const finalBackup = await db.backup(backupName);
	console.log('Success!');
};

const getHash = (path: string): Promise<string> =>
	new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha256');
		const rs = fs.createReadStream(path);
		rs.on('error', reject);
		rs.on('data', (chunk: any) => hash.update(chunk));
		rs.on('end', () => resolve(hash.digest('hex')));
	});

const bootBackup = async () => {};

// backup();
// setInterval(backup, 43200000);
