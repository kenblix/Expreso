'use strict';
/* ==========================================================================
   EXPRESO by RIT Enterprise: website prototype logic
   1 Config (edit this first)   2 Content data   3 Helpers   4 Image slots
   5 Router   6 Nav   7 Hero   8 Models   9 Detail views   10 Behind EXPRESO
   11 Enquiry tabs + forms   12 FAQ   13 Modal / lightbox   14 Prototype tools
   15 Motion (reveal, parallax)   16 Boot
   ========================================================================== */

/* 1 CONFIG ---------------------------------------------------------------- */
/* Replace every placeholder below with real details. Anything containing
   "X", "[", or "your-domain" is treated as a placeholder by the prototype. */
const CONFIG = {
  whatsapp: '919163968140',              // digits only: country code + number, e.g. 919876543210
  phoneDisplay: '+91 91639 68140',
  phoneTel: '+919163968140',
  email: 'info@your-domain.in',
  address: '[Moubesia, Uluberia, Howrah, Maubesia, West Bengal, India, Pin: 711215]',
  instagram: '',                          // full URL, e.g. https://instagram.com/yourhandle
  facebook: '',                           // full URL
  images: {
      cargoVehicle: 'assets/cargo.png',
      passengerVehicle: 'assets/passenger.png',
      showroom: 'assets/EVs.jpg',
      warehouse: 'assets/components.jpg',
      assembly: '',
      finished: 'assets/finished.jpeg',
      /* colour views of each model (4 each): same vehicle, same angle, different colours */
      cargoColor1: 'assets/cargo.png',
      cargoColor2: '',
      cargoColor3: '',
      cargoColor4: '',
      passengerColor1: '',
      passengerColor2: '',
      passengerColor3: '',
      passengerColor4: '',
      /* spare part photos */
      partController: 'assets/partController.png',
      partRims: 'assets/partRims.png',
      partMotor: 'assets/partMotor.png',
      partDifferential: 'assets/partDifferential.png',
      partSuspension: 'assets/partSuspension.png',
      partLeafSprings: 'assets/partLeafSprings.png',
      cargoGallery1: '',
      cargoGallery2: '',
      cargoGallery3: '',
      cargoGallery4: '',
      cargoGallery5: '',
      cargoGallery6: '',
      passengerGallery1: '',
      passengerGallery2: '',
      passengerGallery3: '',
      passengerGallery4: '',
      passengerGallery5: '',
      passengerGallery6: ''
  }
  };

/* 2 CONTENT DATA ---------------------------------------------------------- */
const SLOT_INFO = {
  cargoVehicle: {
    kind: 'cutout',
    label: 'EXPRESO 2.0 Cargo Loader',
    hint: 'Transparent PNG cut-out, about 1800 × 1100 px, three-quarter or side view',
    alt: 'EXPRESO 2.0 electric cargo loader'
  },
  passengerVehicle: {
    kind: 'cutout',
    label: 'Standard Passenger Electric Rickshaw',
    hint: 'Transparent PNG cut-out, about 1800 × 1100 px, three-quarter or side view',
    alt: 'EXPRESO standard passenger electric rickshaw'
  },
  showroom:     {
    kind: 'photo',
    label: 'Photo: showroom',
    hint: 'Landscape photo, about 1600 × 1200 px',
    alt: 'The RIT Enterprise showroom'
  },
  components: {
    kind: 'photo',
    label: 'Photo: imported components in bulk',
    hint: 'Landscape photo, about 1600 × 1200 px',
    alt: 'Imported vehicle components stored in bulk'
  },
  assembly:   {
    kind: 'photo',
    label: 'Photo: assembly in progress',
    hint: 'Landscape photo, about 1600 × 1200 px',
    alt: 'Components being assembled into vehicles'
  },
  finished:   {
    kind: 'photo',
    label: 'Photo: finished EXPRESO three-wheeler',
    hint: 'Landscape photo, about 1600 × 1200 px',
    alt: 'A completed EXPRESO electric three-wheeler'
  }
};

const GALLERY_LABELS = {
  passenger: [
    'Front view', 
    'Side view', 
    'Rear view', 
    'Seating / interior', 
    'Detail close-up', 
    'On the road'
  ],
  cargo: [
    'Front view', 
    'Side view', 
    'Rear view', 
    'Cargo bed', 
    'Detail close-up', 
    'Loaded and working'
  ]
};
Object.keys(GALLERY_LABELS).forEach(k => GALLERY_LABELS[k].forEach((l, i) => {
  SLOT_INFO[`${k}Gallery${i + 1}`] = { 
    kind: 'photo', 
    label: `Photo: ${l.toLowerCase()}`, 
    hint: 'Real EXPRESO photo, about 1600 × 1200 px', 
    alt: `${k === 'cargo' ? 'EXPRESO 2.0' : 'EXPRESO passenger rickshaw'}: ${l.toLowerCase()}` 
  };
}));

/* Specification values: add confirmed figures here and the "TBC" chip disappears.
   Example: values: { 'Motor power': '1000 W' } */
const MODELS = {

  'passenger-rickshaw': {
    key: 'passenger', n: 'Model 1', short: 'Passenger rickshaw',
    name: 'Standard Passenger Electric Rickshaw', 
    nameHTML: 'Standard Passenger<br>Electric Rickshaw',
    tag: 'Model 1 · Passenger', ghost: 'Passenger', 
    slot: 'passengerVehicle', other: 'cargo-loader',
    colors: ['Red', 'Blue', 'Silver', 'Black'],   /* names shown under the 4 colour images */
    blurb: 'The standard EXPRESO passenger electric rickshaw, for everyday passenger routes.',

    overview: 'The standard EXPRESO passenger electric rickshaw is one of the two models in the range. It is assembled by RIT Enterprise from imported components and sold under the EXPRESO brand. Confirmed specifications, pricing and availability are shared on enquiry.',
    designedFor: [
      'Local passenger routes', 
      'Last-mile passenger transport', 
      'Owner-operators and fleet buyers'
    ],

    keySpecs: [
      'Seating capacity', 
      'Motor power', 
      'Battery type', 
      'Range per charge', 
      'Charging time', 
      'Warranty'
    ],

    groups: [
      ['Capacity and size', [
        'Seating capacity', 
        'Overall dimensions (L × W × H)', 
        'Ground clearance'
      ]],
      ['Powertrain', [
        'Motor power', 
        'Controller', 
        'Top speed', 
        'Gradeability'
      ]],
      ['Chassis', [
        'Brakes', 
        'Suspension', 
        'Tyres', 
        'Body colours'
      ]],
      ['Battery and charging', [
        'Battery type', 
        'Battery capacity', 
        'Range per charge', 
        'Charging time', 
        'Charger'
      ]],
      ['Warranty and service', [
        'Warranty', 
        'Battery warranty', 
        'Service support'
      ]]
    ],

    values: { 
      'Seating capacity': '5 passengers',
      'Motor power': '1000 W',
      'Battery type': 'Lithium-ion',
    },

    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']
  }, 

  'cargo-loader': {
    key: 'cargo', n: 'Model 2', short: 'EXPRESO 2.0',
    name: 'EXPRESO 2.0 Cargo Loader', 
    nameHTML: 'EXPRESO 2.0<br>Cargo Loader',
    tag: 'Model 2 · Cargo', ghost: 'Cargo', 
    slot: 'cargoVehicle', other: 'passenger-rickshaw',
    colors: ['Red', 'Blue', 'Navy Blue', 'Black'],
    blurb: 'An electric cargo loader built to carry up to 1,000 kg on local routes, with a 2,000 W sine wave motor and 100 – 120 km of range on a full charge.',
    overview: `Meet the EXPRESO 2.0, an electric cargo loader designed around the demands of everyday goods transportation. 
    With a 1,000 kg maximum loading capacity, a 2,000W sine wave motor and a spacious cargo platform, it offers a practical solution for businesses that need to move goods across local routes.
    Assembled by RIT Enterprise under the EXPRESO brand, the EXPRESO 2.0 brings together carrying capacity, functional design and an electric drivetrain in one commercial three-wheeler.`,
    designedFor: [
      'Local goods and parcel transport', 
      'Traders and small businesses', 
      'Fleet and bulk buyers'
    ],
    keySpecs: [
      'Payload capacity', 
      'Cargo bed size (L × W)', 
      'Motor power', 
      'Battery type', 
      'Range per charge', 
      'Charging time'
    ],
    groups: [
      ['Load and size', [
        'Payload capacity', 
        'Cargo bed size (L × W)', 
        'Cargo body type', 
        'Overall dimensions (L × W × H)', 
        'Ground clearance'
      ]],
      ['Powertrain', [
        'Motor power', 
        'Controller', 
        'Top speed', 
        'Gradeability'
      ]],
      ['Chassis', [
        'Brakes', 
        'Suspension', 
        'Tyres', 
        'Body colours'
      ]],
      ['Battery and charging', [
        'Battery type', 
        'Battery capacity', 
        'Range per charge', 
        'Charging time', 
        'Charger'
      ]],
      ['Warranty and service', [
        'Warranty', 
        'Battery warranty', 
        'Service support'
      ]]
    ],

    values: {
      'Payload capacity': '1000 kg',
      'Curb weight': '300 kg',
      'Passenger capacity': '2 persons',
      'Cargo bed size (L × W)': '1800 × 1300 mm (5.91 × 4.27 ft)',
      'Overall dimensions (L × W × H)': '3300 × 1380 × 1460 mm (10.83 × 4.53 × 4.79 ft)',

      'Motor power': '2000 W, sine wave',
      'Controller': '24-tube',
      'Top speed': '50 km/h',
      'Gradeability': 'Up to 25°',
      'Gear system': '180 rear axle with gear shifting',

      'Brakes': 'Rear drum brake',
      'Parking brake': 'Heavy-duty hand brake',
      'Front suspension': '43 mm external spring shock absorber',
      'Rear suspension': 'Leaf spring and double hook spring',
      'Tyres': '500-12 (front and rear)',
      'Body colours': '4 colour variants',

      'Battery voltage': '60 V / 72 V compatible',
      'Range per charge': '100 – 120 km',
      'Charging time': '5 – 7 hours',

      'Cabin and protection': 'Heavy-duty iron roof, front windshield glass and wiper',
      'Lighting': 'Full LED: headlight, indicators, 3-colour tail lights',
      'Security': 'Remote key system',
      'Electrical protection': 'MCB and power converter'
    },

    /* Each feature is { t: title, d: description }. A plain string still works
       and shows the "[Describe this feature once confirmed]" placeholder. */
    features: [
      { t: '1000 kg max loading capacity',
        d: 'Carries up to 1,000 kg on a 5.91 × 4.27 ft cargo bed, sized for everyday goods and parcel loads.' },
      { t: '2000 W sine wave motor',
        d: 'Paired with a 24-tube controller for a 50 km/h top speed and climbing of up to 25° inclines.' },
      { t: '100 – 120 km range per charge',
        d: 'Suited to a full day of local runs, and recharges in 5 – 7 hours.' },
      { t: 'Full LED lighting system',
        d: 'Headlight, indicators and 3-colour tail lights for better visibility and signalling on the road.' },
      { t: 'Remote key security',
        d: 'A remote key system for added security and easy operation.' },
      { t: 'Heavy-duty iron roof, windshield and wiper',
        d: 'Shields the driver from sun and rain, with a front windshield and wiper for clear visibility in wet weather.' }
    ],

    /* Spare part descriptions, keyed by the part keys in SPARE_PARTS below.
       A part with no entry shows the placeholder text. */
    partNotes: {
      partController:   'Regulates power flow from the battery to the motor, and is the unit that governs speed and acceleration.',
      partRims:         'Steel wheel rims in the 500-12 size, built to carry the load of a fully loaded cargo vehicle.',
      partMotor:        'The drive motor that powers the vehicle, available as a replacement for EXPRESO three-wheelers.',
      partDifferential: 'Splits power between the rear wheels so the vehicle can turn smoothly under load.',
      partSuspension:   'Shock absorbers that smooth out rough roads and protect both the vehicle and its cargo.',
      partLeafSprings:  'Heavy-duty rear springs that support the cargo bed and carry the load on every trip.'
    }
  }
};

Object.values(MODELS).forEach(m => m.colors.forEach((c, i) => {
  SLOT_INFO[`${m.key}Color${i + 1}`] = {
    kind: 'cutout', label: `${m.short}: ${c}`,
    hint: 'Transparent PNG cut-out, same angle and size for all four colours',
    alt: `${m.name} in ${c.toLowerCase()}`
  };
}));

/* Spare parts: one photo + one description each. Shared by both model pages. */
const SPARE_PARTS = [
  { key: 'partController',   name: 'Controller' },
  { key: 'partRims',         name: 'Rims' },
  { key: 'partMotor',        name: 'Motor' },
  { key: 'partDifferential', name: 'Differential' },
  { key: 'partSuspension',   name: 'Suspension' },
  { key: 'partLeafSprings',  name: 'Leaf springs' }
];
SPARE_PARTS.forEach(s => { SLOT_INFO[s.key] = { kind: 'photo', label: `Photo: ${s.name.toLowerCase()}`, hint: 'Clear photo of the part, about 1600 × 1200 px', alt: `EXPRESO spare part: ${s.name.toLowerCase()}` }; });

const STORY = [
  { 
    key: 'showroom', n: '01', title: 'The showroom', 
    text: 'EXPRESO models on display at the RIT Enterprise showroom.' 
  },
  { 
    key: 'warehouse', n: '02', title: 'Warehouse', 
    text: 'Our warehouse, where parts and components are stored.' 
  },
  { 
    key: 'assembly', n: '03', title: 'Assembly', 
    text: 'Our assembly line, where parts are assembled into complete vehicles by the mechanics.'
  },
  { 
    key: 'finished', n: '04', title: 'The finished EXPRESO', 
    text: 'The completed electric three-wheeler, ready for customers.' 
  }
];

const P = t => `<span class="tbc-inline">${t}</span>`;
const FAQS = [
  { q: 'Is delivery or financing available?', 
    a: `Yes, we provide delivery and financing options.` 
  },
  { q: 'Which vehicle models are available?', 
    a: `EXPRESO currently offers two models: the Standard Passenger Electric Rickshaw and the EXPRESO 2.0 Cargo Loader. See <a href="#models">Explore Models</a> for each one.` 
  },
  { q: 'Do you take wholesale or bulk orders?', 
    a: `Yes. Wholesale, bulk and business enquiries are welcome. Use the <a href="#business">business enquiry form</a> with your location, the model you want and the quantity you expect.` 
  },
  { q: 'How do I become a dealer or distributor?', 
    a: `Send a dealer or distributorship enquiry through the <a href="#business">business enquiry form</a>. RIT Enterprise will contact you to discuss next steps.` 
  },
  { q: 'How can an individual customer buy a vehicle?', 
    a: `Message us on WhatsApp, call, or send the short retail enquiry form. We reply with details on the model you choose.` 
  },
  { q: 'How do I contact EXPRESO?', 
    a: `Phone: <span data-bind="phoneDisplay"></span>. WhatsApp: use the green button on any page. Email: <span data-bind="email"></span>. Shop location: <span data-bind="address"></span>.` 
  },
  { q: 'Who is behind EXPRESO?', 
    a: `EXPRESO is a brand of RIT Enterprise, based in West Bengal, India. RIT Enterprise imports components and assembles complete electric three-wheelers under the EXPRESO brand.` 
  },
  { q: 'What does each model cost?', 
    a: `${P('[Pricing to be added]')}. For current pricing, please send an enquiry.` 
  },
  { q: 'What warranty and after-sales support do you offer?', 
    a: `${P('[Warranty and service details to be added]')}` 
  }
];

/* 3 HELPERS --------------------------------------------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const digits = s => String(s || '').replace(/\D/g, '');
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPlaceholder = v => !v || /X{3,}|\[|your-domain/i.test(v);
const waReady = () => /^\d{8,15}$/.test(CONFIG.whatsapp);
const waUrl = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Touch swipe helper. Fires onLeft / onRight on a mostly-horizontal flick.
   Mouse is ignored (the model slider has its own drag). The element needs
   touch-action: pan-y in CSS so vertical scrolling keeps working. */
function onSwipe(el, onLeft, onRight) {
  if (!el) return;
  let s = null;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    s = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  el.addEventListener('pointerup', e => {
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y, dt = performance.now() - s.t;
    s = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5 || dt > 800) return;
    (dx < 0 ? onLeft : onRight)();
  });
  el.addEventListener('pointercancel', () => { s = null; });
}
const touchOnly = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied. This is a placeholder until you add the real detail.');
    return;
  } catch (e) { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    toast(ok ? 'Copied.' : 'Select the text and copy it manually.');
  } catch (e) { toast('Select the text and copy it manually.'); }
}

/* Binds contact text, WhatsApp/phone/social links from CONFIG. Safe to call again after any render. */
function updateBindings() {
  $$('[data-bind]').forEach(el => {
    const v = CONFIG[el.dataset.bind] || '';
    el.textContent = v;
    el.classList.toggle('tbc-inline', isPlaceholder(v));
  });
  $$('[data-wa]').forEach(a => {
    if (waReady()) {
      a.href = waUrl(a.dataset.waMsg || 'Hello EXPRESO');
      a.target = '_blank'; a.rel = 'noopener';
    } else { a.href = '#'; a.removeAttribute('target'); }
  });
  $$('[data-tel]').forEach(a => {
    if (!isPlaceholder(CONFIG.phoneTel)) a.href = `tel:${CONFIG.phoneTel}`; else a.href = '#';
  });
  $$('[data-social]').forEach(a => {
    const u = CONFIG[a.dataset.social];
    if (u) { a.href = u; a.target = '_blank'; a.rel = 'noopener'; } else { a.href = '#'; a.removeAttribute('target'); }
  });
}

/* 4 IMAGE SLOTS ----------------------------------------------------------- */
const state = { images: {}, proto: true };

function slotHTML(key, ratio, extra = '') {
  return `<div class="slot ${extra}" data-slot="${key}" data-ratio="${ratio || ''}"></div>`;
}
function renderSlot(el) {
  const key = el.dataset.slot;
  const info = SLOT_INFO[key] || { kind: 'photo', label: key, hint: '', alt: key };
  const src = state.images[key] || CONFIG.images[key] || '';
  el.dataset.kind = info.kind;
  el.style.setProperty('--ratio', el.dataset.ratio || (info.kind === 'cutout' ? '16/10' : '4/3'));
  if (src) {
    el.classList.add('has-img');
    el.innerHTML = `${info.kind === 'cutout' ? '<div class="vshadow"></div>' : ''}<img src="${esc(src)}" alt="${esc(info.alt)}" decoding="async"><button class="slot-change proto-only" type="button" data-upload="${key}">Change photo</button>`;
  } else {
    el.classList.remove('has-img');
    el.innerHTML = `<div class="ph"><span class="ph-tag">Placeholder</span><strong>${esc(info.label)}</strong><small>${esc(info.hint)}</small><button class="ph-up proto-only" type="button" data-upload="${key}">Preview my photo</button></div>`;
  }
}
const renderSlots = (root = document) => $$('.slot[data-slot]', root).forEach(renderSlot);

let uploadKey = null;
function pickFile(key) {
  uploadKey = key;
  let input = $('#file-input');
  if (!input) {
    input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.id = 'file-input'; input.hidden = true;
    input.addEventListener('change', () => {
      const f = input.files && input.files[0];
      if (f && uploadKey) {
        state.images[uploadKey] = URL.createObjectURL(f);
        renderSlots();
        const k = SLOT_INFO[uploadKey] || {};
        toast(k.kind === 'cutout' ? 'Photo applied. A transparent PNG gives the full pop-out effect.' : 'Photo applied.');
      }
      input.value = '';
    });
    document.body.appendChild(input);
  }
  input.click();
}

/* 5 ROUTER ---------------------------------------------------------------- */
/* Hash routes: #home #models #about #business #faq #contact (sections of the home view)
   and #passenger-rickshaw #cargo-loader (model detail views). */
const SECTIONS = ['home', 'models', 'about', 'business', 'faq', 'contact'];
const DETAILS = Object.keys(MODELS);
const PAGE = document.body.dataset.page || 'home';   /* 'home' or a model id such as 'cargo-loader' */
const IS_DETAIL = DETAILS.includes(PAGE);
let currentView = IS_DETAIL ? PAGE : 'home';
/* each model lives in its own file: cargo-loader.html, passenger-rickshaw.html */
const pageUrl = name => DETAILS.includes(name) ? `${name}.html` : (name === 'home' ? 'index.html' : `index.html#${name}`);

const hashName = () => decodeURIComponent((location.hash || '').replace(/^#/, '')) || 'home';

function navigate(name) {
  if (IS_DETAIL || DETAILS.includes(name)) { location.href = pageUrl(name); return; }
  try { history.replaceState(null, '', '#' + name); } catch (e) { try { location.hash = name; } catch (e2) { /* ignore */ } }
  route();
}
function route() {
  closeMenu();
  if (IS_DETAIL) return;
  const name = hashName();
  if (DETAILS.includes(name)) { location.replace(pageUrl(name)); return; }  /* old #cargo-loader links */
  const changed = showHome();
  scrollToSection(SECTIONS.includes(name) ? name : 'home', !changed);
}
function showHome() {
  const changed = currentView !== 'home';
  $('#view-home').hidden = false;
  $('#view-detail').hidden = true;
  $('#view-detail').innerHTML = '';
  currentView = 'home';
  return changed;
}
function scrollToSection(id, smooth) {
  const el = document.getElementById(id);
  if (!el) return;
  let y = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 4;
  window.scrollTo({ top: Math.max(0, y), behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
}
function showDetail(id) {
  currentView = id;
  const v = $('#view-detail');
  v.hidden = false;
  v.innerHTML = detailHTML(id);
  renderSlots(v); observeReveals(v); updateBindings();
  const main = $('.d-main', v), thumbs = $$('.color-thumb', v);
  thumbs.forEach(t => t.addEventListener('click', () => {
    main.dataset.slot = t.dataset.slot; renderSlot(main);
    thumbs.forEach(x => x.setAttribute('aria-pressed', String(x === t)));
  }));
  window.scrollTo({ top: 0, behavior: 'auto' });
  setActiveNav('models');
  document.title = `${MODELS[id].name} | EXPRESO by RIT Enterprise`;
}

document.addEventListener('click', e => {
  /* placeholder links that cannot work yet */
  const wa = e.target.closest('[data-wa]');
  if (wa && !waReady()) { e.preventDefault(); toast('Add your WhatsApp number in app.js (CONFIG), or type one into Prototype tools to test.'); return; }
  const tel = e.target.closest('[data-tel]');
  if (tel && isPlaceholder(CONFIG.phoneTel)) { e.preventDefault(); toast('Phone number is a placeholder. Add it in app.js (CONFIG).'); return; }
  const soc = e.target.closest('[data-social]');
  if (soc && !CONFIG[soc.dataset.social]) { e.preventDefault(); toast(`Add your ${soc.dataset.social} link in app.js (CONFIG).`); return; }

  const go = e.target.closest('[data-go]');
  if (go) { e.preventDefault(); closeModal(); navigate(go.dataset.go); return; }
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const name = a.getAttribute('href').slice(1);
    if (!name) { e.preventDefault(); return; }
    if (!IS_DETAIL && SECTIONS.includes(name)) { e.preventDefault(); navigate(name); }
  }
});
window.addEventListener('hashchange', route);

/* 6 NAV ------------------------------------------------------------------- */
function closeMenu() {
  const nav = $('#nav');
  nav.classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
}
function setActiveNav(name) {
  $$('.links a').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
}
function initNav() {
  $('#burger').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open');
    $('#burger').setAttribute('aria-expanded', String(open));
  });
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking || currentView !== 'home') return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const probe = window.scrollY + 140;
      let active = 'home';
      ['models', 'about', 'business', 'faq', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe + 60) active = id;
      });
      setActiveNav(active === 'faq' ? '' : active);
    });
  }, { passive: true });
}

/* 7 HERO ------------------------------------------------------------------ */
const hero = { i: 0, timer: null, manual: false };
function setHero(i) {
  hero.i = (i + 2) % 2;
  $$('.hslide-copy').forEach(el => {
    const on = +el.dataset.i === hero.i;
    el.classList.toggle('is-active', on);
    el.setAttribute('aria-hidden', String(!on));
    $$('a,button', el).forEach(b => b.tabIndex = on ? 0 : -1);
  });
  $$('.vslide').forEach(el => el.classList.toggle('is-active', +el.dataset.i === hero.i));
  $$('.hero .line-tab').forEach(el => el.classList.toggle('is-active', +el.dataset.hero === hero.i));
}
function restartProgress() {
  const t = $('.hero .line-tab.is-active');
  if (!t) return;
  t.classList.remove('is-active'); void t.offsetWidth; t.classList.add('is-active');
}
function startAuto() {
  stopAuto();
  if (hero.manual || reduceMotion) return;
  hero.timer = setInterval(() => setHero(hero.i + 1), 7000);
}
function stopAuto() { clearInterval(hero.timer); hero.timer = null; }
function initHero() {
  const el = $('#home');
  setHero(0);
  const goManual = n => { hero.manual = true; el.classList.add('manual'); stopAuto(); setHero(n); };
  $$('[data-hero]').forEach(b => b.addEventListener('click', () => goManual(+b.dataset.hero)));
  $$('[data-hero-step]').forEach(b => b.addEventListener('click', () => goManual(hero.i + +b.dataset.heroStep)));
  el.addEventListener('pointerenter', () => { el.classList.add('paused'); stopAuto(); });
  el.addEventListener('pointerleave', () => { el.classList.remove('paused'); if (!hero.manual) { restartProgress(); startAuto(); } });
  el.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') goManual(hero.i + (e.key === 'ArrowRight' ? 1 : -1));
  });

  /* NEW: swipe the hero to change slide */
  onSwipe(el, () => goManual(hero.i + 1), () => goManual(hero.i - 1));

  /* NEW: no autoplay on touch devices. The tab line stays full, like after a manual tap. */
  if (touchOnly) { hero.manual = true; el.classList.add('manual'); }

  /* pointer parallax on the vehicle and ghost wordmark */
  if (!reduceMotion) {
    let raf = 0;
    el.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    });
  }
  startAuto();   /* returns straight away when hero.manual is true */
}

/* 8 MODELS (home) --------------------------------------------------------- */

function specValue(m, label) {
  const v = m.values && m.values[label];
  return v ? esc(v) : '<span class="tbc" title="Placeholder: value to be confirmed">TBC</span>';
}

/* One slide. Layout is now two columns:
   LEFT  = .sr-media  (vehicle on top, line tabs + arrows directly below it)
   RIGHT = .sr-info   (text and specs) */
function modelShowroom(id) {
  const m = MODELS[id];

  return `
  <article class="showroom sr-${m.key}" id="model-${m.key}">
    <div class="sr-bg" aria-hidden="true">
      <div class="sr-ghost">${m.ghost}</div>
    </div>

    <div class="wrap sr-in">

      <div class="sr-media">
        <div class="sr-vehicle rv">
          ${slotHTML(m.slot, '16/10')}
        </div>

        <div class="slider-ctrl sr-ctrl">
          <div class="line-tabs">
            ${DETAILS.map((tabId, n) => `
              <button class="line-tab" type="button" data-model="${n}"
                aria-label="Show ${esc(MODELS[tabId].name)}"></button>
            `).join('')}
          </div>

          <div class="arrow-group">
            <button class="arrow-btn prev" type="button"
              data-model-step="-1" aria-label="Previous model">
              <svg aria-hidden="true"><use href="#i-arrow"/></svg>
            </button>
            <button class="arrow-btn" type="button"
              data-model-step="1" aria-label="Next model">
              <svg aria-hidden="true"><use href="#i-arrow"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="sr-info rv" style="--d:.1s">
        <p class="eyebrow">${m.tag}</p>
        <h3>${m.nameHTML}</h3>
        <p class="lead">${m.blurb}</p>
        <dl class="specs">
          ${m.keySpecs.map(s => `
            <div class="spec">
              <dt>${esc(s)}</dt>
              <dd>${specValue(m, s)}</dd>
            </div>
          `).join('')}
        </dl>
        <p class="spec-note">
          <span class="tbc">TBC</span> marks a placeholder for a confirmed figure.
        </p>
        <div class="actions">
          <a class="btn" href="${id}.html">
            View Details <svg aria-hidden="true"><use href="#i-arrow"/></svg>
          </a>
          <button class="btn btn-ghost" type="button"
            data-open-enquiry="${m.key}">Enquire Now</button>
        </div>
      </div>

    </div>
  </article>`;
}

function renderModels() {
  $('#model-list').innerHTML = DETAILS.map(id => modelShowroom(id)).join('');
}

/* Slider: arrows, line tabs, drag / swipe, trackpad swipe, arrow keys. */
function initModels() {
  const sec = $('#models'), vp = $('#model-viewport'), track = $('#model-list');
  if (!sec || !vp || !track) return;

  if (!track.children.length) renderModels();

  const slides = Array.from(track.querySelectorAll('.showroom'));
  if (!slides.length) return;
  const last = slides.length - 1;

  /* every slide has its own copy of the tabs and arrows, so these are lists */
  const tabs = Array.from(sec.querySelectorAll('[data-model]'));
  const prev = Array.from(sec.querySelectorAll('[data-model-step="-1"]'));
  const next = Array.from(sec.querySelectorAll('[data-model-step="1"]'));
  let i = 0;

  slides.forEach((s, n) => {
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'slide');
    s.setAttribute('aria-label', `${n + 1} of ${slides.length}`);
    s.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
  });

  function setX(px) {
    track.style.transform = `translate3d(calc(${-i * 100}% + ${px}px), 0, 0)`;
  }

  function go(n) {
    const was = document.activeElement;
    i = Math.max(0, Math.min(last, n));
    setX(0);

    slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      s.toggleAttribute('inert', k !== i);
    });

    tabs.forEach(t => {
      const on = Number(t.dataset.model) === i;
      t.classList.toggle('is-active', on);
      if (on) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });

    prev.forEach(b => { b.disabled = i === 0; });
    next.forEach(b => { b.disabled = i === last; });

    /* if the button you were using just got disabled, move focus to its twin */
    if (was && was.disabled) {
      const wasNext = was.matches('[data-model-step="1"]');
      const other = slides[i].querySelector(
        wasNext ? '[data-model-step="-1"]' : '[data-model-step="1"]'
      );
      if (other) other.focus({ preventScroll: true });
    }
  }

  prev.forEach(b => b.addEventListener('click', () => go(i - 1)));
  next.forEach(b => b.addEventListener('click', () => go(i + 1)));
  tabs.forEach(t => t.addEventListener('click', () => go(Number(t.dataset.model))));

  /* drag / swipe (mouse, touch, pen). Vertical scroll is left to the browser. */
  let d = null, justDragged = false;

  vp.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    d = { id: e.pointerId, x: e.clientX, y: e.clientY, px: e.clientX, pt: performance.now(), v: 0, dx: 0, on: false, w: vp.clientWidth };
  });

  vp.addEventListener('pointermove', e => {
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.on) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      d.on = true;
      vp.classList.add('is-dragging');
      try { vp.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
    const now = performance.now();
    if (now > d.pt) d.v = 0.8 * ((e.clientX - d.px) / (now - d.pt)) + 0.2 * d.v;
    d.px = e.clientX; d.pt = now; d.dx = dx;
    const edge = (i === 0 && dx > 0) || (i === last && dx < 0);
    setX(edge ? dx * 0.3 : dx);
  });

  function endDrag(e) {
    if (!d || e.pointerId !== d.id) return;
    const s = d; d = null;
    if (!s.on) return;
    vp.classList.remove('is-dragging');
    justDragged = true; setTimeout(() => { justDragged = false; }, 60);
    const fast = Math.abs(s.v) > 0.45;
    const far = Math.abs(s.dx) > Math.max(50, s.w * 0.18);
    const dir = fast ? (s.v < 0 ? 1 : -1) : far ? (s.dx < 0 ? 1 : -1) : 0;
    go(i + dir);
  }
  vp.addEventListener('pointerup', endDrag);
  vp.addEventListener('pointercancel', endDrag);
  vp.addEventListener('click', e => { if (justDragged) { e.preventDefault(); e.stopPropagation(); } }, true);
  vp.addEventListener('dragstart', e => e.preventDefault());

  /* two-finger trackpad swipe */
  let lock = 0;
  vp.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 18) return;
    e.preventDefault();
    const t = performance.now();
    if (t < lock) return;
    lock = t + 900;
    go(i + (e.deltaX > 0 ? 1 : -1));
  }, { passive: false });

  /* arrow keys while focus is inside the section */
  sec.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target.closest('input, select, textarea')) return;
    go(i + (e.key === 'ArrowRight' ? 1 : -1));
  });

  go(0);
}

/* 9 DETAIL VIEWS ---------------------------------------------------------- */
function detailHTML(id) {
  const m = MODELS[id], o = MODELS[m.other];
  const mini = m.keySpecs.slice(0, 3).map(s => `<div class="spec"><dt>${esc(s)}</dt><dd>${specValue(m, s)}</dd></div>`).join('');
  const specTables = m.groups.map(([g, rows]) => `
    <div class="spec-table"><h4>${g}</h4><dl>${rows.map(r => `<div class="spec-row"><dt>${esc(r)}</dt><dd>${specValue(m, r)}</dd></div>`).join('')}</dl></div>`).join('');
  const colorThumbs = m.colors.map((c, i) => `
    <button class="color-thumb" type="button" data-slot="${m.key}Color${i + 1}" aria-pressed="${i === 0}" aria-label="Show ${esc(c)}">
      <div class="slot" data-slot="${m.key}Color${i + 1}" data-ratio="16/10" data-noup></div>
      <span>${esc(c)}</span>
    </button>`).join('');
  const parts = SPARE_PARTS.map(s => {
    const note = m.partNotes && m.partNotes[s.key];
    return `
    <div class="part">${slotHTML(s.key, '4/3')}<b>${esc(s.name)}</b><p>${note ? esc(note) : P('[Describe this part, what it does and when it needs replacing]')}</p></div>`;
  }).join('');
  const features = m.features.map(f => {
    const feat = typeof f === 'string' ? { t: f } : f;
    return `<div class="feature"><b>${esc(feat.t)}</b><p>${feat.d ? esc(feat.d) : P('[Describe this feature once confirmed]')}</p></div>`;
  }).join('');
  return `
  <section class="d-hero d-${m.key}">
    <div class="d-bg" aria-hidden="true"><i></i><i></i></div>
    <div class="wrap d-in">
      <div class="d-copy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html#home">Home</a><span>/</span><a href="index.html#models">Models</a><span>/</span><span>${m.short}</span></nav>
        <p class="eyebrow">${m.tag}</p>
        <h1>${m.nameHTML}</h1>
        <p class="lead">${m.blurb}</p>
        <div class="d-mini">${mini}</div>
        <div class="actions">
          <button class="btn" type="button" data-open-enquiry="${m.key}">Enquire Now</button>
          <a class="btn btn-ghost" href="index.html#models">All models</a>
          <button class="btn btn-ghost btn-sm" type="button" data-toast="Brochure PDF is not ready yet.">Brochure (PDF)</button>
        </div>
      </div>
      <div class="d-vehicle">${slotHTML(`${m.key}Color1`, '16/10', 'd-main')}<div class="color-thumbs" role="group" aria-label="Colours">${colorThumbs}</div></div>
    </div>
  </section>

  <section class="d-body">
    <div class="wrap">
      <section class="d-sec" id="overview">
        <h2 class="d-sec-title">Overview</h2>
        <div class="two-col">
          <div class="stack">
            <h3>${esc(m.name)}</h3>
            <p class="lead">${m.overview}</p>
            <p class="spec-note"></p>
          </div>
          <div class="stack">
            <p class="eyebrow">Suggested use</p>
            <ul class="list">${m.designedFor.map(x => `<li>${x}</li>`).join('')}</ul>
            <p class="spec-note">Suggested use cases for review. Confirm with RIT Enterprise before launch.</p>
          </div>
        </div>
      </section>

      <section class="d-sec" id="specifications">
        <h2 class="d-sec-title">Specifications</h2>
        <div class="spec-tables">${specTables}</div>
        <p class="spec-note" style="margin-top:26px"><span class="tbc">TBC</span> marks a placeholder. Add confirmed figures to the <code>values</code> object for this model in app.js.</p>
      </section>

      <section class="d-sec" id="features">
        <h2 class="d-sec-title">Features</h2>
        <div class="features">${features}</div>
      </section>

      <section class="d-sec" id="spare-parts">
        <h2 class="d-sec-title">Spare parts</h2>
        <!-- <p class="lead">The main components of the ${esc(m.short)}, available as spare parts. Ask us for availability and pricing.</p> -->
        <div class="parts">${parts}</div>
      </section>

      <div class="d-cta rv">
        <div class="stack"><h3>Interested in the ${esc(m.short)}?</h3><p class="lead">Send an enquiry for pricing, availability and next steps.</p></div>
        <div class="actions">
          <button class="btn" type="button" data-open-enquiry="${m.key}">Enquire Now</button>
          <a class="btn btn-wa" href="#" data-wa data-wa-msg="Hello EXPRESO, I would like to know more about the ${esc(m.name)}."><svg aria-hidden="true"><use href="#i-wa"/></svg> WhatsApp</a>
        </div>
      </div>

      <a class="other-model rv" href="${m.other}.html">
        <div><span>Also in the range · ${o.n}</span><b>${esc(o.name)}</b></div>
        <svg width="28" height="28" aria-hidden="true"><use href="#i-arrow"/></svg>
      </a>
    </div>
  </section>`;
}
/* Generic accessible tab behaviour (detail tabs, enquiry tabs share this) */
function wireTabs(tabs, onSelect) {
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => onSelect(i));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      onSelect(n); tabs[n].focus();
    });
  });
}
function bindTabs(root) {
  const tabs = $$('.tab', root);
  wireTabs(tabs, n => tabs.forEach((t, i) => {
    const on = i === n;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    $('#' + t.getAttribute('aria-controls'), root).hidden = !on;
  }));
}

/* 10 BEHIND EXPRESO ------------------------------------------------------- */
function initStory() {
  const thumbs = $('#thumbs');
  thumbs.innerHTML = STORY.map((s, i) => `
    <button class="thumb" type="button" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
      <div class="slot" data-slot="${s.key}" data-ratio="4/3" data-noup></div>
      <span class="thumb-label"><b>${s.n}</b><span>${s.title}</span></span>
    </button>`).join('');
  const tabs = $$('.thumb', thumbs);
  const stage = $('#stage-slot');
  let cur = 0;
  const select = n => {
    cur = n;
    const s = STORY[n];
    tabs.forEach((t, i) => { t.setAttribute('aria-selected', String(i === n)); t.tabIndex = i === n ? 0 : -1; });
    stage.dataset.slot = s.key;
    renderSlot(stage);
    $('#stage-title').textContent = `${s.n}  ${s.title}`;
    $('#stage-text').textContent = s.text;
  };
  wireTabs(tabs, select);
  /* NEW: swipe the big photo to step through the four steps */
  onSwipe($('#stage'),
    () => select(Math.min(STORY.length - 1, cur + 1)),
    () => select(Math.max(0, cur - 1)));
  select(0);
}

/* 11 ENQUIRY TABS + FORMS ------------------------------------------------- */
function initEnquiryTabs() {
  const tabs = [$('#tab-volume'), $('#tab-single')];
  const panels = [$('#panel-volume'), $('#panel-single')];
  wireTabs(tabs, n => tabs.forEach((t, i) => {
    t.setAttribute('aria-selected', String(i === n)); t.tabIndex = i === n ? 0 : -1;
    panels[i].hidden = i !== n;
  }));
}
function setFieldError(field, el, msg) {
  field.classList.toggle('err', !!msg);
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  let m = $('.err-msg', field);
  if (msg) {
    if (!m) { m = document.createElement('div'); m.className = 'err-msg'; m.id = `${el.id}-err`; field.appendChild(m); }
    m.textContent = msg; el.setAttribute('aria-describedby', m.id);
  } else if (m) { m.remove(); el.removeAttribute('aria-describedby'); }
}
function validateForm(form) {
  let ok = true, firstBad = null;
  $$('.field', form).forEach(f => {
    const el = $('input,select,textarea', f);
    const v = (el.value || '').trim();
    let msg = '';
    if (el.hasAttribute('data-req') && !v) msg = 'This field is required.';
    else if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Enter a valid email address.';
    else if (v && el.type === 'tel' && (digits(v).length < 10 || digits(v).length > 13)) msg = 'Enter a phone number with 10 to 13 digits.';
    else if (v && el.type === 'number' && Number(v) < 1) msg = 'Enter a quantity of 1 or more.';
    setFieldError(f, el, msg);
    if (msg) { ok = false; if (!firstBad) firstBad = el; }
  });
  if (firstBad) firstBad.focus();
  return ok;
}
function summarise(form) {
  return $$('.field', form).map(f => {
    const el = $('input,select,textarea', f);
    const label = $('label', f).textContent.replace('*', '').trim();
    const val = el.tagName === 'SELECT' ? (el.selectedOptions[0] ? el.selectedOptions[0].textContent : '') : el.value.trim();
    return val && el.value !== '' ? [label, val] : null;
  }).filter(Boolean);
}
function submitForm(form) {
  if (!validateForm(form)) return;
  const wrap = form.closest('[data-form-wrap]');
  const result = $('[data-result]', wrap);
  const rows = summarise(form);
  const name = (new FormData(form).get('name') || '').toString().trim();
  const msg = [`Hello EXPRESO, this is a ${form.dataset.kind.toLowerCase()}.`, ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n');
  result.innerHTML = `
    <span class="tick" aria-hidden="true"><svg><use href="#i-check"/></svg></span>
    <h3>Enquiry ready</h3>
    <p class="lead">Thank you${name ? ', ' + esc(name) : ''}. Here is what you entered.</p>
    <dl class="sum">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <p class="proto-note">Prototype: this form is not connected yet, so nothing has been sent. Connect it to your email, CRM or backend before launch. Meanwhile you can send the same details on WhatsApp.</p>
    <div class="actions">
      <a class="btn btn-wa" href="#" data-wa data-wa-msg="${esc(msg)}"><svg aria-hidden="true"><use href="#i-wa"/></svg> Send on WhatsApp</a>
      <button class="btn btn-ghost" type="button" data-reset-form>New enquiry</button>
    </div>`;
  form.hidden = true; result.hidden = false;
  updateBindings();
  result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
}
document.addEventListener('submit', e => {
  const form = e.target.closest('form[data-kind]');
  if (!form) return;
  e.preventDefault();
  submitForm(form);
});
document.addEventListener('input', e => {
  const f = e.target.closest('.field.err');
  if (f) setFieldError(f, $('input,select,textarea', f), '');
});
document.addEventListener('click', e => {
  const reset = e.target.closest('[data-reset-form]');
  if (reset) {
    const wrap = reset.closest('[data-form-wrap]');
    const form = $('form', wrap);
    form.reset(); form.hidden = false; $('[data-result]', wrap).hidden = true;
    $$('.field.err', form).forEach(f => setFieldError(f, $('input,select,textarea', f), ''));
  }
  const pre = e.target.closest('[data-prefill-type]');
  if (pre) {
    $('#w-type').value = pre.dataset.prefillType;
    const form = $('#form-wholesale');
    if (form.hidden) $('[data-reset-form]', form.closest('[data-form-wrap]')).click();
    form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => $('#w-name').focus({ preventScroll: true }), 350);
  }
  const t = e.target.closest('[data-toast]');
  if (t) toast(t.dataset.toast);
  const c = e.target.closest('[data-copy]');
  if (c) copyText(CONFIG[c.dataset.copy] || '');
  const up = e.target.closest('[data-upload]');
  if (up) { e.preventDefault(); pickFile(up.dataset.upload); return; }
  const gi = e.target.closest('.g-item .slot.has-img');
  if (gi && !e.target.closest('[data-upload]')) openLightbox($('img', gi).src, $('img', gi).alt);
});

/* 12 FAQ ------------------------------------------------------------------ */
function initFaq() {
  $('#faq-list').innerHTML = FAQS.map((f, i) => `
    <div class="faq-item">
      <h3 style="font:inherit;text-transform:none"><button class="faq-q" type="button" id="fq-${i}" aria-expanded="false" aria-controls="fa-${i}"><span>${esc(f.q)}</span><span class="plus" aria-hidden="true"></span></button></h3>
      <div class="faq-a" id="fa-${i}" role="region" aria-labelledby="fq-${i}" inert><div><p>${f.a}</p></div></div>
    </div>`).join('');
  $$('.faq-q').forEach(b => b.addEventListener('click', () => {
    const item = b.closest('.faq-item');
    const open = !item.classList.contains('open');
    item.classList.toggle('open', open);
    b.setAttribute('aria-expanded', String(open));
    const a = $('.faq-a', item);
    if (open) a.removeAttribute('inert'); else a.setAttribute('inert', '');
  }));
  // Target and click the first two FAQ buttons by index
    const faqButtons = $$('.faq-q');
    if (faqButtons[0]) faqButtons[0].click(); /* first answer open */
    if (faqButtons[1]) faqButtons[1].click(); /* second answer open */
}

/* 13 MODAL + LIGHTBOX ----------------------------------------------------- */
let lastFocus = null;
const MODEL_NAMES = { cargo: 'EXPRESO 2.0 Cargo Loader', passenger: 'Standard Passenger Electric Rickshaw' };
function openModal(modelKey) {
  const modal = $('#modal');
  lastFocus = document.activeElement;
  const wrap = $('[data-form-wrap]', modal);
  const form = $('#form-quick');
  if (form.hidden) { form.reset(); form.hidden = false; $('[data-result]', wrap).hidden = true; }
  $('#q-model').value = MODEL_NAMES[modelKey] || 'Not sure yet';
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  closeMenu();
  setTimeout(() => $('#q-name').focus(), 60);
}
function closeModal() {
  const modal = $('#modal');
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function openLightbox(src, alt) {
  const lb = $('#lightbox');
  $('img', lb).src = src; $('img', lb).alt = alt;
  lb.hidden = false;
}
function initOverlays() {
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open-enquiry]');
    if (o) { e.preventDefault(); openModal(o.dataset.openEnquiry); }
  });
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  $('#lightbox').addEventListener('click', () => { $('#lightbox').hidden = true; });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('#lightbox').hidden) $('#lightbox').hidden = true;
      else if (!$('#modal').hidden) closeModal();
      else closeMenu();
    }
    if (e.key === 'Tab' && !$('#modal').hidden) {
      const f = $$('button,input,select,textarea,a[href]', $('#modal')).filter(x => !x.closest('[hidden]') && !x.disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* 14 PROTOTYPE TOOLS ------------------------------------------------------ */
// function initProto() {
//   const chip = $('#proto-chip'), panel = $('#proto-panel');
//   chip.addEventListener('click', () => {
//     panel.hidden = !panel.hidden;
//     chip.setAttribute('aria-expanded', String(!panel.hidden));
//   });
//   $('#proto-wa').addEventListener('input', e => {
//     const d = digits(e.target.value);
//     CONFIG.whatsapp = d || '91XXXXXXXXXX';
//     updateBindings();
//   });
//   $('#proto-reset').addEventListener('click', () => { state.images = {}; renderSlots(); toast('Your preview photos were cleared.'); });
//   $('#proto-hide').addEventListener('click', e => {
//     state.proto = !state.proto;
//     document.body.classList.toggle('proto-on', state.proto);
//     e.target.textContent = state.proto ? 'Hide image buttons' : 'Show image buttons';
//   });
//   document.body.classList.add('proto-on');
// }

/* 15 MOTION --------------------------------------------------------------- */
let io = null;
function observeReveals(root = document) {
  const els = $$('.rv:not(.in)', root);
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  if (!io) io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

/* Phones: hide the floating WhatsApp button while the hero is mostly on screen,
   because the hero already has its own buttons. The CSS for .is-hidden only
   exists inside the 640px media query, so laptops are not affected. */
function initWaFloat() {
  const fab = $('.wa-float'), hero = $('#home');
  if (!fab || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([en]) => {
    fab.classList.toggle('is-hidden', en.isIntersecting && en.intersectionRatio > 0.35);
  }, { threshold: [0, 0.35, 0.7, 1] }).observe(hero);
}

/* 16 BOOT ----------------------------------------------------------------- */
function boot() {
  document.documentElement.classList.add('js');
  if (IS_DETAIL) {
    showDetail(PAGE);
  } else {
    renderModels();
    initModels();
    initFaq();
    initStory();
    initEnquiryTabs();
    initHero();
    initWaFloat();
  }
  initNav();
  initOverlays();
  // initProto();
  renderSlots();
  updateBindings();
  observeReveals();
  route();
}
boot();