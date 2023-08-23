const { Router } = require("express");
const platformsHandlers = require("../Handlers/plataformsHandler");

const router = Router();

router.get("/platforms", platformsHandlers.getPlatformsHandler);

router.post("/platforms", platformsHandlers.createPlatformHandler);

module.exports = router;
