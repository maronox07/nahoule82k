import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { id, endBalance } = req.body;

  try {
    const bonusBuy = await prisma.bonusBuy.findUnique({
      where: { id: Number(id) },
      include: { predictions: { include: { user: true } } }
    });
    if (!bonusBuy) return res.status(404).send("BonusBuy not found");
    if (!bonusBuy.isActive) {
      return res.status(400).send("BonusBuy already ended");
    }

    // End it
    await prisma.bonusBuy.update({
      where: { id: bonusBuy.id },
      data: { isActive: false, endBalance: Number(endBalance) }
    });

    // Find top 3 closest guesses
    const predictions = bonusBuy.predictions.map((p) => {
      const diff = Math.abs(p.guess - endBalance);
      return { ...p, diff };
    });

    // Sort by diff ascending
    predictions.sort((a, b) => a.diff - b.diff);
    const winners = predictions.slice(0, 3);

    // Award points (e.g., 100, 50, 25)
    const pointsAward = [100, 50, 25];
    winners.forEach(async (winner, idx) => {
      const newPoints = winner.user.points + (pointsAward[idx] || 0);
      await prisma.user.update({
        where: { id: winner.user.id },
        data: { points: newPoints }
      });
    });

    return res.status(200).send("BonusBuy ended, winners awarded");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to end BonusBuy");
  }
}
