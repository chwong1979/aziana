import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSignalRequest, hashSessionId } from './notifications.js';

test('visitor signal contains no visitor identity or page data', () => {
  assert.deepEqual(buildSignalRequest('visitor'), {
    p_event: 'visitor',
    p_session_hash: null,
  });
});

test('question signal accepts only a complete SHA-256 session identity', () => {
  const hash = 'abcdef01'.repeat(8);
  assert.deepEqual(buildSignalRequest('question', hash), {
    p_event: 'question',
    p_session_hash: hash,
  });
  assert.equal(buildSignalRequest('question', 'raw-session-id'), null);
  assert.equal(buildSignalRequest('question', ''), null);
});

test('session hashing is stable and does not expose the source identifier', async () => {
  const first = await hashSessionId('private-session-id');
  const second = await hashSessionId('private-session-id');
  assert.equal(first, second);
  assert.equal(first.length, 64);
  assert.equal(first.includes('private-session-id'), false);
});

test('unknown events are rejected', () => {
  assert.equal(buildSignalRequest('order'), null);
});
