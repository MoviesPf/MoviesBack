const { Router } = require("express");
const {
  getPlatformsHandler,
  createPlatformHandler,
  deletePlatformHandler,
} = require("../Handlers/Platforms.handler");

const router = Router();

router.get("/", getPlatformsHandler);

router.post("/", createPlatformHandler);

router.delete("/:platformId", deletePlatformHandler);

module.exports = router;
