import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // No real session store in this demo. Just a placeholder endpoint.
  return res.status(200).send("Logged out");
}
