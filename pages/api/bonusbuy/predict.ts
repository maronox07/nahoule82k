import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, bonusBuyId, guess } = req.body;

  try {
    const bonusBuy = await prisma.bonusBuy.findUnique({
      where: { id: Number(bonusBuyId) }
    });
    if (!bonusBuy || !bonusBuy.isActive) {
      return res.status(400).send("BonusBuy not active");
    }

    // Check if user already predicted
    const existing = await prisma.prediction.findFirst({
      where: { userId: Number(userId), bonusBuyId: Number(bonusBuyId) }
    });
    if (existing) {
      return res.status(400).send("Already predicted");
    }

    await prisma.prediction.create({
      data: {
        userId: Number(userId),
        bonusBuyId: Number(bonusBuyId),
        guess: Number(guess)
      }
    });

    return res.status(200).send("Prediction submitted successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to submit prediction");
  }
}
