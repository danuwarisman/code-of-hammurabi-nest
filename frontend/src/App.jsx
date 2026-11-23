import { useState, useEffect } from 'react';
import './css/bootstrap.min.css';
import './css/theme.css';

import Navbar from './components/Navbar';
import HeroStele from './components/HeroStele';
import CasteOverview from './components/CasteOverview';
import JudgeSimulator from './components/JudgeSimulator';
import LawForm from './components/LawForm';
import LawList from './components/LawList';
import LawEditModal from './components/LawEditModal';
import ScrollFeatures from './components/ScrollFeatures';
import { lawsApi } from './api/lawsApi';

export default function App() {
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);
  const [notification, setNotification] = useState(null);

  // State untuk modal edit (PATCH)
  const [selectedLawForEdit, setSelectedLawForEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Muat data dari NestJS backend (GET /laws)
  const reloadLaws = async () => {
    setLoading(true);
    setBackendError(null);
    try {
      const data = await lawsApi.getAll();
      setLaws(data);
    } catch (err) {
      setBackendError(err.message || 'Gagal tersambung ke backend NestJS (port 3000)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    lawsApi
      .getAll()
      .then((data) => {
        if (!ignore) {
          setLaws(data);
          setBackendError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setBackendError(err.message || 'Gagal tersambung ke backend NestJS (port 3000)');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Tambah titah (POST /laws)
  const handleAddLaw = async (newLawData) => {
    const created = await lawsApi.create(newLawData);
    setLaws((prev) => [created, ...prev.filter((l) => l.id !== created.id)]);
    showToast(`Titah Pasal ${created.pasalNum} berhasil ditambahkan ke prasasti (POST 201 Created)!`);
    return created;
  };

  // Buka modal edit
  const handleOpenEdit = (law) => {
    setSelectedLawForEdit(law);
    setIsEditModalOpen(true);
  };

  // Simpan pembaharuan (PATCH /laws/:id)
  const handleSaveUpdate = async (id, updatePayload) => {
    const updated = await lawsApi.update(id, updatePayload);
    setLaws((prev) => prev.map((law) => (law.id === id ? updated : law)));
    showToast(`Titah Pasal ${updated.pasalNum} berhasil diperbarui (PATCH 200 OK)!`);
    return updated;
  };

  // Hapus titah (DELETE /laws/:id)
  const handleDeleteLaw = async (id) => {
    const target = laws.find((l) => l.id === id);
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus Titah Pasal ${target?.pasalNum || id} dari prasasti monolit?`
    );
    if (!confirmDelete) return;

    try {
      await lawsApi.remove(id);
      setLaws((prev) => prev.filter((law) => law.id !== id));
      showToast(`Titah Pasal ${target?.pasalNum || id} berhasil dihapus dari prasasti (DELETE 200 OK)!`, 'warning');
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  const awilumCount = laws.filter((l) => l.caste === 'Awilum').length;
  const mushkenumCount = laws.filter((l) => l.caste === 'Mushkenum').length;
  const wardumCount = laws.filter((l) => l.caste === 'Wardum').length;

  return (
    <>
      <ScrollFeatures />
      <Navbar />

      {/* Bar Notifikasi / Toast */}
      {notification && (
        <div
          className={`position-fixed top-0 end-0 p-3 m-3 alert alert-${notification.type} shadow font-monospace`}
          style={{ zIndex: 9999, maxWidth: '420px', border: '1px solid var(--gold)' }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span>{notification.message}</span>
            <button
              type="button"
              className="btn-close ms-2"
              onClick={() => setNotification(null)}
              aria-label="Tutup"
            />
          </div>
        </div>
      )}

      <main className="py-5">
        <div className="container">
          {/* Status Koneksi Backend Banner */}
          <div className="mb-4 d-flex justify-content-between align-items-center p-3 card-babylon border-gold flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span
                className="badge rounded-circle p-2"
                style={{ backgroundColor: backendError ? '#e74c3c' : '#2ecc71' }}
              />
              <span className="font-monospace small text-sandstone">
                Status Backend:{' '}
                {backendError ? (
                  <strong className="text-danger">Terputus ({backendError})</strong>
                ) : (
                  <strong className="text-success">Terhubung ke NestJS API (http://localhost:3001/laws)</strong>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={reloadLaws}
              className="btn btn-sm btn-hammurabi-outline py-1 px-3"
            >
              🔄 Sinkronkan Ulang Data
            </button>
          </div>

          <HeroStele />

          <CasteOverview
            total={laws.length}
            awilumCount={awilumCount}
            mushkenumCount={mushkenumCount}
            wardumCount={wardumCount}
          />

          <JudgeSimulator onAdoptVerdict={handleAddLaw} />

          <LawForm onAddLaw={handleAddLaw} />

          {loading ? (
            <div className="card-babylon text-center py-5 mb-5">
              <div className="spinner-border text-gold mb-3" role="status" />
              <p className="text-sandstone font-monospace mb-0">
                Memuat prasasti hukum dari NestJS backend...
              </p>
            </div>
          ) : (
            <LawList
              laws={laws}
              onDeleteLaw={handleDeleteLaw}
              onEditLaw={handleOpenEdit}
            />
          )}
        </div>
      </main>

      {isEditModalOpen && selectedLawForEdit && (
        <LawEditModal
          key={selectedLawForEdit.id}
          law={selectedLawForEdit}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedLawForEdit(null);
          }}
          onSave={handleSaveUpdate}
        />
      )}

      <footer className="site-footer py-4 mt-5 border-top border-secondary text-center small text-muted">
        <div className="container">
          <p className="mb-1 text-sandstone font-monospace">
            The Code of Hammurabi · Fullstack NestJS + React · Arsitektur MVC &amp; RESTful CRUD
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
            Prasasti Diorit Hitam Abad ke-18 SM · R.F. Harper Translation &amp; Analisis Sosial Babilonia
          </p>
        </div>
      </footer>
    </>
  );
}
