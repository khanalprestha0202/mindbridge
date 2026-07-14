const countries = {

  // ── SOUTH ASIA ───────────────────────────────────────────────
  nepal: {
    flag: '🇳🇵',
    fact: 'Nepal is an absolutely stunning country — sitting right in the heart of the Himalayas with Mount Everest towering above everything else. The culture, the food, the people — there is truly nowhere else like it.',
    embassy: { name: 'Embassy of Nepal, London', url: 'https://nepembassy.org.uk' },
    orgs: [
      { name: 'NRN UK — help finding rooms, jobs and legal advice', url: 'https://nrnuk.com' },
      { name: 'IRN Nepal UK — support for Nepali people living in the UK', url: 'https://irnnepal.org' },
    ],
  },

  india: {
    flag: '🇮🇳',
    fact: 'India is one of the most extraordinary countries in the world — ancient history, incredible food, dozens of languages and cultures all living together. It has produced some of the greatest thinkers, scientists and artists in human history.',
    embassy: { name: 'High Commission of India, London', url: 'https://hciuk.gov.in' },
    orgs: [
      { name: 'NISAU UK — National Indian Students and Alumni Union', url: 'https://nisauuk.org' },
    ],
  },

  pakistan: {
    flag: '🇵🇰',
    fact: 'Pakistan is a country of breathtaking diversity — from the deserts of Sindh to the peaks of K2, from the ancient ruins of Mohenjo-daro to the buzzing streets of Lahore. A proud and resilient nation with a rich cultural heritage.',
    embassy: { name: 'Pakistan High Commission, London', url: 'https://www.phclondon.org' },
    orgs: [
      { name: 'British Pakistan Foundation', url: 'https://bpfoundation.org.uk' },
    ],
  },

  bangladesh: {
    flag: '🇧🇩',
    fact: 'Bangladesh is a country of rivers, green landscapes and incredibly warm people. Known as the land of rivers, it has one of the richest literary traditions in the world and a fascinating history of resilience and independence.',
    embassy: { name: 'Bangladesh High Commission, London', url: 'https://bhclondon.org.uk' },
    orgs: [
      { name: 'British Bangladesh Chamber of Commerce', url: 'https://bbcc.org.uk' },
    ],
  },

  'sri lanka': {
    flag: '🇱🇰',
    fact: 'Sri Lanka is often called the Pearl of the Indian Ocean — ancient Buddhist temples, lush tea plantations, golden beaches and some of the kindest people you will ever meet.',
    embassy: { name: 'Sri Lanka High Commission, London', url: 'https://slhclondon.org' },
    orgs: [
      { name: 'Sri Lanka UK Community', url: 'https://srilankauk.com' },
    ],
  },

  // ── EAST ASIA ────────────────────────────────────────────────
  china: {
    flag: '🇨🇳',
    fact: 'China is one of the oldest continuing civilisations on earth — over five thousand years of history, art, philosophy and invention. From the Great Wall to modern Shanghai, it is a country of staggering scale and depth.',
    embassy: { name: 'Chinese Embassy, London', url: 'https://www.chinese-embassy.org.uk' },
    orgs: [
      { name: 'CSSA UK — Chinese Students and Scholars Association', url: 'https://cssauk.org.uk' },
    ],
  },

  japan: {
    flag: '🇯🇵',
    fact: 'Japan is a place unlike anywhere else — where ancient temples sit next to bullet trains, where cherry blossoms fill entire cities in spring, and where the food is honestly some of the best on the planet.',
    embassy: { name: 'Embassy of Japan, London', url: 'https://www.uk.emb-japan.go.jp' },
    orgs: [
      { name: 'Japan Society UK', url: 'https://www.japansociety.org.uk' },
    ],
  },

  'south korea': {
    flag: '🇰🇷',
    fact: 'South Korea has pulled off something remarkable — becoming a global leader in technology, film, music and food all at once. K-pop and K-dramas have taken the world by storm, but there is so much more to Korea than that.',
    embassy: { name: 'Korean Embassy, London', url: 'https://overseas.mofa.go.kr/gb-en/index.do' },
    orgs: [
      { name: 'Korean Students Association UK', url: 'https://www.ksauk.co.uk' },
    ],
  },

  // ── SOUTHEAST ASIA ───────────────────────────────────────────
  malaysia: {
    flag: '🇲🇾',
    fact: 'Malaysia is one of the most wonderfully diverse countries in Southeast Asia — a blend of Malay, Chinese, Indian and indigenous cultures that shows up in everything from the food to the festivals.',
    embassy: { name: 'Malaysian High Commission, London', url: 'https://www.kln.gov.my/web/gbr_london' },
    orgs: [
      { name: 'Malaysian Student Department UK and Eire', url: 'https://www.msd.org.uk' },
    ],
  },

  indonesia: {
    flag: '🇮🇩',
    fact: 'Indonesia is the largest archipelago nation in the world — over seventeen thousand islands, hundreds of ethnic groups and languages, and some of the most spectacular natural landscapes on earth.',
    embassy: { name: 'Indonesian Embassy, London', url: 'https://kemlu.go.id/london/en' },
    orgs: [
      { name: 'PPI UK — Indonesian Students Association', url: 'https://ppiuk.org' },
    ],
  },

  thailand: {
    flag: '🇹🇭',
    fact: 'Thailand is known as the Land of Smiles — and the warmth of Thai people really does live up to that name. Ancient temples, incredible street food, lush mountains and tropical beaches all in one country.',
    embassy: { name: 'Royal Thai Embassy, London', url: 'https://thaiembassyuk.org.uk' },
    orgs: [
      { name: 'Thai Society UK', url: 'https://thaisocietyuk.org' },
    ],
  },

  vietnam: {
    flag: '🇻🇳',
    fact: 'Vietnam is a country that has emerged from so much with its culture, food and spirit completely intact. From the mountains of Sapa to the beaches of Da Nang — it is a place that gets under your skin.',
    embassy: { name: 'Embassy of Vietnam, London', url: 'https://vnembassy-london.mofa.gov.vn' },
    orgs: [
      { name: 'Vietnamese Community in the UK', url: 'https://www.vietnamesecommunity.co.uk' },
    ],
  },

  philippines: {
    flag: '🇵🇭',
    fact: 'The Philippines is an archipelago of over seven thousand islands and one of the most joyful cultures in Asia. Filipinos are known for their warmth, resilience and infectious positivity — you will rarely meet a more welcoming community.',
    embassy: { name: 'Philippine Embassy, London', url: 'https://londonpe.dfa.gov.ph' },
    orgs: [
      { name: 'Filipino Community UK', url: 'https://www.filipinocommunity.co.uk' },
    ],
  },

  // ── MIDDLE EAST ──────────────────────────────────────────────
  'saudi arabia': {
    flag: '🇸🇦',
    fact: 'Saudi Arabia is a country undergoing a fascinating transformation while holding onto its deep Islamic heritage and culture. Home to the holy cities of Mecca and Medina, with people known for their extraordinary hospitality.',
    embassy: { name: 'Royal Embassy of Saudi Arabia, London', url: 'https://www.saudiembassy.org.uk' },
    orgs: [
      { name: 'Saudi Students Club UK', url: 'https://www.sscuk.org' },
    ],
  },

  uae: {
    flag: '🇦🇪',
    fact: 'The UAE has transformed itself into one of the most modern and cosmopolitan places on earth in just a few decades. Dubai and Abu Dhabi are global hubs, but Emirati culture and heritage run deep beneath the surface.',
    embassy: { name: 'UAE Embassy, London', url: 'https://www.uaeembassyuk.net' },
    orgs: [
      { name: 'UAE Students UK', url: 'https://uaestudentsuk.com' },
    ],
  },

  jordan: {
    flag: '🇯🇴',
    fact: 'Jordan is a remarkable country — home to Petra, one of the wonders of the ancient world, the Dead Sea, Wadi Rum desert and some of the friendliest people in the Middle East.',
    embassy: { name: 'Embassy of Jordan, London', url: 'https://www.jordanembassy.org.uk' },
    orgs: [
      { name: 'Jordanian Community UK', url: 'https://jordaniancommunityuk.org' },
    ],
  },

  iran: {
    flag: '🇮🇷',
    fact: 'Iran is one of the cradles of human civilisation — the Persian Empire shaped the ancient world, and the poetry of Rumi and Hafez still moves people centuries later. Iranian culture, food and hospitality are genuinely world class.',
    embassy: { name: 'Embassy of Iran, London', url: 'https://iran-embassy.org.uk' },
    orgs: [
      { name: 'Iranian Community UK', url: 'https://iranianuk.com' },
    ],
  },

  // ── AFRICA ───────────────────────────────────────────────────
  nigeria: {
    flag: '🇳🇬',
    fact: 'Nigeria is the giant of Africa — the most populous country on the continent and one of its most culturally rich. Nollywood, Afrobeats, incredible food, entrepreneurial energy — Nigeria gives the world so much.',
    embassy: { name: 'Nigerian High Commission, London', url: 'https://www.nigeriahc.org.uk' },
    orgs: [
      { name: 'NUNS UK — National Union of Nigerian Students', url: 'https://nunsgb.com' },
      { name: 'Nigerian Community UK', url: 'https://www.nigeriancommunity.co.uk' },
    ],
  },

  ghana: {
    flag: '🇬🇭',
    fact: 'Ghana was the first country in sub-Saharan Africa to gain independence and has always held that pioneering spirit. Known as the Gateway to Africa, with a joyful culture, incredible music and beautiful coastline.',
    embassy: { name: 'Ghana High Commission, London', url: 'https://ghc.org.uk' },
    orgs: [
      { name: 'Ghana Union UK', url: 'https://www.ghanaunionuk.org' },
    ],
  },

  kenya: {
    flag: '🇰🇪',
    fact: 'Kenya is one of the most beautiful countries in the world — the Maasai Mara, Mount Kenya, the Rift Valley, the white beaches of Mombasa. A fast-growing economy, incredible athletes and a deeply proud national identity.',
    embassy: { name: 'Kenya High Commission, London', url: 'https://kenyahighcommission.co.uk' },
    orgs: [
      { name: 'Kenyan Community Abroad UK', url: 'https://kenyancommunityabroad.org' },
    ],
  },

  ethiopia: {
    flag: '🇪🇹',
    fact: 'Ethiopia is one of the oldest nations on earth — never colonised, with history stretching back thousands of years. It is the birthplace of coffee, home to ancient rock-hewn churches and has some of the most diverse landscapes in Africa.',
    embassy: { name: 'Ethiopian Embassy, London', url: 'https://www.ethioembassy.org.uk' },
    orgs: [
      { name: 'Ethiopian Community Centre UK', url: 'https://www.ethiopiancommunity.co.uk' },
    ],
  },

  'south africa': {
    flag: '🇿🇦',
    fact: 'South Africa is the Rainbow Nation — a country that went through one of the most remarkable peaceful transitions in history. Cape Town, the Kruger National Park, the wine lands and the incredible diversity of cultures make it truly special.',
    embassy: { name: 'South Africa High Commission, London', url: 'https://www.southafricahouseuk.com' },
    orgs: [
      { name: 'South African Community UK', url: 'https://www.sacommunity.co.uk' },
    ],
  },

  zimbabwe: {
    flag: '🇿🇼',
    fact: 'Zimbabwe is home to Victoria Falls — one of the most spectacular natural wonders on earth. A deeply educated and resilient population with a rich cultural heritage and people who carry their national pride wherever they go.',
    embassy: { name: 'Zimbabwe Embassy, London', url: 'https://www.zimbabweembassy.org.uk' },
    orgs: [
      { name: 'Zimbabwe Community UK', url: 'https://www.zimbabwecommunity.co.uk' },
    ],
  },

  uganda: {
    flag: '🇺🇬',
    fact: 'Uganda is called the Pearl of Africa for good reason — home to mountain gorillas, the source of the Nile, the Rwenzori Mountains and Lake Victoria. A country of extraordinary natural beauty and very warm people.',
    embassy: { name: 'Uganda High Commission, London', url: 'https://www.ugandahighcommission.co.uk' },
    orgs: [
      { name: 'Uganda Community UK', url: 'https://www.ugandacommunity.org.uk' },
    ],
  },

  cameroon: {
    flag: '🇨🇲',
    fact: 'Cameroon is often called Africa in miniature — it has almost every landscape the continent offers, all within one country. Over 250 ethnic groups and a fascinating blend of French and English speaking cultures.',
    embassy: { name: 'Cameroon High Commission, London', url: 'https://www.cameroonhighcommission.co.uk' },
    orgs: [
      { name: 'Cameroon Community UK', url: 'https://camerooncommunityuk.org' },
    ],
  },

  tanzania: {
    flag: '🇹🇿',
    fact: 'Tanzania is home to Kilimanjaro, the Serengeti, Zanzibar and the Ngorongoro Crater. One of the most naturally spectacular countries on earth with a culture of warmth and togetherness.',
    embassy: { name: 'Tanzania High Commission, London', url: 'https://www.tanzania-gov.uk' },
    orgs: [
      { name: 'Tanzanian Community UK', url: 'https://tanzaniancommunityuk.org' },
    ],
  },

  'sierra leone': {
    flag: '🇸🇱',
    fact: 'Sierra Leone is a country that has shown the world what resilience truly looks like. With beautiful beaches, warm people and a vibrant culture, Freetown is one of the most characterful capital cities in West Africa.',
    embassy: { name: 'Sierra Leone High Commission, London', url: 'https://www.slhc-uk.org.uk' },
    orgs: [
      { name: 'Sierra Leone Community UK', url: 'https://slcommunityuk.org' },
    ],
  },

  // ── EUROPE ───────────────────────────────────────────────────
  'united kingdom': {
    flag: '🇬🇧',
    fact: 'The UK is home to some of the best universities in the world and an incredibly multicultural society. As a home student there is a huge range of financial support and services available to you.',
    embassy: { name: 'Student Finance England', url: 'https://www.gov.uk/student-finance' },
    orgs: [
      { name: 'Citizens Advice — free legal and financial advice', url: 'https://www.citizensadvice.org.uk' },
      { name: 'Turn2Us — find grants and benefits', url: 'https://www.turn2us.org.uk' },
    ],
  },

  england: {
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    fact: 'England is home to some of the finest universities in the world. As a home student you have access to a wide range of financial support through Student Finance England.',
    embassy: { name: 'Student Finance England', url: 'https://www.gov.uk/student-finance' },
    orgs: [
      { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk' },
      { name: 'Turn2Us — grants and benefits finder', url: 'https://www.turn2us.org.uk' },
    ],
  },

  scotland: {
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    fact: 'Scotland has world-class universities, stunning highland landscapes and a fiercely proud cultural identity. Scottish domiciled students benefit from free tuition — one of the most generous student finance systems in the UK.',
    embassy: { name: 'Student Awards Agency Scotland (SAAS)', url: 'https://www.saas.gov.uk' },
    orgs: [
      { name: 'Citizens Advice Scotland', url: 'https://www.cas.org.uk' },
    ],
  },

  wales: {
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    fact: 'Wales is a beautiful bilingual nation with a strong sense of identity, stunning coastline and mountains. Welsh students have access to some of the most generous student finance packages in the UK.',
    embassy: { name: 'Student Finance Wales', url: 'https://www.studentfinancewales.co.uk' },
    orgs: [
      { name: 'Citizens Advice Wales', url: 'https://www.citizensadvice.org.uk/wales/' },
    ],
  },

  germany: {
    flag: '🇩🇪',
    fact: 'Germany is a powerhouse of culture, engineering and ideas. From classical music to world-class cars, from Oktoberfest to the Berlin arts scene — it is a country that does everything with precision and passion.',
    embassy: { name: 'German Embassy, London', url: 'https://london.diplo.de' },
    orgs: [
      { name: 'German-British Forum', url: 'https://www.german-british-forum.org.uk' },
    ],
  },

  france: {
    flag: '🇫🇷',
    fact: 'France is one of the most culturally significant countries in the world — art, cuisine, philosophy, fashion and wine. From the Eiffel Tower to the French Riviera, it takes culture seriously and does it beautifully.',
    embassy: { name: 'French Embassy, London', url: 'https://uk.ambafrance.org' },
    orgs: [
      { name: 'French Community UK', url: 'https://frenchcommunity.co.uk' },
    ],
  },

  italy: {
    flag: '🇮🇹',
    fact: 'Italy gave the world the Renaissance, pizza, pasta, opera and Ferrari. Romans, Florentines and Venetians all built something extraordinary and the whole country still lives and breathes that cultural richness today.',
    embassy: { name: 'Italian Embassy, London', url: 'https://ambrlondra.esteri.it' },
    orgs: [
      { name: 'Italian Community UK', url: 'https://italians-uk.com' },
    ],
  },

  spain: {
    flag: '🇪🇸',
    fact: 'Spain is one of the most joyful and passionate countries in Europe — flamenco, football, tapas, fiestas and some of the most stunning architecture in the world.',
    embassy: { name: 'Spanish Embassy, London', url: 'https://www.exteriores.gob.es/embajadas/londres' },
    orgs: [
      { name: 'Spanish Community UK', url: 'https://spanishcommunityuk.com' },
    ],
  },

  // ── AMERICAS ─────────────────────────────────────────────────
  usa: {
    flag: '🇺🇸',
    fact: 'The United States is one of the most culturally influential nations in the world. American music, film, technology and literature have shaped modern life globally — a country of remarkable diversity and ambition.',
    embassy: { name: 'US Embassy, London', url: 'https://uk.usembassy.gov' },
    orgs: [
      { name: 'Democrats Abroad UK', url: 'https://www.democratsabroad.org/uk' },
    ],
  },

  canada: {
    flag: '🇨🇦',
    fact: 'Canada is one of the most admired countries in the world — vast natural landscapes, inclusive values, incredible cities like Toronto and Vancouver. Consistently ranked one of the best places to live and study.',
    embassy: { name: 'Canadian High Commission, London', url: 'https://www.canada.ca/en/high-commission/united-kingdom.html' },
    orgs: [
      { name: 'Canadian Association UK', url: 'https://canadianassociation.co.uk' },
    ],
  },

  brazil: {
    flag: '🇧🇷',
    fact: 'Brazil is the most vibrant country in South America — the Amazon rainforest, Carnival, samba, Copacabana beach and some of the greatest football the world has ever seen. Brazilian culture is infectious and impossible not to love.',
    embassy: { name: 'Brazilian Embassy, London', url: 'https://londrina.itamaraty.gov.br' },
    orgs: [
      { name: 'Brazilian Community UK', url: 'https://braziliansinuk.com' },
    ],
  },

  // ── CENTRAL ASIA ─────────────────────────────────────────────
  kazakhstan: {
    flag: '🇰🇿',
    fact: 'Kazakhstan is the ninth largest country in the world and one of the most fascinating places in Central Asia. From the vast Kazakh steppe to the modern skyline of Astana — a nation of scale, ambition and ancient nomadic heritage.',
    embassy: { name: 'Embassy of Kazakhstan, London', url: 'https://www.kazembassy.org.uk' },
    orgs: [
      { name: 'Kazakh Community UK', url: 'https://kazakhcommunityuk.org' },
    ],
  },

  uzbekistan: {
    flag: '🇺🇿',
    fact: 'Uzbekistan sits at the heart of the ancient Silk Road. Cities like Samarkand and Bukhara are some of the most historically significant places on earth — the architecture alone will take your breath away.',
    embassy: { name: 'Embassy of Uzbekistan, London', url: 'https://uzbekembassy.org' },
    orgs: [
      { name: 'Uzbek Community UK', url: 'https://uzbekcommunity.co.uk' },
    ],
  },

};

export function getCountryData(input) {
  if (!input) return null;
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(countries)) {
    if (lower.includes(key)) return { key, ...val };
  }
  return null;
}

export default countries;