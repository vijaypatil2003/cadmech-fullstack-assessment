const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");

router.get("/equipment", equipmentController.getAllEquipment);
router.get("/equipment/:id", equipmentController.getEquipmentById);
router.post("/equipment", equipmentController.createEquipment);
router.put("/equipment/:id", equipmentController.updateEquipment);
router.delete("/equipment/:id", equipmentController.deleteEquipment);
router.get("/stats", equipmentController.getStats);

module.exports = router;
