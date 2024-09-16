import { Strategy } from "passport-jwt";
import keys from "./keys.js";
import userSchema from "../models/user.js";
import passport from "passport";

const { jwtkey } = keys;
const JwtStrategy = Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["accessToken"];
  }
  console.log(req.cookies["accessToken"]);
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = jwtkey.secret;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const result = await userSchema.findById(jwt_payload.id);
      if (result) {
        return done(null, result);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
