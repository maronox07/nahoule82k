import { useEffect, useState } from "react";
import axios from "axios";

interface ScheduleItem {
  id: number;
  streamDate: string; // date
  title: string;
}

export default function Schedule() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [todayMsg, setTodayMsg] = useState("");

  useEffect(() => {
    axios.get("/api/schedule/list").then((res) => {
      const data = res.data as ScheduleItem[];
      setItems(data);

      // Check if there's a stream for today
      const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
      const found = data.find((item) => item.streamDate.startsWith(today));
      if (!found) setTodayMsg("No stream for today.");
    });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Schedule</h1>
      {todayMsg && <p className="text-red-300 mb-2">{todayMsg}</p>}
      <div className="flex flex-col items-center space-y-4 mt-4">
        {items.map((item) => (
          <div key={item.id} className="bg-stakeGray p-4 w-full max-w-md rounded">
            <p className="font-semibold">{item.title}</p>
            <p>{item.streamDate.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
