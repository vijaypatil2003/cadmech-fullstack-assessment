const equipmentService = require("../services/equipmentService");

function getAllEquipment(req, res) {
  try {
    const equipment = equipmentService.listEquipment(req.query);
    res.json({ data: equipment });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

function getEquipmentById(req, res) {
  try {
    const equipment = equipmentService.getEquipment(req.params.id);
    res.json({ data: equipment });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

function createEquipment(req, res) {
  try {
    const created = equipmentService.createEquipment(req.body);
    res.status(201).json({ data: created });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

function updateEquipment(req, res) {
  try {
    const updated = equipmentService.updateEquipment(req.params.id, req.body);
    res.json({ data: updated });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

function deleteEquipment(req, res) {
  try {
    const deleted = equipmentService.deleteEquipment(req.params.id);
    res.json({ data: deleted, message: "Equipment deleted successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

function getStats(req, res) {
  try {
    const stats = equipmentService.getStats();
    res.json({ data: stats });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getStats,
};
