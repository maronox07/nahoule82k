import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { id } = req.body;

  const raffle = await prisma.raffle.findUnique({
    where: { id: Number(id) },
    include: { participants: { include: { user: true } } },
  });
  if (!raffle) return res.status(404).send("Raffle not found");

  // Mark as ended
  await prisma.raffle.update({
    where: { id: raffle.id },
    data: { isActive: false },
  });

  // Pick winners if you want random
  // If more participants than winners
  if (raffle.participants.length > 0) {
    const winners = shuffleArray(raffle.participants).slice(
      0,
      raffle.numWinners
    );
    // Award them points, for example 100 points each:
    for (const w of winners) {
      await prisma.user.update({
        where: { id: w.userId },
        data: { points: w.user.points + 100 },
      });
    }
  }

  return res.status(200).send("Raffle ended");
}

// Helper to shuffle
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
