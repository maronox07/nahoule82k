import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function KickUsername() {
  const [kickUsername, setKickUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If user not in localStorage, redirect to discord login
    const user = localStorage.getItem("discordUser");
    if (!user) {
      router.push("/api/auth/discord");
    }
  }, [router]);

  const handleSave = async () => {
    try {
      await axios.post("/api/user/setKickUsername", { kickUsername });
      alert("Kick username updated!");
      router.push("/"); // Go home
    } catch (err) {
      alert("Error updating Kick username");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Enter Your Kick Username</h1>
      <input
        type="text"
        placeholder="Kick Username"
        className="p-2 bg-stakeGray rounded w-full mb-4"
        value={kickUsername}
        onChange={(e) => setKickUsername(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-stakeAccent py-2 px-4 rounded text-black font-semibold w-full"
      >
        Save
      </button>
    </div>
  );
}
