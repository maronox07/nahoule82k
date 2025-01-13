import { useEffect, useState } from "react";
import AdminCheck from "../../components/AdminCheck";
import axios from "axios";

interface VPNItem {
  id: number;
  name: string;
  logoUrl: string;
  downloadUrl: string;
}

export default function VPNAdmin() {
  const [list, setList] = useState<VPNItem[]>([]);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const fetchVPNs = async () => {
    const res = await axios.get("/api/vpn/list");
    setList(res.data);
  };

  useEffect(() => {
    fetchVPNs();
  }, []);

  const createVPN = async () => {
    await axios.post("/api/vpn/create", {
      name,
      logoUrl,
      downloadUrl,
    });
    alert("VPN created");
    fetchVPNs();
  };

  const deleteVPN = async (id: number) => {
    await axios.post("/api/vpn/delete", { id });
    alert("VPN deleted");
    fetchVPNs();
  };

  return (
    <AdminCheck>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Manage VPNs</h1>
        <div className="bg-stakeGray p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Add VPN</h2>
          <input
            type="text"
            placeholder="Name"
            className="p-2 bg-black rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Logo URL"
            className="p-2 bg-black rounded w-full mb-2"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Download URL"
            className="p-2 bg-black rounded w-full mb-2"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
          />
          <button
            onClick={createVPN}
            className="bg-stakeAccent px-4 py-2 rounded text-black font-semibold"
          >
            Create
          </button>
        </div>

        <div>
          <h2 className="text-xl mb-2">Existing VPNs</h2>
          {list.map((v) => (
            <div key={v.id} className="bg-stakeGray p-2 mb-2 rounded flex justify-between">
              <div>
                <p className="font-semibold">{v.name}</p>
                <p>{v.logoUrl}</p>
                <p>{v.downloadUrl}</p>
              </div>
              <button
                onClick={() => deleteVPN(v.id)}
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
