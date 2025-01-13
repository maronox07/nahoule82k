import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const scheduleItems = await prisma.schedule.findMany({
      orderBy: { streamDate: "asc" }
    });
    return res.status(200).json(scheduleItems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to list schedule" });
  }
}
