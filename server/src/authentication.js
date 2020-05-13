const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authentication = new AuthenticationService(app);

  const localConfig = {
    'entity': 'user',
    'service': 'user',
    'usernameField': 'email',
    'passwordField': 'password'
  }; 

  // const local = 

  // authentication.register('jwt', new JWTStrategy());
  // authentication.register('local', new LocalStrategy(localConfig));

  // app.use('/authentication', authentication);
};
