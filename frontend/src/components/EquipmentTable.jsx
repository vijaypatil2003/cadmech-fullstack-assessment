const STATUS_COLORS = {
  Active: "bg-green-100 text-green-700",
  "Under Maintenance": "bg-yellow-100 text-yellow-700",
  Decommissioned: "bg-red-100 text-red-700",
};

const EQUIPMENT_TYPES = [
  "CNC Machine",
  "IoT Sensor",
  "Automation Trainer",
  "PLC Module",
  "Hydraulic System",
  "Pneumatic System",
  "Electrical Panel",
];

const STATUSES = ["Active", "Under Maintenance", "Decommissioned"];

export default function EquipmentTable({
  equipment,
  loading,
  error,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
  onAdd,
  onView,
}) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-sm">
        Error loading equipment: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
          />
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({ ...filters, type: e.target.value })
            }
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {EQUIPMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 whitespace-nowrap"
        >
          + Add Equipment
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          Loading equipment...
        </div>
      ) : equipment.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          No equipment found. Try adjusting your filters or add new equipment.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Location
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  Serial No.
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  Installed
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onView(item)}
                >
                  {" "}
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_COLORS[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                    {item.location || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                    {item.serial_number || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                    {item.installed_date || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onView(item)}
                        className="text-gray-600 hover:text-gray-800 text-xs font-medium"
                      >
                        View
                      </button>{" "}
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
