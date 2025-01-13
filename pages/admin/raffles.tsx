import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface Raffle {
  id: number;
  title: string;
  costToEnter: number;
  maxParticipants: number;
  numWinners: number;
  isActive: boolean;
}

export default function AdminRaffles() {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [title, setTitle] = useState("");
  const [costToEnter, setCostToEnter] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [numWinners, setNumWinners] = useState(1);

  const fetchRaffles = async () => {
    const res = await axios.get("/api/raffle/list");
    setRaffles(res.data);
  };

  useEffect(() => {
    fetchRaffles();
  }, []);

  const createRaffle = async () => {
    await axios.post("/api/raffle/create", {
      title,
      costToEnter,
      maxParticipants,
      numWinners,
    });
    alert("Raffle created");
    fetchRaffles();
  };

  const endRaffle = async (id: number) => {
    await axios.post("/api/raffle/end", { id });
    alert("Raffle ended");
    fetchRaffles();
  };

  return (
    <AdminCheck>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Raffles</h1>

        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Create New Raffle</h2>
          <input
            type="text"
            placeholder="Title"
            className="p-2 bg-black rounded w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cost to Enter"
            className="p-2 bg-black rounded w-full mb-2"
            value={costToEnter}
            onChange={(e) => setCostToEnter(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Participants"
            className="p-2 bg-black rounded w-full mb-2"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Num Winners"
            className="p-2 bg-black rounded w-full mb-2"
            value={numWinners}
            onChange={(e) => setNumWinners(parseInt(e.target.value))}
          />
          <button
            onClick={createRaffle}
            className="bg-stakeAccent py-2 px-4 rounded text-black font-semibold"
          >
            Create
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Raffles</h2>
          {raffles.map((r) => (
            <div key={r.id} className="bg-stakeGray p-2 mb-2 rounded">
              <p>
                <strong>{r.title}</strong> | cost: {r.costToEnter}, max:{" "}
                {r.maxParticipants}, winners: {r.numWinners} |{" "}
                {r.isActive ? "Active" : "Ended"}
              </p>
              {r.isActive && (
                <button
                  onClick={() => endRaffle(r.id)}
                  className="bg-red-500 px-2 py-1 rounded mt-1"
                >
                  End Raffle
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminCheck>
  );
}
