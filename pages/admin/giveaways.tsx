import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface Giveaway {
  id: number;
  title: string;
  costToEnter: number;
  maxParticipants: number;
  numWinners: number;
  isActive: boolean;
}

export default function AdminGiveaways() {
  const [list, setList] = useState<Giveaway[]>([]);
  const [title, setTitle] = useState("");
  const [costToEnter, setCostToEnter] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [numWinners, setNumWinners] = useState(1);

  const fetchGiveaways = async () => {
    const res = await axios.get("/api/giveaway/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchGiveaways();
  }, []);

  const createGiveaway = async () => {
    await axios.post("/api/giveaway/create", {
      title,
      costToEnter,
      maxParticipants,
      numWinners,
    });
    alert("Giveaway created");
    fetchGiveaways();
  };

  const endGiveaway = async (id: number) => {
    await axios.post("/api/giveaway/end", { id });
    alert("Giveaway ended");
    fetchGiveaways();
  };

  return (
    <AdminCheck>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Giveaways</h1>

        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Create New Giveaway</h2>
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
            onClick={createGiveaway}
            className="bg-stakeAccent py-2 px-4 rounded text-black font-semibold"
          >
            Create
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Giveaways</h2>
          {list.map((g) => (
            <div key={g.id} className="bg-stakeGray p-2 mb-2 rounded">
              <p>
                <strong>{g.title}</strong> | cost: {g.costToEnter}, max:{" "}
                {g.maxParticipants}, winners: {g.numWinners} |{" "}
                {g.isActive ? "Active" : "Ended"}
              </p>
              {g.isActive && (
                <button
                  onClick={() => endGiveaway(g.id)}
                  className="bg-red-500 px-2 py-1 rounded mt-1"
                >
                  End Giveaway
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminCheck>
  );
}
