import { api } from './client';

export async function getAlerts({
  status = 'OPEN',
  limit = 50,
  offset = 0,
} = {}) {
  const params = { status, limit, offset };
  const { data } = await api.get('/mobile/alertas', { params });
  return data?.items || [];
}

export async function resolveAlert(alertId, { resolvedBy, note } = {}) {
  const payload = { status: 'RESOLVED', resolvedBy, note };
  const { data } = await api.patch(
    `/mobile/alertas/${encodeURIComponent(alertId)}/resolver`,
    payload
  );
  return data;
}

export async function registerPushToken({ userId, token, platform }) {
  const body = { userId, token, platform };
  const { data } = await api.post('/mobile/devices/register', body);
  return data;
}

export default { getAlerts, resolveAlert, registerPushToken };
