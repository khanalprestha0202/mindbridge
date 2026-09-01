import { useState } from 'react';

export default function ConsentPage({ onConsent }) {
  const [checks, setChecks] = useState({
    notClinical: false,
    ai: false,
    data: false,
  });

  const allChecked = checks.notClinical && checks.ai && checks.data;

  function toggle(key) {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handleContinue() {
    if (!allChecked) return;
    localStorage.setItem('mindbridge_consent_given', 'true');
    localStorage.setItem('mindbridge_consent_date', new Date().toISOString());
    onConsent();
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif", padding: '24px',
    }}>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%',
        border: '1px solid #e5e7eb', boxShadow: '0 10px 40px rgba(15,39,68,0.08)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f2744, #2E75B6)', borderRadius: '14px',
          padding: '20px 24px', marginBottom: '24px', color: 'white',
        }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '800' }}>Welcome to MindBridge 💙</h1>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.85 }}>Please read before you continue</p>
        </div>

        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', margin: '0 0 20px' }}>
          MindBridge is a support tool built for university students, developed as part of a Master's
          dissertation project. Before you start, please read and confirm the following:
        </p>

        <label style={checkboxRow(checks.notClinical)}>
          <input
            type="checkbox"
            checked={checks.notClinical}
            onChange={() => toggle('notClinical')}
            style={checkboxInput}
          />
          <span style={checkboxText}>
            <strong>MindBridge is not a clinical service.</strong> It is not monitored by a
            healthcare professional and is not a substitute for professional mental health support.
            If you are in crisis, please contact <strong>Samaritans (116 123, free, 24/7)</strong> or
            emergency services immediately.
          </span>
        </label>

        <label style={checkboxRow(checks.ai)}>
          <input
            type="checkbox"
            checked={checks.ai}
            onChange={() => toggle('ai')}
            style={checkboxInput}
          />
          <span style={checkboxText}>
            <strong>You are talking to an automated chatbot, not a human.</strong> The chatbot gives
            general, supportive responses based on pre-written rules — it does not understand or
            assess your situation the way a person or clinician would.
          </span>
        </label>

        <label style={checkboxRow(checks.data)}>
          <input
            type="checkbox"
            checked={checks.data}
            onChange={() => toggle('data')}
            style={checkboxInput}
          />
          <span style={checkboxText}>
            <strong>Your privacy matters.</strong> Chat messages are not saved after your session.
            Mood entries are stored to show you your own trends. If you take part in the research
            evaluation, your responses are anonymised and not linked to your name or email.
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!allChecked}
          style={{
            width: '100%', marginTop: '8px', padding: '14px', borderRadius: '12px', border: 'none',
            background: allChecked ? 'linear-gradient(135deg,#2E75B6,#0f2744)' : '#cbd5e1',
            color: 'white', fontWeight: '700', fontSize: '15px',
            cursor: allChecked ? 'pointer' : 'not-allowed', transition: 'all 0.15s',
          }}
        >
          I understand and agree {'\u2014'} Continue
        </button>

        <p style={{ margin: '14px 0 0', fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>
          You can stop using MindBridge at any time.
        </p>
      </div>
    </div>
  );
}

function checkboxRow(checked) {
  return {
    display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px',
    borderRadius: '12px', marginBottom: '12px', cursor: 'pointer',
    border: checked ? '2px solid #2E75B6' : '2px solid #e5e7eb',
    background: checked ? '#EBF3FB' : '#fafafa',
    transition: 'all 0.15s',
  };
}

const checkboxInput = {
  marginTop: '3px', width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer',
};

const checkboxText = {
  fontSize: '13px', color: '#374151', lineHeight: '1.6',
};