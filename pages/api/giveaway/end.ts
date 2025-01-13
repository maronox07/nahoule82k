import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { id } = req.body;

  try {
    const giveaway = await prisma.giveaway.findUnique({
      where: { id: Number(id) },
      include: { participants: { include: { user: true } } }
    });
    if (!giveaway) return res.status(404).send("Giveaway not found");

    // Mark as ended
    await prisma.giveaway.update({
      where: { id: giveaway.id },
      data: { isActive: false }
    });

    // Pick winners if participants exist
    if (giveaway.participants.length > 0) {
      const winners = shuffleArray(giveaway.participants).slice(0, giveaway.numWinners);
      // Example: each winner gets +100 points
      for (const w of winners) {
        await prisma.user.update({
          where: { id: w.userId },
          data: { points: w.user.points + 100 }
        });
      }
    }

    return res.status(200).send("Giveaway ended");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to end giveaway");
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
