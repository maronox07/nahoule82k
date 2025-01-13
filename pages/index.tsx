import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

interface WagerRace {
  id: number;
  title: string;
  details: string;
}

interface VPNItem {
  id: number;
  name: string;
  logoUrl: string;
  downloadUrl: string;
}

interface Raffle {
  id: number;
  title: string;
  costToEnter: number;
  isActive: boolean;
}

interface Giveaway {
  id: number;
  title: string;
  costToEnter: number;
  isActive: boolean;
}

export default function Home() {
  const [wager, setWager] = useState<WagerRace | null>(null);
  const [vpns, setVpns] = useState<VPNItem[]>([]);
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  useEffect(() => {
    // Fetch Wager Race
    axios.get("/api/wager/list").then((res) => {
      if (res.data) {
        setWager(res.data);
      }
    });

    // Fetch VPNs
    axios.get("/api/vpn/list").then((res) => {
      if (res.data) {
        setVpns(res.data);
      }
    });

    // Active Raffles
    axios.get("/api/raffle/list").then((res) => {
      if (res.data) {
        setRaffles(res.data.filter((r: Raffle) => r.isActive));
      }
    });

    // Active Giveaways
    axios.get("/api/giveaway/list").then((res) => {
      if (res.data) {
        setGiveaways(res.data.filter((g: Giveaway) => g.isActive));
      }
    });
  }, []);

  return (
    <div className="text-center flex flex-col gap-8">
      <motion.div
        className="my-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-casino text-stakeAccent">
          Welcome to Nahoule Casino!
        </h2>
        <p className="mt-2">
          The ultimate streaming experience for Stake Casino fans. Earn points,
          enter raffles, predict bonus buys, and more!
        </p>
      </motion.div>

      {/* Wager Race Leaderboard */}
      <motion.div
        className="bg-stakeGray p-4 rounded-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-xl mb-2 font-bold">Wager Race</h3>
        {wager ? (
          <div>
            <p className="font-semibold">{wager.title}</p>
            <p>{wager.details}</p>
          </div>
        ) : (
          <p>No active Wager Race right now.</p>
        )}
      </motion.div>

      {/* VPNs */}
      <motion.div
        className="bg-stakeGray p-4 rounded-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-xl mb-2 font-bold">Recommended VPNs</h3>
        {vpns.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {vpns.map((v) => (
              <div
                key={v.id}
                className="bg-black/50 rounded-md p-2 flex flex-col items-center"
              >
                <img src={v.logoUrl} alt={v.name} className="h-16 w-16" />
                <p className="mt-2">{v.name}</p>
                <a
                  href={v.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-300"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No VPNs recommended yet.</p>
        )}
      </motion.div>

      {/* Active Raffles */}
      <motion.div
        className="bg-stakeGray p-4 rounded-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl mb-2 font-bold">Active Raffles</h3>
        {raffles.length > 0 ? (
          raffles.map((r) => (
            <div key={r.id} className="mb-2">
              <p className="font-semibold">{r.title}</p>
              <p>Cost to Enter: {r.costToEnter} points</p>
            </div>
          ))
        ) : (
          <p>No active raffles right now.</p>
        )}
      </motion.div>

      {/* Active Giveaways */}
      <motion.div
        className="bg-stakeGray p-4 rounded-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl mb-2 font-bold">Active Giveaways</h3>
        {giveaways.length > 0 ? (
          giveaways.map((g) => (
            <div key={g.id} className="mb-2">
              <p className="font-semibold">{g.title}</p>
              <p>Cost to Enter: {g.costToEnter} points</p>
            </div>
          ))
        ) : (
          <p>No active giveaways at the moment.</p>
        )}
      </motion.div>
    </div>
  );
}
