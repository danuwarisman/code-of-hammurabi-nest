import { useState } from 'react';

export default function LawEditModal({ law, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState(law?.title || '');
  const [caste, setCaste] = useState(law?.caste || 'Awilum');
  const [text, setText] = useState(law?.text || '');
  const [logic, setLogic] = useState(law?.logic || '');
  const [isActive, setIsActive] = useState(law?.isActive !== undefined ? law.isActive : true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !law) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await onSave(law.id, {
        title,
        caste,
        text,
        logic,
        isActive,
      });
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat memperbarui titah');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div
          className="modal-content card-babylon border-gold text-light"
          style={{
            backgroundColor: '#161413',
            border: '2px solid var(--gold)',
            boxShadow: '0 0 25px rgba(200, 162, 74, 0.3)',
          }}
        >
          <div className="modal-header border-secondary">
            <div>
              <span className="cylinder-seal me-2">{law.pasalNum}</span>
              <h5 className="modal-title text-gold font-monospace d-inline">
                Perbarui Titah Hukum Pasal {law.pasalNum} (PATCH)
              </h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Tutup"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {errorMsg && (
                <div className="alert alert-danger font-monospace small mb-3">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label small text-gold font-monospace">
                    Judul Perkara / Topik Titah
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: '#141312',
                      color: '#e9e2d0',
                      borderColor: 'rgba(200, 162, 74, 0.4)',
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small text-gold font-monospace">
                    Status Kasta
                  </label>
                  <select
                    className="form-select"
                    style={{
                      backgroundColor: '#141312',
                      color: '#e9e2d0',
                      borderColor: 'rgba(200, 162, 74, 0.4)',
                    }}
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                  >
                    <option value="Awilum">Awilum (Bangsawan)</option>
                    <option value="Mushkenum">Mushkenum (Rakyat Jelata)</option>
                    <option value="Wardum">Wardum (Budak)</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small text-gold font-monospace">
                    Bunyi Ketentuan Hukum
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    style={{
                      backgroundColor: '#141312',
                      color: '#e9e2d0',
                      borderColor: 'rgba(200, 162, 74, 0.4)',
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small text-gold font-monospace">
                    Logika Sosial &amp; Konteks Peradilan
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    style={{
                      backgroundColor: '#141312',
                      color: '#e9e2d0',
                      borderColor: 'rgba(200, 162, 74, 0.4)',
                    }}
                    value={logic}
                    onChange={(e) => setLogic(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActiveCheckbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      style={{
                        backgroundColor: isActive ? 'var(--gold)' : '#141312',
                        borderColor: 'var(--gold)',
                      }}
                    />
                    <label
                      className="form-check-label small text-light"
                      htmlFor="isActiveCheckbox"
                    >
                      Status Titah Berlaku Aktif di Kekaisaran (isActive = true)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-sm btn-hammurabi-outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-hammurabi-gold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Pembaharuan (PATCH)'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
