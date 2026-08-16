import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../server.js', import.meta.url), 'utf8');

test('server exports the app and only binds a port locally', () => {
  assert.match(source, /if\s*\(\s*!process\.env\.VERCEL\s*\)/, 'Expected a Vercel guard before app.listen()');
  assert.match(source, /app\.listen\s*\(/, 'Expected a local listener for development startup');
  assert.match(source, /export default app;/, 'Expected the app to be exported for Vercel');
});
