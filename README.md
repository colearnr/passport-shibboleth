Passport-Shibboleth
====================

This is a [Shibboleth](http://shibboleth.net) authentication provider for [Passport](http://passportjs.org/)

The code was originally based on @drstearns [implementation](https://github.com/drstearns/passport-uwshib)

## Installation

```
npm install passport-shibboleth --save
```

## Usage

### Configure strategy

```
passport.use(new ShibbolethStrategy({

  },
  function(profile, done) {
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  });
);
```

### Parameters

* `entryPoint` - Full SAML2 redirect url (Eg: https://test-idp.ukfederation.org.uk/idp/profile/SAML2/Redirect/SSO)
* `authUrl` - If entryPoint is not known, use this parameter (Eg: https://test-idp.ukfederation.org.uk/idp/shibboleth - Note. This is also called as entityId)
* `publicCert or publicCertFile` - Public certificate string in pem format (Eg: MIIFUjCC ...)
* `entityId` - This is you the service provider (SP). Can be domain name.
* `callbackUrl` - Url to calback after authentication. If not specified /saml/callback will be appended to the domain and used
* `privateKey or privateKeyFile` - Private key in pem format

### Using attributes - Privacy note

NOTE: We are not legal experts and this is not a legal advice.

Data protection law and the institutional obligation to preserve user privacy both require that information idenfifying individuals only be exchanged when strictly necessary. This means that if you are storing attributes other than eduPersonScopedAffiliation and eduPersonTargetedID (Eg: eduPersonPrincipalName), you should have a privacy policy in place.

