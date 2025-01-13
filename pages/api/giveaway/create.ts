import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, costToEnter, maxParticipants, numWinners } = req.body;

  try {
    const giveaway = await prisma.giveaway.create({
      data: {
        title,
        costToEnter: Number(costToEnter),
        maxParticipants: Number(maxParticipants),
        numWinners: Number(numWinners)
      }
    });
    return res.status(200).json(giveaway);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create giveaway" });
  }
}
