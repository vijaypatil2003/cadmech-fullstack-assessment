import { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function useEquipment(filters = {}) {
  const [equipment, setEquipment] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    underMaintenance: 0,
    decommissioned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildQueryString = (params) => {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.type) query.append("type", params.type);
    if (params.status) query.append("status", params.status);
    return query.toString();
  };

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const qs = buildQueryString(filters);
      const res = await fetch(`${API_BASE}/equipment${qs ? `?${qs}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch equipment");
      const json = await res.json();
      setEquipment(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.type, filters.status]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      const json = await res.json();
      setStats(json.data);
    } catch (err) {
      console.error("Stats fetch error:", err.message);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function createEquipment(payload) {
    const res = await fetch(`${API_BASE}/equipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to create equipment");
    await fetchEquipment();
    await fetchStats();
    return json.data;
  }

  async function updateEquipment(id, payload) {
    const res = await fetch(`${API_BASE}/equipment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update equipment");
    await fetchEquipment();
    await fetchStats();
    return json.data;
  }

  async function deleteEquipment(id) {
    const res = await fetch(`${API_BASE}/equipment/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to delete equipment");
    await fetchEquipment();
    await fetchStats();
  }

  return {
    equipment,
    stats,
    loading,
    error,
    refetch: fetchEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment,
  };
}
