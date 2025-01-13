import AdminCheck from "../../components/AdminCheck";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminUser");
    fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  return (
    <AdminCheck>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => router.push("/admin/raffles")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Raffles
          </button>
          <button
            onClick={() => router.push("/admin/giveaways")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Giveaways
          </button>
          <button
            onClick={() => router.push("/admin/bonusbuy")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Bonus Buy
          </button>
          <button
            onClick={() => router.push("/admin/bonuscodes")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Bonus Codes
          </button>
          <button
            onClick={() => router.push("/admin/wager")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Wager Race
          </button>
          <button
            onClick={() => router.push("/admin/vpns")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            VPNs
          </button>
          <button
            onClick={() => router.push("/admin/schedule")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Schedule
          </button>
          <button
            onClick={() => router.push("/admin/media")}
            className="bg-stakeAccent px-4 py-2 text-black font-semibold rounded"
          >
            Media
          </button>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 text-white font-semibold rounded"
        >
          Logout
        </button>
      </div>
    </AdminCheck>
  );
}
