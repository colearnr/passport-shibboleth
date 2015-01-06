// Based on http://www.incommon.org/federation/attributesummary.html
// Also covers UK federation recommendation - http://www.ukfederation.org.uk/library/uploads/Documents/technical-recommendations-for-participants.pdf
var attributesMap = {
  'urn:oid:1.3.6.1.4.1.5923.1.1.1.9': 'eduPersonScopedAffiliation',
  'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eduPersonPrincipalName',
  'urn:oid:1.3.6.1.4.1.5923.1.1.1.7': 'eduPersonEntitlement',
  'urn:oid:1.3.6.1.4.1.5923.1.1.1.10': 'eduPersonTargetedID',
  'urn:oid:2.5.4.4': 'sn',
  'urn:oid:2.5.4.42': 'givenName',
  'urn:oid:2.16.840.1.113730.3.1.241': 'displayName',
  'urn:oid:0.9.2342.19200300.100.1.3': 'email'
}

function convertOidMap(obj) {
  if (!obj) {
    return obj;
  }

  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && attributesMap[key]) {
      ret[attributesMap[key]] = obj[key];
    }
  }
  return ret;
}

exports.attributesMap = attributesMap;
exports.convertOidMap = convertOidMap;
