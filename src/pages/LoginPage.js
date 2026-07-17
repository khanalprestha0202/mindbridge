import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError('');
    setSuccess('');

    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (!isLogin && !form.name) { setError('Please enter your full name'); return; }
    if (!form.email.includes('@')) { setError('Please enter a valid email address'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      if (!isLogin) {
        setSuccess('✅ Account created! You can now sign in.');
        setIsLogin(true);
        setForm({ name: '', email: form.email, password: '' });
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);

    } catch (err) {
      // Backend not available - fallback to localStorage
      const users = JSON.parse(localStorage.getItem('mindbridge_users') || '[]');
      if (!isLogin) {
        const exists = users.find(u => u.email.toLowerCase() === form.email.toLowerCase());
        if (exists) { setError('Account already exists. Please sign in.'); setLoading(false); return; }
        const newUser = { id: Date.now().toString(), name: form.name, email: form.email.toLowerCase(), password: form.password };
        localStorage.setItem('mindbridge_users', JSON.stringify([...users, newUser]));
        setSuccess('✅ Account created! You can now sign in.');
        setIsLogin(true);
        setForm({ name: '', email: form.email, password: '' });
      } else {
        const user = users.find(u => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password);
        if (!user) { setError('Incorrect email or password.'); setLoading(false); return; }
        const sessionUser = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem('token', 'local-' + user.id);
        localStorage.setItem('user', JSON.stringify(sessionUser));
        onLogin(sessionUser);
      }
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* LEFT PANEL */}
      <div style={{
        flex: 1, background: 'linear-gradient(160deg, #0a1628 0%, #0f2744 50%, #1a3a5c 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(46,117,182,0.15)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(46,117,182,0.1)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '24px', background: 'linear-gradient(135deg, #2E75B6, #5ba3d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 24px', boxShadow: '0 20px 60px rgba(46,117,182,0.4)' }}>
            💙
          </div>
          <h1 style={{ color: 'white', fontSize: '38px', fontWeight: '800', margin: '0 0 8px', letterSpacing: '-1px' }}>MindBridge</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', margin: '0 0 48px' }}>Your Mental Health Companion</p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '340px' }}>
          {[
            { icon: '💬', title: 'Personalised Chat Support', desc: 'A chatbot that understands your country and university' },
            { icon: '🌍', title: 'Country & University Links', desc: 'Embassy, community and student welfare resources' },
            { icon: '🏥', title: 'Free NHS Resources', desc: 'Verified mental health services, all free' },
            { icon: '📊', title: 'Mood Tracker', desc: 'Track how you are feeling day by day' },
          ].map(f => (
            <div key={f.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(46,117,182,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                {f.icon}
              </div>
              <div>
                <p style={{ margin: '0 0 2px', color: 'white', fontWeight: '700', fontSize: '14px' }}>{f.title}</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '32px', textAlign: 'center', lineHeight: '1.6' }}>
          For all university students in the UK · Home · EU · International
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: '480px', flexShrink: 0, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '800', color: '#0f2744' }}>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ margin: '0 0 32px', fontSize: '14px', color: '#6b7280' }}>
            {isLogin ? 'Sign in to continue to MindBridge' : 'Join MindBridge — it is completely free'}
          </p>

          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '28px' }}>
            <button onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', background: isLogin ? 'white' : 'transparent', color: isLogin ? '#0f2744' : '#9ca3af', boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.1)' : 'none' }}>
              Sign In
            </button>
            <button onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', background: !isLogin ? 'white' : 'transparent', color: !isLogin ? '#0f2744' : '#9ca3af', boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.1)' : 'none' }}>
              Register
            </button>
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Prestha Khanal"
                style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#2E75B6'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email"
              style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#2E75B6'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#2E75B6'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#15803D', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              {success}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#94a3b8' : 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 8px 24px rgba(46,117,182,0.35)' }}>
            {loading ? 'Please wait...' : isLogin ? '→  Sign In to MindBridge' : '→  Create Account'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '20px' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} style={{ color: '#2E75B6', fontWeight: '700', cursor: 'pointer' }}>
              {isLogin ? 'Register here' : 'Sign in here'}
            </span>
          </p>

          <div style={{ margin: '24px 0 0', background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '10px', padding: '14px 16px' }}>
            <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: '#854D0E' }}>🚨 In a mental health emergency</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#713F12', lineHeight: '1.6' }}>
              Call <strong>Samaritans free on 116 123</strong> — available 24/7. Or call <strong>999</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}