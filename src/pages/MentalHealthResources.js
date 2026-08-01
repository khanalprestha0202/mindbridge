import resources from '../data/resources';

function ResourceCard({ resource }) {
  return (
    <a href={resource.url} target="_blank" rel="noreferrer" style={{
      background: 'white', borderRadius: '12px', textDecoration: 'none',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb',
      overflow: 'hidden',
    }}>
      <div style={{ height: '4px', background: resource.headerBg }} />

      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '64px', height: '44px', borderRadius: '8px',
            background: resource.logoBg || resource.headerBg, padding: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden', border: '1px solid #f0f0f0',
          }}>
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(resource.url).hostname}&sz=64`}
              alt={resource.name}
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#111827', lineHeight: '1.3' }}>
                {resource.name}
              </h3>
              <span style={{
                background: resource.headerBg, color: 'white',
                fontSize: '10px', fontWeight: '700', padding: '2px 7px',
                borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {resource.badge}
              </span>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {resource.tag}
            </p>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
          {resource.desc}
        </p>
      </div>

      <div style={{
        padding: '10px 20px', borderTop: '1px solid #f3f4f6', background: '#fafafa',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{resource.who}</span>
        <span style={{
          background: resource.headerBg, color: 'white',
          fontSize: '11px', fontWeight: '700', padding: '5px 12px', borderRadius: '6px',
        }}>
          {resource.cta} →
        </span>
      </div>
    </a>
  );
}

export default function MentalHealthResources() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f9fafb' }}>

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '36px 32px' }}>
        <div style={{ maxWidth: '680px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            You are not alone 💙
          </p>
          <h1 style={{ margin: '0 0 14px', fontSize: '26px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px', lineHeight: '1.3' }}>
            Mental Health Support Resources
          </h1>
          <p style={{ margin: '0 0 20px', color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: '1.75' }}>
            University life can be overwhelming deadlines, homesickness, financial pressure, loneliness. Whatever you are going through right now, support is available and you deserve to access it.
          </p>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.7' }}>
            Every service listed below is <strong style={{ color: 'white' }}>completely free</strong>, <strong style={{ color: 'white' }}>confidential</strong> and available to all university students in the UK whether you are a home student, an international student or studying on an EU visa. You do not need a GP referral for most of them. Just reach out.
          </p>
        </div>
      </div>

      <div style={{ padding: '26px 32px' }}>

        {/* Section heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#374151' }}>
            All Services ({resources.length})
          </h2>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Click any card to visit the official website</span>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>

        {/* Disclaimer only */}
        <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '14px 20px', border: '1px solid #bfdbfe' }}>
          <p style={{ margin: '0 0 3px', fontSize: '12px', fontWeight: '700', color: '#1d4ed8' }}>Important</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#374151', lineHeight: '1.6' }}>
            MindBridge is a support navigation tool not a clinical service. All organisations listed are verified official UK mental health services. Not a substitute for professional care. In a medical emergency always call <strong>999</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}