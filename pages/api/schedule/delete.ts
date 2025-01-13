import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { id } = req.body;

  try {
    await prisma.schedule.delete({
      where: { id: Number(id) }
    });
    return res.status(200).send("Schedule item deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to delete schedule item");
  }
}
