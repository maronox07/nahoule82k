import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { id, name, logoUrl, downloadUrl } = req.body;

  try {
    const vpn = await prisma.vPN.update({
      where: { id: Number(id) },
      data: {
        name,
        logoUrl,
        downloadUrl
      }
    });
    return res.status(200).json(vpn);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to update VPN");
  }
}
