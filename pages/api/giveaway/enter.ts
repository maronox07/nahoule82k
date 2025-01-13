import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

// For a real app, you'd identify the user from session/JWT/cookie, etc.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, giveawayId } = req.body;

  try {
    const giveaway = await prisma.giveaway.findUnique({ where: { id: Number(giveawayId) } });
    if (!giveaway || !giveaway.isActive) {
      return res.status(400).send("Giveaway not active");
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).send("User not found");

    if (user.points < giveaway.costToEnter) {
      return res.status(400).send("Not enough points");
    }

    const existing = await prisma.giveawayParticipant.findFirst({
      where: { userId: user.id, giveawayId: giveaway.id }
    });
    if (existing) {
      return res.status(400).send("Already joined");
    }

    const count = await prisma.giveawayParticipant.count({
      where: { giveawayId: giveaway.id }
    });
    if (count >= giveaway.maxParticipants) {
      return res.status(400).send("Giveaway is full");
    }

    // Deduct points
    await prisma.user.update({
      where: { id: user.id },
      data: { points: user.points - giveaway.costToEnter }
    });

    // Add participant
    await prisma.giveawayParticipant.create({
      data: {
        userId: user.id,
        giveawayId: giveaway.id
      }
    });

    return res.status(200).send("Joined giveaway successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to enter giveaway");
  }
}
