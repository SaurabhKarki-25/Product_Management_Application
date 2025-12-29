import { useEffect, useState } from "react";
import { BASE_URL } from "../API/config";
import { authHeader } from "../API/authheader.js";
import {StatCard} from "../components/StatCard";

export default function DashboardHome() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/stats`, {
      headers: authHeader()
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Available" value={stats.availableProducts} />
        <StatCard title="Unavailable" value={stats.unavailableProducts} />
      </div>
    </>
  );
}

