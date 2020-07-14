const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(new Strategy({
  secretOrKey: config.authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async function(tokenPayload, cb) {
    const usersServie = new UsersService();

    try {
      const user = await usersServie.getUser({ email: tokenPayload.email});
      if (!user) {
        return cb(boom.unauthorized(), false)
      };
      delete user.password;
      cb(null, { ...user, scopes: tokenPayload.scopes });
    }catch(err) {
      cb(err);
    };
  }
));