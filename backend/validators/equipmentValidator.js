const { ValidationError } = require("../utils/AppError");

const VALID_TYPES = [
  "CNC Machine",
  "IoT Sensor",
  "Automation Trainer",
  "PLC Module",
  "Hydraulic System",
  "Pneumatic System",
  "Electrical Panel",
];

const VALID_STATUSES = ["Active", "Under Maintenance", "Decommissioned"];

function validateCreatePayload(body) {
  const errors = [];

  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!body.type || !VALID_TYPES.includes(body.type)) {
    errors.push(
      `type is required and must be one of: ${VALID_TYPES.join(", ")}`,
    );
  }

  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    errors.push(
      `status is required and must be one of: ${VALID_STATUSES.join(", ")}`,
    );
  }

  if (body.installed_date && isNaN(Date.parse(body.installed_date))) {
    errors.push("installed_date must be a valid date");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
}

function validateUpdatePayload(body) {
  const errors = [];

  if (
    body.name !== undefined &&
    (typeof body.name !== "string" || !body.name.trim())
  ) {
    errors.push("name must be a non-empty string");
  }

  if (body.type !== undefined && !VALID_TYPES.includes(body.type)) {
    errors.push(`type must be one of: ${VALID_TYPES.join(", ")}`);
  }

  if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  if (body.installed_date && isNaN(Date.parse(body.installed_date))) {
    errors.push("installed_date must be a valid date");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
}

function validateIdParam(id) {
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    throw new ValidationError("id must be a positive number");
  }
}

module.exports = {
  validateCreatePayload,
  validateUpdatePayload,
  validateIdParam,
  VALID_TYPES,
  VALID_STATUSES,
};
