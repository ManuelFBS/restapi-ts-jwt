"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/tokens/verifyToken");
const users_controller_1 = require("../controllers/users/users.controller");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.TokenValidation, users_controller_1.getAllUsers);
router.get('/user/', verifyToken_1.TokenValidation, users_controller_1.getUserByUserNameOrEmail);
exports.default = router;
//# sourceMappingURL=users.routes.js.map