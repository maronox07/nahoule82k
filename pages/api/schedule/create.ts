import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { streamDate, title } = req.body;

  try {
    const item = await prisma.schedule.create({
      data: {
        streamDate: new Date(streamDate),
        title
      }
    });
    return res.status(200).json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create schedule" });
  }
}
