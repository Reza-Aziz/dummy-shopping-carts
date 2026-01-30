import "./MaintenancePage.css";

function MaintenancePage() {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="maintenance-icon">🔧</div>
        <h1>Sedang dalam Pemeliharaan</h1>
        <p>Kami sedang melakukan pemeliharaan sistem untuk memberikan layanan terbaik kepada Anda.</p>
        <p className="maintenance-subtitle">Silakan kembali lagi dalam beberapa saat.</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default MaintenancePage;
