import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const raffles = await prisma.raffle.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.status(200).json(raffles);
}
