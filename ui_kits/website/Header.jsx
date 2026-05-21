// Header.jsx — plantasia.space site header
// Exports: { SiteHeader }

function SiteHeader({ isAuth, isDark, onToggleSidebar, onNavigate, onToggleAuth }) {
  const CDN = 'https://herbarium.plantasia.space/assets';
  const logoSrc = isDark
    ? `${CDN}/logos/v2/2025/plantasia-space-white-transparent-background-512.svg`
    : `${CDN}/logos/v2/2025/plantasia-space-logo-black-transparent-background-512.svg`;

  return (
    <header className="ps-header">
      {/* Left */}
      <div className="ps-header-left">
        <button className="ps-icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="7" height="18" rx="1"/>
            <line x1="14" y1="7" x2="21" y2="7"/>
            <line x1="14" y1="12" x2="21" y2="12"/>
            <line x1="14" y1="17" x2="21" y2="17"/>
          </svg>
        </button>
        {isAuth && (
          <button className="ps-icon-btn" onClick={() => onNavigate('search')} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        )}
      </div>

      {/* Center: Logo */}
      <div className="ps-header-center">
        <a href="#" className="ps-logo-link"
          onClick={(e) => { e.preventDefault(); onNavigate(isAuth ? 'dashboard' : 'guest-home'); }}>
          <img src={logoSrc} alt="plantasia.space" />
        </a>
      </div>

      {/* Right */}
      <div className="ps-header-right">
        {isAuth ? (
          <>
            <button className="ps-icon-btn" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button
              onClick={onToggleAuth}
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'oklch(0.8982 0.1458 194.8698)',
                color: '#000', border: 'none', cursor: 'pointer',
                fontFamily: "'Orbit', sans-serif", fontWeight: 400, fontSize: '13px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="User menu"
            >J</button>
          </>
        ) : (
          <>
            <button className="ps-btn ps-btn-ghost" onClick={onToggleAuth}
              style={{ fontSize: '12px', height: '32px', padding: '0 12px' }}>
              Log in
            </button>
            <button className="ps-btn ps-btn-primary"
              style={{ fontSize: '12px', height: '32px', padding: '0 12px' }}>
              Sign up free
            </button>
          </>
        )}
        {/* Dark mode toggle */}
        <button className="ps-icon-btn" onClick={() => window.__toggleDark && window.__toggleDark()} aria-label="Toggle dark mode">
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

Object.assign(window, { SiteHeader });
