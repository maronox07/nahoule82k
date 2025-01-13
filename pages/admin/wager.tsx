import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface WagerRace {
  id: number;
  title: string;
  details: string;
}

export default function WagerRaceAdmin() {
  const [race, setRace] = useState<WagerRace | null>(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const fetchRace = async () => {
    const res = await axios.get("/api/wager/list");
    if (res.data) {
      setRace(res.data);
      setTitle(res.data.title);
      setDetails(res.data.details);
    }
  };

  useEffect(() => {
    fetchRace();
  }, []);

  const updateRace = async () => {
    await axios.post("/api/wager/update", { title, details });
    alert("Wager Race updated");
    fetchRace();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Wager Race</h1>
        <div className="bg-stakeGray p-4 rounded">
          <input
            type="text"
            placeholder="Title"
            className="p-2 bg-black rounded w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Details"
            className="p-2 bg-black rounded w-full mb-2"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <button
            onClick={updateRace}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </AdminCheck>
  );
}
