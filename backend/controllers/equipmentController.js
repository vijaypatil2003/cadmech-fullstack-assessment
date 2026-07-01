const equipmentService = require("../services/equipmentService");

function getAllEquipment(req, res) {
  const equipment = equipmentService.listEquipment(req.query);
  res.json({ data: equipment });
}

function getEquipmentById(req, res) {
  const equipment = equipmentService.getEquipment(req.params.id);
  res.json({ data: equipment });
}

function createEquipment(req, res) {
  const created = equipmentService.createEquipment(req.body);
  res.status(201).json({ data: created });
}

function updateEquipment(req, res) {
  const updated = equipmentService.updateEquipment(req.params.id, req.body);
  res.json({ data: updated });
}

function deleteEquipment(req, res) {
  const deleted = equipmentService.deleteEquipment(req.params.id);
  res.json({ data: deleted, message: "Equipment deleted successfully" });
}

function getStats(req, res) {
  const stats = equipmentService.getStats();
  res.json({ data: stats });
}

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getStats,
};
