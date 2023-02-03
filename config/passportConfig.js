import User from "../model/User.js";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

const localStrategy = passportLocal.Strategy;

export const passport_signup = (passport) => {
  passport.use(
    "local-signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // check if user exists
          const userExists = await User.findOne({ email: email });
          if (userExists) {
            return done(null, false);
          }

          const user = req.body;
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export const passport_login = (passport) => {
  passport.use(
    "local-login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false);

        let match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false);

        return done(null, user);
      }
    )
  );
};
