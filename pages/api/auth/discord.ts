import type { NextApiRequest, NextApiResponse } from "next";
import { getDiscordAuthUrl } from "../../../server/discordAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const discordUrl = getDiscordAuthUrl();
  res.redirect(discordUrl);
}
