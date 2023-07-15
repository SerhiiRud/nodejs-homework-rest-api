const express = require("express");
const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), add);

router.delete("/:id", authenticate, isValidId, deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
