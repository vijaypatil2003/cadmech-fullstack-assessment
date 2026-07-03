const equipmentModel = require("../models/equipmentModel");
const {
  validateCreatePayload,
  validateUpdatePayload,
  validateIdParam,
} = require("../validators/equipmentValidator");
const { ConflictError, NotFoundError } = require("../utils/AppError");

function listEquipment(queryParams) {
  const { search, type, status, date_from, date_to } = queryParams;
  return equipmentModel.getAllEquipment({
    search,
    type,
    status,
    date_from,
    date_to,
  });
}

function getEquipment(id) {
  validateIdParam(id);
  const equipment = equipmentModel.getEquipmentById(id);

  if (!equipment) {
    throw new NotFoundError(`Equipment with id ${id} not found`);
  }

  return equipment;
}

function createEquipment(payload) {
  validateCreatePayload(payload);

  if (payload.serial_number) {
    const existing = equipmentModel.findBySerialNumber(payload.serial_number);
    if (existing) {
      throw new ConflictError(
        `Equipment with serial_number "${payload.serial_number}" already exists`,
      );
    }
  }

  return equipmentModel.createEquipment(payload);
}

function updateEquipment(id, payload) {
  validateIdParam(id);
  validateUpdatePayload(payload);

  const existing = equipmentModel.getEquipmentById(id);
  if (!existing) {
    throw new NotFoundError(`Equipment with id ${id} not found`);
  }

  if (
    payload.serial_number &&
    payload.serial_number !== existing.serial_number
  ) {
    // only check uniqueness if serial_number actually changed — avoids false 409 on same-value update
    const duplicate = equipmentModel.findBySerialNumber(payload.serial_number);
    if (duplicate) {
      throw new ConflictError(
        `Equipment with serial_number "${payload.serial_number}" already exists`,
      );
    }
  }

  return equipmentModel.updateEquipment(id, payload);
}

function deleteEquipment(id) {
  validateIdParam(id);

  const existing = equipmentModel.getEquipmentById(id);
  if (!existing) {
    throw new NotFoundError(`Equipment with id ${id} not found`);
  }

  equipmentModel.deleteEquipment(id);
  return existing;
}

function getStats() {
  return equipmentModel.getStats();
}

module.exports = {
  listEquipment,
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getStats,
};
