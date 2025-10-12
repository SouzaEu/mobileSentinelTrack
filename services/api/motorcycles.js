import { api } from "./client";
import { isUuid } from "./validators";

export async function createMotorcycle({ motorcycleId, sectorId, licensePlate, model, brand, color, year }) {
  if (!isUuid(motorcycleId) || !isUuid(sectorId)) {
    throw { message: "motorcycleId e sectorId devem ser UUID válidos." };
  }
  const payload = { 
    motorcycleId, 
    sectorId,
    licensePlate,
    model,
    brand,
    color,
    year: year ? parseInt(year) : null
  };
  const { data } = await api.post("/Motorcycles", payload);
  return data;
}

export async function listMotorcycles() {
  const { data } = await api.get("/Motorcycles");
  // desembrulhar { items: [{ data }], ... } -> []
  const list = Array.isArray(data?.items)
    ? data.items.map((it) => it?.data ?? it)
    : Array.isArray(data)
    ? data
    : [];
  return list;
}

export async function getMotorcycle(motorcycleId) {
  if (!isUuid(motorcycleId)) {
    throw { message: "motorcycleId deve ser um UUID válido." };
  }
  const { data } = await api.get(`/Motorcycles/${motorcycleId}`);
  return data;
}

export async function updateMotorcycle(motorcycleId, updateData) {
  if (!isUuid(motorcycleId)) {
    throw { message: "motorcycleId deve ser um UUID válido." };
  }
  const { data } = await api.put(`/Motorcycles/${motorcycleId}`, updateData);
  return data;
}

export async function deleteMotorcycle(motorcycleId) {
  if (!isUuid(motorcycleId)) {
    throw { message: "motorcycleId deve ser um UUID válido." };
  }
  const { data } = await api.delete(`/Motorcycles/${motorcycleId}`);
  return data;
}

export async function moveMotorcycle(motorcycleId, newSectorId) {
  if (!isUuid(motorcycleId) || !isUuid(newSectorId)) {
    throw { message: "motorcycleId e newSectorId devem ser UUID válidos." };
  }
  const { data } = await api.patch(`/Motorcycles/${motorcycleId}/move`, { sectorId: newSectorId });
  return data;
}
