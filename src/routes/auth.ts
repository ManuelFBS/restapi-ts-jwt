import { Router } from 'express';
import { TokenValidation } from '../libs/tokens/verifyToken';
import {
  profile,
  signin,
  signup,
  googleCallback,
  facebookCallback,
} from '../controllers/authentication/auth.controller';
import passport from 'passport';

const router: Router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/profile', TokenValidation, profile);

// Google Authentication Routes...
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  googleCallback,
);

// Facebook Authentication Routes...
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
);
router.get(
  'facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  facebookCallback,
);

export default router;
