export default function ViewModal({ equipment, onClose, onEdit }) {
  if (!equipment) return null;

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    "Under Maintenance": "bg-yellow-100 text-yellow-700",
    Decommissioned: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {equipment.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[equipment.status]}`}
            >
              {equipment.status}
            </span>
            <span className="text-sm text-gray-500">{equipment.type}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Serial Number
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {equipment.serial_number || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Location
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {equipment.location || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Installed Date
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {equipment.installed_date || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Added On
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {equipment.created_at?.split(" ")[0] || "—"}
              </p>
            </div>
          </div>

          {equipment.description && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Description
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {equipment.description}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 rounded px-4 py-2 text-sm hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onEdit(equipment);
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
