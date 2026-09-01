import { useState, useRef, useEffect } from 'react';
import { getCountryData } from './data/countries';
import { getUniversityData } from './data/universities';
import MentalHealthResources from './pages/MentalHealthResources';
import MoodTrackerPage from './pages/MoodTrackerPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EvaluationPage from './pages/EvaluationPage';
import LoginPage from './pages/LoginPage';

// ── CRISIS DETECTION ─────────────────────────────────────────────
const CRISIS_WORDS = ['suicide','kill myself','end my life','self harm','self-harm','want to die','hurt myself','no point living','overdose'];
function isCrisis(t) { return CRISIS_WORDS.some(w => t.toLowerCase().includes(w)); }

// ── CHATBOT LOGIC ─────────────────────────────────────────────────
function getBotReply(input, state) {
  const { name, country, university, countryData, universityData } = state;
  const t = input.toLowerCase().trim();

  const notNames = ['from','nepali','nepal','india','indian','pakistan','pakistani','nigerian','nigeria','chinese','bangladeshi','kenyan','ghanaian','hello','hi','hey','student','international','home','uk','abroad','stressed','anxious','help','sad','lonely','studying','university','college','am','is','my','name','i','the','a','an','and','or','but','yes','no','okay','ok','please','thanks','thank'];

  function extractName(str) {
    const patterns = [
      /my name is\s+([a-zA-Z]+)/i,
      /i am\s+([a-zA-Z]+)/i,
      /i'm\s+([a-zA-Z]+)/i,
      /call me\s+([a-zA-Z]+)/i,
      /^hi[,\s]+(?:i am|i'm)?\s*([a-zA-Z]+)/i,
      /^([a-zA-Z]{2,20})$/i,
    ];
    for (const p of patterns) {
      const m = str.match(p);
      if (m) {
        const word = m[1].toLowerCase();
        if (notNames.includes(word)) return null;
        if (getCountryData(word)) return null;
        if (getUniversityData(word)) return null;
        return m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
      }
    }
    return null;
  }

  const foundCountry = getCountryData(input);
  const foundUni = getUniversityData(input);

  // STEP 1: Get name
  if (!name) {
    if (foundCountry) {
      return { field: null, value: null, text: 'Thank you for sharing that! Before I look up resources for you, could you tell me your first name? Just type it and I will get started right away.' };
    }
    const detected = extractName(input);
    if (detected) {
      return { field: 'name', value: detected, text: 'Nice to meet you, ' + detected + '! I am really glad you reached out today.\n\nWhich country are you originally from?' };
    }
    return { field: null, value: null, text: 'I did not quite catch your name! Could you just tell me your first name? For example just type "Prestha" or "My name is John".' };
  }

  // STEP 2: Get country
  if (!country) {
    if (foundCountry) {
      const isUK = ['united kingdom','england','scotland','wales','northern ireland','british','home student'].some(k => t.includes(k));
      return {
        field: 'country', value: foundCountry.key, countryData: foundCountry,
        text: isUK
          ? 'Welcome home student! Here are some key resources:\n\n💰 Student Finance England: gov.uk/student-finance\n⚖️ Citizens Advice: citizensadvice.org.uk\n🔍 Turn2Us: turn2us.org.uk\n\nWhich university are you studying at?'
          : foundCountry.flag + ' ' + foundCountry.fact + '\n\nHere are UK organisations supporting students from ' + foundCountry.key.charAt(0).toUpperCase() + foundCountry.key.slice(1) + ':\n\n🏛️ ' + foundCountry.embassy.name + '\n🔗 ' + foundCountry.embassy.url + '\n\n' + foundCountry.orgs.map(o => '🤝 ' + o.name + '\n🔗 ' + o.url).join('\n\n') + '\n\nWhich university are you studying at?'
      };
    }
    if (t.includes("don't know") || t.includes('not sure') || t.includes('skip')) {
      return { field: 'country', value: 'unknown', countryData: null, text: 'No problem at all! Which university are you studying at, ' + name + '?' };
    }
    return { field: null, value: null, text: 'Which country are you originally from, ' + name + '? You can just type the country name for example "Nepal" or "I am from India".' };
  }

  // STEP 3: Get university
  if (!university) {
    if (foundUni) {
      return {
        field: 'university', value: foundUni.name, universityData: foundUni,
        text: '🏫 ' + foundUni.fact + '\n\nHere are the key support services at ' + foundUni.name + ':\n\n' + foundUni.links.map(l => '📌 ' + l.label + ' — ' + l.desc + '\n🔗 ' + l.url).join('\n\n') + '\n\nWhat would you like help with today, ' + name + '? I am here to listen 💙'
      };
    }
    if (t.includes("don't know") || t.includes('not sure') || t.includes('skip')) {
      return { field: 'university', value: 'unknown', universityData: null, text: 'No problem! What would you like help with today, ' + name + '? 💙' };
    }
    return { field: 'university', value: input.trim(), universityData: null, text: 'Great! For support at ' + input.trim() + ', visit your university website and look for the Student Union, Wellbeing team and Careers Centre.\n\nWhat would you like help with today, ' + name + '? 💙' };
  }

  // STEP 4: Topic responses
  if (t.includes('stress') || t.includes('overwhelm') || t.includes('pressure') || t.includes('anxious') || t.includes('anxiety') || t.includes('worry') || t.includes('worried'))
    return { text: 'I really hear you, ' + name + ' 💙 Stress and anxiety are incredibly common for university students and you are definitely not alone in this.\n\nSome things that can help right now:\n🌬️ Take 5 slow deep breaths\n🚶 Go for a short walk outside\n📝 Write down what is worrying you\n\n🏥 NHS Talking Therapies (free, no GP needed):\nnhs.uk/mental-health/talking-therapies\n\n📞 Samaritans (24/7, free): 116 123\n\nWould you like to talk more about what is causing you stress?' };

  if (t.includes('lonely') || t.includes('alone') || t.includes('homesick') || t.includes('miss home') || t.includes('isolated') || t.includes('no friends'))
    return { text: name + ', feeling lonely or homesick is one of the most common experiences for university students 💙 It takes time to settle in and that is completely okay.\n\nThings that genuinely help:\n🤝 Join a society or club at your university\n🌍 Find a group for people from your country on campus\n☕ Visit your student union — they have free events\n💬 Student Minds: studentminds.org.uk\n\nWould you like to talk more?' };

  if (t.includes('depress') || t.includes('sad') || t.includes('hopeless') || t.includes('worthless') || t.includes('crying') || t.includes('numb') || t.includes('empty'))
    return { text: name + ', thank you for trusting me with this. Your feelings are completely valid and they matter so much 💙\n\nPlease reach out to these free services:\n\n🏥 NHS Talking Therapies (free CBT):\nnhs.uk/mental-health/talking-therapies\n\n📞 Samaritans (24/7, free): 116 123\n\n💬 Shout (text support): Text SHOUT to 85258\n\n' + (universityData ? '🏫 ' + universityData.name + ' Wellbeing:\n' + (universityData.links[1]?.url || universityData.links[0]?.url || '') + '\n\n' : '') + 'You do not have to go through this alone. Would you like to talk more?' };

  if (t.includes('money') || t.includes('rent') || t.includes('finance') || t.includes('broke') || t.includes('afford') || t.includes('debt') || t.includes('food'))
    return { text: 'Financial stress is really tough, ' + name + ' 💙 More help is available than most students realise.\n\n💰 University hardship fund — ask student services today\n🏛️ Student Union emergency grants\n🔗 Turn2Us (benefits checker): turn2us.org.uk\n🍎 Many universities have a campus food bank\n\nWould you like help finding specific financial support?' };

  if (t.includes('visa') || t.includes('immigration') || t.includes('passport') || t.includes('leave to remain') || t.includes('student visa'))
    return { text: 'Visa questions are really important to get right, ' + name + ' 🛂\n\n🇬🇧 UK Student Visa: gov.uk/student-visa\n📞 UKCISA (free international student advice): ukcisa.org.uk\n\n' + (countryData ? '🏛️ ' + countryData.embassy.name + ':\n🔗 ' + countryData.embassy.url + '\n\n' : '') + 'Always get immigration advice from official sources. Is there a specific visa question I can help with?' };

  if (t.includes('fail') || t.includes('exam') || t.includes('grade') || t.includes('dissertation') || t.includes('assignment') || t.includes('deadline') || t.includes('academic'))
    return { text: 'Academic pressure is one of the biggest challenges at university, ' + name + ' 💙\n\nHere is what you can do:\n📚 Talk to your personal tutor about extensions\n' + (universityData ? '🏫 ' + universityData.name + ' Student Union:\n' + universityData.links[0].url + '\n' : '') + '📝 Apply for mitigating circumstances if personal issues affected your work\n\nYour grades do not define your worth. Would you like to talk more?' };

  if (t.includes('job') || t.includes('career') || t.includes('cv') || t.includes('intern') || t.includes('employ'))
    return { text: 'Great thinking about your career, ' + name + '! 💼\n\n' + (universityData ? '🏫 ' + universityData.name + ' Careers Centre:\n🔗 ' + (universityData.links.find(l => l.label.toLowerCase().includes('career'))?.url || universityData.links[0].url) + '\n\n' : '') + '📋 Prospects UK: prospects.ac.uk\n💼 Target Jobs: targetjobs.co.uk\n\nWould you like tips on writing a strong CV?' };

  if (t.includes('housing') || t.includes('accommodation') || t.includes('landlord') || t.includes('flat') || t.includes('evict'))
    return { text: 'Housing issues can be really stressful, ' + name + ' 🏠\n\n🏠 Shelter UK (free housing advice): shelter.org.uk\n📋 Citizens Advice (tenant rights): citizensadvice.org.uk\n\nWould you like more specific advice?' };

  if (t.includes('racist') || t.includes('discriminat') || t.includes('bully') || t.includes('harass'))
    return { text: name + ', I am so sorry to hear this. Bullying and discrimination are completely unacceptable 💙\n\nPlease take these steps:\n1. Contact your Student Union immediately\n' + (universityData ? '🔗 ' + universityData.links[0].url + '\n' : '') + '2. Report it formally to your university\n3. Keep a written record of what happened\n\nYou have every right to feel safe. Would you like more guidance?' };

  if (t.includes('thank') || t.includes('thanks') || t.includes('helpful'))
    return { text: 'You are so welcome, ' + name + '! It means a lot that I could help 😊 Take good care of yourself 💙' };

  if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
    return { text: 'Hello ' + name + '! 😊 I am here to support you. How are you feeling today? Is there anything on your mind you would like to talk about?' };

  return { text: 'I hear you, ' + name + ' 💙 Thank you for sharing that with me.\n\nCould you tell me a bit more about what you are going through? Whether it is stress, loneliness, money, visa questions, academic pressure or anything else, I am here to help.\n\nWhat would you like support with?' };
}

// ── CRISIS MODAL ──────────────────────────────────────────────────
function CrisisModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '36px', maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>💙</div>
        <h2 style={{ color: '#C00000', margin: '0 0 12px', fontSize: '22px' }}>You Are Not Alone</h2>
        <p style={{ color: '#555', margin: '0 0 24px', fontSize: '14px', lineHeight: '1.7' }}>We noticed something in your message that concerns us. Please reach out for immediate support right now.</p>
        <div style={{ background: '#FDE8E8', borderRadius: '14px', padding: '18px', marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px', fontWeight: '700', color: '#C00000', fontSize: '14px' }}>📞 Samaritans — Free · 24/7 · Confidential</p>
          <p style={{ margin: '0 0 4px', fontSize: '34px', fontWeight: '900', color: '#C00000', letterSpacing: '3px' }}>116 123</p>
        </div>
        <div style={{ background: '#EBF3FB', borderRadius: '14px', padding: '14px', marginBottom: '12px' }}>
          <p style={{ margin: '0 0 2px', fontWeight: '700', color: '#1a3a5c', fontSize: '13px' }}>💬 Shout Crisis Text Line</p>
          <p style={{ margin: 0, fontWeight: '700', color: '#1a3a5c', fontSize: '16px' }}>Text SHOUT to 85258</p>
        </div>
        <div style={{ background: '#EBF3FB', borderRadius: '14px', padding: '14px', marginBottom: '24px' }}>
          <p style={{ margin: 0, fontWeight: '900', fontSize: '26px', color: '#1a3a5c' }}>🚑 Emergency: 999</p>
        </div>
        <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '14px', padding: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', width: '100%' }}>
          I am safe — return to MindBridge
        </button>
      </div>
    </div>
  );
}

// ── CHAT PAGE ─────────────────────────────────────────────────────
function ChatPage({ messages, input, setInput, sendMessage, student, mood }) {
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', background: 'white', borderBottom: '1px solid #eaecf0' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '800', color: '#0f2744' }}>💬 Chat Support</h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>Tell me what is on your mind — I am here to listen and help</p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#f8f9fc' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '10px' }}>
            {msg.sender === 'bot' && (
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#1a3a5c,#2E75B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>💙</div>
            )}
            <div style={{ maxWidth: '65%', padding: '13px 17px', borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.sender === 'user' ? 'linear-gradient(135deg,#2E75B6,#1a3a5c)' : 'white', color: msg.sender === 'user' ? 'white' : '#222', fontSize: '14px', lineHeight: '1.7', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', whiteSpace: 'pre-wrap' }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '16px 28px', background: 'white', borderTop: '1px solid #eaecf0', display: 'flex', gap: '10px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type your message and press Enter..." style={{ flex: 1, padding: '13px 18px', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={sendMessage} style={{ background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '12px', padding: '13px 28px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>Send</button>
      </div>
    </div>
  );
}

// ── UNIVERSITY PAGE ───────────────────────────────────────────────
function UniversityPage({ universityData, university }) {
  if (!universityData) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: '#f8f9fc' }}>
      <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '16px', border: '1px solid #eaecf0' }}>
        <p style={{ fontSize: '64px', margin: '0 0 20px' }}>🏫</p>
        <h3 style={{ margin: '0 0 8px', color: '#0f2744' }}>Tell me your university first</h3>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>Go to the Chat tab and tell MindBridge which university you attend.</p>
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: '#f8f9fc' }}>
      <div style={{ background: 'linear-gradient(135deg,#0f2744,#2E75B6)', borderRadius: '16px', padding: '28px', color: 'white', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '800' }}>🏫 {universityData.name}</h2>
        <p style={{ margin: 0, opacity: 0.85, fontSize: '15px', lineHeight: '1.6' }}>{universityData.fact}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }}>
        {universityData.links.map(link => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{ background: 'white', borderRadius: '14px', padding: '20px', textDecoration: 'none', display: 'block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #eaecf0' }}>
            <p style={{ margin: '0 0 6px', fontWeight: '800', color: '#0f2744', fontSize: '15px' }}>📌 {link.label}</p>
            <p style={{ margin: '0 0 12px', color: '#6b7280', fontSize: '13px' }}>{link.desc}</p>
            <p style={{ margin: 0, color: '#2E75B6', fontSize: '12px', wordBreak: 'break-all' }}>{link.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── COUNTRY PAGE ──────────────────────────────────────────────────
function CountryPage({ countryData, country }) {
  if (!countryData) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: '#f8f9fc' }}>
      <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '16px', border: '1px solid #eaecf0' }}>
        <p style={{ fontSize: '64px', margin: '0 0 20px' }}>🌍</p>
        <h3 style={{ margin: '0 0 8px', color: '#0f2744' }}>Tell me your country first</h3>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>Go to the Chat tab and tell MindBridge which country you are from.</p>
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: '#f8f9fc' }}>
      <div style={{ background: 'linear-gradient(135deg,#0f2744,#2E75B6)', borderRadius: '16px', padding: '28px', color: 'white', marginBottom: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span style={{ fontSize: '56px' }}>{countryData.flag}</span>
        <div>
          <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '800', textTransform: 'capitalize' }}>{country}</h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '15px', lineHeight: '1.6' }}>{countryData.fact}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
        <a href={countryData.embassy.url} target="_blank" rel="noreferrer" style={{ background: 'white', borderRadius: '14px', padding: '20px', textDecoration: 'none', display: 'block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '2px solid #EBF3FB' }}>
          <p style={{ margin: '0 0 6px', fontWeight: '800', color: '#0f2744', fontSize: '15px' }}>🏛️ {countryData.embassy.name}</p>
          <p style={{ margin: '0 0 12px', color: '#6b7280', fontSize: '13px' }}>Official embassy — passport, visa, consular services</p>
          <p style={{ margin: 0, color: '#2E75B6', fontSize: '12px' }}>{countryData.embassy.url}</p>
        </a>
        {countryData.orgs.map(org => (
          <a key={org.name} href={org.url} target="_blank" rel="noreferrer" style={{ background: 'white', borderRadius: '14px', padding: '20px', textDecoration: 'none', display: 'block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #eaecf0' }}>
            <p style={{ margin: '0 0 6px', fontWeight: '800', color: '#0f2744', fontSize: '15px' }}>🤝 {org.name}</p>
            <p style={{ margin: 0, color: '#2E75B6', fontSize: '12px' }}>{org.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('main');
  const [mood, setMood] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [student, setStudent] = useState({ name: '', country: '', university: '', countryData: null, universityData: null });
  const [showCrisis, setShowCrisis] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ currentPassword: '', newPassword: '' });
  const [profileMsg, setProfileMsg] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(saved);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      const firstName = parsedUser.name ? parsedUser.name.split(' ')[0] : '';
      setStudent(p => ({ ...p, name: firstName }));
      const token = localStorage.getItem('token');
      if (token && !token.startsWith('local-')) {
        fetch(`${process.env.REACT_APP_API_URL}/api/mood/history`, { headers: { 'Authorization': 'Bearer ' + token } })
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              const formatted = data.map(m => ({
                date: new Date(m.createdAt).toLocaleDateString('en-GB'),
                label: m.label, value: m.score, note: m.note || '',
                time: new Date(m.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
              }));
              setMoodHistory(formatted);
              localStorage.setItem('moodHistory', JSON.stringify(formatted));
            }
          }).catch(() => {});
      }
    }
    setAuthChecked(true);
  }, []);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setScreen('main');
    setActiveTab('home');
    const firstName = loggedInUser.name ? loggedInUser.name.split(' ')[0] : '';
    setStudent(p => ({ ...p, name: firstName }));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setScreen('main');
    setMessages([]);
    setStudent({ name: '', country: '', university: '', countryData: null, universityData: null });
    setActiveTab('home');
  }

  function selectMood(label, value) {
    const entry = { date: new Date().toLocaleDateString('en-GB'), label, value };
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const updated = [...history.filter(m => m.date !== entry.date), entry].slice(-30);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodHistory(updated);
    setMood(label);
    setMessages([{ sender: 'bot', text: 'Hello! Welcome to MindBridge 💙\n\nI can see you are feeling ' + label + ' today — thank you for sharing that. Whether you are a home student or studying here from abroad, I am here to support you.\n\nCould you start by telling me your name?' }]);
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    if (isCrisis(userMsg)) { setMessages(p => [...p, { sender: 'user', text: userMsg }]); setShowCrisis(true); return; }
    const newMsgs = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMsgs);
    const reply = getBotReply(userMsg, student);
    if (reply.field === 'name') setStudent(p => ({ ...p, name: reply.value }));
    if (reply.field === 'country') setStudent(p => ({ ...p, country: reply.value, countryData: reply.countryData }));
    if (reply.field === 'university') setStudent(p => ({ ...p, university: reply.value, universityData: reply.universityData }));
    setTimeout(() => setMessages(p => [...p, { sender: 'bot', text: reply.text }]), 350);
  }

  if (!authChecked) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial', color: '#0f2744', fontSize: '18px' }}>💙 Loading MindBridge...</div>;
  if (!user) return <LoginPage onLogin={handleLogin} />;

  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'chat', icon: '💬', label: 'Chat Support' },
    { id: 'mood', icon: '📊', label: 'Mood Tracker' },
    { id: 'nhs', icon: '🏥', label: 'Mental Health Resources' },
    { id: 'university', icon: '🏫', label: 'My University' },
    { id: 'country', icon: '🌍', label: 'My Country Support' },
    { id: 'profile', icon: '👤', label: 'My Profile' },
    { id: 'evaluation', icon: '🔬', label: 'User Evaluation' },
  ];

  const moodEmoji = { 'Very Low': '😔', 'Not Great': '😕', 'Okay': '😐', 'Good': '🙂', 'Great': '😊' };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Segoe UI',Arial,sans-serif", display: 'flex', flexDirection: 'column' }}>
      {showCrisis && <CrisisModal onClose={() => setShowCrisis(false)} />}

      {/* NAVBAR */}
      <nav style={{ background: 'linear-gradient(135deg,#0f2744,#2E75B6)', color: 'white', padding: '0 28px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 20px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>💙 MindBridge</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px 12px', fontSize: '12px', fontWeight: '600' }}>For University Students in the UK</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setActiveTab('profile')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', color: 'white', cursor: 'pointer' }}>
              👤 {user?.name}
            </button>
          </div>
          <button onClick={() => setShowCrisis(true)} style={{ background: '#C00000', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>🚨 Crisis: 116 123</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 62px)', overflow: 'hidden' }}>
        {/* SIDEBAR */}
        <aside style={{ width: '240px', background: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Today's Mood</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f9fc', borderRadius: '10px', padding: '10px 14px' }}>
              <span style={{ fontSize: '22px' }}>{moodEmoji[mood] || '😊'}</span>
              <span style={{ fontWeight: '700', color: '#1a3a5c', fontSize: '14px' }}>{mood || 'Not logged yet'}</span>
            </div>
          </div>
          <div style={{ padding: '14px', flex: 1 }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Navigation</p>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '3px', background: activeTab === tab.id ? '#EBF3FB' : 'transparent', color: activeTab === tab.id ? '#1a3a5c' : '#6b7280', fontWeight: activeTab === tab.id ? '700' : '400', fontSize: '13px', textAlign: 'left' }}>
                <span style={{ fontSize: '16px' }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ background: '#FDE8E8', borderRadius: '12px', padding: '14px' }}>
              <p style={{ margin: '0 0 2px', fontWeight: '700', color: '#C00000', fontSize: '13px' }}>🚨 In Crisis?</p>
              <p style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: '#C00000' }}>116 123</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>Samaritans · Free · 24/7</p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'home' && <HomePage user={user} mood={mood} onSelectMood={selectMood} setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <ChatPage messages={messages} input={input} setInput={setInput} sendMessage={sendMessage} student={student} mood={mood} />}
          {activeTab === 'mood' && <MoodTrackerPage moodHistory={moodHistory} setMoodHistory={setMoodHistory} />}
          {activeTab === 'nhs' && <MentalHealthResources />}
          {activeTab === 'university' && <UniversityPage universityData={student.universityData} university={student.university} />}
          {activeTab === 'country' && <CountryPage countryData={student.countryData} country={student.country} />}
          {activeTab === 'profile' && <ProfilePage user={user} setUser={setUser} moodHistory={moodHistory} onLogout={handleLogout} />}
          {activeTab === 'evaluation' && <EvaluationPage user={user} />}
        </main>
      </div>
    </div>
  );
}