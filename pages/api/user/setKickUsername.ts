import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { kickUsername } = req.body;

  // In real app, we'd identify which user is updating by session or localStorage token
  // For demo, let's assume the "discordUser" is in localStorage
  // That’s front-end data. On a real server, you'd parse a cookie or session. We'll do a quick hack.

  // We'll just store a mock userId for demonstration,
  // or you'd pass user ID from front-end. For a production approach, you'd have a JWT or session.
  const userId = req.cookies.userId || 1; // For example

  try {
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { kickUsername },
    });
    return res.status(200).json({ message: "Kick username updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
