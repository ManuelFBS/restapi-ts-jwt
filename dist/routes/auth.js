"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/tokens/verifyToken");
const auth_controller_1 = require("../controllers/authentication/auth.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
// Google Authentication Routes...
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/login',
}), auth_controller_1.googleCallback);
// Facebook Authentication Routes...
router.get('/facebook', passport_1.default.authenticate('facebook', {
    scope: ['email'],
}));
router.get('facebook/callback', passport_1.default.authenticate('facebook', {
    failureRedirect: '/login',
}), auth_controller_1.facebookCallback);
exports.default = router;
//# sourceMappingURL=auth.js.map