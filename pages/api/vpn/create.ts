import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, logoUrl, downloadUrl } = req.body;

  try {
    const vpn = await prisma.vPN.create({
      data: {
        name,
        logoUrl,
        downloadUrl
      }
    });
    return res.status(200).json(vpn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create VPN" });
  }
}
