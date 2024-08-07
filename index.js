const jq = require('./jq');

const raw = (...args) => jq.then(j => j.raw(...args));
const json = (...args) => jq.then(j => j.json(...args));

exports.raw = raw;
exports.json = json;

exports.promised = {
  raw: (...args) => jq.then(j => j.raw(...args)),
  json: (...args) => jq.then(j => j.json(...args)),
}
