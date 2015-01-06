### Useful links

- [UK Federation feeds - Thanks to Disco Juice](https://static.discojuice.org/feeds/uk)
- [US - InCommon](https://static.discojuice.org/feeds/incommon)
- [UK Federation Test Identify Provider](http://www.ukfederation.org.uk/content/Documents/TestIdP)
- [Production Metadata aggregate](http://metadata.ukfederation.org.uk/ukfederation-metadata.xml) - Has the url and contact details various institutions. No spamming please.
- [Federation attributes](http://www.incommon.org/federation/attributesummary.html)

### How to convert a feed to config.js

```
node lib/gen_config.js
```

### Generating public and private certificate as pem

Assuming you have the original key and the crt from the provider.

```
openssl rsa -in server.key -text > privateKey.pem
openssl x509 -inform PEM -in server.crt > publicCert.pem
```
