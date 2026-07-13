export function buildSignalRequest(event, sessionHash = '') {
  if (event === 'visitor') return { p_event: 'visitor', p_session_hash: null };
  const identity = typeof sessionHash === 'string' ? sessionHash.trim() : '';
  if (event === 'question' && /^[a-f0-9]{64}$/.test(identity)) {
    return { p_event: 'question', p_session_hash: identity };
  }
  return null;
}

export async function hashSessionId(sessionId) {
  const value = typeof sessionId === 'string' ? sessionId.trim() : '';
  if (!value) return '';
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function emitSuiteSignal(env, event, sessionHash = '') {
  const body = buildSignalRequest(event, sessionHash);
  if (!body || !env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY || !env.AZIANA_SUITE_TOKEN) return;
  try {
    const base = env.SUPABASE_URL.replace(/\/$/, '');
    await fetch(`${base}/rest/v1/rpc/emit_aziana_suite_alert`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
        'X-Aziana-Suite-Token': env.AZIANA_SUITE_TOKEN,
      },
      body: JSON.stringify(body),
    });
  } catch {
    // Notification delivery is best-effort and cannot affect the public site.
  }
}
