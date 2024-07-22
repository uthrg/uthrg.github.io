const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtConfig = require('./jwt.js');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT payload in strategy:', jwt_payload);
  // 這裡你可以根據 jwt_payload 查詢數據庫來驗證用戶
  // 現在我們就簡單地檢查用戶名
  if (jwt_payload.username === 'user001') {
    return done(null, jwt_payload);
  }
  const exp = jwt_payload.exp;
      const nbf = jwt_payload.nbf;
      const curr = (new Date().getTime() / 1000);
      if (curr > exp || curr < nbf) {
        return done(null, false, 'Token Expired');
      }
  return done(null, false);
}));

module.exports = passport;