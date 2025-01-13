import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    // For simplicity, let’s assume only ONE WagerRace record is used
    const race = await prisma.wagerRace.findFirst();
    if (!race) {
      // If none exists, we can create a default:
      const newRace = await prisma.wagerRace.create({
        data: {
          title: "No current Wager Race",
          details: "Stay tuned for updates!"
        }
      });
      return res.status(200).json(newRace);
    }
    return res.status(200).json(race);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch WagerRace" });
  }
}
