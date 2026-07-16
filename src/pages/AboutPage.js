export default function AboutPage() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '40px 32px', color: 'white' }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💙</div>
          <h1 style={{ margin: '0 0 10px', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>About MindBridge</h1>
          <p style={{ margin: 0, fontSize: '15px', opacity: 0.85, lineHeight: '1.7' }}>
            MindBridge is a mental health support web application designed specifically for university students in the UK — both home and international students. It was built as part of a Masters dissertation project at St Mary's University, Twickenham.
          </p>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '900px' }}>

        {/* What is MindBridge */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>🎯 What is MindBridge?</h2>
          <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            MindBridge is a free, AI-free web application that provides personalised mental health support for university students. It uses a rule-based conversational chatbot that learns who you are — your name, country and university — and then provides tailored support and resources specific to your situation.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            Unlike generic mental health apps, MindBridge understands the unique challenges faced by students — from academic pressure and exam stress to homesickness, visa concerns, housing issues and financial difficulties. It connects students to the right support at the right time.
          </p>
        </div>

        {/* Key Features */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>✨ Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {[
              { icon: '💬', title: 'Personalised Chat Support', desc: 'A conversational chatbot that learns your name, country and university and provides tailored advice and support links.' },
              { icon: '🌍', title: 'Country-Specific Support', desc: 'Embassy links, community organisations and support networks for students from 40+ countries studying in the UK.' },
              { icon: '🏫', title: 'University Support Links', desc: 'Direct links to student unions, wellbeing teams, careers centres and accommodation offices at 35+ UK universities.' },
              { icon: '🏥', title: 'NHS Mental Health Resources', desc: 'Curated, verified free mental health services available to all students in the UK — including NHS Talking Therapies and Samaritans.' },
              { icon: '📊', title: 'Mood Tracker', desc: 'Log your mood daily with a visual chart showing your emotional patterns over time. Add notes to track what affects your wellbeing.' },
              { icon: '🚨', title: 'Crisis Detection', desc: 'Automatic detection of crisis language in chat messages, immediately displaying Samaritans (116 123) and emergency services.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#f8f9fc', borderRadius: '12px', padding: '18px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is it for */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>👥 Who is MindBridge For?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { title: 'Home Students', desc: 'UK students dealing with exam stress, student finance, accommodation issues, academic pressure or mental health challenges.' },
              { title: 'International Students', desc: 'Students from abroad navigating visa concerns, homesickness, cultural adjustment, language barriers and finding community.' },
              { title: 'EU Students', desc: 'European students understanding their rights, accessing support services and settling into UK university life post-Brexit.' },
              { title: 'Postgraduate Students', desc: 'Masters and PhD students dealing with dissertation pressure, career uncertainty, isolation and the unique challenges of postgraduate study.' },
            ].map(g => (
              <div key={g.title} style={{ background: '#EBF3FB', borderRadius: '12px', padding: '18px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{g.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>🛠️ Technology</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JavaScript ES6', 'Chart.js', 'CSS-in-JS', 'JWT Authentication', 'REST API'].map(tech => (
              <span key={tech} style={{ background: '#EBF3FB', color: '#1a3a5c', fontSize: '13px', fontWeight: '600', padding: '6px 14px', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ background: '#FEF9C3', borderRadius: '16px', padding: '28px', border: '1px solid #FDE047', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: '18px', fontWeight: '800', color: '#854D0E' }}>⚠️ Important Disclaimer</h2>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#713F12', lineHeight: '1.75' }}>
            <strong>MindBridge is not a substitute for professional mental health care.</strong> It is a support navigation tool designed to help students find the right resources and to provide a first point of contact for those who are struggling.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#713F12', lineHeight: '1.75' }}>
            MindBridge does not provide clinical advice, diagnosis or therapy. The chatbot is rule-based and not a human counsellor. If you are experiencing a mental health crisis, please contact a professional service immediately.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#713F12', lineHeight: '1.75' }}>
            <strong>In an emergency:</strong> Call <strong>999</strong> or go to your nearest A&E. For crisis support call <strong>Samaritans free on 116 123</strong> — available 24 hours a day, 7 days a week.
          </p>
        </div>

        {/* Privacy */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>🔒 Privacy & Data</h2>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            MindBridge takes your privacy seriously. Chat conversations are stored in your browser's memory only and are never sent to or stored on any server. When you close the tab, your conversation is deleted.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
            Mood tracker data is stored locally in your browser only. Your account information is stored securely with encrypted passwords. MindBridge does not sell or share your data with any third party.
          </p>
        </div>

      </div>
    </div>
  );
}