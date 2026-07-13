-- Aziana's narrow, server-only producer for PortalOS's shared notification inbox.
-- The Worker supplies a secret bearer value; only its SHA-256 digest is stored here.

create or replace function public.emit_aziana_suite_alert(
  p_event text,
  p_session_hash text default null
)
returns integer
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_headers jsonb := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  v_token text := coalesce(v_headers ->> 'x-aziana-suite-token', '');
  v_now timestamptz := clock_timestamp();
  v_dedupe_key text;
  v_inserted integer := 0;
begin
  if encode(extensions.digest(v_token, 'sha256'), 'hex') <> '6c02bf133f08f63a11dfd8833edc3d4025009e131fd14be75f251bd86a66d5e2' then
    raise insufficient_privilege using message = 'invalid suite producer token';
  end if;

  if p_event = 'visitor' then
    v_dedupe_key := 'aziana:visitor:' || to_char(v_now at time zone 'UTC', 'YYYY-MM-DD"T"HH24');
    insert into public.agent_alerts (
      user_id, app, kind, severity, symbol, title, body, source, status,
      category, action_url, action_label, dedupe_key, meta
    )
    select
      membership.user_id, 'aziana', 'alert', 'info', 'A',
      'Visitor active on Aziana', 'A visitor is active on the Aziana website.',
      'aziana', 'open', 'visitor', 'https://aziana.sx/', 'Open Aziana',
      v_dedupe_key, jsonb_build_object('tenant_id', 'aziana')
    from kernel.membership
    where membership.tenant_id = 'aziana' and membership.role = 'owner'
    on conflict do nothing;
  elsif p_event = 'question' then
    if p_session_hash is null or p_session_hash !~ '^[a-f0-9]{64}$' then
      raise invalid_parameter_value using message = 'invalid session hash';
    end if;
    v_dedupe_key := 'aziana:question:' || left(p_session_hash, 24) || ':' || to_char(v_now at time zone 'UTC', 'YYYY-MM-DD');
    insert into public.agent_alerts (
      user_id, app, kind, severity, symbol, title, body, source, status,
      category, action_url, action_label, dedupe_key, meta
    )
    select
      membership.user_id, 'aziana', 'alert', 'watch', 'A',
      'Visitor asked Azai a question', 'A visitor used the Azai assistant on the Aziana website.',
      'aziana', 'open', 'visitor', 'https://ai.odarius.com/', 'Open AIOS',
      v_dedupe_key, jsonb_build_object('tenant_id', 'aziana')
    from kernel.membership
    where membership.tenant_id = 'aziana' and membership.role = 'owner'
    on conflict do nothing;
  else
    raise invalid_parameter_value using message = 'unsupported suite event';
  end if;

  get diagnostics v_inserted = row_count;
  return v_inserted;
end;
$function$;

revoke all on function public.emit_aziana_suite_alert(text, text) from public;
grant execute on function public.emit_aziana_suite_alert(text, text) to anon, service_role;

comment on function public.emit_aziana_suite_alert(text, text) is
  'Authenticated Aziana Worker producer for generic, owner-scoped Suite alerts; never accepts question text or visitor identity.';
