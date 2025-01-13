import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

// In a real scenario, you'd verify the user from session or token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, raffleId } = req.body;

  const raffle = await prisma.raffle.findUnique({ where: { id: Number(raffleId) } });
  if (!raffle || !raffle.isActive) {
    return res.status(400).send("Raffle not active");
  }

  // check user points
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) return res.status(404).send("User not found");
  if (user.points < raffle.costToEnter) {
    return res.status(400).send("Not enough points");
  }

  // check if already joined
  const existing = await prisma.raffleParticipant.findFirst({
    where: { userId: user.id, raffleId: raffle.id },
  });
  if (existing) {
    return res.status(400).send("Already joined");
  }

  // check participant limit
  const count = await prisma.raffleParticipant.count({
    where: { raffleId: raffle.id },
  });
  if (count >= raffle.maxParticipants) {
    return res.status(400).send("Raffle is full");
  }

  // deduct points
  await prisma.user.update({
    where: { id: user.id },
    data: { points: user.points - raffle.costToEnter },
  });

  // add participant
  await prisma.raffleParticipant.create({
    data: {
      userId: user.id,
      raffleId: raffle.id,
    },
  });

  return res.status(200).send("Joined raffle successfully");
}
