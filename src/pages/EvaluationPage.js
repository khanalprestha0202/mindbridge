import { useState } from 'react';

const SUS_QUESTIONS = [
  'I think that I would like to use this system frequently.',
  'I found the system unnecessarily complex.',
  'I thought the system was easy to use.',
  'I think that I would need the support of a technical person to be able to use this system.',
  'I found the various functions in this system were well integrated.',
  'I thought there was too much inconsistency in this system.',
  'I would imagine that most people would learn to use this system very quickly.',
  'I found the system very cumbersome to use.',
  'I felt very confident using the system.',
  'I needed to learn a lot of things before I could get going with this system.',
];

const SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

function calculateSUS(responses) {
  let score = 0;
  responses.forEach((r, i) => {
    if (i % 2 === 0) score += r - 1;
    else score += 5 - r;
  });
  return score * 2.5;
}

function getSUSGrade(score) {
  if (score >= 90) return { grade: 'A+', label: 'Best Imaginable', color: '#15803d' };
  if (score >= 85) return { grade: 'A', label: 'Excellent', color: '#15803d' };
  if (score >= 80) return { grade: 'B', label: 'Good', color: '#3B82F6' };
  if (score >= 70) return { grade: 'C', label: 'Acceptable', color: '#F59E0B' };
  if (score >= 60) return { grade: 'D', label: 'Poor', color: '#F97316' };
  return { grade: 'F', label: 'Awful', color: '#DC2626' };
}

export default function EvaluationPage() {
  const [step, setStep] = useState('intro'); // intro, questionnaire, interview, results, allResults
  const [participant, setParticipant] = useState({ name: '', age: '', studentType: '', university: '' });
  const [responses, setResponses] = useState(Array(10).fill(0));
  const [interviewAnswers, setInterviewAnswers] = useState(Array(5).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [allResults, setAllResults] = useState(() => {
    return JSON.parse(localStorage.getItem('sus_results') || '[]');
  });

  const INTERVIEW_QUESTIONS = [
    'How easy was it to find the support you needed using MindBridge?',
    'Did the chatbot responses feel relevant and helpful to your situation?',
    'How likely are you to use MindBridge again if you were feeling stressed or overwhelmed?',
    'What did you find most useful about MindBridge?',
    'What would you improve about MindBridge?',
  ];

  function handleResponse(qIndex, value) {
    const updated = [...responses];
    updated[qIndex] = value;
    setResponses(updated);
  }

  function handleSubmitSUS() {
    if (responses.includes(0)) {
      alert('Please answer all 10 questions before continuing.');
      return;
    }
    setStep('interview');
  }

  function handleSubmitAll() {
    const susScore = calculateSUS(responses);
    const result = {
      id: Date.now(),
      participant: participant.name || 'Anonymous',
      age: participant.age,
      studentType: participant.studentType,
      university: participant.university,
      susScore: susScore.toFixed(1),
      responses,
      interviewAnswers,
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...allResults, result];
    localStorage.setItem('sus_results', JSON.stringify(updated));
    setAllResults(updated);
    setSubmitted(true);
    setStep('results');
  }

  const avgSUS = allResults.length
    ? (allResults.reduce((s, r) => s + parseFloat(r.susScore), 0) / allResults.length).toFixed(1)
    : null;

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '24px 32px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800' }}>🔬 User Evaluation</h1>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>SUS Usability Study — MindBridge Dissertation Research</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setStep('intro')} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            New Participant
          </button>
          <button onClick={() => setStep('allResults')} style={{ background: 'white', color: '#0f2744', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>
            View All Results ({allResults.length})
          </button>
        </div>
      </div>

      <div style={{ padding: '28px 32px', maxWidth: '800px' }}>

        {/* INTRO */}
        {step === 'intro' && (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>Welcome to the MindBridge Usability Study</h2>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
                Thank you for agreeing to take part in this study. You will be asked to use the MindBridge application for approximately 15 minutes, then complete a short usability questionnaire and answer 5 interview questions.
              </p>
              <div style={{ background: '#EBF3FB', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '700', color: '#0f2744' }}>ℹ️ Important Information</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                  Your participation is completely voluntary. You may withdraw at any time. Your responses will be anonymised and used only for academic research purposes as part of a Masters dissertation at St Mary's University, Twickenham.
                </p>
              </div>
              <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>Participant Details (Optional)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                {[
                  { key: 'name', label: 'First Name (or leave blank)', placeholder: 'Anonymous' },
                  { key: 'age', label: 'Age', placeholder: 'e.g. 22' },
                  { key: 'studentType', label: 'Student Type', placeholder: 'Home / International / EU' },
                  { key: 'university', label: 'University', placeholder: 'e.g. St Mary\'s University' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>{field.label}</label>
                    <input
                      value={participant[field.key]}
                      onChange={e => setParticipant(p => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#2E75B6'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('questionnaire')} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', padding: '14px 32px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                Start Evaluation →
              </button>
            </div>
          </div>
        )}

        {/* SUS QUESTIONNAIRE */}
        {step === 'questionnaire' && (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>System Usability Scale (SUS)</h2>
              <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                For each statement below, select the option that best describes your experience using MindBridge. There are no right or wrong answers.
              </p>

              {SUS_QUESTIONS.map((question, qIndex) => (
                <div key={qIndex} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: qIndex < 9 ? '1px solid #f3f4f6' : 'none' }}>
                  <p style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: '600', color: '#0f2744' }}>
                    <span style={{ color: '#2E75B6', marginRight: '8px' }}>{qIndex + 1}.</span>{question}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {SCALE.map(option => (
                      <button key={option.value} onClick={() => handleResponse(qIndex, option.value)} style={{
                        padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                        border: responses[qIndex] === option.value ? '2px solid #2E75B6' : '2px solid #e5e7eb',
                        background: responses[qIndex] === option.value ? '#EBF3FB' : 'white',
                        color: responses[qIndex] === option.value ? '#1a3a5c' : '#6b7280',
                        transition: 'all 0.15s',
                      }}>
                        {option.value} — {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                  {responses.filter(r => r > 0).length}/10 questions answered
                </p>
                <button onClick={handleSubmitSUS} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 28px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  Continue to Interview →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERVIEW */}
        {step === 'interview' && (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>Semi-Structured Interview</h2>
              <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280' }}>Please answer each question honestly. There are no right or wrong answers.</p>

              {INTERVIEW_QUESTIONS.map((question, i) => (
                <div key={i} style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0f2744', marginBottom: '8px' }}>
                    <span style={{ color: '#2E75B6', marginRight: '8px' }}>{i + 1}.</span>{question}
                  </label>
                  <textarea
                    value={interviewAnswers[i]}
                    onChange={e => {
                      const updated = [...interviewAnswers];
                      updated[i] = e.target.value;
                      setInterviewAnswers(updated);
                    }}
                    placeholder="Type your answer here..."
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: '1.6' }}
                    onFocus={e => e.target.style.borderColor = '#2E75B6'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={() => setStep('questionnaire')} style={{ padding: '12px 24px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                  ← Back
                </button>
                <button onClick={handleSubmitAll} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  Submit Evaluation ✓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && submitted && (
          <div>
            {(() => {
              const latest = allResults[allResults.length - 1];
              const score = parseFloat(latest.susScore);
              const grade = getSUSGrade(score);
              return (
                <div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb', marginBottom: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
                    <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#0f2744' }}>Thank you for your participation!</h2>
                    <p style={{ margin: '0 0 28px', fontSize: '14px', color: '#6b7280' }}>Your responses have been recorded successfully.</p>

                    <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #0f2744, #2E75B6)', borderRadius: '20px', padding: '28px 48px', marginBottom: '24px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>SUS Score</p>
                      <p style={{ margin: '0 0 4px', fontSize: '56px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{score.toFixed(1)}</p>
                      <p style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>{grade.label}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Grade: {grade.grade}</p>
                    </div>

                    <div style={{ background: '#f8f9fc', borderRadius: '12px', padding: '16px', maxWidth: '400px', margin: '0 auto' }}>
                      <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#9ca3af', textAlign: 'left' }}>SUS Score Interpretation</p>
                      {[
                        { range: '90-100', label: 'Best Imaginable', color: '#15803d' },
                        { range: '80-89', label: 'Excellent', color: '#3B82F6' },
                        { range: '70-79', label: 'Good ← Target', color: '#F59E0B' },
                        { range: '60-69', label: 'Acceptable', color: '#F97316' },
                        { range: 'Below 60', label: 'Poor', color: '#DC2626' },
                      ].map(r => (
                        <div key={r.range} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{r.range}</span>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: r.color }}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>Study Progress</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                      <div style={{ background: '#f8f9fc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', color: '#0f2744' }}>{allResults.length}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Participants</p>
                      </div>
                      <div style={{ background: '#f8f9fc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', color: '#0f2744' }}>{avgSUS}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Average SUS</p>
                      </div>
                      <div style={{ background: '#f8f9fc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', color: '#0f2744' }}>{10 - allResults.length}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Needed</p>
                      </div>
                    </div>
                    <button onClick={() => { setStep('intro'); setResponses(Array(10).fill(0)); setInterviewAnswers(Array(5).fill('')); setParticipant({ name: '', age: '', studentType: '', university: '' }); setSubmitted(false); }} style={{ width: '100%', marginTop: '16px', padding: '12px', background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                      Add Next Participant →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ALL RESULTS */}
        {step === 'allResults' && (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>All Evaluation Results</h2>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#6b7280' }}>
                {allResults.length} participant{allResults.length !== 1 ? 's' : ''} completed · Average SUS Score: <strong>{avgSUS || '—'}</strong>
              </p>

              {allResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  <p style={{ fontSize: '48px', margin: '0 0 12px' }}>📋</p>
                  <p style={{ fontSize: '15px' }}>No results yet. Start by adding a participant!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {allResults.map((result, i) => {
                    const grade = getSUSGrade(parseFloat(result.susScore));
                    return (
                      <div key={result.id} style={{ background: '#f8f9fc', borderRadius: '12px', padding: '18px', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div>
                            <p style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: '#0f2744' }}>
                              P{i + 1} — {result.participant}
                            </p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
                              {result.studentType} · {result.university} · {result.date}
                            </p>
                          </div>
                          <div style={{ textAlign: 'center', background: 'linear-gradient(135deg,#0f2744,#2E75B6)', borderRadius: '12px', padding: '10px 20px' }}>
                            <p style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: '900', color: 'white' }}>{result.susScore}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>{grade.label}</p>
                          </div>
                        </div>
                        {result.interviewAnswers && result.interviewAnswers.some(a => a) && (
                          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
                            {result.interviewAnswers.map((ans, qi) => ans ? (
                              <div key={qi} style={{ marginBottom: '8px' }}>
                                <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '700', color: '#6b7280' }}>Q{qi + 1}: {['Ease of finding support', 'Chatbot relevance', 'Likelihood to reuse', 'Most useful feature', 'Suggested improvements'][qi]}</p>
                                <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>{ans}</p>
                              </div>
                            ) : null)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {allResults.length > 0 && (
                <button onClick={() => {
                  if (window.confirm('Clear all evaluation data? This cannot be undone.')) {
                    localStorage.removeItem('sus_results');
                    setAllResults([]);
                  }
                }} style={{ marginTop: '16px', padding: '10px 20px', background: '#fff0f0', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                  Clear All Data
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}