var passport = require('passport'),
  saml = require('passport-saml'),
  util = require('util'),
  config = require('./config'),
  urlUtils = require('url'),
  fs = require('fs'),
  strategyName = 'shibboleth';

function secureUrl(url, suffix) {
  var urlObj = urlUtils.parse(url);
  return 'https://' + urlObj.host + (suffix || '');
}

function safeFileRead(file) {
  if (file && fs.existsSync(file)) {
    return fs.readFileSync(file, 'UTF-8');
  } else {
    return null;
  }
}

function getSamlOptions(options) {
  var privateKey = options.privateKey || safeFileRead(options.privateKeyFile);

  // Configure options for SAML
  var samlOptions = {
    entryPoint: options.entryPoint || secureUrl(options.authUrl, config.IDP_SSO_SUFFIX),
    cert: options.publicCert || safeFileRead(options.publicCertFile),
    issuer: options.entityId,
    callbackUrl: options.callbackUrl || secureUrl(options.domain, '/saml/callback'),
    decryptionPvk: privateKey,
    privateCert: privateKey
  }
  if (options.identifierFormat !== undefined) {
    samlOptions.identifierFormat = options.identifierFormat;
  }
  return samlOptions;
}

/*
  Passport strategy for shibboleth authentication

  options:
    entryPoint - Full SAML2 redirect url (Eg: https://test-idp.ukfederation.org.uk/idp/profile/SAML2/Redirect/SSO)

    authUrl - If entryPoint is not known, use this parameter (Eg: https://test-idp.ukfederation.org.uk/idp/shibboleth - Note. This is also called as entityId)

    publicCert or publicCertFile - Public certificate string in pem format (Eg: MIIFUjCC ...)

    entityId - This is you the service provider (SP). Can be domain name.

    callbackUrl - Url to calback after authentication. If not specified /saml/callback will be appended to the domain and used

    privateKey or privateKeyFile - Private key in pem format
*/
function Strategy(options, verify) {
  this.samlOptions = getSamlOptions(options);
  if (!verify) {
    verify = function(profile, done) {
      if (!profile) {
        return done(new Error('Empty SAML profile returned!'));
      } else {
        return done(null, profile);
      }
    }
  }

  // Pass it to SAML strategy
  saml.Strategy.call(this, this.samlOptions, verify);

  // Strategy name
  this.name = strategyName;
}

util.inherits(Strategy, saml.Strategy);

Strategy.prototype.generateServiceProviderMetadata = function(decryptionCert) {
  var _saml = new saml.SAML(this.samlOptions);
  return _saml.generateServiceProviderMetadata(decryptionCert);
};

module.exports = Strategy;
