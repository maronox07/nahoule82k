import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const codes = await prisma.bonusCode.findMany({
      orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(codes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to list bonus codes" });
  }
}
