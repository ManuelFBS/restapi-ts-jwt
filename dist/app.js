"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const auxiliar_keys_1 = require("./libs/others/auxiliar.keys");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { profile } from 'controllers/authentication/auth.controller';
dotenv_1.default.config();
const app = (0, express_1.default)();
// Settings...
app.set('port', process.env.PORT || 8585 || 3000);
// Middlewares...
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Session config...
const sessionConfig = {
    secret: `${process.env.SECRET_KEY_SESSION}` || auxiliar_keys_1.AUX_SECRET_KEYS,
    resave: true,
    saveUninitialized: true,
};
app.use((0, express_session_1.default)(sessionConfig));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configure Passport Google Strategy...
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     },
//   ),
// );
// Routes...
const prefix = '/api/auth';
app.use(`${prefix}`, auth_1.default);
app.use('/api/users', users_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map