import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();

  useEffect(() => {
    // We do a simple check if user is in localStorage
    const user = localStorage.getItem("discordUser");
    if (!user) {
      // Not logged in with Discord -> go to our Discord login route
      router.push("/api/auth/discord");
    }
  }, [router]);

  return <>{children}</>;
}
