import api from "@/lib/api";

function normalizeItem(item) {
  return { ...item, id: item._id };
}

export async function getItems() {
  const { data } = await api.get("/pantry");
  return (data || []).map(normalizeItem);
}

export async function addItem(body) {
  const { data } = await api.post("/pantry", body);
  return normalizeItem(data);
}

export async function updateItem(id, body) {
  const { data } = await api.put(`/pantry/${id}`, body);
  return normalizeItem(data);
}

export async function deleteItem(id) {
  const { data } = await api.delete(`/pantry/${id}`);
  return data;
}

export async function addItemsBulk(items) {
  const { data } = await api.post("/pantry/bulk", { items });
  return (data || []).map(normalizeItem);
}

export async function scanImage(formData) {
  const { data } = await api.post("/pantry/scan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}


