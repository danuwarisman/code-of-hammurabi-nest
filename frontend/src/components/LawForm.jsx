import { useState } from 'react';

export default function LawForm({ onAddLaw }) {
  const [pasalNum, setPasalNum] = useState('');
  const [caste, setCaste] = useState('Awilum');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [logic, setLogic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!pasalNum || !title || !text) {
      setErrorMessage('Nomor pasal, judul perkara, dan isi ketentuan hukum wajib diisi!');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddLaw({
        pasalNum: Number(pasalNum),
        caste,
        title,
        text,
        logic: logic || 'Ketentuan hukum resmi dari prasasti monolit Babilonia.',
        isActive: true,
      });

      setSuccessMessage(`Titah Pasal ${pasalNum} berhasil dipahat ke prasasti backend!`);
      setPasalNum('');
      setTitle('');
      setText('');
      setLogic('');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memahat titah hukum ke backend NestJS.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pahat-titah" className="card-babylon mb-5 p-4" style={{ borderColor: 'var(--gold)' }}>
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
        <h2 className="h5 text-gold font-monospace mb-0">Pahat Titah Hukum Baru ke Prasasti (POST)</h2>
        <span className="small text-muted font-monospace">NestJS REST API Connected</span>
      </div>

      {errorMessage && (
        <div className="alert alert-danger font-monospace small mb-3 py-2">
          ⚠️ <strong>Kesalahan:</strong> {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success font-monospace small mb-3 py-2 bg-dark text-success border border-success">
          ✓ {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <label className="form-label small text-gold font-monospace">Nomor Pasal (@IsInt, @Min(1))</label>
          <input
            type="number"
            className="form-control"
            style={{ backgroundColor: '#141312', color: '#e9e2d0', borderColor: 'rgba(200, 162, 74, 0.4)' }}
            placeholder="Misal: 48"
            value={pasalNum}
            onChange={(e) => setPasalNum(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small text-gold font-monospace">Status Kasta (@IsIn)</label>
          <select
            className="form-select"
            style={{ backgroundColor: '#141312', color: '#e9e2d0', borderColor: 'rgba(200, 162, 74, 0.4)' }}
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
          >
            <option value="Awilum">Awilum (Bangsawan)</option>
            <option value="Mushkenum">Mushkenum (Rakyat Jelata)</option>
            <option value="Wardum">Wardum (Budak)</option>
          </select>
        </div>

        <div className="col-md-5">
          <label className="form-label small text-gold font-monospace">Topik / Judul Titah (@MinLength(3))</label>
          <input
            type="text"
            className="form-control"
            style={{ backgroundColor: '#141312', color: '#e9e2d0', borderColor: 'rgba(200, 162, 74, 0.4)' }}
            placeholder="Misal: Moratorium Bunga Banjir"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label small text-gold font-monospace">Isi Ketentuan Pasal (@MinLength(5))</label>
          <textarea
            className="form-control"
            rows="2"
            style={{ backgroundColor: '#141312', color: '#e9e2d0', borderColor: 'rgba(200, 162, 74, 0.4)' }}
            placeholder="Tuliskan bunyi ketentuan hukum..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label small text-gold font-monospace">Logika Sosial &amp; Konteks (Opsional)</label>
          <input
            type="text"
            className="form-control"
            style={{ backgroundColor: '#141312', color: '#e9e2d0', borderColor: 'rgba(200, 162, 74, 0.4)' }}
            placeholder="Tafsir atau latar belakang sosial aturan ini..."
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
          />
        </div>

        <div className="col-12 text-end mt-3">
          <button
            type="submit"
            className="btn-hammurabi-gold py-2 px-4"
            disabled={isSubmitting}
          >
            <span>+</span> {isSubmitting ? 'Memahat...' : 'Tambahkan ke Monolit (POST)'}
          </button>
        </div>
      </form>
    </section>
  );
}
