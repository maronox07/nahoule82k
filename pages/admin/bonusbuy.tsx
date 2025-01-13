import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface BonusBuy {
  id: number;
  startBalance: number;
  endBalance: number | null;
  isActive: boolean;
}

export default function BonusBuyAdmin() {
  const [list, setList] = useState<BonusBuy[]>([]);
  const [startBalance, setStartBalance] = useState(0);

  const fetchList = async () => {
    const res = await axios.get("/api/bonusbuy/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const createBB = async () => {
    await axios.post("/api/bonusbuy/create", { startBalance });
    alert("BonusBuy created");
    fetchList();
  };

  const endBB = async (id: number, endBalance: number) => {
    await axios.post("/api/bonusbuy/end", { id, endBalance });
    alert("BonusBuy ended");
    fetchList();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Bonus Buy Predictions</h1>

        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Create New Bonus Buy</h2>
          <input
            type="number"
            className="p-2 bg-black rounded w-full mb-2"
            placeholder="Start Balance"
            value={startBalance}
            onChange={(e) => setStartBalance(parseInt(e.target.value))}
          />
          <button
            onClick={createBB}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Create
          </button>
        </div>

        <div>
          <h2 className="text-xl mb-2">Existing Bonus Buys</h2>
          {list.map((b) => (
            <div key={b.id} className="bg-stakeGray p-2 mb-2 rounded">
              <p>
                Start: {b.startBalance} | End: {b.endBalance} |{" "}
                {b.isActive ? "Active" : "Ended"}
              </p>
              {b.isActive && (
                <div>
                  <input
                    type="number"
                    placeholder="Final Balance"
                    className="p-1 bg-black rounded mr-2"
                    onChange={(e) => (b.endBalance = parseInt(e.target.value))}
                  />
                  <button
                    onClick={() => endBB(b.id, b.endBalance || 0)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    End
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminCheck>
  );
}
