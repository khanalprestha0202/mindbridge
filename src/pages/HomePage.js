export default function HomePage({ user, mood, onSelectMood, setActiveTab }) {
  const moods = [
    { e: '😔', l: 'Very Low', v: 1, color: '#6B7280' },
    { e: '😕', l: 'Not Great', v: 2, color: '#F59E0B' },
    { e: '😐', l: 'Okay', v: 3, color: '#3B82F6' },
    { e: '🙂', l: 'Good', v: 4, color: '#10B981' },
    { e: '😊', l: 'Great', v: 5, color: '#8B5CF6' },
  ];

  const time = new Date().getHours();
  const greeting = time < 12 ? 'Good morning' : time < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Welcome banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '32px', color: 'white' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: '800' }}>
          {greeting}, {firstName}! 👋
        </h1>
        <p style={{ margin: 0, fontSize: '15px', opacity: 0.8 }}>
          Welcome to MindBridge — your mental health companion for university students in the UK
        </p>
      </div>

      <div style={{ padding: '28px 32px' }}>

        {/* Mood check-in */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>
            {mood ? `Today you are feeling ${mood}` : 'How are you feeling today?'}
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#6b7280' }}>
            {mood ? 'You can update your mood or start chatting below' : 'Select your mood to get started — this helps MindBridge personalise your experience'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            {moods.map(m => (
              <button key={m.v} onClick={() => onSelectMood(m.l, m.v)} style={{
                border: mood === m.l ? `2px solid ${m.color}` : '2px solid #e5e7eb',
                borderRadius: '14px', padding: '16px 12px', cursor: 'pointer',
                background: mood === m.l ? '#f8f9fc' : 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                minWidth: '90px', flex: 1, maxWidth: '110px',
                transform: mood === m.l ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.15s',
                boxShadow: mood === m.l ? `0 4px 16px ${m.color}30` : 'none',
              }}>
                <span style={{ fontSize: '32px' }}>{m.e}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: mood === m.l ? m.color : '#6b7280' }}>{m.l}</span>
              </button>
            ))}
          </div>
          {mood && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setActiveTab('chat')} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 28px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 16px rgba(46,117,182,0.3)' }}>
                💬 Start Chat Support →
              </button>
            </div>
          )}
        </div>

        {/* Quick access */}
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#0f2744' }}>Quick Access</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { icon: '💬', title: 'Chat Support', desc: 'Talk to MindBridge', tab: 'chat', color: '#2E75B6', bg: '#EBF3FB' },
            { icon: '📊', title: 'Mood Tracker', desc: 'Log and track your mood', tab: 'mood', color: '#10B981', bg: '#ECFDF5' },
            { icon: '🏥', title: 'Mental Health Resources', desc: 'Free NHS services', tab: 'nhs', color: '#C00000', bg: '#FEF2F2' },
            { icon: '🏫', title: 'My University', desc: 'Student support links', tab: 'university', color: '#F59E0B', bg: '#FFFBEB' },
            { icon: '🌍', title: 'My Country Support', desc: 'Embassy and community', tab: 'country', color: '#8B5CF6', bg: '#F5F3FF' },
          ].map(item => (
            <button key={item.tab} onClick={() => setActiveTab(item.tab)} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>
                {item.icon}
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{item.title}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>{item.desc}</p>
            </button>
          ))}
        </div>

        {/* About MindBridge */}
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#0f2744' }}>About MindBridge</h3>

        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '800', color: '#0f2744' }}>🎯 What is MindBridge?</h4>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            MindBridge is a free, AI-free web application that provides personalised mental health support for university students. It uses a rule-based conversational chatbot that learns who you are — your name, country and university — and then provides tailored support and resources specific to your situation.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            Unlike generic mental health apps, MindBridge understands the unique challenges faced by students — from academic pressure and exam stress to homesickness, visa concerns, housing issues and financial difficulties. It connects students to the right support at the right time.
          </p>
        </div>

        {/* Key features */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: '800', color: '#0f2744' }}>✨ Key Features</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {[
              { icon: '💬', title: 'Personalised Chat Support', desc: 'A chatbot that learns your name, country and university and provides tailored advice and resource links.' },
              { icon: '🌍', title: 'Country-Specific Support', desc: 'Embassy links, community organisations and support networks for students from 40+ countries in the UK.' },
              { icon: '🏫', title: 'University Support Links', desc: 'Direct links to student unions, wellbeing teams, careers centres at 35+ UK universities.' },
              { icon: '🏥', title: 'Free NHS Resources', desc: 'Curated, verified free mental health services available to all students in the UK.' },
              { icon: '📊', title: 'Mood Tracker', desc: 'Log your mood daily with a visual chart showing your emotional patterns over time.' },
              { icon: '🚨', title: 'Crisis Detection', desc: 'Automatic detection of crisis language, immediately showing Samaritans 116 123.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#f8f9fc', borderRadius: '12px', padding: '18px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{f.icon}</div>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is it for */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f2744' }}>👥 Who is MindBridge For?</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {[
              { title: 'Home Students', desc: 'UK students dealing with exam stress, student finance, accommodation issues or mental health challenges.' },
              { title: 'International Students', desc: 'Students from abroad navigating visa concerns, homesickness, cultural adjustment and finding community.' },
              { title: 'EU Students', desc: 'European students understanding their rights, accessing support and settling into UK university life.' },
              { title: 'Postgraduate Students', desc: 'Masters and PhD students dealing with dissertation pressure, career uncertainty and isolation.' },
            ].map(g => (
              <div key={g.title} style={{ background: '#EBF3FB', borderRadius: '12px', padding: '18px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{g.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Disclaimer */}
        <div style={{ background: '#FEF9C3', borderRadius: '16px', padding: '24px', border: '1px solid #FDE047', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '800', color: '#854D0E' }}>⚠️ Important Disclaimer</h4>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#713F12', lineHeight: '1.75' }}>
            <strong>MindBridge is not a substitute for professional mental health care.</strong> It is a support navigation tool designed to help students find the right resources and provide a first point of contact for those who are struggling.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#713F12', lineHeight: '1.75' }}>
            <strong>In an emergency:</strong> Call <strong>999</strong> or go to your nearest A&E. For crisis support call <strong>Samaritans free on 116 123</strong> — available 24 hours a day, 7 days a week.
          </p>
        </div>

        {/* Privacy */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '800', color: '#0f2744' }}>🔒 Privacy & Data</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            MindBridge takes your privacy seriously. Chat conversations are stored in your browser memory only and are never sent to or stored on any server. Mood tracker data is stored locally in your browser. Your account information is stored securely with encrypted passwords. MindBridge does not sell or share your data with any third party.
          </p>
        </div>

        {/* Crisis banner */}
        <div style={{ background: '#7F0000', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ color: 'white' }}>
            <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '700', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1.5px' }}>In a crisis right now?</p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: 'white' }}>Call Samaritans — 116 123</p>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.8 }}>Free · 24/7 · Completely confidential</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="tel:116123" style={{ background: 'white', color: '#7F0000', fontWeight: '800', fontSize: '13px', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none' }}>📞 Call 116 123</a>
            <a href="sms:85258?body=SHOUT" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: '700', fontSize: '13px', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>💬 Text SHOUT</a>
          </div>
        </div>

      </div>
    </div>
  );
}