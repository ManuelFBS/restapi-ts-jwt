"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByUserNameOrEmail = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../../models/User"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByUserNameOrEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    let user = null;
    try {
        if (username) {
            user = yield User_1.default.findOne({ username: username });
        }
        else if (email) {
            user = yield User_1.default.findOne({ email: email });
        }
        else {
            return res.status(404).json('User not found...!');
        }
        let noPassword = null;
        if (user) {
            const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
            noPassword = userWithoutPassword;
        }
        return res.status(200).json(noPassword);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUserByUserNameOrEmail = getUserByUserNameOrEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map