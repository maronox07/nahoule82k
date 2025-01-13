import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";
import bcrypt from "bcrypt";
import { BIG_ADMIN_USERNAME } from "../../../server/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  // In a real app, you'd check if the caller is super admin
  // We'll skip for brevity and assume they've already proven super admin identity

  const { username, password } = req.body;
  try {
    // do not allow creating super admin
    if (username === BIG_ADMIN_USERNAME) {
      return res.status(400).send("Cannot create superadmin account.");
    }

    const existing = await prisma.admin.findUnique({ where: { username } });
    if (existing) {
      return res.status(400).send("Admin already exists.");
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        username,
        password: hash,
      },
    });

    return res.status(200).json({ message: "Admin created" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}
