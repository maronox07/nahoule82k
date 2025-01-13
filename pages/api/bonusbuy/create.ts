import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { startBalance } = req.body;

  try {
    const bb = await prisma.bonusBuy.create({
      data: {
        startBalance: Number(startBalance)
      }
    });
    return res.status(200).json(bb);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create BonusBuy" });
  }
}
