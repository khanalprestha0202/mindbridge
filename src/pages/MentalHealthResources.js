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
            background: resource.logoBg, padding: '6px',
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

      <div style={{ background: 'white', padding: '26px 32px', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#111827' }}>
          Mental Health Support Resources
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', lineHeight: '1.65', maxWidth: '600px' }}>
          Free, verified support services for all university students in the UK.
          Every service here is confidential and costs nothing to use.
        </p>
      </div>

      <div style={{ padding: '26px 32px' }}>

        <div style={{
          background: '#7F0000', borderRadius: '12px', padding: '20px 24px',
          marginBottom: '28px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px',
        }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              IN A CRISIS RIGHT NOW?
            </p>
            <p style={{ margin: '0 0 3px', fontSize: '20px', fontWeight: '900', color: 'white' }}>
              Call Samaritans — 116 123
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
              Free · 24 hours a day · 7 days a week · Completely confidential
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a href="https://www.samaritans.org" target="_blank" rel="noreferrer" style={{ background: 'white', color: '#7F0000', fontWeight: '800', fontSize: '13px', padding: '9px 18px', borderRadius: '8px', textDecoration: 'none' }}>
              📞 Call 116 123
            </a>
            <a href="https://www.giveusashout.org" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '700', fontSize: '13px', padding: '9px 16px', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              💬 Text SHOUT to 85258
            </a>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '700', fontSize: '13px', padding: '9px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              🚑 Emergency — 999
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#374151' }}>
            All Services ({resources.length})
          </h2>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Click any card to visit the official website</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '22px 26px', border: '1px solid #e5e7eb', marginBottom: '18px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#111827' }}>
            Key Helpline Numbers
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px' }}>
            {[
              { name: 'Samaritans', number: '116 123', note: 'Free · 24/7 · Call', color: '#007A3D', url: 'https://www.samaritans.org' },
              { name: 'Shout Crisis Text', number: 'Text SHOUT to 85258', note: 'Free · 24/7 · Text', color: '#3D1152', url: 'https://www.giveusashout.org' },
              { name: 'CALM Helpline', number: '0800 58 58 58', note: 'Free · 5pm–midnight', color: '#1C0A3C', url: 'https://www.thecalmzone.net' },
              { name: 'Mind Infoline', number: '0300 123 3393', note: 'Mon–Fri · 9am–6pm', color: '#1B3668', url: 'https://www.mind.org.uk' },
              { name: 'NHS 111', number: '111', note: 'Urgent medical · 24/7', color: '#005EB8', url: 'https://111.nhs.uk' },
              { name: 'Emergency Services', number: '999', note: 'Life-threatening only', color: '#111827', url: '#' },
            ].map(item => (
              <a key={item.name} href={item.url} target="_blank" rel="noreferrer" style={{ borderRadius: '8px', padding: '14px 16px', borderLeft: `4px solid ${item.color}`, background: '#f9fafb', textDecoration: 'none', display: 'block' }}>
                <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>{item.name}</p>
                <p style={{ margin: '0 0 3px', fontSize: '16px', fontWeight: '900', color: item.color, letterSpacing: '0.3px' }}>{item.number}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{item.note}</p>
              </a>
            ))}
          </div>
        </div>

        <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '14px 20px', border: '1px solid #bfdbfe' }}>
          <p style={{ margin: '0 0 3px', fontSize: '12px', fontWeight: '700', color: '#1d4ed8' }}>Important</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#374151', lineHeight: '1.6' }}>
            MindBridge is a support navigation tool — not a clinical service. All organisations listed are verified official UK mental health services. Not a substitute for professional care. In a medical emergency always call <strong>999</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}