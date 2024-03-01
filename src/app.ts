import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users.routes';
import { AUX_SECRET_KEYS } from './libs/others/auxiliar.keys';
import passport from 'passport';
import session from 'express-session';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { profile } from 'controllers/authentication/auth.controller';

dotenv.config();

const app: Application = express();

// Settings...
app.set('port', process.env.PORT || 8585 || 3000);

// Middlewares...
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session config...
const sessionConfig = {
  secret:
    `${process.env.SECRET_KEY_SESSION}` || AUX_SECRET_KEYS,
  resave: true,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

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
app.use(`${prefix}`, authRoutes);
app.use('/api/users', usersRoutes);

export default app;
