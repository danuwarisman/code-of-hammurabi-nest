export default function LawCard({ law, onDeleteLaw, onEditLaw }) {
  const casteBadgeClass =
    law.caste === 'Awilum'
      ? 'social-tag-awilum'
      : law.caste === 'Mushkenum'
      ? 'social-tag-mushkenum'
      : 'social-tag-wardum';

  return (
    <div className="col-lg-6" id={`pasal-${law.pasalNum}`}>
      <div className="card-babylon h-100 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="cylinder-seal">{law.pasalNum}</span>
            <span className={`social-tag ${casteBadgeClass}`}>{law.caste}</span>
          </div>
          {law.isActive !== undefined && (
            <span
              className={`badge font-monospace ${
                law.isActive ? 'bg-success' : 'bg-secondary'
              }`}
              style={{ fontSize: '0.7rem' }}
            >
              {law.isActive ? 'Berlaku' : 'Arsip'}
            </span>
          )}
        </div>

        <h3 className="h5 text-gold mb-2">{law.title}</h3>
        <p className="fst-italic text-light mb-3">"{law.text}"</p>

        {/* Accordion Penjelasan & Logika Sosial Khas Babilonia */}
        <details className="explanation-details mt-auto" open>
          <summary className="explanation-summary">
            <span>Logika Sosial &amp; Konteks Peradilan</span>
          </summary>
          <div className="explanation-content small">
            {law.logic || 'Ketentuan hukum resmi dari prasasti monolit Babilonia.'}
          </div>
        </details>

        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
          <span className="small text-muted font-monospace" style={{ fontSize: '0.72rem' }}>
            ID: #{law.id}
          </span>
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => onEditLaw(law)}
              className="btn btn-sm btn-hammurabi-outline"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
              title="Perbarui titah hukum ini via PATCH"
            >
              ✏️ Ubah Titah
            </button>
            <button
              type="button"
              onClick={() => onDeleteLaw(law.id)}
              className="btn btn-sm btn-outline-danger"
              style={{ fontSize: '0.75rem', borderColor: '#a4552f', color: '#e69375', padding: '0.2rem 0.6rem' }}
              title="Hapus titah ini dari monolit via DELETE"
            >
              🗑️ Hapus Titah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
