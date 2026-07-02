import { useState } from "react";
import { useEquipment } from "./hooks/useEquipment";
import StatCard from "./components/StatCard";
import EquipmentTable from "./components/EquipmentTable";
import EquipmentForm from "./components/EquipmentForm";
import DeleteModal from "./components/DeleteModal";
import toast from "react-hot-toast";
import ViewModal from "./components/ViewModal";

export default function App() {
  const [filters, setFilters] = useState({ search: "", type: "", status: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [deletingEquipment, setDeletingEquipment] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewingEquipment, setViewingEquipment] = useState(null);

  const {
    equipment,
    stats,
    loading,
    error,
    createEquipment,
    updateEquipment,
    deleteEquipment,
  } = useEquipment(filters);

  function handleAdd() {
    setEditingEquipment(null);
    setShowForm(true);
  }

  function handleEdit(item) {
    setEditingEquipment(item);
    setShowForm(true);
  }

  function handleDeleteClick(item) {
    setDeletingEquipment(item);
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingEquipment) {
        await updateEquipment(editingEquipment.id, formData);
        toast.success("Equipment updated successfully");
      } else {
        await createEquipment(formData);
        toast.success("Equipment added successfully");
      }
      setShowForm(false);
      setEditingEquipment(null);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDeleteConfirm() {
    setDeleting(true);
    try {
      await deleteEquipment(deletingEquipment.id);
      setDeletingEquipment(null);
      toast.success("Equipment deleted successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/cadmech-logo.png"
                alt="CADMech Logo"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold tracking-tight">
                SmartLab Equipment Manager
              </h1>
            </div>
            <p className="text-gray-400 text-xs mt-0.5">
              Cadmech Engineering Pvt. Ltd.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Equipment" value={stats.total} color="blue" />
          <StatCard label="Active" value={stats.active} color="green" />
          <StatCard
            label="Under Maintenance"
            value={stats.underMaintenance}
            color="yellow"
          />
          <StatCard
            label="Decommissioned"
            value={stats.decommissioned}
            color="red"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Equipment List
          </h2>
          <EquipmentTable
            equipment={equipment}
            loading={loading}
            error={error}
            filters={filters}
            onFilterChange={setFilters}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onAdd={handleAdd}
            onView={(item) => setViewingEquipment(item)}
          />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        CADMech Full Stack Assessment © {new Date().getFullYear()} — Cadmech
        Engineering Pvt. Ltd.
      </footer>

      {showForm && (
        <EquipmentForm
          initialData={editingEquipment}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingEquipment(null);
          }}
        />
      )}

      {deletingEquipment && (
        <DeleteModal
          equipment={deletingEquipment}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingEquipment(null)}
          deleting={deleting}
        />
      )}

      {viewingEquipment && (
        <ViewModal
          equipment={viewingEquipment}
          onClose={() => setViewingEquipment(null)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
