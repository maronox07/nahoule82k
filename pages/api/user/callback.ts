import type { NextApiRequest, NextApiResponse } from "next";
import { exchangeCodeForToken, getUserGuildRoles } from "../../../server/discordAuth";
import prisma from "../../../server/prismaClient";
import { DISCORD_VERIFIED_ROLE_ID } from "../../../server/config";

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    const { access_token } = tokenData;

    // check roles
    const guildMember = await getUserGuildRoles(access_token);
    if (!guildMember || !guildMember.roles.includes(DISCORD_VERIFIED_ROLE_ID)) {
      return res.status(403).send("You must have the Verified role in Discord.");
    }

    const discordId = guildMember.user.id;
    const discordTag = `${guildMember.user.username}#${guildMember.user.discriminator}`;

    // Upsert user
    const user = await prisma.user.upsert({
      where: { discordId },
      update: { discordTag },
      create: {
        discordId,
        discordTag,
        kickUsername: "unknown", // Will be updated on /user/kickUsername
      },
    });

    // We can’t set localStorage from the server, so we do a minimal trick:
    // redirect to the front-end with a query param. The front-end can parse it.
    // But for simplicity, let's store user ID in a cookie for setKickUsername if you like.
    res.setHeader("Set-Cookie", `userId=${user.id}; Path=/; HttpOnly;`);

    // Now direct them to the page to set Kick username
    return res.redirect("/user/kickUsername");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error during Discord callback");
  }
}
