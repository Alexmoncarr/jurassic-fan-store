/* ================================================
   JURASSIC HUB — Main JavaScript
   ================================================ */

// ─── Navigation ─────────────────────────────────
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.navbar__hamburger');
const navLinks = document.querySelector('.navbar__links');

// Scroll handler
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// Mobile menu
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks?.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Active nav link
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── Intersection Observer (scroll animations) ──
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      observer.unobserve(el);
    }
  });
}, observerOptions);

// Apply to all scroll-animated elements
document.querySelectorAll('.article-card, .product-card, .stat-item').forEach((el, idx) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.delay = (idx % 4) * 80;
  observer.observe(el);
});

// ─── Scheduled Articles System ──────────────────
// Articles become visible on their publish date
function checkScheduledArticles() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll('[data-publish-date]').forEach(el => {
    const publishDate = new Date(el.dataset.publishDate);
    publishDate.setHours(0, 0, 0, 0);

    if (publishDate > today) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });
}

checkScheduledArticles();

// ─── Newsletter form ─────────────────────────────
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button, .btn');
    if (input && input.value) {
      if (btn) {
        btn.textContent = '¡Suscrito! 🦕';
        btn.style.background = 'var(--green-mid)';
        btn.style.borderColor = 'var(--green-bright)';
        btn.style.color = 'var(--white)';
      }
      input.value = '';
      input.placeholder = 'Gracias por suscribirte';
      input.disabled = true;
    }
  });
});

// ─── Store Filters ────────────────────────────────
function initStoreFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const products = document.querySelectorAll('[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      products.forEach(product => {
        if (filter === 'all' || product.dataset.category === filter) {
          product.style.display = '';
          setTimeout(() => { product.style.opacity = '1'; product.style.transform = 'translateY(0)'; }, 10);
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(10px)';
          setTimeout(() => { product.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

initStoreFilters();

// ─── Reading Progress Bar ────────────────────────
function initReadingProgress() {
  if (!document.querySelector('.article-content')) return;

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 64px;
    left: 0;
    height: 2px;
    background: var(--green-bright);
    z-index: 999;
    transition: width 0.1s linear;
    width: 0%;
    box-shadow: 0 0 8px rgba(124,200,78,0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const article = document.querySelector('.article-content');
    if (!article) return;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrolled = window.scrollY - articleTop;
    const progress = Math.max(0, Math.min(100, (scrolled / (articleHeight - window.innerHeight)) * 100));
    progressBar.style.width = progress + '%';
  });
}

initReadingProgress();

// ─── Smooth image loading ─────────────────────────
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.4s ease';
  });
  img.style.opacity = '0';
});

// ─── Affiliate link tracking (GA event stubs) ────
document.querySelectorAll('[data-affiliate]').forEach(link => {
  link.addEventListener('click', (e) => {
    const product = link.dataset.affiliate;
    console.log(`[Affiliate Click] Product: ${product}`);
    // When you have Google Analytics:
    // gtag('event', 'affiliate_click', { product_name: product });
  });
});

// ─── Copy code snippets ───────────────────────────
document.querySelectorAll('pre code').forEach(block => {
  const btn = document.createElement('button');
  btn.textContent = 'Copiar';
  btn.style.cssText = 'position:absolute;top:8px;right:8px;font-size:0.7rem;padding:4px 10px;background:var(--bg-card);border:1px solid var(--border-mid);color:var(--text-secondary);border-radius:4px;cursor:pointer;';
  block.parentElement.style.position = 'relative';
  block.parentElement.appendChild(btn);
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(block.textContent).then(() => {
      btn.textContent = '✓ Copiado';
      setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
    });
  });
});

/* =========================================================
   ENGAGEMENT ENGINE — Jurassic Hub
   ========================================================= */

// 1. LIVE VISITOR COUNTER (simulated, credible range)
(function initVisitorCounter() {
  const counter = document.querySelector('.live-counter__number');
  if (!counter) return;
  const base = 47 + Math.floor(Math.random() * 30);
  counter.textContent = base;
  setInterval(() => {
    const delta = Math.random() < 0.5 ? -1 : 1;
    const current = parseInt(counter.textContent);
    const next = Math.max(32, Math.min(120, current + delta));
    counter.textContent = next;
    counter.classList.add('pulse');
    setTimeout(() => counter.classList.remove('pulse'), 400);
  }, 7000);
})();

// 2. ESTIMATED READING TIME
document.querySelectorAll('.article-card, .article-body').forEach(el => {
  const words = el.textContent.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  const badge = el.querySelector('.reading-time');
  if (badge) badge.textContent = `${mins} min lectura`;
});

// 3. SHARE BUTTONS
function initShareButtons() {
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      const network = btn.dataset.share;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
        whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
        telegram: `https://t.me/share/url?url=${url}&text=${title}`,
        copy: null
      };
      if (network === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          btn.textContent = '✓ ¡Copiado!';
          setTimeout(() => btn.innerHTML = btn.dataset.originalHtml || '🔗 Copiar', 2000);
        });
      } else if (urls[network]) {
        window.open(urls[network], '_blank', 'width=600,height=400');
      }
    });
    btn.dataset.originalHtml = btn.innerHTML;
  });
}
initShareButtons();

// 4. COUNTDOWN TO NEXT ARTICLE
function initCountdown() {
  const el = document.getElementById('next-article-countdown');
  if (!el) return;
  const nextDate = new Date(el.dataset.date);
  function update() {
    const diff = nextDate - Date.now();
    if (diff <= 0) { el.textContent = '¡Publicado hoy!'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${d}d ${h}h ${m}m`;
  }
  update();
  setInterval(update, 60000);
}
initCountdown();

// 5. "GUARDAR PARA DESPUÉS" — bookmark local
document.querySelectorAll('[data-bookmark]').forEach(btn => {
  const id = btn.dataset.bookmark;
  const saved = JSON.parse(localStorage.getItem('jh_bookmarks') || '[]');
  if (saved.includes(id)) btn.classList.add('bookmarked');
  btn.addEventListener('click', () => {
    const list = JSON.parse(localStorage.getItem('jh_bookmarks') || '[]');
    const idx = list.indexOf(id);
    if (idx === -1) {
      list.push(id);
      btn.classList.add('bookmarked');
      btn.title = 'Guardado';
    } else {
      list.splice(idx, 1);
      btn.classList.remove('bookmarked');
      btn.title = 'Guardar para después';
    }
    localStorage.setItem('jh_bookmarks', JSON.stringify(list));
  });
});

// 6. AFFILIATE CLICK TRACKING (console + could send to analytics)
document.querySelectorAll('[data-affiliate]').forEach(link => {
  link.addEventListener('click', () => {
    const product = link.dataset.affiliate;
    if (window.gtag) {
      gtag('event', 'affiliate_click', {
        event_category: 'monetization',
        event_label: product,
        value: 1
      });
    }
    console.log('[JH Affiliate]', product);
  });
});

// 7. QUIZ DINOSAURIO (modal)
function initQuiz() {
  const trigger = document.getElementById('quiz-trigger');
  const modal = document.getElementById('quiz-modal');
  if (!trigger || !modal) return;
  
  const questions = [
    {
      q: '¿Qué prefieres hacer en tu tiempo libre?',
      opts: [
        { text: '🏃 Correr y explorar', dino: 'velociraptor' },
        { text: '🍃 Comer tranquilamente en familia', dino: 'braquiosaurio' },
        { text: '👑 Dominar mi territorio', dino: 'trex' },
        { text: '🌊 Nadar y bucear', dino: 'spinosaurus' }
      ]
    },
    {
      q: '¿Cuál es tu mayor fortaleza?',
      opts: [
        { text: '🧠 Inteligencia y estrategia', dino: 'velociraptor' },
        { text: '💪 Fuerza bruta', dino: 'trex' },
        { text: '🛡️ Defensa y resistencia', dino: 'triceratops' },
        { text: '👁️ Adaptabilidad', dino: 'spinosaurus' }
      ]
    },
    {
      q: '¿Cómo actúas ante el peligro?',
      opts: [
        { text: '⚡ Ataco primero', dino: 'trex' },
        { text: '🤝 Busco aliados', dino: 'velociraptor' },
        { text: '🏰 Me defiendo firme', dino: 'triceratops' },
        { text: '🌿 Me camuflo y espero', dino: 'dilophosaurus' }
      ]
    }
  ];

  const results = {
    velociraptor: { name: 'Velociraptor', emoji: '🦎', desc: 'Eres inteligente, rápido y trabajas mejor en equipo. Estratega nato.' },
    trex: { name: 'T-Rex', emoji: '🦖', desc: 'Eres el depredador alfa. Dominas con presencia y no necesitas correr para imponer respeto.' },
    braquiosaurio: { name: 'Braquiosaurio', emoji: '🦕', desc: 'Tranquilo, sereno y enorme. Tu paciencia y altura te dan perspectiva que otros no tienen.' },
    spinosaurus: { name: 'Spinosaurus', emoji: '🐊', desc: 'Adaptable y poderoso. Eres el más grande, y también el más incomprendido.' },
    triceratops: { name: 'Triceratops', emoji: '🦏', desc: 'Leal, protector y resistente. Tus cuernos no son para atacar, son para defender lo que amas.' },
    dilophosaurus: { name: 'Dilophosaurus', emoji: '🐍', desc: 'Misterioso y subestimado. Guardas sorpresas que nadie ve venir.' }
  };

  let step = 0;
  const votes = {};
  
  trigger.addEventListener('click', () => {
    modal.style.display = 'flex';
    renderQuestion();
  });
  modal.querySelector('.quiz-close')?.addEventListener('click', () => {
    modal.style.display = 'none';
    step = 0;
  });

  function renderQuestion() {
    const q = questions[step];
    const body = modal.querySelector('.quiz-body');
    body.innerHTML = `
      <div class="quiz-progress">${step + 1} / ${questions.length}</div>
      <h3 class="quiz-question">${q.q}</h3>
      <div class="quiz-options">
        ${q.opts.map(o => `<button class="quiz-option" data-dino="${o.dino}">${o.text}</button>`).join('')}
      </div>
    `;
    body.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.dataset.dino;
        votes[d] = (votes[d] || 0) + 1;
        step++;
        if (step < questions.length) renderQuestion();
        else renderResult();
      });
    });
  }

  function renderResult() {
    const winner = Object.entries(votes).sort((a,b) => b[1]-a[1])[0][0];
    const r = results[winner];
    const body = modal.querySelector('.quiz-body');
    body.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result__emoji">${r.emoji}</div>
        <h3>¡Eres un <strong>${r.name}</strong>!</h3>
        <p>${r.desc}</p>
        <button class="btn quiz-retry">Repetir quiz 🔄</button>
        <a href="articulos.html" class="btn btn--outline">Leer más sobre ${r.name} →</a>
      </div>
    `;
    body.querySelector('.quiz-retry')?.addEventListener('click', () => {
      step = 0;
      Object.keys(votes).forEach(k => delete votes[k]);
      renderQuestion();
    });
  }
}
initQuiz();
