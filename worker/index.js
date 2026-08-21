import {
  emitSuiteSignal,
  hashSessionId,
} from './notifications.js';

const VERSION = '0.9.7';
const ADVISOR_URL = 'https://ai.odarius.com/public/advisor';
const MAX_ADVISOR_BYTES = 32 * 1024;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}

function isApi(url, path) {
  return url.pathname === path;
}

function isSameOrigin(request, url) {
  const origin = request.headers.get('Origin');
  return !origin || origin === url.origin;
}

async function readAdvisorRequest(request) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_ADVISOR_BYTES) return null;
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_ADVISOR_BYTES) return null;
  try {
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || typeof body.message !== 'string') return null;
    return { text, body };
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && isApi(url, '/api/health')) {
      return json({ ok: true });
    }

    if (request.method === 'GET' && isApi(url, '/api/health')) {
      return json({
        ok: true,
        app: 'aziana',
        version: VERSION,
        site: 'https://aziana.sx',
      });
    }

    if (request.method === 'POST' && isApi(url, '/api/visitor')) {
      if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
      ctx.waitUntil(emitSuiteSignal(env, 'visitor'));
      return json({ ok: true }, 202);
    }

    if (request.method === 'POST' && isApi(url, '/api/advisor')) {
      if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
      const advisorRequest = await readAdvisorRequest(request);
      if (!advisorRequest) return json({ ok: false, error: 'invalid_request' }, 400);
      let response;
      try {
        response = await fetch(ADVISOR_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: advisorRequest.text,
        });
      } catch {
        return json({ ok: false, error: 'advisor_unavailable' }, 502);
      }
      if (response.ok) {
        ctx.waitUntil((async () => {
          const sessionHash = await hashSessionId(advisorRequest.body.session_id);
          await emitSuiteSignal(env, 'question', sessionHash);
        })());
      }
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'no-store');
      headers.delete('Access-Control-Allow-Origin');
      return new Response(response.body, { status: response.status, headers });
    }

    return env.ASSETS.fetch(request);
  },
};
