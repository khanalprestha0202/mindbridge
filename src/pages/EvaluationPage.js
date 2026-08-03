import { useState } from 'react';

const SUS_QUESTIONS = [
  'I would use MindBridge regularly.',
  'MindBridge was easy to use.',
  'The chatbot gave me helpful and relevant responses.',
  'I found the mental health resources useful.',
  'I felt supported when using MindBridge.',
  'The mood tracker was easy to understand.',
  'I would recommend MindBridge to other students.',
  'MindBridge helped me find the support I needed.',
  'The app felt relevant to my situation as a student.',
  'Overall I am satisfied with MindBridge.',
];

const OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const INTERVIEW_QUESTIONS = [
  'What did you find most helpful about MindBridge?',
  'Was there anything you found confusing or difficult to use?',
  'Would you use MindBridge again? Why or why not?',
  'What would you like to see improved in MindBridge?',
  'Any other comments or suggestions?',
];

export default function EvaluationPage({ user }) {
  const [step, setStep] = useState('intro');
  const [responses, setResponses] = useState(Array(10).fill(0));
  const [interviewAnswers, setInterviewAnswers] = useState(Array(5).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted] = useState(false);

  function handleResponse(qIndex, value) {
    const updated = [...responses];
    updated[qIndex] = value;
    setResponses(updated);
  }

  function calculateSUS() {
    let score = 0;
    responses.forEach((r, i) => {
      if (i % 2 === 0) score += r - 1;
      else score += 5 - r;
    });
    return score * 2.5;
  }

  async function handleSubmit() {
    if (responses.includes(0)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setSubmitting(true);
    const susScore = calculateSUS();
    const evaluationData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      susScore: susScore.toFixed(1),
      susResponses: responses,
      interviewAnswers,
      submittedAt: new Date().toISOString(),
    };
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(evaluationData),
      });
    } catch (err) {
      const saved = JSON.parse(localStorage.getItem('sus_results_local') || '[]');
      saved.push(evaluationData);
      localStorage.setItem('sus_results_local', JSON.stringify(saved));
    }

    setSubmitting(false);
    setStep('thankyou');
  }



  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <div style={{ background: 'linear-gradient(135deg, #0f2744, #2E75B6)', padding: '24px 32px', color: 'white' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800' }}>MindBridge Evaluation</h1>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Help us improve MindBridge by sharing your experience</p>
      </div>

      <div style={{ padding: '28px 32px', maxWidth: '700px' }}>

        {/* INTRO */}
        {step === 'intro' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '0 0 14px', fontSize: '20px', fontWeight: '800', color: '#0f2744' }}>
              Hi {user?.name?.split(' ')[0]}, thank you for trying MindBridge!
            </h2>
            <p style={{ margin: '0 0 14px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
              This short evaluation is part of a Masters dissertation research project at St Mary's University, Twickenham. It will take about 5 minutes to complete.
            </p>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
              There are two parts. First you will answer 10 simple statements about your experience by ticking one option. Then you will answer 5 short open questions in your own words.
            </p>
            <div style={{ background: '#f0f7ff', borderRadius: '10px', padding: '16px', marginBottom: '24px', border: '1px solid #bfdbfe' }}>
              <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#1e40af' }}>Please note</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.65' }}>
                Your answers are completely confidential and will only be used for academic research. You can stop at any time. You will not be able to see your results.
              </p>
            </div>
            <button onClick={() => setStep('sus')} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px 32px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
              Start Evaluation
            </button>
          </div>
        )}

        {/* SUS QUESTIONS */}
        {step === 'sus' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>Part 1 of 2 — Quick Questions</h2>
            <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280' }}>
              Read each statement and tick the option that best matches how you feel about MindBridge.
            </p>

            {SUS_QUESTIONS.map((question, qIndex) => (
              <div key={qIndex} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: qIndex < 9 ? '1px solid #f3f4f6' : 'none' }}>
                <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: '#0f2744' }}>
                  {qIndex + 1}. {question}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {OPTIONS.map(option => (
                    <label key={option.value} onClick={() => handleResponse(qIndex, option.value)} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                      border: responses[qIndex] === option.value ? '2px solid #2E75B6' : '2px solid #e5e7eb',
                      background: responses[qIndex] === option.value ? '#EBF3FB' : 'white',
                      transition: 'all 0.15s',
                    }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                        border: responses[qIndex] === option.value ? '6px solid #2E75B6' : '2px solid #d1d5db',
                        background: 'white', transition: 'all 0.15s',
                      }} />
                      <span style={{ fontSize: '13px', fontWeight: responses[qIndex] === option.value ? '700' : '400', color: responses[qIndex] === option.value ? '#1a3a5c' : '#374151' }}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                {responses.filter(r => r > 0).length} of 10 answered
              </p>
              <button onClick={() => setStep('interview')} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 28px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* INTERVIEW */}
        {step === 'interview' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#0f2744' }}>Part 2 of 2 — Your Thoughts</h2>
            <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280' }}>
              Just write whatever comes to mind. There are no right or wrong answers. You can skip any question.
            </p>

            {INTERVIEW_QUESTIONS.map((question, i) => (
              <div key={i} style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0f2744', marginBottom: '8px' }}>
                  {i + 1}. {question}
                </label>
                <textarea
                  value={interviewAnswers[i]}
                  onChange={e => {
                    const updated = [...interviewAnswers];
                    updated[i] = e.target.value;
                    setInterviewAnswers(updated);
                  }}
                  placeholder="Write your answer here... (optional)"
                  rows={3}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: '1.6' }}
                  onFocus={e => e.target.style.borderColor = '#2E75B6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setStep('sus')} style={{ padding: '12px 24px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                Back
              </button>
              <button onClick={handleSubmit} disabled={submitting} style={{ padding: '12px 32px', background: submitting ? '#94a3b8' : 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '10px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '14px' }}>
                {submitting ? 'Submitting...' : 'Submit Evaluation'}
              </button>
            </div>
          </div>
        )}

        {/* THANK YOU */}
        {step === 'thankyou' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px 32px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>💙</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: '800', color: '#0f2744' }}>Thank you so much!</h2>
            <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#374151', lineHeight: '1.75', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
              Your feedback has been saved and will be used to make MindBridge better for university students across the UK.
            </p>
            <p style={{ margin: '0 0 28px', fontSize: '13px', color: '#9ca3af', lineHeight: '1.7' }}>
              Your responses are kept confidential and will only be used for academic research as part of a Masters dissertation at St Mary's University, Twickenham.
            </p>
            <div style={{ background: '#f0f7ff', borderRadius: '12px', padding: '16px 20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #bfdbfe' }}>
              <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#1e40af' }}>Your feedback makes a real difference</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                Every response helps shape MindBridge into a better tool for students across the UK. Thank you for being part of this research.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}