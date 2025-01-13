import { useRouter } from "next/router";
import { useEffect } from "react";

interface AdminCheckProps {
  children: React.ReactNode;
}

export default function AdminCheck({ children }: AdminCheckProps) {
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("adminUser");
    if (!admin) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
