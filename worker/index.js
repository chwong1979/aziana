const VERSION = '0.4.5';

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

function isHealth(url) {
  return url.pathname === '/api/health';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && isHealth(url)) {
      return json({ ok: true });
    }

    if (request.method === 'GET' && isHealth(url)) {
      return json({
        ok: true,
        app: 'aziana',
        version: VERSION,
        site: 'https://aziana.sx',
      });
    }

    return env.ASSETS.fetch(request);
  },
};
