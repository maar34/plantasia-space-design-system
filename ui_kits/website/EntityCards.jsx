// EntityCards.jsx — plantasia.space entity card components
// Exports: { TrackCard, OrbiterCard, WorldCard, CollectionCard, FeedGrid }

const ASSET_BASE = 'https://herbarium.plantasia.space/assets';
const ICON_URLS = {
  track:            `${ASSET_BASE}/symbols/v2/track.svg`,
  orbiter:          `${ASSET_BASE}/symbols/v2/orbiter.svg`,
  'entangled-world':`${ASSET_BASE}/symbols/v2/entangled-world.svg`,
  collection:       `${ASSET_BASE}/symbols/v2/collection.svg`,
  release:          `${ASSET_BASE}/symbols/v2/release.svg`,
  xplorer:          `${ASSET_BASE}/symbols/v2/xplorer.svg`,
};

const TRACK_COLORS   = ['oklch(0.78 0.12 350)','oklch(0.75 0.10 340)','oklch(0.72 0.14 355)'];
const WORLD_COLORS   = ['oklch(0.45 0.12 240)','oklch(0.40 0.10 230)','oklch(0.50 0.14 250)'];
const ORBITER_COLORS = ['oklch(0.62 0.14 165)','oklch(0.68 0.12 175)','oklch(0.58 0.16 155)'];
const COLL_COLORS    = ['oklch(0.8982 0.1458 194.87)','oklch(0.82 0.12 200)'];

/* ── Shared FourCornerCard wrapper ──────────────────────────── */
function FCC({ children, accentColor }) {
  const c = accentColor || 'currentColor';
  const corner = (pos) => {
    const isTop    = pos.includes('t');
    const isLeft   = pos.includes('l');
    const style = {
      position:'absolute', width:20, height:16,
      borderColor: c,
      ...(isTop    ? { top:0 }    : { bottom:0 }),
      ...(isLeft   ? { left:0 }   : { right:0 }),
      borderTopWidth:    isTop    ? 2 : 0,
      borderBottomWidth: isTop    ? 0 : 2,
      borderLeftWidth:   isLeft   ? 2 : 0,
      borderRightWidth:  isLeft   ? 0 : 2,
      borderStyle:'solid',
      borderRadius: isTop && isLeft ? '2px 0 0 0' : isTop ? '0 2px 0 0' : isLeft ? '0 0 0 2px' : '0 0 2px 0',
    };
    return <span style={style} />;
  };
  return (
    <div style={{ position:'relative', padding:'14px 18px', background:'var(--ps-card-bg, #fff)' }}>
      {corner('tl')}{corner('tr')}{corner('bl')}{corner('br')}
      {children}
    </div>
  );
}

/* ── Entity frame shapes (small thumbnail) ───────────────────── */
function EntityThumb({ color, shape, iconUrl }) {
  const base = { width:52, height:52, background:color, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' };
  const shapes = {
    circle:  { clipPath:'circle(50%)' },
    square:  {},
    diamond: { clipPath:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)' },
    hex:     { clipPath:'polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)' },
    world:   { borderRadius:8, border:'2px solid oklch(62.793% 0.25768 29.223)' },
  };
  return (
    <div style={{ ...base, ...shapes[shape] }}>
      {iconUrl && <img src={iconUrl} alt="" width="26" height="26" style={{ filter:'invert(1)', opacity:0.7 }} />}
    </div>
  );
}

/* ── Row layout ──────────────────────────────────────────────── */
function CardRow({ children, accent }) {
  return (
    <FCC accentColor={accent}>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        {children}
      </div>
    </FCC>
  );
}

function CardMeta({ badge, badgeColor, secondary }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:5 }}>
      <span style={{ display:'inline-flex', alignItems:'center', padding:'1px 7px', borderRadius:6, fontSize:10, fontWeight:500, background:badgeColor || 'oklch(0.6903 0.2708 340.88)', color:'#fff' }}>{badge}</span>
      {secondary && <span style={{ fontSize:10, opacity:0.4, fontFamily:"'JetBrains Mono',monospace" }}>{secondary}</span>}
    </div>
  );
}

function CardInfo({ title, sub, badge, badgeColor, secondary }) {
  return (
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontFamily:"'Orbit',sans-serif", fontSize:14, lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</div>
      {sub && <div style={{ fontSize:11, opacity:0.5, marginTop:2 }}>{sub}</div>}
      <CardMeta badge={badge} badgeColor={badgeColor} secondary={secondary} />
    </div>
  );
}

/* ── Individual cards ────────────────────────────────────────── */
function TrackCard({ title, artist, duration, colorIdx=0 }) {
  return (
    <CardRow accent="oklch(0.78 0.12 350)">
      <EntityThumb color={TRACK_COLORS[colorIdx % TRACK_COLORS.length]} shape="square" iconUrl={ICON_URLS.track} />
      <CardInfo title={title} sub={artist} badge="Audio" secondary={duration} />
      <button style={{ width:30, height:30, borderRadius:'50%', border:'none', background:'oklch(0.6903 0.2708 340.88)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
    </CardRow>
  );
}

function OrbiterCard({ title, colorIdx=0 }) {
  return (
    <CardRow accent="oklch(0.78 0.12 165)">
      <EntityThumb color={ORBITER_COLORS[colorIdx % ORBITER_COLORS.length]} shape="hex" iconUrl={ICON_URLS.orbiter} />
      <CardInfo title={title} badge="Orbiter" badgeColor="oklch(0.78 0.12 165)" />
    </CardRow>
  );
}

function WorldCard({ title, subtitle, colorIdx=0 }) {
  return (
    <CardRow accent="oklch(62.793% 0.25768 29.223)">
      <EntityThumb color={WORLD_COLORS[colorIdx % WORLD_COLORS.length]} shape="world" iconUrl={ICON_URLS['entangled-world']} />
      <CardInfo title={title} sub={subtitle} badge="Entangled World" badgeColor="oklch(0.78 0.10 230)" />
    </CardRow>
  );
}

function CollectionCard({ title, count, colorIdx=0 }) {
  return (
    <CardRow>
      <EntityThumb color={COLL_COLORS[colorIdx % COLL_COLORS.length]} shape="diamond" iconUrl={ICON_URLS.collection} />
      <CardInfo title={title} badge="Collection" badgeColor="oklch(0.8982 0.1458 194.87)" secondary={`${count} items`} />
    </CardRow>
  );
}

const FEED_DATA = [
  { type:'track',      title:'Mycelium Drift',        artist:'jasmine.moss',   duration:'4:32', colorIdx:0 },
  { type:'world',      title:'Kepler-442b',            subtitle:'A temperate world of slow currents',  colorIdx:0 },
  { type:'orbiter',    title:'Helix Voyager',          colorIdx:0 },
  { type:'track',      title:'Exo-Resonance',          artist:'maar34',         duration:'7:14', colorIdx:1 },
  { type:'collection', title:'Regenerative Currents',  count:12,  colorIdx:0 },
  { type:'world',      title:'55 Cancri e',            subtitle:'Molten shores, diamond rain', colorIdx:1 },
  { type:'track',      title:'Seed Scatter',           artist:'xplorer_01',     duration:'3:58', colorIdx:2 },
  { type:'orbiter',    title:'Spore Drifter',          colorIdx:1 },
];

function FeedGrid() {
  return (
    <div className="ps-feed-grid">
      {FEED_DATA.map((item, i) => {
        if (item.type === 'track')      return <TrackCard      key={i} {...item} />;
        if (item.type === 'world')      return <WorldCard      key={i} {...item} />;
        if (item.type === 'orbiter')    return <OrbiterCard    key={i} {...item} />;
        if (item.type === 'collection') return <CollectionCard key={i} {...item} />;
        return null;
      })}
    </div>
  );
}

Object.assign(window, { TrackCard, OrbiterCard, WorldCard, CollectionCard, FeedGrid });
