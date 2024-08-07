/** @format */

const tape = require('tape');

const jq = require('./');

tape('jq behavior', async function(t) {
  doJQTests(t, jq);
});

tape('jq behavior', async function(t) {
  doJQTests(t, jq.promised);
});

/*
tape('detect memory leaks', async function(t) {
  const iterations = 1000;
  t.plan(iterations);

  const jq = await jqPromise;

  [...Array(iterations)].forEach( (_, i) => {
    t.doesNotThrow(
      () => {
        jq.raw(
            `{"foo": 1, "bar": 2, "deep": { "qux": 3 } }`,
            `.foo`,
        );
      },
    );

    t.throws(
      () => {
        jq.raw(
            `{"foo": 1, "bar": 2, "deep": { "qux": 3 } }`,
            `.foo,`,
        );
      },
      /exit code/i,
    );
  });
});
*/

async function doJQTests(t, jq) {
  t.plan(9);

  t.ok(
    'json' in jq && typeof jq.json === 'function',
    "json() is a function",
  );

  t.ok(
    'raw' in jq && typeof jq.raw === 'function',
    "raw() is a function",
  );

  t.deepEquals(
      await jq.json(
      {a: 'a letter', b: 'other letter', '%': null},
      '[.a, .["%"]] | {res: .}'
      ),
      {res: ['a letter', null]}
  );

  t.equals(
      await jq.raw('["a", {"12": "üñìçôdẽ"}]', '.[1]["12"] | {"what?": .}'),
      `{\n  "what?": "üñìçôdẽ"\n}`
  );

  t.equals(
      await jq.json({message: 'This is an emoji test 🙏'}, '.message'),
      'This is an emoji test 🙏'
  );

  // get the exception, not the error
  const result = await jq.raw('invalid JSON', '.').then(result => null).catch(e => e);

  t.ok(
    result instanceof Error,
    "Invalid JSON triggers an exception.",
  );

  t.equals(
    await jq.raw('123', '.'),
    '123',
    "raw() works after invalid JSON.",
  );

  t.deepEqual(
    await jq.json([123], '.'),
    [123],
  );

  t.equals(
    await jq.raw(Number.MAX_SAFE_INTEGER + "000", '.'),
    Number.MAX_SAFE_INTEGER + "000",
    'Number that exceeds MAX_SAFE_INTEGER round-trips.',
  );
}
