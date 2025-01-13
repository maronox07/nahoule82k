import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface MediaItem {
  id: number;
  title: string;
  mediaUrl: string;
}

export default function AdminMedia() {
  const [list, setList] = useState<MediaItem[]>([]);
  const [title, setTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const fetchMedia = async () => {
    const res = await axios.get("/api/media/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const createMedia = async () => {
    await axios.post("/api/media/create", {
      title,
      mediaUrl,
    });
    alert("Media added");
    fetchMedia();
  };

  const deleteMedia = async (id: number) => {
    await axios.post("/api/media/delete", { id });
    alert("Media deleted");
    fetchMedia();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage Media</h1>
        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Add Media/Highlight</h2>
          <input
            type="text"
            placeholder="Title"
            className="p-2 bg-black rounded w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Media URL (YouTube link, etc.)"
            className="p-2 bg-black rounded w-full mb-2"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
          <button
            onClick={createMedia}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Add
          </button>
        </div>

        <div>
          <h2 className="text-xl mb-2">Media Items</h2>
          {list.map((m) => (
            <div key={m.id} className="bg-stakeGray p-2 mb-2 rounded flex justify-between">
              <div>
                <p>{m.title}</p>
                <p>{m.mediaUrl}</p>
              </div>
              <button
                onClick={() => deleteMedia(m.id)}
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
