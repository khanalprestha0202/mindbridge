import { useState, useEffect } from 'react';

export default function ProfilePage({ user, setUser, moodHistory, onLogout }) {
  const [activeSection, setActiveSection] = useState('details');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const MOOD_CONFIG = {
    1: { emoji: '😔', label: 'Very Low', color: '#6B7280' },
    2: { emoji: '😕', label: 'Not Great', color: '#F59E0B' },
    3: { emoji: '😐', label: 'Okay', color: '#3B82F6' },
    4: { emoji: '🙂', label: 'Good', color: '#10B981' },
    5: { emoji: '😊', label: 'Great', color: '#8B5CF6' },
  };

  const avg = moodHistory.length
    ? (moodHistory.reduce((s, m) => s + m.value, 0) / moodHistory.length).toFixed(1)
    : null;

  const joined = (() => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    return u.createdAt
      ? new Date(u.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Today';
  })();

  function showMsg(text, type) {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 4000);
  }

  function handleUpdateDetails() {
    if (!form.name.trim()) { showMsg('Name cannot be empty', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const updated = { ...user, name: form.name.trim() };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      showMsg('✅ Profile updated successfully!', 'success');
      setLoading(false);
    }, 600);
  }

  function handleChangePassword() {
    if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
      showMsg('Please fill in all password fields', 'error'); return;
    }
    if (passwordForm.newPass.length < 6) {
      showMsg('New password must be at least 6 characters', 'error'); return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      showMsg('New passwords do not match', 'error'); return;
    }
    const users = JSON.parse(localStorage.getItem('mindbridge_users') || '[]');
    const idx = users.findIndex(u => u.email === user.email && u.password === passwordForm.current);
    if (idx === -1) { showMsg('Current password is incorrect', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      users[idx].password = passwordForm.newPass;
      localStorage.setItem('mindbridge_users', JSON.stringify(users));
      setPasswordForm({ current: '', newPass: '', confirm: '' });
      showMsg('✅ Password changed successfully!', 'success');
      setLoading(false);
    }, 600);
  }

  const sections = [
    { id: 'details', icon: '👤', label: 'My Details' },
    { id: 'password', icon: '🔒', label: 'Change Password' },
    { id: 'stats', icon: '📊', label: 'My Stats' },
    { id: 'privacy', icon: '🛡️', label: 'Privacy & Data' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '32px', color: 'white', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '800' }}>{user?.name}</h1>
          <p style={{ margin: '0 0 4px', fontSize: '14px', opacity: 0.8 }}>{user?.email}</p>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>Member since {joined}</p>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 160px)' }}>

        {/* Sidebar */}
        <div style={{ width: '200px', background: 'white', borderRight: '1px solid #e5e7eb', padding: '16px', flexShrink: 0 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', border: 'none', borderRadius: '10px', cursor: 'pointer',
              marginBottom: '4px', textAlign: 'left', fontSize: '13px', fontWeight: '600',
              background: activeSection === s.id ? '#EBF3FB' : 'transparent',
              color: activeSection === s.id ? '#1a3a5c' : '#6b7280',
            }}>
              <span>{s.icon}</span>{s.label}
            </button>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f3f4f6', marginTop: '20px' }}>
            <button onClick={onLogout} style={{ width: '100%', padding: '10px', background: '#fff0f0', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>

          {msg.text && (
            <div style={{ background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2', border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`, color: msg.type === 'success' ? '#15803d' : '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
              {msg.text}
            </div>
          )}

          {/* My Details */}
          {activeSection === 'details' && (
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>👤 My Details</h2>
              <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb', maxWidth: '480px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#2E75B6'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                  <input
                    value={form.email}
                    disabled
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', background: '#f9fafb', color: '#9ca3af', boxSizing: 'border-box' }}
                  />
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9ca3af' }}>Email cannot be changed</p>
                </div>
                <button onClick={handleUpdateDetails} disabled={loading} style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Change Password */}
          {activeSection === 'password' && (
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>🔒 Change Password</h2>
              <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb', maxWidth: '480px' }}>
                {[
                  { key: 'current', label: 'Current Password', placeholder: 'Enter your current password' },
                  { key: 'newPass', label: 'New Password', placeholder: 'At least 6 characters' },
                  { key: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat your new password' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>{field.label}</label>
                    <input
                      type="password"
                      placeholder={field.placeholder}
                      value={passwordForm[field.key]}
                      onChange={e => setPasswordForm(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#2E75B6'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                ))}
                <button onClick={handleChangePassword} disabled={loading} style={{ marginTop: '8px', padding: '12px 24px', background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          {activeSection === 'stats' && (
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>📊 My Stats</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Mood Entries', value: moodHistory.length, icon: '📝' },
                  { label: 'Average Mood', value: avg ? `${avg}/5` : '—', icon: avg ? MOOD_CONFIG[Math.round(Number(avg))]?.emoji : '😐' },
                  { label: 'Best Mood', value: moodHistory.length ? MOOD_CONFIG[Math.max(...moodHistory.map(m => m.value))]?.label : '—', icon: moodHistory.length ? MOOD_CONFIG[Math.max(...moodHistory.map(m => m.value))]?.emoji : '—' },
                  { label: 'Days Using App', value: new Set(moodHistory.map(m => m.date)).size || 1, icon: '📅' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'white', borderRadius: '14px', padding: '20px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
                      <span style={{ fontSize: '20px' }}>{stat.icon}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f2744' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
              {moodHistory.length > 0 && (
                <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>Recent Mood History</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[...moodHistory].reverse().slice(0, 10).map((entry, i) => (
                      <div key={i} style={{ background: '#f8f9fc', borderRadius: '10px', padding: '12px', textAlign: 'center', minWidth: '80px', borderLeft: `3px solid ${MOOD_CONFIG[entry.value]?.color}` }}>
                        <p style={{ margin: '0 0 4px', fontSize: '22px' }}>{MOOD_CONFIG[entry.value]?.emoji}</p>
                        <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '700', color: '#0f2744' }}>{entry.label}</p>
                        <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af' }}>{entry.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>🛡️ Privacy & Data</h2>
              <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>What data does MindBridge store?</h3>
                {[
                  { icon: '💬', title: 'Chat conversations', desc: 'Stored in browser memory only. Deleted when you close the tab. Never sent to any server.' },
                  { icon: '📊', title: 'Mood history', desc: 'Stored locally in your browser only. Never sent to any server.' },
                  { icon: '👤', title: 'Account details', desc: 'Your name and email stored locally. Password is never stored in plain text.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '12px', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '700', color: '#0f2744' }}>{item.title}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff0f0', borderRadius: '14px', padding: '24px', border: '1px solid #fecaca' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '700', color: '#dc2626' }}>Delete My Account</h3>
                <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                  This will permanently delete your account, mood history and all data. This cannot be undone.
                </p>
                <button onClick={() => {
                  if (window.confirm('Are you sure? This will permanently delete your account and all data.')) {
                    const users = JSON.parse(localStorage.getItem('mindbridge_users') || '[]');
                    localStorage.setItem('mindbridge_users', JSON.stringify(users.filter(u => u.email !== user.email)));
                    localStorage.removeItem('moodHistory');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    onLogout();
                  }
                }} style={{ padding: '10px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                  Delete My Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}