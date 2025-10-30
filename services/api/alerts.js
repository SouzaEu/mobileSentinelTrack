import javaApi from './javaClient';

export async function getAlerts({
  status = 'OPEN',
  limit = 50,
  offset = 0,
} = {}) {
  const params = {};
  if (status && status !== 'ALL') params.status = status;
  if (limit != null) params.limit = limit;
  if (offset != null) params.offset = offset;
  const { data } = await javaApi.get('/alertas', { params });
  return data?.items || [];
}

export async function resolveAlert(alertId, { resolvedBy, note } = {}) {
  if (!alertId) throw new Error('alertId é obrigatório');
  const payload = { status: 'RESOLVED' };
  if (resolvedBy) payload.resolvedBy = resolvedBy;
  if (note) payload.note = note;
  const { data } = await javaApi.patch(
    `/alertas/${encodeURIComponent(alertId)}/resolver`,
    payload
  );
  return data;
}

export async function registerPushToken({ userId, token, platform }) {
  if (!token) throw new Error('token de push é obrigatório');
  const body = {
    userId: userId || 'demo-user',
    token,
    platform: platform || 'android',
  };
  const { data } = await javaApi.post('/devices/register', body);
  return data;
}

export default { getAlerts, resolveAlert, registerPushToken };
