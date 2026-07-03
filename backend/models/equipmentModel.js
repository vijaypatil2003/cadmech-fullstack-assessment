const db = require("../db/connection");

function getAllEquipment({ search, type, status, date_from, date_to } = {}) {
  let query = "SELECT * FROM equipment WHERE 1=1";
  const params = [];

  if (search) {
    query += " AND (name LIKE ? OR serial_number LIKE ? OR location LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (type) {
    query += " AND type = ?";
    params.push(type);
  }

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (date_from) {
    query += " AND installed_date >= ?";
    params.push(date_from);
  }

  if (date_to) {
    query += " AND installed_date <= ?";
    params.push(date_to);
  }

  query += " ORDER BY created_at DESC";

  return db.prepare(query).all(...params);
}

function getEquipmentById(id) {
  return db.prepare("SELECT * FROM equipment WHERE id = ?").get(id);
}

function findBySerialNumber(serialNumber) {
  return db
    .prepare("SELECT id FROM equipment WHERE serial_number = ?")
    .get(serialNumber);
}

function createEquipment(equipment) {
  const {
    name,
    type,
    status,
    location,
    serial_number,
    description,
    installed_date,
  } = equipment;

  const insertStmt = db.prepare(`
    INSERT INTO equipment (name, type, status, location, serial_number, description, installed_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertStmt.run(
    name,
    type,
    status,
    location || null,
    serial_number || null,
    description || null,
    installed_date || null,
  );

  return getEquipmentById(result.lastInsertRowid);
}

function updateEquipment(id, equipment) {
  const existing = getEquipmentById(id);
  if (!existing) return null;

  const merged = {
    name: equipment.name !== undefined ? equipment.name : existing.name,
    type: equipment.type !== undefined ? equipment.type : existing.type,
    status: equipment.status !== undefined ? equipment.status : existing.status,
    location:
      equipment.location !== undefined ? equipment.location : existing.location,
    serial_number:
      equipment.serial_number !== undefined
        ? equipment.serial_number
        : existing.serial_number,
    description:
      equipment.description !== undefined
        ? equipment.description
        : existing.description,
    installed_date:
      equipment.installed_date !== undefined
        ? equipment.installed_date
        : existing.installed_date,
  };

  const updateStmt = db.prepare(`
    UPDATE equipment
    SET name = ?, type = ?, status = ?, location = ?, serial_number = ?, description = ?, installed_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  updateStmt.run(
    merged.name,
    merged.type,
    merged.status,
    merged.location,
    merged.serial_number,
    merged.description,
    merged.installed_date,
    id,
  );

  return getEquipmentById(id);
}

function deleteEquipment(id) {
  const result = db.prepare("DELETE FROM equipment WHERE id = ?").run(id);
  return result.changes > 0;
}

function getStats() {
  const total = db
    .prepare("SELECT COUNT(*) AS count FROM equipment")
    .get().count;

  const byStatus = db
    .prepare("SELECT status, COUNT(*) AS count FROM equipment GROUP BY status")
    .all();

  const statusMap = { Active: 0, "Under Maintenance": 0, Decommissioned: 0 };
  byStatus.forEach((row) => {
    statusMap[row.status] = row.count;
  });

  return {
    total,
    active: statusMap["Active"],
    underMaintenance: statusMap["Under Maintenance"],
    decommissioned: statusMap["Decommissioned"],
  };
}

module.exports = {
  getAllEquipment,
  getEquipmentById,
  findBySerialNumber,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getStats,
};
