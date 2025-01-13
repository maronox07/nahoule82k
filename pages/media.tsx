import { useEffect, useState } from "react";
import axios from "axios";

interface MediaItem {
  id: number;
  title: string;
  mediaUrl: string;
}

export default function Media() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    axios.get("/api/media/list").then((res) => {
      setMediaItems(res.data);
    });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Media & Highlights</h1>
      {mediaItems.length === 0 && <p>No media uploaded yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {mediaItems.map((m) => (
          <div key={m.id} className="bg-stakeGray p-4 rounded">
            <h2 className="font-semibold">{m.title}</h2>
            <a
              href={m.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300"
            >
              Watch / View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
