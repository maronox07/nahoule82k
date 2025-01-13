import axios from "axios";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI,
  DISCORD_SERVER_ID
} from "./config";

export function getDiscordAuthUrl(): string {
  const scope = "identify guilds guilds.members.read";
  const responseType = "code";
  const prompt = "none";
  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    DISCORD_REDIRECT_URI
  )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&prompt=${prompt}`;
}

export async function exchangeCodeForToken(code: string) {
  const url = "https://discord.com/api/oauth2/token";
  const data = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD_REDIRECT_URI,
  });

  const res = await axios.post(url, data.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
}

export async function getUserGuildRoles(access_token: string) {
  // 1) Get user info
  const userRes = await axios.get("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const user = userRes.data;

  // 2) Fetch guild member
  try {
    const memberRes = await axios.get(
      `https://discord.com/api/v10/guilds/${DISCORD_SERVER_ID}/members/${user.id}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return memberRes.data; // includes roles array
  } catch (error) {
    console.error(error);
    return null;
  }
}
