// ===================== DATA =====================
const portfolioData = {
  gathering: {
    title: 'Gathering',
    images: [
      'Gambar lokasi/Gathering/Gathering 1.jpeg',
      'Gambar lokasi/Gathering/Gathering 2.jpeg',
      'Gambar lokasi/Gathering/Gathering 3.jpeg'
    ],
    desc: 'Kami menyelenggarakan berbagai acara gathering: Family Gathering, Corporate Gathering, dan Community Gathering. Setiap acara dirancang dengan konsep yang hangat dan penuh kebersamaan di venue alam pilihan.',
    activities: ['Family Gathering', 'Corporate Gathering', 'Community Gathering'],
    rating: 4.5,
    ratingCount: 28,
    partners: [
      { name: 'Sisi Cai', img: 'Gambar lokasi/Lokasi Venue/Sisi Cai.jfif' },
      { name: 'Danau Cisadon Sentul', img: 'Gambar lokasi/Lokasi Venue/Danau Cisadon.jpeg' },
      { name: 'Curug Bidadari', img: 'Gambar lokasi/Lokasi Venue/Curug Bidadari.jfif' }
    ]
  },
  'team-building': {
    title: 'Outbound',
    images: [
      'Gambar lokasi/Team Building/Team Building 1.jpeg',
      'Gambar lokasi/Team Building/Team Building 2.jpeg',
      'Gambar lokasi/Team Building/Team Building 3.jpeg'
    ],
    desc: 'Program Outbound kami mencakup Team Building, Fun Games, dan Inflatable Games yang dirancang untuk meningkatkan kebersamaan, komunikasi, dan kerjasama tim, serta keceriaan. Cocok untuk perusahaan, komunitas, dan kelompok.',
    activities: ['Team Building', 'Fun Games', 'Inflatable Games', 'Outdoor Games', 'Ice Breaking'],
    rating: 4.7,
    ratingCount: 35,
    partners: [
      { name: 'Sisi Cai', img: 'Gambar lokasi/Lokasi Venue/Sisi Cai.jfif' },
      { name: 'Danau Cisadon Sentul', img: 'Gambar lokasi/Lokasi Venue/Danau Cisadon.jpeg' },
      { name: 'Curug Bidadari', img: 'Gambar lokasi/Lokasi Venue/Curug Bidadari.jfif' }
    ]
  },

};

// Simulasi data jadwal yang sudah dibooking (untuk konflik)
const bookedSchedules = [
  { date: '2026-06-15', location: 'Sisi Cai' },
  { date: '2026-06-20', location: 'Danau Cisadon Sentul' },
  { date: '2026-06-25', location: 'Curug Bidadari' }
];

// Ongoing events (Edit ini untuk update event aktif — kosongkan array jika tidak ada event)
const ongoingEvents = [
  {
    title: 'Annual Corporate Gathering PT. Sinar Mas',
    category: 'Gathering',
    location: 'Sisi Cai, Sentul',
    startDate: '25 Mei 2026',
    endDate: '26 Mei 2026',
    time: '08:00 – 22:00 WIB',
    participants: '100 Peserta'
  },
  {
    title: 'Outbound Team Building GoTo',
    category: 'Team Building',
    location: 'Curug Bidadari, Sentul',
    startDate: '24 Mei 2026',
    endDate: '27 Mei 2026',
    time: '09:00 – 17:00 WIB',
    participants: '150 Peserta'
  }
];

// Valid invitation codes untuk rating
const validRatingCodes = ['JEE2026', 'RATE001', 'EXCL24'];

// ===================== DOM READY =====================
document.addEventListener('DOMContentLoaded', () => {

  // --- Dark Mode ---
  initDarkMode();



  // --- Hero Slider ---
  initHeroSlider();

  // --- Mobile Nav ---
  initMobileNav();

  // --- Portfolio Cards ---
  initPortfolio();

  // --- Portfolio Modal Close ---
  initModalClose();

  // --- Budget Calculator ---
  initBudget();

  // --- Mitra Venue ---
  renderPartners();

  // --- Rating Modal ---
  initRatingModal();

  // --- Ongoing Events ---
  initOngoingEvents();

  // --- Toast ---
  window.showToast = showToast;

});

// ===================== DARK MODE =====================
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const icon = toggle.querySelector('i');
  const saved = localStorage.getItem('jee-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun';
  }
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      localStorage.setItem('jee-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
      localStorage.setItem('jee-theme', 'dark');
    }
  });
}

// ===================== HERO SLIDER =====================
function initHeroSlider() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const slides = track.querySelectorAll('.slider-slide');
  const dots = document.getElementById('sliderDots');
  const prev = document.getElementById('sliderPrev');
  const next = document.getElementById('sliderNext');
  let currentSlide = 0;
  let interval;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.className = 'active';
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.querySelectorAll('span').forEach((d, i) => {
      d.className = i === currentSlide ? 'active' : '';
    });
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }

  function stopAuto() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  prev.addEventListener('click', () => { goToSlide(currentSlide - 1); stopAuto(); startAuto(); });
  next.addEventListener('click', () => { goToSlide(currentSlide + 1); stopAuto(); startAuto(); });

  startAuto();
}

// ===================== MOBILE NAV =====================
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.innerHTML = menu.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ===================== PORTFOLIO =====================
function initPortfolio() {
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      openPortfolioModal(cat);
    });
  });
}

function openPortfolioModal(category) {
  const data = portfolioData[category];
  if (!data) return;

  const modal = document.getElementById('portfolioModal');
  const body = document.getElementById('modalBody');

  let starsHtml = '';
  const full = Math.floor(data.rating);
  const hasHalf = data.rating % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= full) starsHtml += '<i class="fas fa-star" style="color:var(--star-active)"></i>';
    else if (i === full + 1 && hasHalf) starsHtml += '<i class="fas fa-star-half-alt" style="color:var(--star-active)"></i>';
    else starsHtml += '<i class="far fa-star" style="color:var(--star-color)"></i>';
  }

  body.innerHTML = `
    <h2>${data.title}</h2>
    <div class="modal-gallery">
      ${data.images.map(img => `<img src="${img}" alt="${data.title}" loading="lazy">`).join('')}
    </div>
    <p class="modal-desc">${data.desc}</p>
    <div class="modal-section-title">Kegiatan yang pernah dilakukan:</div>
    <ul style="margin-bottom:16px;padding-left:20px;color:var(--text2)">
      ${data.activities.map(a => `<li>${a}</li>`).join('')}
    </ul>
    <div class="modal-rating-display">
      <div class="stars-display">${starsHtml}</div>
      <div class="rating-count">${data.rating} dari 5 bintang (${data.ratingCount} rating)</div>
    </div>
    <div class="modal-section-title">Mitra / Lokasi Kerjasama:</div>
    <div class="partner-list">
      ${data.partners.map(p => `
        <div class="partner-item">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <span>${p.name}</span>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function initModalClose() {
  const modal = document.getElementById('portfolioModal');
  const close = document.getElementById('modalClose');
  close.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// ===================== MITRA VENUE =====================
const partnersData = [
   { name: 'Sisi Cai', type: 'Camping Ground', rating: '4.2', reviews: '26', img: 'Gambar lokasi/Lokasi Venue/Sisi Cai.jfif', maps: 'https://maps.app.goo.gl/fXBuzgDe2ZhBM98n8' },
   { name: 'Danau Cisadon Sentul', type: 'Wisata Alam', rating: '4.8', reviews: '34', img: 'Gambar lokasi/Lokasi Venue/Danau Cisadon.jpeg', maps: 'https://goo.gl/maps/Dg8ztW5yandfokgi8' },
   { name: 'Curug Bidadari', type: 'Wisata Alam', rating: '3.6', reviews: '4.674+', img: 'Gambar lokasi/Lokasi Venue/Curug Bidadari.jfif', maps: 'https://maps.app.goo.gl/tgCDKMcGHfKyRqUW8' },
];

function renderPartners() {
  const grid = document.getElementById('partnersGrid');
  if (!grid) return;
  grid.innerHTML = partnersData.map(p => `
    <div class="partner-card">
      <div class="partner-logo"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="partner-name">${p.name}</div>
      <div class="partner-type">${p.type}</div>
      <div class="partner-rating">
        <span class="star">★</span> ${p.rating} <span class="reviews">(${p.reviews} ulasan)</span>
      </div>
      <a href="${p.maps}" target="_blank" class="btn btn-maps" rel="noopener">Lihat di Maps</a>
    </div>
  `).join('');
}

// ===================== BUDGET SIMULATOR =====================

const budgetBase = {
  'family-gathering':    { base: 250000, label: 'Family Gathering' },
  'corporate-gathering': { base: 300000, label: 'Corporate Gathering' },
  'community-gathering': { base: 200000, label: 'Community Gathering' },
  'team-building':       { base: 200000, label: 'Team Building' },
  'fun-games':           { base: 150000, label: 'Fun Games' },
  'inflatable-games':    { base: 300000, label: 'Inflatable Games' },
};

function formatRupiah(num) {
  return 'Rp' + Math.round(num).toLocaleString('id-ID');
}

const DISCOUNT_CODE = 'DestinaraJEE2026';
const DISCOUNT_PCT = 0.1;

function getDiscount() {
  const code = (document.getElementById('redeemCode')?.value || '').trim();
  return code === DISCOUNT_CODE ? DISCOUNT_PCT : 0;
}

function applyDiscount(total, pct) {
  if (pct <= 0) return { total, discAmount: 0 };
  const discAmount = Math.round(total * pct);
  return { total: total - discAmount, discAmount };
}

window.syncBudgetPartFromSlider = function() {
  const val = parseInt(document.getElementById('budgetPart').value);
  document.getElementById('budgetPartInput').value = val;
  calcBudget();
};

window.syncBudgetPartFromInput = function() {
  let val = parseInt(document.getElementById('budgetPartInput').value) || 50;
  if (val < 50) val = 50;
  if (val > 300) val = 300;
  document.getElementById('budgetPart').value = val;
  document.getElementById('budgetPartInput').value = val;
  calcBudget();
};

window.calcBudget = function() {
  const gatheringRadio = document.querySelector('input[name="budget-gathering"]:checked');
  const outboundChecks = [...document.querySelectorAll('input[name="budget-outbound"]:checked')];
  const days = parseInt(document.getElementById('budgetDays').value) || 1;
  const pax = parseInt(document.getElementById('budgetPart').value);
  const venueKey = document.getElementById('budgetVenue').value;

  const venuePricing = {
    'sisi-cai': { name: 'Sisi Cai', perPerson: 50000 },
    'curug-bidadari': { name: 'Curug Bidadari', perPerson: 20000 },
    'danau-cisadon': { name: 'Danau Cisadon Sentul', perPerson: 30000 },
  };

  let total = 0;
  let breakdown = [];

  if (gatheringRadio) {
    const baseData = budgetBase[gatheringRadio.value];
    total += baseData.base;
    breakdown.push({ label: `Biaya Dasar (${baseData.label})`, amount: baseData.base });
  }

  outboundChecks.forEach(cb => {
    const baseData = budgetBase[cb.value];
    const amount = baseData.base * days;
    total += amount;
    breakdown.push({ label: `Biaya Tambahan (${baseData.label}) × ${days} hari`, amount });
  });

  if (venueKey && venuePricing[venueKey]) {
    const venue = venuePricing[venueKey];
    const amount = venue.perPerson * pax;
    total += amount;
    breakdown.push({ label: `Biaya Venue (${venue.name})`, amount });
  }

  const discPct = getDiscount();
  if (discPct > 0) {
    const discAmount = Math.round(total * discPct);
    total -= discAmount;
    breakdown.push({ label: `Diskon ${discPct*100}% (Kode: ${DISCOUNT_CODE})`, amount: -discAmount });
  }

  document.getElementById('partLabel').textContent = pax;
  document.getElementById('daysLabel').textContent = days;

  document.getElementById('resultAmount').textContent = formatRupiah(total);
  document.getElementById('resultBreakdown').innerHTML = breakdown.map(b => `
    <div class="breakdown-row">
      <span>${b.label}</span>
      <span>${formatRupiah(b.amount)}</span>
    </div>
  `).join('');
};

function initBudget() {
  calcBudget();
}

// ===================== BOOKING =====================
let currentStep = 1;


window.toggleCatGroup = function(header) {
  header.classList.toggle('open');
  const body = header.nextElementSibling;
  body.classList.toggle('open');
};

window.calcDuration = function() {
  const sd = document.getElementById('eventStartDate').value;
  const st = document.getElementById('eventStartTime').value;
  const ed = document.getElementById('eventEndDate').value;
  const et = document.getElementById('eventEndTime').value;
  const display = document.getElementById('durationDisplay');
  if (!sd || !st || !ed || !et) { display.value = ''; return; }
  const start = new Date(sd + 'T' + st);
  const end = new Date(ed + 'T' + et);
  if (end <= start) { display.value = 'Harap periksa tanggal/jam'; return; }
  const diffMs = end - start;
  let totalMinutes = Math.floor(diffMs / 60000);
  if (totalMinutes > 7 * 1440) { display.value = 'Maksimal 7 hari'; return; }
  let days = Math.floor(totalMinutes / 1440);
  let hours = Math.floor((totalMinutes % 1440) / 60);
  let mins = totalMinutes % 60;
  mins = Math.round(mins / 5) * 5;
  if (mins >= 60) { mins = 0; hours++; }
  if (hours >= 24) { hours -= 24; days++; }
  let text = '';
  if (days > 0) text += days + ' hari + ';
  text += String(hours).padStart(2, '0') + '.' + String(mins).padStart(2, '0') + ' jam';
  display.value = text;
};

window.nextStep = function(step) {
  if (step === 1) {
    const gathering = document.querySelectorAll('input[name="gathering-category"]:checked');
    if (!gathering.length) { alert('Pilih salah satu opsi Outbound.'); return; }
  }
  if (step === 2) {
    const required = ['eventName', 'picName', 'waNumber', 'eventStartDate', 'eventStartTime', 'eventEndDate', 'eventEndTime', 'participants'];
    for (const id of required) {
      if (!document.getElementById(id).value.trim()) {
        alert('Mohon lengkapi semua field yang wajib diisi.');
        document.getElementById(id).focus();
        return;
      }
    }
    const pax = parseInt(document.getElementById('participants').value);
    if (pax < 50 || pax > 300) {
      alert('Jumlah peserta minimal 50 dan maksimal 300 orang.');
      document.getElementById('participants').focus();
      return;
    }
    calcDuration();
    checkConflict();
    buildSummary();
  }
  goToStep(step + 1);
};

window.prevStep = function(step) { goToStep(step - 1); };

function goToStep(step) {
  document.querySelectorAll('.booking-step').forEach((el, i) => {
    el.style.display = i + 1 === step ? 'block' : 'none';
  });
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 === step) el.classList.add('active');
    if (i + 1 < step) el.classList.add('done');
  });
  currentStep = step;
}

function checkConflict() {
  const date = document.getElementById('eventStartDate').value;
  const conflict = bookedSchedules.some(ev => {
    return date && ev.date && ev.date === date;
  });
  document.getElementById('conflictWarning').style.display = conflict ? 'block' : 'none';
}

function buildSummary() {
  const cats = [...document.querySelectorAll('input[name="category"]:checked, input[name="gathering-category"]:checked')].map(c => c.value.toUpperCase()).join(', ');
  const venue = document.getElementById('venueSelect').value || '(Belum dipilih)';
  calcDuration();
  const dur = document.getElementById('durationDisplay').value || '–';

  const bookingCode = (document.getElementById('bookingRedeemCode')?.value || '').trim();
  const discPct = bookingCode === DISCOUNT_CODE ? DISCOUNT_PCT : 0;

  const rows = [
    ['Kategori Event', cats || '–'],
    ['Nama Acara', document.getElementById('eventName').value],
    ['PIC / Pemesan', document.getElementById('picName').value],
    ['No. WhatsApp', document.getElementById('waNumber').value],
    ['Mulai Event', document.getElementById('eventStartDate').value + ' ' + document.getElementById('eventStartTime').value],
    ['Selesai Event', document.getElementById('eventEndDate').value + ' ' + document.getElementById('eventEndTime').value],
    ['Durasi', dur],
    ['Jumlah Peserta', document.getElementById('participants').value + ' orang'],
    ['Lokasi', venue],
    ['Kode Diskon', discPct > 0 ? `${bookingCode} (Diskon ${discPct*100}%)` : bookingCode || '–'],
    ['Catatan', document.getElementById('notes').value || '–']
  ];

  document.getElementById('orderSummary').innerHTML = rows.map(([label, val]) => `
    <div class="summary-row">
      <span class="summary-label">${label}</span>
      <span class="summary-value">${val}</span>
    </div>
  `).join('');
}



const venueImages = {
   'Sisi Cai': 'Gambar lokasi/Lokasi Venue/Sisi Cai.jfif',
  'Danau Cisadon Sentul': 'Gambar lokasi/Lokasi Venue/Danau Cisadon.jpeg',
  'Curug Bidadari': 'Gambar lokasi/Lokasi Venue/Curug Bidadari.jfif'
};

window.updateVenueImage = function() {
  const sel = document.getElementById('venueSelect');
  const wrap = document.getElementById('venueImageWrap');
  const img = document.getElementById('venueImage');
  const url = venueImages[sel.value];
  if (url) {
    img.src = url;
    wrap.style.display = 'block';
  } else {
    wrap.style.display = 'none';
  }
};

window.sendToWhatsApp = function() {
  const cats = [...document.querySelectorAll('input[name="category"]:checked, input[name="gathering-category"]:checked')].map(c => c.value).join(', ');
  const venue = document.getElementById('venueSelect').value;
  calcDuration();
  const dur = document.getElementById('durationDisplay').value || '–';

  const bookingCode = (document.getElementById('bookingRedeemCode')?.value || '').trim();
  const discStr = bookingCode === DISCOUNT_CODE ? ' (Diskon 10% otomatis terpotong)' : '';

  const msg = encodeURIComponent(
`*PEMESANAN EVENT - Jakarta Exclusive Event*

📋 *Kategori:* ${cats}
🎪 *Nama Acara:* ${document.getElementById('eventName').value}
👤 *PIC:* ${document.getElementById('picName').value}
📅 *Mulai:* ${document.getElementById('eventStartDate').value} ${document.getElementById('eventStartTime').value}
📅 *Selesai:* ${document.getElementById('eventEndDate').value} ${document.getElementById('eventEndTime').value}
⏱ *Durasi:* ${dur}
👥 *Peserta:* ${document.getElementById('participants').value} orang
📍 *Lokasi:* ${venue}
🏷️ *Kode Diskon:* ${bookingCode || '-'}${discStr}
📝 *Catatan:* ${document.getElementById('notes').value || '-'}

Mohon konfirmasi ketersediaan. Terima kasih!`
  );

  window.open(`https://wa.me/6287770600080?text=${msg}`, '_blank');
};

// ===================== RATING MODAL =====================
function initRatingModal() {
  const modal = document.getElementById('ratingModal');
  const openBtn = document.getElementById('openRatingModal');
  const closeBtn = document.getElementById('ratingModalClose');
  const verifyBtn = document.getElementById('verifyRatingCode');
  const submitBtn = document.getElementById('submitRating');
  const stars = document.querySelectorAll('#starsContainer i');
  const ratingValue = document.getElementById('ratingValue');
  let selectedRating = 0;
  let verified = false;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      resetRating();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      resetRating();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        resetRating();
      }
    });
  }

  // Star hover effects
  if (stars.length) {
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        if (!verified) return;
        const val = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('hover', parseInt(s.dataset.value) <= val);
        });
      });
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
      star.addEventListener('click', () => {
        if (!verified) {
          const errEl = document.getElementById('ratingError');
          if (errEl) errEl.textContent = 'Verifikasi kode undangan terlebih dahulu.';
          return;
        }
        selectedRating = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
        });
        if (ratingValue) ratingValue.textContent = `${selectedRating} / 5`;
      });
    });
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const code = document.getElementById('ratingCode').value.trim();
      const error = document.getElementById('ratingError');
      if (validRatingCodes.includes(code)) {
        verified = true;
        if (error) error.textContent = '';
        const starsArea = document.getElementById('ratingStarsArea');
        if (starsArea) starsArea.style.display = 'block';
        const invite = document.querySelector('.rating-invite');
        if (invite) invite.style.display = 'none';
        showToast('Kode valid! Silakan beri rating.', 'success');
      } else {
        if (error) error.textContent = 'Kode undangan tidak valid.';
        verified = false;
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!verified) {
        showToast('Verifikasi kode undangan terlebih dahulu.', 'error');
        return;
      }
      if (selectedRating === 0) {
        showToast('Pilih rating bintang terlebih dahulu.', 'error');
        return;
      }
      showToast(`Terima kasih! Rating ${selectedRating} bintang telah dikirim.`, 'success');
      modal.classList.remove('show');
      document.body.style.overflow = '';
      resetRating();
    });
  }

  function resetRating() {
    selectedRating = 0;
    verified = false;
    const starsArea = document.getElementById('ratingStarsArea');
    if (starsArea) starsArea.style.display = 'none';
    const invite = document.querySelector('.rating-invite');
    if (invite) invite.style.display = 'block';
    const codeInput = document.getElementById('ratingCode');
    if (codeInput) codeInput.value = '';
    const errEl = document.getElementById('ratingError');
    if (errEl) errEl.textContent = '';
    stars.forEach(s => {
      s.classList.remove('active', 'hover');
    });
    if (ratingValue) ratingValue.textContent = '0 / 5';
  }
}

// ===================== ONGOING EVENTS =====================
function renderOngoing() {
  const grid = document.getElementById('ongoingGrid');
  const empty = document.getElementById('ongoingEmpty');
  if (!grid) return;

  if (!ongoingEvents || !ongoingEvents.length) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  grid.style.display = 'grid';

  grid.innerHTML = ongoingEvents.map(ev => {
    const dateStr = ev.startDate + (ev.endDate && ev.endDate !== ev.startDate ? ' &ndash; ' + ev.endDate : '');
    return '<div class="ongoing-card">'
      + '<div class="ongoing-badge">SEDANG BERLANGSUNG</div>'
      + '<div class="ongoing-title">' + ev.title + '</div>'
      + '<div class="ongoing-meta">'
      + '<span>&#x1F4CB; ' + ev.category + '</span>'
      + '<span>&#x1F4CD; ' + ev.location + '</span>'
      + '<span>&#x1F4C5; ' + dateStr + '</span>'
      + '<span>&#x23F0; ' + ev.time + '</span>'
      + '<span>&#x1F465; ' + ev.participants + '</span>'
      + '</div></div>';
  }).join('');
}

function initOngoingEvents() {
  const banner = document.getElementById('ongoingBanner');
  const text = document.getElementById('ongoingText');

  // Render the ongoing section grid
  renderOngoing();

  // Setup banner
  if (ongoingEvents.length > 0) {
    const ev = ongoingEvents[0];
    text.textContent = ` Sedang Berlangsung: ${ev.title} - ${ev.location}`;
    banner.classList.add('show');
    banner.style.cursor = 'pointer';
    banner.onclick = () => {
      document.getElementById('ongoing').scrollIntoView({ behavior: 'smooth' });
    };
  } else {
    banner.style.display = 'none';
  }
}

// ===================== TOAST =====================
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ===================== NAVBAR SCROLL EFFECT =====================
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    navbar.style.boxShadow = currentScroll > lastScroll ? '0 2px 20px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.05)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
});


