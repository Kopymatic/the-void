import { PrismaClient } from '@prisma/client';
import initAutoBackups from './backupDb';

export const prisma = new PrismaClient();

const doBackups = process.env.DO_BACKUPS?.toLowerCase() === 'true';
const interval = process.env.BACKUP_INTERVAL ? parseInt(process.env.BACKUP_INTERVAL) : 43200000;
const intervalHours = interval / (1000 * 60 * 60);
console.log(
	`${doBackups ? `Doing backups with an interval of ${intervalHours} hours (${interval}ms)` : 'Not doing backups. Be careful!'}`
);
if (doBackups) initAutoBackups(interval);

//Not sure where else to put this
import '../discordBot/bot';
