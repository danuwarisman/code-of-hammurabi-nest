const API_BASE_URL = 'http://localhost:3001/laws';

export const lawsApi = {
  async getAll() {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Gagal mengambil data dari server (${res.status})`);
    }
    return res.json();
  },

  async getOne(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Data tidak ditemukan (${res.status})`);
    }
    return res.json();
  },

  async create(lawData) {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lawData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const message = Array.isArray(err.message)
        ? err.message.join('; ')
        : (err.message || `Gagal memahat titah (${res.status})`);
      throw new Error(message);
    }
    return res.json();
  },

  async update(id, updateData) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const message = Array.isArray(err.message)
        ? err.message.join('; ')
        : (err.message || `Gagal memperbarui titah (${res.status})`);
      throw new Error(message);
    }
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Gagal menghapus titah (${res.status})`);
    }
    return res.json();
  },
};
