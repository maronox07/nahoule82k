import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { code, points, expiresAt } = req.body;

  try {
    const bonusCode = await prisma.bonusCode.create({
      data: {
        code,
        points: Number(points),
        expiresAt: new Date(expiresAt)
      }
    });
    return res.status(200).json(bonusCode);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create bonus code" });
  }
}
