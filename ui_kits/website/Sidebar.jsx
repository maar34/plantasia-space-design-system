// Sidebar.jsx — plantasia.space sidebar + mobile nav
// Exports: { AppSidebar, MobileNav }

const CDN = 'https://herbarium.plantasia.space/assets';
const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Home',             icon: `${CDN}/symbols/v2/home.svg` },
  { id: 'xplorer',     label: 'xPlorer',          icon: `${CDN}/symbols/v2/xplorer.svg` },
  { id: 'release',     label: 'Release',          icon: `${CDN}/symbols/v2/release.svg` },
  { id: 'tracks',      label: 'Audios',           icon: `${CDN}/symbols/v2/track.svg` },
  { id: 'orbiters',    label: 'Orbiters',         icon: `${CDN}/symbols/v2/orbiter.svg` },
  { id: 'worlds',      label: 'Entangled Worlds', icon: `${CDN}/symbols/v2/entangled-world.svg` },
  { id: 'collections', label: 'Collections',      icon: `${CDN}/symbols/v2/collection.svg` },
];

const NAV_SECONDARY = [
  { id: 'settings', label: 'Settings', icon: null },
  { id: 'support',  label: 'Support',  icon: null },
];

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function AppSidebar({ screen, onNavigate, collapsed }) {
  return (
    <aside className={`ps-sidebar scrollbar-thin ${collapsed ? 'collapsed' : 'expanded'}`}>
      <nav className="ps-sidebar-nav">
        {NAV_ITEMS.map(item => (
          <a key={item.id}
            className={`ps-nav-item ${screen === item.id ? 'active' : ''}`}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
          >
            <img src={item.icon} alt={item.label} width="18" height="18" />
            <span className="ps-nav-label">{item.label}</span>
          </a>
        ))}

        <div style={{ flex: 1 }} />

        <div className="ps-sidebar-section-label">More</div>
        {NAV_SECONDARY.map(item => (
          <a key={item.id} className="ps-nav-item" href="#" onClick={(e) => e.preventDefault()}>
            {item.id === 'settings' ? <SettingsIcon /> : <SupportIcon />}
            <span className="ps-nav-label">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* User footer */}
      {!collapsed && (
        <div className="ps-sidebar-footer">
          <div className="ps-nav-item" style={{ cursor: 'default' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: 'oklch(0.8982 0.1458 194.8698)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Orbit', sans-serif", fontSize: '12px', color: '#000',
            }}>J</div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Jasmine Moss</div>
              <div style={{ fontSize: '10px', opacity: 0.5 }}>@jasmine · Bloom</div>
            </div>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="ps-sidebar-footer" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'oklch(0.8982 0.1458 194.8698)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Orbit', sans-serif", fontSize: '12px', color: '#000',
            cursor: 'pointer',
          }}>J</div>
        </div>
      )}
    </aside>
  );
}

function MobileNav({ screen, onNavigate }) {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav className="ps-mobile-nav">
      {items.map(item => (
        <a key={item.id}
          className={`ps-mob-item ${screen === item.id ? 'active' : ''}`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
        >
          <img src={item.icon} alt={item.label} width="20" height="20" />
          <span>{item.label === 'Entangled Worlds' ? 'Worlds' : item.label}</span>
        </a>
      ))}
    </nav>
  );
}

Object.assign(window, { AppSidebar, MobileNav });
