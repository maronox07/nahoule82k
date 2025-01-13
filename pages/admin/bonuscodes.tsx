import { useState, useEffect } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface BonusCode {
  id: number;
  code: string;
  points: number;
  expiresAt: string;
}

export default function BonusCodesAdmin() {
  const [list, setList] = useState<BonusCode[]>([]);
  const [code, setCode] = useState("");
  const [points, setPoints] = useState(0);
  const [expiresAt, setExpiresAt] = useState("");

  const fetchCodes = async () => {
    const res = await axios.get("/api/bonuscode/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const createCode = async () => {
    await axios.post("/api/bonuscode/create", {
      code,
      points,
      expiresAt,
    });
    alert("Bonus code created");
    fetchCodes();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Bonus Codes</h1>
        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Create New Code</h2>
          <input
            type="text"
            placeholder="Code"
            className="p-2 bg-black rounded w-full mb-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="number"
            placeholder="Points"
            className="p-2 bg-black rounded w-full mb-2"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
          <input
            type="datetime-local"
            className="p-2 bg-black rounded w-full mb-2"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
          <button
            onClick={createCode}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Create
          </button>
        </div>

        <div>
          {list.map((c) => (
            <div key={c.id} className="bg-stakeGray p-2 mb-2 rounded">
              <p>
                {c.code} | {c.points} pts | Expires: {c.expiresAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminCheck>
  );
}
