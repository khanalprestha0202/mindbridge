import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MOOD_CONFIG = {
  1: { emoji: '😔', label: 'Very Low', color: '#6B7280' },
  2: { emoji: '😕', label: 'Not Great', color: '#F59E0B' },
  3: { emoji: '😐', label: 'Okay', color: '#3B82F6' },
  4: { emoji: '🙂', label: 'Good', color: '#10B981' },
  5: { emoji: '😊', label: 'Great', color: '#8B5CF6' },
};

export default function MoodTrackerPage({ moodHistory, setMoodHistory }) {
  const [note, setNote] = useState('');
  const [todayMood, setTodayMood] = useState(null);
  const [justLogged, setJustLogged] = useState(false);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const today = now.toLocaleDateString('en-GB');
    const todayEntry = moodHistory.find(m => m.date === today);
    if (todayEntry) setTodayMood(todayEntry);
  }, [moodHistory]);

  async function logMood(score) {
    const today = now.toLocaleDateString('en-GB');
    const entry = {
      date: today,
      label: MOOD_CONFIG[score].label,
      value: score,
      note: note.trim(),
      time: timeStr,
    };

    // Save to localStorage first (always works)
    const existing = moodHistory.find(m => m.date === today);
    let updated = existing
      ? moodHistory.map(m => m.date === today ? entry : m)
      : [...moodHistory, entry];
    updated = updated.slice(-30);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodHistory(updated);
    setTodayMood(entry);
    setNote('');
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 3000);

    // Also save to database if backend is running
    try {
      const token = localStorage.getItem('token');
      if (token && !token.startsWith('local-')) {
        await fetch('http://localhost:5000/api/mood', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ score, label: MOOD_CONFIG[score].label, note: note.trim() }),
        });
      }
    } catch (err) {
      // Backend not available - localStorage backup already saved
      console.log('Mood saved locally only');
    }
  }

  function clearHistory() {
    if (window.confirm('Are you sure you want to clear all mood history?')) {
      localStorage.removeItem('moodHistory');
      setMoodHistory([]);
      setTodayMood(null);
    }
  }

  const last14 = moodHistory.slice(-14);

  const chartData = {
    labels: last14.map(m => m.date.split('/').slice(0, 2).join('/')),
    datasets: [{
      label: 'Mood',
      data: last14.map(m => m.value),
      borderColor: '#2E75B6',
      backgroundColor: 'rgba(46,117,182,0.08)',
      borderWidth: 3,
      pointBackgroundColor: last14.map(m => MOOD_CONFIG[m.value]?.color || '#2E75B6'),
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 10,
      tension: 0.4,
      fill: true,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f2744',
        titleColor: 'white',
        bodyColor: 'rgba(255,255,255,0.8)',
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: ctx => {
            const entry = last14[ctx.dataIndex];
            return ` ${MOOD_CONFIG[entry.value]?.emoji} ${entry.label}${entry.note ? ' — ' + entry.note : ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0.5,
        max: 5.5,
        ticks: {
          stepSize: 1,
          callback: val => MOOD_CONFIG[val]?.emoji || '',
          font: { size: 18 },
        },
        grid: { color: '#f3f4f6' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } },
      },
    },
  };

  const avg = moodHistory.length
    ? (moodHistory.reduce((s, m) => s + m.value, 0) / moodHistory.length).toFixed(1)
    : 0;
  const best = moodHistory.length ? Math.max(...moodHistory.map(m => m.value)) : 0;
  const streak = (() => {
    if (!moodHistory.length) return 0;
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toLocaleDateString('en-GB');
      if (moodHistory.find(m => m.date === ds)) count++;
      else break;
    }
    return count;
  })();

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ background: 'white', padding: '24px 32px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#0f2744' }}>📊 Mood Tracker</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Track how you are feeling every day — patterns help you understand yourself better</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>{dateStr}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>{timeStr}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Entries', value: moodHistory.length || '—', icon: '📝' },
            { label: 'Average Mood', value: avg > 0 ? `${avg}/5` : '—', icon: MOOD_CONFIG[Math.round(Number(avg))]?.emoji || '😐' },
            { label: 'Best Mood', value: best > 0 ? MOOD_CONFIG[best]?.label : '—', icon: best > 0 ? MOOD_CONFIG[best]?.emoji : '—' },
            { label: 'Day Streak', value: streak > 0 ? `${streak} days` : '—', icon: '🔥' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', borderRadius: '14px', padding: '20px', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
                <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <p style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#0f2744' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>

          {/* Chart */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>Mood Over Time</h3>
            {last14.length < 2 ? (
              <div style={{ height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                <span style={{ fontSize: '48px', marginBottom: '12px' }}>📊</span>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Log at least 2 moods to see your chart</p>
                <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Use the panel on the right to get started</p>
              </div>
            ) : (
              <div style={{ height: '260px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>

          {/* Log mood */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>
              {todayMood ? "Update Today's Mood" : "Log Today's Mood"}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#9ca3af' }}>
              {dateStr} · {timeStr}
            </p>

            {todayMood && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#15803d', fontWeight: '600' }}>
                  {MOOD_CONFIG[todayMood.value]?.emoji} Logged as <strong>{todayMood.label}</strong> at <strong>{todayMood.time}</strong>
                </p>
              </div>
            )}

            {justLogged && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#15803d', fontWeight: '600' }}>✅ Mood logged successfully!</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(score => (
                <button key={score} onClick={() => logMood(score)} style={{
                  border: todayMood?.value === score ? `2px solid ${MOOD_CONFIG[score].color}` : '2px solid #e5e7eb',
                  borderRadius: '12px', padding: '10px 4px', cursor: 'pointer',
                  background: todayMood?.value === score ? '#f8f9fc' : 'white',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  transform: todayMood?.value === score ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: '24px' }}>{MOOD_CONFIG[score].emoji}</span>
                  <span style={{ fontSize: '9px', color: MOOD_CONFIG[score].color, fontWeight: '700' }}>{MOOD_CONFIG[score].label}</span>
                </button>
              ))}
            </div>

            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Add a note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="How are you feeling? What happened today?"
              rows={3}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#2E75B6'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        {/* History */}
        {moodHistory.length > 0 && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>Mood History</h3>
              <button onClick={clearHistory} style={{ background: '#fff0f0', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                Clear History
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
              {[...moodHistory].reverse().map((entry, i) => (
                <div key={i} style={{ background: '#f8f9fc', borderRadius: '12px', padding: '14px', borderLeft: `4px solid ${MOOD_CONFIG[entry.value]?.color || '#2E75B6'}` }}>
                  <p style={{ margin: '0 0 4px', fontSize: '22px' }}>{MOOD_CONFIG[entry.value]?.emoji}</p>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#0f2744' }}>{entry.label}</p>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#9ca3af' }}>{entry.date}{entry.time ? ` · ${entry.time}` : ''}</p>
                  {entry.note && <p style={{ margin: 0, fontSize: '11px', color: '#6b7280', fontStyle: 'italic', lineHeight: '1.4' }}>{entry.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}