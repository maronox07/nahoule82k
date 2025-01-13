import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, details } = req.body;

  try {
    const race = await prisma.wagerRace.findFirst();
    if (!race) {
      // Create if not exist
      const newRace = await prisma.wagerRace.create({
        data: { title, details }
      });
      return res.status(200).json(newRace);
    } else {
      const updated = await prisma.wagerRace.update({
        where: { id: race.id },
        data: { title, details }
      });
      return res.status(200).json(updated);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to update WagerRace");
  }
}
