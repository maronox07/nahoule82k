import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, code } = req.body;

  try {
    // Find code
    const bonusCode = await prisma.bonusCode.findUnique({
      where: { code }
    });
    if (!bonusCode) return res.status(400).send("Code not found");

    // Check expiry
    const now = new Date();
    if (bonusCode.expiresAt < now) {
      return res.status(400).send("Code expired");
    }

    // Check if user has already redeemed
    const existingRedemption = await prisma.bonusCodeRedemption.findFirst({
      where: { userId: Number(userId), bonusCodeId: bonusCode.id }
    });
    if (existingRedemption) {
      return res.status(400).send("Already redeemed this code");
    }

    // Award points
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).send("User not found");

    await prisma.user.update({
      where: { id: user.id },
      data: { points: user.points + bonusCode.points }
    });

    // Save redemption record
    await prisma.bonusCodeRedemption.create({
      data: {
        userId: user.id,
        bonusCodeId: bonusCode.id
      }
    });

    return res.status(200).send("Code redeemed successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to redeem code");
  }
}
