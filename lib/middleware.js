var fs = require('fs');

/**
 * Middleware for generating metadata xml for the service provider
 *
 * var strategy = new ShibbolethStrategy(config, ...);
 * app.get(config.SP_META_SUFFIX, middleware.metadataRoute(strategy, publicCert));
 *
 */
function metadataRoute(shibbolethStrategy, publicCertFile) {
  return function(req, res) {
    var publicCert = publicCertFile;
    if (fs.statSync(publicCertFile).isFile() && fs.existsSync(publicCertFile)) {
      publicCert = fs.readFileSync(publicCertFile, 'UTF-8');
    }
    res.type('application/xml');
    res.status(200).send(shibbolethStrategy.generateServiceProviderMetadata(publicCert));
  }
}

/**
 * Middleware for checking if the user is authenticated
 *
 * app.get(path, middleware.ensureAuthenticated(loginUrl), function(req, res) { })
 */
function ensureAuthenticated(loginUrl) {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
        res.redirect(loginUrl);
      }
    } else {
      return next();
    }
  }
}

/**
 * Middleware for redirecting to the protected resource after successful login
 *
 * app.post('/auth/callback', passport.authenticate('shibboleth'), middleware.authCallback('/'))
 */
function authCallback(defaultUrl) {
  return function(req, res) {
    var url = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(url || defaultUrl || '/');
  }
}

exports.metadataRoute = metadataRoute;
exports.ensureAuthenticated = ensureAuthenticated;
exports.authCallback = authCallback;
