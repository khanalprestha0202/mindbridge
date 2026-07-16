import { useState, useRef, useEffect } from 'react';
import { getCountryData } from './data/countries';
import { getUniversityData } from './data/universities';
import MentalHealthResources from './pages/MentalHealthResources';
import MoodTrackerPage from './pages/MoodTrackerPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// ── CRISIS DETECTION ─────────────────────────────────────────────
const CRISIS_WORDS = ['suicide','kill myself','end my life','self harm','self-harm','want to die','hurt myself','no point living','overdose'];
function isCrisis(t) { return CRISIS_WORDS.some(w => t.toLowerCase().includes(w)); }

// ── CHATBOT LOGIC ─────────────────────────────────────────────────
function getBotReply(input, state) {
  const { name, country, university, countryData, universityData } = state;
  const t = input.toLowerCase();

  // Check if user is correcting country mid-conversation — only if country already set
  if (name && country && (t.includes('i said') || t.includes('actually from') || t.includes('no i am from') || t.includes('i mean') || t.includes('correction'))) {
    const found = getCountryData(input);
    if (found) {
      return {
        field: 'country', value: found.key, countryData: found,
        text: 'Of course! ' + found.flag + ' ' + found.fact + '\n\nHere are UK organisations supporting students from ' + found.key.charAt(0).toUpperCase() + found.key.slice(1) + ':\n\n' + found.orgs.map(o => '🤝 ' + o.name + '\n🔗 ' + o.url).join('\n\n') + '\n\n' + (university ? 'What would you like help with today, ' + name + '? 💙' : 'Which university are you studying at?')
      };
    }
  }

  // Check if user mentions a new university mid-conversation
  if (name && (t.includes('i study at') || t.includes('i go to') || t.includes('i attend') || t.includes('my uni') || t.includes('my university'))) {
    const found = getUniversityData(input);
    if (found) {
      return {
        field: 'university', value: found.name, universityData: found,
        text: '🏫 ' + found.fact + '\n\nHere are the key support services at ' + found.name + ':\n\n' + found.links.map(l => '📌 ' + l.label + ' — ' + l.desc + '\n🔗 ' + l.url).join('\n\n') + '\n\nWhat would you like help with today, ' + name + '? I am here to listen 💙'
      };
    }
  }

  // Step 1 — collect name
  if (!name) {
    const namePatterns = [
      /(?:i am|i'm|my name is|call me|this is)\s+([a-zA-Z]+)/i,
      /^([a-zA-Z]{2,15})$/i,
      /^hi[,\s]+(?:i am|i'm|my name is)?\s*([a-zA-Z]+)/i,
    ];
    let detectedName = null;
    for (const pattern of namePatterns) {
      const match = input.match(pattern);
      if (match) { detectedName = match[1]; break; }
    }
    const skipWords = ['from','nepali','nepal','india','indian','pakistan','nigerian','nigeria','chinese','bangladeshi','kenyan','hello','hi','hey','student','international','home','uk','abroad','stressed','anxious','help','sad','lonely'];
    if (detectedName && skipWords.includes(detectedName.toLowerCase())) detectedName = null;
    if (!detectedName) {
      return { field: null, value: null, text: 'I did not quite catch your name there! 😊 Could you just tell me your first name? For example — just type "Prestha" or "My name is Prestha".' };
    }
    const n = detectedName.charAt(0).toUpperCase() + detectedName.slice(1).toLowerCase();
    return { field: 'name', value: n, text: 'Nice to meet you, ' + n + '! 😊 I am really glad you reached out today.\n\nWhich country are you originally from?' };
  }

  // Step 2 — collect country
  if (!country) {
    const found = getCountryData(input);
    if (found) {
      const isUK = ['united kingdom','england','scotland','wales','northern ireland'].some(k => t.includes(k));
      return {
        field: 'country', value: found.key, countryData: found,
        text: isUK
          ? '🇬🇧 Welcome, home student!\n\nAs a UK home student here are some key resources:\n\n💰 Student Finance England: gov.uk/student-finance\n⚖️ Citizens Advice: citizensadvice.org.uk\n🔍 Turn2Us: turn2us.org.uk\n\nWhich university are you studying at?'
          : found.flag + ' ' + found.fact + '\n\nHere are UK organisations supporting students from ' + found.key.charAt(0).toUpperCase() + found.key.slice(1) + ':\n\n🏛️ ' + found.embassy.name + '\n🔗 ' + found.embassy.url + '\n\n' + found.orgs.map(o => '🤝 ' + o.name + '\n🔗 ' + o.url).join('\n\n') + '\n\nWhich university are you studying at?'
      };
    }
    return { field: 'country', value: input.trim(), countryData: null, text: 'What a wonderful place to be from! 🌍\n\nFor support from your home country, search "' + input.trim() + ' embassy London".\n\nWhich university are you studying at?' };
  }

  // Step 3 — collect university
  if (!university) {
    const found = getUniversityData(input);
    if (found) {
      return {
        field: 'university', value: found.name, universityData: found,
        text: '🏫 ' + found.fact + '\n\nHere are the key support services at ' + found.name + ':\n\n' + found.links.map(l => '📌 ' + l.label + ' — ' + l.desc + '\n🔗 ' + l.url).join('\n\n') + '\n\nWhat would you like help with today, ' + name + '? I am here to listen 💙'
      };
    }
    if (t.includes("don't know") || t.includes('not sure') || t.includes('skip')) {
      return { field: 'university', value: 'unknown', universityData: null, text: 'No problem at all ' + name + '! You can always tell me your university later.\n\nWhat would you like help with today? Whether it is stress, housing, loneliness, careers or anything else — I am here 💙' };
    }
    return { field: 'university', value: input.trim(), universityData: null, text: input.trim() + ' sounds like a great place to study! 🏫\n\nFor support there, visit your university website and look for Student Union, Wellbeing and Careers.\n\nWhat would you like help with today, ' + name + '? 💙' };
  }

  // Topic responses
  if (t.includes('stress') || t.includes('anxious') || t.includes('anxiety') || t.includes('overwhelm') || t.includes('pressure'))
    return { text: `I really hear you, ${name} 💙 Stress and anxiety are incredibly common for university students — you are not alone.\n\nSome immediate things that help:\n🌬️ Take 5 slow deep breaths right now\n🚶 Go for a short walk outside\n📝 Write down what is worrying you\n💬 Talk to your university wellbeing team\n\n🏥 NHS Talking Therapies (free): nhs.uk/mental-health/talking-therapies\n📞 Samaritans (24/7, free): 116 123\n\nWould you like to talk more about what is causing you stress?` };

  if (t.includes('lonely') || t.includes('alone') || t.includes('homesick') || t.includes('miss home') || t.includes('isolated'))
    return { text: `${name}, feeling lonely or homesick is one of the most common experiences for university students 💙\n\nThings that really help:\n🤝 Join your university international or home students society\n🌍 Find a society for your culture or interests on campus\n☕ Visit your student union — they have free events\n💬 Student Minds: studentminds.org.uk\n\n${countryData ? `Also — ${countryData.embassy.name} can connect you with people from home 🙏` : ''}\n\nWould you like to talk more?` };

  if (t.includes('bully') || t.includes('harass') || t.includes('discriminat') || t.includes('racist') || t.includes('abuse'))
    return { text: `${name}, I am so sorry to hear this. Bullying and discrimination are completely unacceptable 💙\n\nPlease take these steps immediately:\n1️⃣ Contact your Student Union\n${universityData ? `🔗 ${universityData.links[0].url}` : '🔗 Visit your university website — Student Union'}\n2️⃣ Report it formally to your university\n3️⃣ Keep a written record — dates, times, what happened\n4️⃣ Speak to your personal tutor or wellbeing team\n\nYou have every right to feel safe. Would you like more guidance?` };

  if (t.includes('job') || t.includes('career') || t.includes('cv') || t.includes('work') || t.includes('employ') || t.includes('internship'))
    return { text: `Great thinking about your career, ${name}! 💼\n\n${universityData ? `🏫 ${universityData.name} Careers Centre:\n🔗 ${universityData.links.find(l => l.label.toLowerCase().includes('career'))?.url}\nFree CV reviews, mock interviews, job listings!\n\n` : ''}📋 Prospects UK: prospects.ac.uk\n💼 Target Jobs: targetjobs.co.uk\n🔗 LinkedIn: linkedin.com\n🇬🇧 Graduate Visa (stay in UK 2 years after graduating): gov.uk/graduate-visa\n\nWould you like tips on writing a strong CV?` };

  if (t.includes('visa') || t.includes('immigration') || t.includes('passport') || t.includes('leave to remain'))
    return { text: `Visa questions are very important, ${name} 🛂\n\n🇬🇧 UK Visas & Immigration: gov.uk/browse/visas-immigration\n🎓 Student visa: gov.uk/student-visa\n📞 UKCISA (free international student advice): ukcisa.org.uk\n\n${countryData ? `🏛️ ${countryData.embassy.name}:\n🔗 ${countryData.embassy.url}\n\n` : ''}⚠️ Always get immigration advice from official sources or a regulated solicitor.\n\nIs there a specific visa issue I can help with?` };

  if (t.includes('money') || t.includes('rent') || t.includes('finance') || t.includes('broke') || t.includes('afford') || t.includes('food'))
    return { text: `Financial stress is really tough, ${name} 💙 More help is available than most students realise.\n\n💰 University hardship fund — ask student services today\n🏛️ Student Union emergency grants — ask your union directly\n🔗 Turn2Us (benefits checker): turn2us.org.uk\n🍎 Many universities have a campus food bank\n🏦 Monzo and Starling: free bank accounts great for students\n\nWould you like help finding specific financial support?` };

  if (t.includes('student loan') || t.includes('tuition') || t.includes('maintenance') || t.includes('student finance'))
    return { text: `Student finance can be confusing, ${name} 💙\n\n🎓 Student Finance England:\ngov.uk/student-finance\n\n📞 Student Finance helpline: 0300 100 0607\n\n${universityData ? `🏫 ${universityData.name} student services can also advise on emergency funds and bursaries.` : ''}\n\nWould you like more specific advice about your student finance situation?` };

  if (t.includes('depress') || t.includes('sad') || t.includes('hopeless') || t.includes('worthless') || t.includes('crying') || t.includes('numb'))
    return { text: `${name}, thank you for trusting me with this. Your feelings are real and they matter so much 💙\n\nPlease reach out to these free services:\n\n🏥 NHS Talking Therapies (free CBT):\nnhs.uk/mental-health/talking-therapies\n\n📞 Samaritans (24/7, free): 116 123\n\n💬 Student Minds: studentminds.org.uk\n\n${universityData ? `🏫 ${universityData.name} Wellbeing:\n${universityData.links[1]?.url}\n\n` : ''}You do not have to go through this alone. Would you like to talk more?` };

  if (t.includes('disabled') || t.includes('disability') || t.includes('dyslexia') || t.includes('adhd') || t.includes('autism'))
    return { text: `${name}, support for students with disabilities and learning differences is available and you are entitled to it 💙\n\n♿ Disabled Students Allowance (DSA):\ngov.uk/disabled-students-allowance-dsa\n\n${universityData ? `🏫 Contact ${universityData.name} disability team for a free needs assessment — they can arrange extra time, specialist equipment, and more.` : '📋 Contact your university disability or student support team for a free assessment.'}\n\nWould you like more information?` };

  if (t.includes('fail') || t.includes('exam') || t.includes('grade') || t.includes('dissertation') || t.includes('assignment') || t.includes('academic'))
    return { text: `Academic pressure is one of the biggest challenges for students, ${name} 💙\n\nHere is what you can do:\n\n📚 Talk to your personal tutor — they can advise on extensions\n${universityData ? `🏫 ${universityData.name} Student Union — free academic advice:\n${universityData.links[0].url}\n` : ''}📝 Apply for mitigating circumstances if personal issues affected your work\n\n💙 Your grades do not define your worth. Would you like to talk more?` };

  if (t.includes('accommodation') || t.includes('housing') || t.includes('flat') || t.includes('landlord') || t.includes('room'))
    return { text: `Housing issues can be really stressful, ${name} 🏠\n\n${universityData ? `🏫 ${universityData.name} Accommodation:\n${universityData.links.find(l => l.label.toLowerCase().includes('accomm'))?.url || 'Check your university website'}\n\n` : ''}🏠 Shelter UK (free housing advice): shelter.org.uk\n📋 Citizens Advice (tenant rights): citizensadvice.org.uk\n\n⚠️ Never pay a deposit without seeing the property in person.\n\nWould you like more specific advice?` };

  if (t.includes('nhs') || t.includes('counsel') || t.includes('therap') || t.includes('doctor') || t.includes('mental health support'))
    return { text: `Here are free mental health services available to all UK students, ${name} 💙\n\n🏥 NHS Talking Therapies (free CBT): nhs.uk/mental-health/talking-therapies\n📞 Samaritans (24/7 free): 116 123\n💬 Shout: text SHOUT to 85258\n🎓 Student Minds: studentminds.org.uk\n🧠 Mind UK: mind.org.uk\n💜 CALM: thecalmzone.net\n\nYou can also visit the Mental Health Resources tab in the sidebar for the full list with direct links.\n\nAll of these are completely free. Would you like more information?` };

  if (t.includes('thank') || t.includes('thanks') || t.includes('helpful'))
    return { text: `You are so welcome, ${name}! 😊 I am always here whenever you need to talk.\n\nTake care of yourself 💙` };

  return { text: `I hear you, ${name} 💙 Thank you for sharing that with me.\n\nCould you tell me a bit more about what you are going through? I want to make sure I give you the most helpful support.\n\nRemember — whatever you are dealing with, you are not alone.` };
}

// ── MOOD SCREEN ───────────────────────────────────────────────────
function MoodScreen({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const moods = [
    { e: '😔', l: 'Very Low', v: 1, color: '#6B7280', bg: '#F3F4F6', desc: 'I am really struggling today' },
    { e: '😕', l: 'Not Great', v: 2, color: '#F59E0B', bg: '#FFFBEB', desc: 'Things are a bit tough' },
    { e: '😐', l: 'Okay', v: 3, color: '#3B82F6', bg: '#EFF6FF', desc: 'Getting through the day' },
    { e: '🙂', l: 'Good', v: 4, color: '#10B981', bg: '#ECFDF5', desc: 'Feeling pretty good' },
    { e: '😊', l: 'Great', v: 5, color: '#8B5CF6', bg: '#F5F3FF', desc: 'Having a great day!' },
  ];

  function handleSelect(mood) {
    setSelected(mood.v);
    setAnimating(true);
    setTimeout(() => onSelect(mood.l, mood.v), 800);
  }

  const time = new Date().getHours();
  const greeting = time < 12 ? 'Good morning' : time < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a1628 0%, #0f2744 60%, #1a3a5c 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,117,182,0.15) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '700px', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #2E75B6, #5ba3d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px', boxShadow: '0 16px 48px rgba(46,117,182,0.4)' }}>💙</div>
          <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-1px' }}>MindBridge</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', margin: 0 }}>Your Mental Health Companion</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '36px 32px 40px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>{greeting} 👋</p>
          <h2 style={{ color: 'white', fontSize: '26px', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.5px' }}>How are you feeling today?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '0 0 36px' }}>Select the emoji that best describes your mood right now</p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            {moods.map(mood => (
              <button key={mood.v} onClick={() => handleSelect(mood)} style={{
                background: selected === mood.v ? mood.bg : 'rgba(255,255,255,0.08)',
                border: selected === mood.v ? `2px solid ${mood.color}` : '2px solid rgba(255,255,255,0.1)',
                borderRadius: '16px', padding: '20px 16px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                minWidth: '100px', flex: '1', maxWidth: '120px',
                transform: selected === mood.v ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.2s ease',
                boxShadow: selected === mood.v ? `0 8px 24px ${mood.color}40` : 'none',
              }}>
                <span style={{ fontSize: '42px', lineHeight: 1 }}>{mood.e}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: selected === mood.v ? mood.color : 'rgba(255,255,255,0.8)' }}>{mood.l}</span>
                {selected === mood.v && <span style={{ fontSize: '11px', color: mood.color, lineHeight: '1.4', textAlign: 'center' }}>{mood.desc}</span>}
              </button>
            ))}
          </div>

          {animating && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ color: 'white', fontSize: '14px', margin: 0, fontWeight: '600' }}>Opening MindBridge...</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'center' }}>
          {[{ label: 'Countries', value: '40+' }, { label: 'UK Universities', value: '35+' }, { label: 'Free NHS Links', value: '8' }].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 20px', border: '1px solid rgba(255,255,255,0.08)', flex: 1, maxWidth: '160px' }}>
              <p style={{ margin: '0 0 2px', color: 'white', fontSize: '22px', fontWeight: '800' }}>{stat.value}</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginTop: '20px', lineHeight: '1.6' }}>
          Not a substitute for professional mental health care · In a crisis call Samaritans free on 116 123
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
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
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>Go to the Chat tab and tell MindBridge which university you attend — your support links will appear here.</p>
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
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>Go to the Chat tab and tell MindBridge which country you are from — your support links will appear here.</p>
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

// ── HAMBURGER MENU ────────────────────────────────────────────────
function HamburgerMenu({ onClose, countryData, universityData }) {
  const quickLinks = [
    { name: 'Samaritans', desc: 'Free · 24/7 crisis support', url: 'https://www.samaritans.org', color: '#007B40' },
    { name: 'NHS Talking Therapies', desc: 'Free CBT — self-refer online', url: 'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/', color: '#005EB8' },
    { name: 'Student Minds', desc: 'UK student mental health charity', url: 'https://www.studentminds.org.uk', color: '#E65100' },
    { name: 'Mind UK', desc: 'Mental health information', url: 'https://www.mind.org.uk', color: '#1565C0' },
    { name: 'CALM', desc: 'Campaign Against Living Miserably', url: 'https://www.thecalmzone.net', color: '#4527A0' },
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
      <div style={{ width: '300px', background: 'linear-gradient(160deg,#0f2744,#1a3a5c)', color: 'white', height: '100%', overflowY: 'auto', boxShadow: '4px 0 30px rgba(0,0,0,0.4)' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '20px' }}>💙 MindBridge</h3>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>For all UK university students</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '34px', height: '34px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ background: '#C00000', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
            <p style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '13px', opacity: 0.9 }}>🚨 In Crisis?</p>
            <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>116 123</p>
            <p style={{ margin: '0 0 6px', fontSize: '12px', opacity: 0.85 }}>Samaritans · Free · 24/7</p>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>💬 Text SHOUT to 85258</p>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Mental Health Resources</p>
          {quickLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '10px', padding: '12px', background: 'rgba(255,255,255,0.07)', borderRadius: '10px', marginBottom: '8px', textDecoration: 'none', color: 'white', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: link.color, flexShrink: 0 }} />
              <div>
                <p style={{ margin: '0', fontSize: '13px', fontWeight: '600' }}>{link.name}</p>
                <p style={{ margin: '0', fontSize: '11px', opacity: 0.6 }}>{link.desc}</p>
              </div>
            </a>
          ))}
          {universityData && (
            <>
              <p style={{ margin: '16px 0 10px', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>My University</p>
              {universityData.links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '8px 12px', color: '#7ec8e3', fontSize: '13px', textDecoration: 'none', borderRadius: '8px' }}>📌 {l.label}</a>
              ))}
            </>
          )}
          {countryData && (
            <>
              <p style={{ margin: '16px 0 10px', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{countryData.flag} My Country</p>
              <a href={countryData.embassy.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '8px 12px', color: '#7ec8e3', fontSize: '13px', textDecoration: 'none', borderRadius: '8px' }}>🏛️ {countryData.embassy.name}</a>
              {countryData.orgs.map(o => (
                <a key={o.name} href={o.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '8px 12px', color: '#7ec8e3', fontSize: '13px', textDecoration: 'none', borderRadius: '8px' }}>🤝 {o.name}</a>
              ))}
            </>
          )}
          <p style={{ marginTop: '24px', fontSize: '11px', opacity: 0.4, textAlign: 'center', lineHeight: '1.6' }}>MindBridge is not a substitute for professional mental health care. In an emergency call 999.</p>
        </div>
      </div>
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('mood');
  const [mood, setMood] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [student, setStudent] = useState({ name: '', country: '', university: '', countryData: null, universityData: null });
  const [showMenu, setShowMenu] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', currentPassword: '', newPassword: '' });
  const [profileMsg, setProfileMsg] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(saved);
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setStudent(p => ({ ...p, name: parsedUser.name }));
    }
    setAuthChecked(true);
  }, []);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setScreen('main');
    setActiveTab('home');
    setStudent(p => ({ ...p, name: loggedInUser.name }));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setScreen('mood');
    setMessages([]);
    setStudent({ name: '', country: '', university: '', countryData: null, universityData: null });
  }

  // Show nothing while checking auth
  if (!authChecked) return null;

  // Show login page if not logged in
  if (!user) return <LoginPage onLogin={handleLogin} />;

  function selectMood(label, value) {
    const entry = { date: new Date().toLocaleDateString('en-GB'), label, value };
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const updated = [...history.filter(m => m.date !== entry.date), entry].slice(-30);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodHistory(updated);
    setMood(label);
    setMessages([{ sender: 'bot', text: `Hello! Welcome to MindBridge 💙\n\nI can see you are feeling ${label} today — thank you for sharing that. Whether you are a home student or studying here from abroad, I am here to support you.\n\nCould you start by telling me your name?` }]);
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

  const moodEmoji = { 'Very Low': '😔', 'Not Great': '😕', 'Okay': '😐', 'Good': '🙂', 'Great': '😊' };
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'chat', icon: '💬', label: 'Chat Support' },
    { id: 'mood', icon: '📊', label: 'Mood Tracker' },
    { id: 'nhs', icon: '🏥', label: 'Mental Health Resources' },
    { id: 'university', icon: '🏫', label: 'My University' },
    { id: 'country', icon: '🌍', label: 'My Country Support' },
  ];

  if (screen === 'mood') return <MoodScreen onSelect={selectMood} />;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Segoe UI',Arial,sans-serif", display: 'flex', flexDirection: 'column' }}>
      {showMenu && <HamburgerMenu onClose={() => setShowMenu(false)} countryData={student.countryData} universityData={student.universityData} />}
      {showCrisis && <CrisisModal onClose={() => setShowCrisis(false)} />}

      {/* NAVBAR */}
      <nav style={{ background: 'linear-gradient(135deg,#0f2744,#2E75B6)', color: 'white', padding: '0 28px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 20px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setShowMenu(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>☰</button>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>💙 MindBridge</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px 12px', fontSize: '12px', fontWeight: '600' }}>For University Students in the UK</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowProfile(!showProfile)} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 {user?.name} ▾
            </button>
            {showProfile && (
              <div style={{ position: 'absolute', right: 0, top: '110%', background: 'white', borderRadius: '14px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', padding: '20px', minWidth: '280px', zIndex: 100, border: '1px solid #e5e7eb' }}>
                <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', marginBottom: '14px' }}>
                  <p style={{ margin: '0 0 2px', fontWeight: '800', color: '#0f2744', fontSize: '15px' }}>👤 {user?.name}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>{user?.email}</p>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Change Password</p>
                  <input placeholder="Current password" type="password" value={profileForm.currentPassword} onChange={e => setProfileForm(p => ({...p, currentPassword: e.target.value}))} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', marginBottom: '8px', boxSizing: 'border-box', outline: 'none' }} />
                  <input placeholder="New password (min 6 chars)" type="password" value={profileForm.newPassword} onChange={e => setProfileForm(p => ({...p, newPassword: e.target.value}))} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', marginBottom: '10px', boxSizing: 'border-box', outline: 'none' }} />
                  {profileMsg && <p style={{ margin: '0 0 8px', fontSize: '12px', color: profileMsg.includes('✅') ? '#15803d' : '#dc2626', fontWeight: '600' }}>{profileMsg}</p>}
                  <button onClick={() => {
                    if (!profileForm.currentPassword || !profileForm.newPassword) { setProfileMsg('⚠️ Fill in both fields'); return; }
                    if (profileForm.newPassword.length < 6) { setProfileMsg('⚠️ New password too short'); return; }
                    const users = JSON.parse(localStorage.getItem('mindbridge_users') || '[]');
                    const userIndex = users.findIndex(u => u.email === user.email && u.password === profileForm.currentPassword);
                    if (userIndex === -1) { setProfileMsg('⚠️ Current password incorrect'); return; }
                    users[userIndex].password = profileForm.newPassword;
                    localStorage.setItem('mindbridge_users', JSON.stringify(users));
                    setProfileMsg('✅ Password updated!');
                    setProfileForm({ name: '', currentPassword: '', newPassword: '' });
                    setTimeout(() => setProfileMsg(''), 3000);
                  }} style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg,#2E75B6,#0f2744)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                    Update Password
                  </button>
                </div>
                <button onClick={() => { setShowProfile(false); handleLogout(); }} style={{ width: '100%', padding: '10px', background: '#fff0f0', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                  Logout
                </button>
              </div>
            )}
          </div>
          {student.country && <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '4px 14px', fontSize: '13px' }}>{student.countryData?.flag || '🌍'} {student.country}</span>}
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
              <span style={{ fontWeight: '700', color: '#1a3a5c', fontSize: '14px' }}>{mood}</span>
            </div>
          </div>
          <div style={{ padding: '14px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Navigation</p>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '3px', background: activeTab === tab.id ? '#EBF3FB' : 'transparent', color: activeTab === tab.id ? '#1a3a5c' : '#6b7280', fontWeight: activeTab === tab.id ? '700' : '400', fontSize: '13px', textAlign: 'left' }}>
                <span style={{ fontSize: '16px' }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6', marginTop: 'auto' }}>
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
        </main>
      </div>
    </div>
  );
}