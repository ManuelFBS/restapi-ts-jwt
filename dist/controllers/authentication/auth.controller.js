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
exports.facebookCallback = exports.googleCallback = exports.profile = exports.signin = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
const token_1 = require("../../libs/tokens/token");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Data validation... -----------------------------------------------------------------------
    yield (0, express_validator_1.check)('username', 'Username is required and must between 5 and 12 characters...')
        .notEmpty()
        .isLength({ min: 5, max: 12 })
        .run(req);
    // ----------   ----------   ----------   ----------   ----------   ----------
    yield (0, express_validator_1.check)('email', 'Email is invalid...')
        .notEmpty()
        .isEmail()
        .run(req);
    yield (0, express_validator_1.check)('email')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: value });
        if (user)
            throw new Error('Email already exists, please use a diferent one...');
    }))
        .run(req);
    // ----------   ----------   ----------   ----------   ----------   ----------
    yield (0, express_validator_1.check)('password', 'Password is required and must be between 6 and 15 characters...')
        .isLength({ min: 6, max: 15 })
        .run(req);
    // ----------   ----------   ----------   ----------   ----------   ----------
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    // ----------------------------------------------------------------------------------------------------
    const { username, email, password } = req.body;
    try {
        // Saving new user...
        const newUser = new User_1.default({
            username: username,
            email: email,
            password: password,
        });
        newUser.password = yield newUser.encryptPassword(newUser.password);
        const user = new User_1.default(newUser);
        const savedUser = yield user.save();
        // New registered user and token assignment displayed...
        res
            .header('auth-token', (0, token_1.token)(savedUser))
            .json(savedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Data validation... ---------------------------------------------------------
    yield (0, express_validator_1.check)('username').optional().isString().run(req);
    yield (0, express_validator_1.check)('email').optional().isEmail().run(req);
    yield (0, express_validator_1.check)('password', 'Password is required...')
        .exists()
        .run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ---------------------------------------------------------------------------------------
    const { username, email, password } = req.body;
    let user = null;
    try {
        if (username) {
            user = yield User_1.default.findOne({ username: username });
        }
        else if (email) {
            user = yield User_1.default.findOne({ email: email });
        }
        else {
            return res
                .status(400)
                .json('You must provide a valid username or email...!');
        }
        if (!user)
            return res
                .status(400)
                .json('Email or User is wrong...!');
        const validatePass = yield user.validatePassword(password);
        if (!validatePass)
            return res.status(400).json('Invalid password...!');
        // A new user object 'userWithoutPassword' is created
        // without the password property...
        const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res
            .header('auth-token', (0, token_1.token)(user))
            .json(userWithoutPassword);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Server internal error...' });
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, {
        password: 0,
    });
    if (!user)
        return res.status(404).json('No user found...');
    res.json(user);
});
exports.profile = profile;
// Google Callback...
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Successful authentication, redirect home...
    res.redirect('/');
});
exports.googleCallback = googleCallback;
// Facebook Callback...
const facebookCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Successful authentication, redirect home...
    res.redirect('/');
});
exports.facebookCallback = facebookCallback;
//# sourceMappingURL=auth.controller.js.map