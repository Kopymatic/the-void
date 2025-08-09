import { PrismaClient } from "@prisma/client";
import { posts, shortcuts } from "../db.json";

const prisma = new PrismaClient();

await prisma.post.createMany({ data: posts });
await prisma.shortcut.createMany({ data: shortcuts });

console.log("Hopefully that worked");
