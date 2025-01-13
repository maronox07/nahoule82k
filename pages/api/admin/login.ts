import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";
import { BIG_ADMIN_USERNAME, BIG_ADMIN_PASSWORD } from "../../../server/config";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { username, password } = req.body;

  try {
    // Check if user is the super admin
    if (username === BIG_ADMIN_USERNAME && password === BIG_ADMIN_PASSWORD) {
      return res.status(200).json({
        admin: { username: BIG_ADMIN_USERNAME, isSuper: true },
      });
    }

    // Otherwise, check DB
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).send("Unauthorized");

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).send("Unauthorized");

    return res.status(200).json({
      admin: { username: admin.username, isSuper: false },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}
