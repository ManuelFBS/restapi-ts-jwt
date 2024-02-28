"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/tokens/verifyToken");
const auth_controller_1 = require("../controllers/authentication/auth.controller");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map