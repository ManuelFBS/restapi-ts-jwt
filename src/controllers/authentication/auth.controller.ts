import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import User, { IUser } from '../../models/User';
import { token } from '../../libs/tokens/token';

export const signup = async (
  req: Request,
  res: Response,
) => {
  // Data validation... -----------------------------------------------------------------------
  await check(
    'username',
    'Username is required and must between 5 and 12 characters...',
  )
    .notEmpty()
    .isLength({ min: 5, max: 12 })
    .run(req);
  // ----------   ----------   ----------   ----------   ----------   ----------
  await check('email', 'Email is invalid...')
    .notEmpty()
    .isEmail()
    .run(req);
  await check('email')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user)
        throw new Error(
          'Email already exists, please use a diferent one...',
        );
    })
    .run(req);
  // ----------   ----------   ----------   ----------   ----------   ----------
  await check(
    'password',
    'Password is required and must be between 6 and 15 characters...',
  )
    .isLength({ min: 6, max: 15 })
    .run(req);
  // ----------   ----------   ----------   ----------   ----------   ----------

  const errors = validationResult(req);

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
    const newUser: IUser = new User({
      username: username,
      email: email,
      password: password,
    });
    newUser.password = await newUser.encryptPassword(
      newUser.password,
    );

    const user = new User(newUser);
    const savedUser = await user.save();

    // New registered user and token assignment displayed...
    res
      .header('auth-token', token(savedUser))
      .json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
) => {
  // Data validation... ---------------------------------------------------------
  await check('username').optional().isString().run(req);
  await check('email').optional().isEmail().run(req);
  await check('password', 'Password is required...')
    .exists()
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // ---------------------------------------------------------------------------------------

  const { username, email, password } = req.body;
  let user = null;

  try {
    if (username) {
      user = await User.findOne({ username: username });
    } else if (email) {
      user = await User.findOne({ email: email });
    } else {
      return res
        .status(400)
        .json(
          'You must provide a valid username or email...!',
        );
    }

    if (!user)
      return res
        .status(400)
        .json('Email or User is wrong...!');

    const validatePass: boolean =
      await user.validatePassword(password);

    if (!validatePass)
      return res.status(400).json('Invalid password...!');

    // A new user object 'userWithoutPassword' is created
    // without the password property...
    const { password: _, ...userWithoutPassword } =
      user.toObject();

    res
      .header('auth-token', token(user))
      .json(userWithoutPassword);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server internal error...' });
  }
};

export const profile = async (
  req: Request,
  res: Response,
) => {
  const user = await User.findById(req.userId, {
    password: 0,
  });

  if (!user)
    return res.status(404).json('No user found...');

  res.json(user);
};

// Google Callback...
export const googleCallback = async (
  req: Request,
  res: Response,
) => {
  // Successful authentication, redirect home...
  res.redirect('/');
};

// Facebook Callback...
export const facebookCallback = async (
  req: Request,
  res: Response,
) => {
  // Successful authentication, redirect home...
  res.redirect('/');
};
