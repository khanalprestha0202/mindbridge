const universities = [

  // ── LONDON ───────────────────────────────────────────────────
  {
    keys: ['st mary', 'stmary', 'twickenham'],
    name: "St Mary's University, Twickenham",
    city: 'London',
    fact: "St Mary's is one of the safest and most welcoming campuses in London. It has a tight-knit community feel that bigger universities simply cannot offer — you actually get to know your lecturers here.",
    links: [
      { label: 'Student Union', url: 'https://www.stmarys.ac.uk/student-union', desc: 'Bullying, student issues, academic support, representation' },
      { label: 'Student Wellbeing', url: 'https://www.stmarys.ac.uk/student-life/wellbeing', desc: 'Free mental health support and counselling' },
      { label: 'Careers Centre', url: 'https://www.stmarys.ac.uk/careers', desc: 'Jobs, internships, CV and interview help' },
      { label: 'Accommodation Office', url: 'https://www.stmarys.ac.uk/accommodation', desc: 'University housing and private accommodation advice' },
      { label: 'International Student Support', url: 'https://www.stmarys.ac.uk/international', desc: 'Visa, arrival support and international student advice' },
    ],
  },

  {
    keys: ['ucl', 'university college london'],
    name: 'University College London',
    city: 'London',
    fact: 'UCL is consistently ranked in the top 10 universities in the world and sits right in the heart of London. The research happening here genuinely changes lives — and the student community is one of the most diverse on the planet.',
    links: [
      { label: 'Students Union UCL', url: 'https://studentsunionucl.org', desc: 'Student support, societies and representation' },
      { label: 'Student Wellbeing', url: 'https://www.ucl.ac.uk/students/support-and-wellbeing', desc: 'Mental health, counselling and disability support' },
      { label: 'Careers Service', url: 'https://www.ucl.ac.uk/careers', desc: 'Career guidance, employer events and job listings' },
      { label: 'Student Support', url: 'https://www.ucl.ac.uk/students/student-support-and-wellbeing', desc: 'Financial, academic and personal support' },
    ],
  },

  {
    keys: ["king's", 'kings college', 'kcl', 'kings london'],
    name: "King's College London",
    city: 'London',
    fact: "King's is one of the world's leading research universities with campuses stretched beautifully along the River Thames. It has produced some remarkable alumni including Florence Nightingale, and continues to attract brilliant minds from across the world.",
    links: [
      { label: 'KCLSU — Student Union', url: 'https://www.kclsu.org', desc: 'Student union, support and advice' },
      { label: 'Counselling and Mental Health', url: 'https://www.kcl.ac.uk/campuslife/services/counselling', desc: 'Free counselling and mental health support' },
      { label: 'Careers and Employability', url: 'https://www.kcl.ac.uk/careers', desc: 'Career guidance and employer connections' },
      { label: 'International Student Support', url: 'https://www.kcl.ac.uk/international-students', desc: 'Visa and international student services' },
    ],
  },

  {
    keys: ['imperial college', 'imperial london'],
    name: 'Imperial College London',
    city: 'London',
    fact: "Imperial is one of the world's top science and engineering universities and is consistently ranked in the global top 10. If you are studying STEM here you are genuinely in one of the best places in the world to do it.",
    links: [
      { label: 'Imperial College Union', url: 'https://www.imperialcollegeunion.org', desc: 'Student union and welfare support' },
      { label: 'Student Wellbeing', url: 'https://www.imperial.ac.uk/students/health-and-wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.imperial.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['lse', 'london school of economics'],
    name: 'London School of Economics',
    city: 'London',
    fact: 'The LSE is arguably the most influential social science university in the world. Its alumni include prime ministers, presidents and Nobel laureates — and the debates in its lecture halls have genuinely shaped global policy.',
    links: [
      { label: 'LSE Students Union', url: 'https://www.lsesu.com', desc: 'Student union support and societies' },
      { label: 'Student Wellbeing', url: 'https://info.lse.ac.uk/current-students/student-wellbeing', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://info.lse.ac.uk/current-students/careers', desc: 'Career guidance and employer connections' },
    ],
  },

  {
    keys: ['queen mary', 'qmul'],
    name: 'Queen Mary University of London',
    city: 'London',
    fact: 'Queen Mary is based in the vibrant East End of London and has one of the most diverse student populations of any university in the UK. It combines research excellence with genuine inclusivity — a university that actually reflects the real world.',
    links: [
      { label: 'QMSU — Students Union', url: 'https://www.qmsu.org', desc: 'Student union, advice and support' },
      { label: 'Student Wellbeing', url: 'https://www.qmul.ac.uk/students/wellbeing/', desc: 'Counselling and mental health support' },
      { label: 'Careers and Enterprise', url: 'https://www.qmul.ac.uk/careers/', desc: 'Career guidance and jobs' },
    ],
  },

  {
    keys: ['city university', 'city london', 'city, university'],
    name: 'City, University of London',
    city: 'London',
    fact: 'City sits right in the heart of London at the edge of the financial district — making it one of the best-connected universities in the country for business, law, journalism and the arts. Its location alone opens so many doors.',
    links: [
      { label: 'City Students Union', url: 'https://www.culsu.co.uk', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.city.ac.uk/current-students/health-wellbeing-sport', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.city.ac.uk/careers', desc: 'Career guidance and employer events' },
    ],
  },

  {
    keys: ['brunel'],
    name: 'Brunel University London',
    city: 'London',
    fact: 'Brunel is named after the legendary Victorian engineer Isambard Kingdom Brunel and carries that spirit of innovation into everything it does. It has a particularly strong reputation for engineering, design and sport.',
    links: [
      { label: 'Brunel Students Union', url: 'https://www.brunelstudentsunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.brunel.ac.uk/life/student-support/wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.brunel.ac.uk/careers', desc: 'Career guidance and work placements' },
    ],
  },

  {
    keys: ['middlesex', 'mdx'],
    name: 'Middlesex University London',
    city: 'London',
    fact: 'Middlesex has one of the most diverse student communities in the UK and a fantastic campus in North London with easy transport links to the city. It is particularly well regarded for business, law, health and the arts.',
    links: [
      { label: 'Middlesex Students Union', url: 'https://www.mdxsu.com', desc: 'Student union, advice and support' },
      { label: 'Student Wellbeing', url: 'https://www.mdx.ac.uk/student-life/student-wellbeing', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.mdx.ac.uk/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['roehampton'],
    name: 'University of Roehampton',
    city: 'London',
    fact: 'Roehampton has a beautiful campus in South West London surrounded by parkland — quite remarkable for a London university. It has a genuine focus on student wellbeing and a strong reputation for education, psychology and sport.',
    links: [
      { label: 'Roehampton Students Union', url: 'https://www.roehamptonstudentsunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.roehampton.ac.uk/student-life/wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.roehampton.ac.uk/careers/', desc: 'Career guidance and jobs' },
    ],
  },

  {
    keys: ['greenwich'],
    name: 'University of Greenwich',
    city: 'London',
    fact: 'Greenwich has one of the most spectacular campus settings of any university in the world — right next to the Cutty Sark and the Royal Naval College on the banks of the Thames. The views alone are worth showing off.',
    links: [
      { label: 'Greenwich Students Union', url: 'https://www.greenwichsu.co.uk', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.gre.ac.uk/student-wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.gre.ac.uk/careers', desc: 'Career guidance and employer events' },
    ],
  },

  {
    keys: ['east london', 'uel'],
    name: 'University of East London',
    city: 'London',
    fact: 'UEL is based in the Royal Docks area of East London and has a wonderfully diverse, community-driven atmosphere. It has one of the highest percentages of first-generation university students in the UK — a university that genuinely believes in widening access.',
    links: [
      { label: 'UEL Students Union', url: 'https://www.uelsu.net', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.uel.ac.uk/students/wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.uel.ac.uk/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  // ── RUSSELL GROUP ────────────────────────────────────────────
  {
    keys: ['oxford'],
    name: 'University of Oxford',
    city: 'Oxford',
    fact: 'Oxford is the oldest university in the English-speaking world and is consistently ranked the best university on earth. The tutorial system, the colleges, the libraries, the history — it is unlike anywhere else. Getting here is a serious achievement.',
    links: [
      { label: 'Oxford Students Union', url: 'https://www.oxfordsu.org', desc: 'Student union and student welfare' },
      { label: 'Student Welfare', url: 'https://www.ox.ac.uk/students/welfare', desc: 'Counselling, disability and welfare support' },
      { label: 'Careers Service', url: 'https://www.careers.ox.ac.uk', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['cambridge'],
    name: 'University of Cambridge',
    city: 'Cambridge',
    fact: 'Cambridge is one of the greatest universities in human history — punting on the Cam, the college courts, the May Balls, the libraries that hold some of the most important manuscripts ever written. Newton, Darwin and Hawking all walked these streets.',
    links: [
      { label: 'Cambridge SU', url: 'https://www.cambridgesu.co.uk', desc: 'Student union and welfare' },
      { label: 'Student Counselling', url: 'https://www.counselling.cam.ac.uk', desc: 'Free counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.careers.cam.ac.uk', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['manchester', 'university of manchester'],
    name: 'University of Manchester',
    city: 'Manchester',
    fact: 'Manchester is a Russell Group powerhouse with an incredible research legacy — it is where the atom was first split and where graphene was discovered. But beyond the science, it sits in one of the most culturally rich student cities in the UK.',
    links: [
      { label: 'Manchester Students Union', url: 'https://manchesterstudentsunion.com', desc: 'Student union, advice and support' },
      { label: 'Student Wellbeing', url: 'https://www.manchester.ac.uk/study/experience/student-support/', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.careers.manchester.ac.uk', desc: 'Career guidance and graduate jobs' },
      { label: 'International Student Support', url: 'https://www.manchester.ac.uk/study/international/', desc: 'Visa and international student services' },
    ],
  },

  {
    keys: ['birmingham', 'university of birmingham'],
    name: 'University of Birmingham',
    city: 'Birmingham',
    fact: 'Birmingham has a stunning redbrick campus and is one of the most diverse Russell Group universities in the UK. It is the original civic university — built to serve the city and its community — and that spirit is still very much alive.',
    links: [
      { label: 'Guild of Students', url: 'https://www.guildofstudents.com', desc: 'Student union support and representation' },
      { label: 'Student Wellbeing', url: 'https://www.birmingham.ac.uk/university/colleges/les/student-support', desc: 'Wellbeing, counselling and mental health' },
      { label: 'Careers Network', url: 'https://intranet.birmingham.ac.uk/careers/index.aspx', desc: 'Career guidance and employer connections' },
    ],
  },

  {
    keys: ['leeds', 'university of leeds'],
    name: 'University of Leeds',
    city: 'Leeds',
    fact: 'Leeds is a top research university in one of the UK\'s most loved student cities — affordable, musical, friendly and full of great food. The university itself has a beautiful campus and a Students Union that is regularly voted one of the best in the UK.',
    links: [
      { label: 'Leeds University Union', url: 'https://www.luu.org.uk', desc: 'Student union, advice and peer support' },
      { label: 'Student Wellbeing', url: 'https://students.leeds.ac.uk/wellbeing', desc: 'Counselling, mental health and disability support' },
      { label: 'Careers Centre', url: 'https://students.leeds.ac.uk/careerscentre', desc: 'Career guidance, internships and graduate jobs' },
    ],
  },

  {
    keys: ['sheffield', 'university of sheffield'],
    name: 'University of Sheffield',
    city: 'Sheffield',
    fact: 'Sheffield has been voted the best student city in the UK so many times it has basically stopped counting. It combines serious research excellence with one of the most welcoming and affordable student experiences in the country. The Students Union here is genuinely legendary.',
    links: [
      { label: 'Sheffield Students Union', url: 'https://www.sheffieldstudentsunion.com', desc: 'Award-winning student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.sheffield.ac.uk/wellbeing', desc: 'Mental health, counselling and disability support' },
      { label: 'Careers Service', url: 'https://www.sheffield.ac.uk/careers', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['bristol', 'university of bristol'],
    name: 'University of Bristol',
    city: 'Bristol',
    fact: 'Bristol is one of the most beautiful university cities in the UK — and the university itself is sandwiched between Clifton\'s Georgian terraces and the Suspension Bridge. It has a fantastic reputation for research and an incredibly vibrant student scene.',
    links: [
      { label: 'Bristol Students Union', url: 'https://www.bristolsu.org.uk', desc: 'Student union and student support' },
      { label: 'Student Wellbeing', url: 'https://www.bristol.ac.uk/students/support/wellbeing/', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.bristol.ac.uk/careers/', desc: 'Career guidance and employer connections' },
    ],
  },

  {
    keys: ['edinburgh', 'university of edinburgh'],
    name: 'University of Edinburgh',
    city: 'Edinburgh',
    fact: 'Edinburgh is one of the world\'s truly great universities — sitting in one of the most beautiful cities in Europe. The castle, the Old Town, Arthur\'s Seat, the Fringe Festival — and then a world-class university on top of all that.',
    links: [
      { label: 'Edinburgh University Students Association', url: 'https://www.eusa.ed.ac.uk', desc: 'Student union, advice and support' },
      { label: 'Student Wellbeing', url: 'https://www.ed.ac.uk/students/health-wellbeing/wellbeing-services', desc: 'Counselling, mental health and disability support' },
      { label: 'Careers Service', url: 'https://www.ed.ac.uk/careers', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['warwick', 'university of warwick'],
    name: 'University of Warwick',
    city: 'Coventry',
    fact: 'Warwick is one of the fastest-rising universities in the world and is now firmly in the global elite. It has a beautiful self-contained campus, an internationally renowned business school and one of the best arts centres of any university in the UK.',
    links: [
      { label: 'Warwick Students Union', url: 'https://www.warwicksu.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://warwick.ac.uk/services/wss/', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://warwick.ac.uk/services/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['nottingham', 'university of nottingham'],
    name: 'University of Nottingham',
    city: 'Nottingham',
    fact: 'Nottingham has one of the most beautiful university campuses in the UK — over 300 acres of parkland, lakes and listed buildings. It is also a genuinely global university with campuses in China and Malaysia, making it a wonderfully international place to study.',
    links: [
      { label: 'Nottingham Students Union', url: 'https://su.nottingham.ac.uk', desc: 'Student union and welfare support' },
      { label: 'Student Wellbeing', url: 'https://www.nottingham.ac.uk/currentstudents/wellbeing/', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.nottingham.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['southampton', 'university of southampton'],
    name: 'University of Southampton',
    city: 'Southampton',
    fact: 'Southampton is a world leader in ocean science, engineering and electronics — and it is the birthplace of the worldwide web (Tim Berners-Lee studied here). A seriously strong research university with excellent employment outcomes.',
    links: [
      { label: 'Southampton Students Union', url: 'https://www.susu.org', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.southampton.ac.uk/student-life/support/wellbeing.page', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.southampton.ac.uk/careers/', desc: 'Career guidance and employer connections' },
    ],
  },

  {
    keys: ['glasgow', 'university of glasgow'],
    name: 'University of Glasgow',
    city: 'Glasgow',
    fact: 'Glasgow is the fourth oldest university in the English-speaking world and sits in a spectacular Gothic building that most people assume was designed as a cathedral. It is a world-class research university in one of the friendliest cities in the UK.',
    links: [
      { label: 'Glasgow University SRC', url: 'https://www.glasgowstudent.net', desc: 'Student representative council and support' },
      { label: 'Student Wellbeing', url: 'https://www.gla.ac.uk/myglasgow/students/health/', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.gla.ac.uk/myglasgow/careers/', desc: 'Career guidance and employer events' },
    ],
  },

  // ── OTHER TOP UK UNIVERSITIES ────────────────────────────────
  {
    keys: ['exeter', 'university of exeter'],
    name: 'University of Exeter',
    city: 'Exeter',
    fact: 'Exeter has risen dramatically in the rankings in recent years and now sits comfortably among the UK\'s top universities. The campus in Devon is genuinely beautiful and the city has one of the highest quality of life scores for students in the UK.',
    links: [
      { label: 'Exeter Students Guild', url: 'https://www.exeterguild.org', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.exeter.ac.uk/students/wellbeing/', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.exeter.ac.uk/students/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['durham', 'university of durham'],
    name: 'Durham University',
    city: 'Durham',
    fact: 'Durham is one of the UK\'s oldest and most prestigious universities — a collegiate system similar to Oxford and Cambridge, set in one of the most beautiful cathedral cities in England. It consistently ranks in the UK top 10.',
    links: [
      { label: 'Durham Students Union', url: 'https://www.durhamsu.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.dur.ac.uk/wellbeing/', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.dur.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['bath', 'university of bath'],
    name: 'University of Bath',
    city: 'Bath',
    fact: 'Bath is a compact but seriously impressive university — it sits on a hill above one of England\'s most beautiful Georgian cities and consistently tops the league tables for student satisfaction and graduate employment. If you study here, employers know you are serious.',
    links: [
      { label: 'Bath Students Union', url: 'https://www.thesubath.com', desc: 'Student union and welfare' },
      { label: 'Student Wellbeing', url: 'https://www.bath.ac.uk/campaigns/wellbeing-at-bath/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.bath.ac.uk/campaigns/careers-service/', desc: 'Career guidance and placement year support' },
    ],
  },

  {
    keys: ['leicester', 'university of leicester'],
    name: 'University of Leicester',
    city: 'Leicester',
    fact: 'Leicester is where scientists discovered King Richard III buried under a car park — and that spirit of discovery runs through everything the university does. It is a welcoming, diverse university in one of the UK\'s most multicultural cities.',
    links: [
      { label: 'Leicester Students Union', url: 'https://www.leicesterunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://le.ac.uk/student-support/wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://le.ac.uk/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['cardiff', 'cardiff university'],
    name: 'Cardiff University',
    city: 'Cardiff',
    fact: 'Cardiff is a Russell Group university in the capital of Wales — a city that has transformed itself into one of the UK\'s most exciting places to live and study. It has a particularly strong reputation for law, journalism and biomedical sciences.',
    links: [
      { label: 'Cardiff Students Union', url: 'https://www.cardiffstudents.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.cardiff.ac.uk/students/your-wellbeing', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.cardiff.ac.uk/careers', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['sussex', 'university of sussex'],
    name: 'University of Sussex',
    city: 'Brighton',
    fact: 'Sussex is a progressive, creative and internationally-minded university on the edge of Brighton — one of the most vibrant and colourful cities in the UK. It has a strong tradition of radical thought and social activism that makes it genuinely exciting.',
    links: [
      { label: 'Sussex Students Union', url: 'https://sussexstudent.com', desc: 'Student union and wellbeing support' },
      { label: 'Student Wellbeing', url: 'https://www.sussex.ac.uk/studentlife/healthandwellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.sussex.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['kent', 'university of kent'],
    name: 'University of Kent',
    city: 'Canterbury',
    fact: "Kent is based in Canterbury — one of England's most historic and beautiful cities — and has a wonderfully international feel with strong European connections. It is particularly well regarded for law, social sciences and drama.",
    links: [
      { label: 'Kent Union', url: 'https://www.kentunion.co.uk', desc: 'Student union and advice' },
      { label: 'Student Wellbeing', url: 'https://student.kent.ac.uk/support/wellbeing', desc: 'Counselling and mental health support' },
      { label: 'Careers Service', url: 'https://www.kent.ac.uk/careers', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['essex', 'university of essex'],
    name: 'University of Essex',
    city: 'Colchester',
    fact: 'Essex is punching well above its weight in the academic rankings — it is one of the top universities in Europe for politics, sociology and economics. It also has one of the most genuinely diverse and international student communities in the UK.',
    links: [
      { label: 'Essex Students Union', url: 'https://www.essexstudent.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.essex.ac.uk/student/professional-services/student-wellbeing-and-inclusivity-team', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.essex.ac.uk/life/student-support/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['york', 'university of york'],
    name: 'University of York',
    city: 'York',
    fact: "York has a beautiful lake campus and sits just outside one of England's most spectacular medieval cities. It is a collegiate university with a strong sense of community and a consistently excellent reputation for student satisfaction.",
    links: [
      { label: 'York Students Union', url: 'https://www.yusu.org', desc: 'Student union and advice' },
      { label: 'Student Wellbeing', url: 'https://www.york.ac.uk/students/health/wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.york.ac.uk/careers/', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['reading', 'university of reading'],
    name: 'University of Reading',
    city: 'Reading',
    fact: 'Reading is a mid-sized university with a beautiful green campus and a genuinely world-leading reputation in meteorology, agriculture and food science. It is only 25 minutes from London by train — close enough to the capital without the capital price tag.',
    links: [
      { label: 'Reading Students Union', url: 'https://www.rusu.co.uk', desc: 'Student union and wellbeing support' },
      { label: 'Student Wellbeing', url: 'https://www.reading.ac.uk/essentials/health-and-wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.reading.ac.uk/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['liverpool', 'university of liverpool'],
    name: 'University of Liverpool',
    city: 'Liverpool',
    fact: 'Liverpool is a Russell Group university in one of the most characterful cities in the UK — the home of the Beatles, two of the most passionate football clubs in the world, and a UNESCO World Heritage waterfront. The city is unforgettable.',
    links: [
      { label: 'Liverpool Guild of Students', url: 'https://www.liverpoolguild.org', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.liverpool.ac.uk/studentsupport/mentalhealth/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.liverpool.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['newcastle', 'university of newcastle', 'newcastle university'],
    name: 'Newcastle University',
    city: 'Newcastle',
    fact: 'Newcastle is a Russell Group university in one of the UK\'s friendliest and most welcoming cities. The Geordie warmth is real — Newcastle consistently tops polls for student satisfaction and nightlife, and the university itself is genuinely excellent.',
    links: [
      { label: 'Newcastle Students Union', url: 'https://www.nusu.co.uk', desc: 'Student union and advice' },
      { label: 'Student Wellbeing', url: 'https://www.ncl.ac.uk/wellbeing/', desc: 'Mental health and counselling support' },
      { label: 'Careers Service', url: 'https://www.ncl.ac.uk/careers/', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['lancaster', 'lancaster university'],
    name: 'Lancaster University',
    city: 'Lancaster',
    fact: 'Lancaster is consistently ranked in the UK top 10 and top 150 in the world — remarkable for a relatively small university. It has a collegiate system and a beautiful campus in the north west of England, with views over Morecambe Bay on a clear day.',
    links: [
      { label: 'Lancaster Students Union', url: 'https://www.lancastersu.co.uk', desc: 'Student union and welfare support' },
      { label: 'Student Wellbeing', url: 'https://www.lancaster.ac.uk/wec/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.lancaster.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['st andrews', 'saint andrews', 'university of st andrews'],
    name: 'University of St Andrews',
    city: 'St Andrews, Scotland',
    fact: "St Andrews is Scotland's oldest university and one of the most beautiful places to study anywhere in the world — a medieval town on the North Sea coast, birthplace of golf, and the alma mater of Prince William and Kate. It regularly tops UK student satisfaction surveys.",
    links: [
      { label: 'Students Association', url: 'https://www.yourunion.net', desc: 'Student union and wellbeing' },
      { label: 'Student Wellbeing', url: 'https://www.st-andrews.ac.uk/students/advice/wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Centre', url: 'https://www.st-andrews.ac.uk/students/advice/careers/', desc: 'Career guidance and graduate opportunities' },
    ],
  },

  {
    keys: ['strathclyde', 'university of strathclyde'],
    name: 'University of Strathclyde',
    city: 'Glasgow',
    fact: "Strathclyde was named Times Higher Education University of the Year in 2019 and is based in Glasgow city centre — one of the UK's most vibrant student cities. It has a strong focus on business and engineering and excellent links with industry.",
    links: [
      { label: 'Strathclyde Students Association', url: 'https://www.strathunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.strath.ac.uk/studywithus/lifeatstrathclyde/wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.strath.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['hertfordshire', 'university of hertfordshire'],
    name: 'University of Hertfordshire',
    city: 'Hatfield',
    fact: 'Hertfordshire is a modern university with strong industry links — particularly in aviation, business and health. It is located just 20 minutes from London by train and has one of the highest rates of graduate employment of any university in the UK.',
    links: [
      { label: 'Hertfordshire Students Union', url: 'https://www.hertfordshireunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.herts.ac.uk/life/student-support/wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.herts.ac.uk/careers', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['coventry', 'coventry university'],
    name: 'Coventry University',
    city: 'Coventry',
    fact: "Coventry is one of the UK's most innovative modern universities and has shot up the rankings in recent years. It has a stunning city centre campus that has been completely transformed and is particularly strong in design, engineering and business.",
    links: [
      { label: 'Coventry Students Union', url: 'https://www.coventryunion.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.coventry.ac.uk/life-on-campus/health-and-wellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.coventry.ac.uk/life-on-campus/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['portsmouth', 'university of portsmouth'],
    name: 'University of Portsmouth',
    city: 'Portsmouth',
    fact: 'Portsmouth is a modern university in a vibrant coastal city with a strong naval heritage. It has excellent links with local industry and is particularly well regarded for criminology, forensic science, business and computing.',
    links: [
      { label: 'Portsmouth Students Union', url: 'https://www.upsu.net', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://www.port.ac.uk/student-life/health-and-wellbeing', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://www.port.ac.uk/student-life/careers-and-employment', desc: 'Career guidance and graduate jobs' },
    ],
  },

  {
    keys: ['huddersfield', 'university of huddersfield'],
    name: 'University of Huddersfield',
    city: 'Huddersfield',
    fact: "Huddersfield has won the Times Higher Education University of the Year award and was the first university in the UK where every professor held a PhD or equivalent. It has a strong reputation for teaching quality and one of the UK's best music technology courses.",
    links: [
      { label: 'Huddersfield Students Union', url: 'https://www.huddersfieldstudentu.com', desc: 'Student union and support' },
      { label: 'Student Wellbeing', url: 'https://students.hud.ac.uk/healthwellbeing/', desc: 'Mental health and counselling' },
      { label: 'Careers Service', url: 'https://students.hud.ac.uk/careers/', desc: 'Career guidance and graduate jobs' },
    ],
  },

];

export function getUniversityData(input) {
  if (!input) return null;
  const lower = input.toLowerCase().trim();
  for (const uni of universities) {
    if (uni.keys.some(k => lower.includes(k))) return uni;
  }
  return null;
}

export default universities;