import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface ScheduleItem {
  id: number;
  streamDate: string;
  title: string;
}

export default function AdminSchedule() {
  const [list, setList] = useState<ScheduleItem[]>([]);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const fetchSchedule = async () => {
    const res = await axios.get("/api/schedule/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const createSchedule = async () => {
    await axios.post("/api/schedule/create", {
      streamDate: date,
      title,
    });
    alert("Stream scheduled");
    fetchSchedule();
  };

  const deleteSchedule = async (id: number) => {
    await axios.post("/api/schedule/delete", { id });
    alert("Schedule deleted");
    fetchSchedule();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Schedule</h1>
        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Add Stream</h2>
          <input
            type="date"
            className="p-2 bg-black rounded w-full mb-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            className="p-2 bg-black rounded w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createSchedule}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Add
          </button>
        </div>

        <div>
          <h2 className="text-xl mb-2">Upcoming Streams</h2>
          {list.map((item) => (
            <div key={item.id} className="bg-stakeGray p-2 mb-2 rounded flex justify-between">
              <div>
                <p>
                  {item.title} - {item.streamDate.slice(0, 10)}
                </p>
              </div>
              <button
                onClick={() => deleteSchedule(item.id)}
                className="bg-red-500 px-2 py-1 rounded h-fit"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminCheck>
  );
}
