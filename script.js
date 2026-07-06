/* =============================================
   PRAVDA — JavaScript
   Scroll animations, countdown, interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SCROLL REVEAL ─────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 2. SMOOTH SCROLL for anchor links ────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── 3. ACTIVE NAV on scroll ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--red-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));


  // ── 4. ELECTION COUNTDOWN (live ticking) ─────
  const daysEl = document.getElementById('days');
  if (daysEl) {
    let days = 14;
    // Simulate slow countdown for atmosphere
    const tick = () => {
      daysEl.style.opacity = '0';
      setTimeout(() => {
        days = Math.max(0, days - 1);
        daysEl.textContent = days;
        daysEl.style.opacity = '1';
        daysEl.style.transition = 'opacity 0.3s';
      }, 400);
    };
    // Tick every 8 seconds for demo effect
    setInterval(tick, 8000);
  }


  // ── 5. FACTION LOYALTY BARS animate on view ──
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach(fill => {
          const targetW = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = targetW; }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.faction-card').forEach(card => {
    barObserver.observe(card);
  });


  // ── 6. ELECTION BARS animate on view ─────────
  const electionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.party-bar');
        bars.forEach(bar => {
          const targetW = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = targetW; }, 300);
        });
        electionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const elWidget = document.querySelector('.election-widget');
  if (elWidget) electionObserver.observe(elWidget);


  // ── 7. TYPEWRITER glitch effect on hero title ─
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    let glitchInterval;

    const glitchChars = '█▓▒░ΣΔΩ§¶#@!?&*01';

    const runGlitch = () => {
      const textNodes = [...heroTitle.childNodes].filter(n => n.nodeType === 3);
      if (!textNodes.length) return;

      let count = 0;
      const maxGlitches = 4;
      glitchInterval = setInterval(() => {
        heroTitle.style.opacity = count % 2 === 0 ? '0.85' : '1';
        count++;
        if (count >= maxGlitches) {
          clearInterval(glitchInterval);
          heroTitle.innerHTML = originalText;
          heroTitle.style.opacity = '1';
        }
      }, 60);
    };

    // Trigger glitch randomly
    setInterval(() => {
      if (Math.random() < 0.3) runGlitch();
    }, 5000);
  }


  // ── 8. REDACTED hover easter egg ─────────────
  document.querySelectorAll('.redacted').forEach(el => {
    el.setAttribute('title', 'ДОСТУП ОГРАНИЧЕН · ДОПУСК УРОВЕНЬ 3');
    el.addEventListener('click', () => {
      el.style.background = 'var(--red)';
      el.style.color = 'var(--white)';
      setTimeout(() => {
        el.style.background = '';
        el.style.color = '';
      }, 1200);
    });
  });


  // ── 9. TOOL PILL interaction ──────────────────
  document.querySelectorAll('.tool-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tool-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });


  // ── 10. CHECKLIST interaction ─────────────────
  document.querySelectorAll('.check-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const box = item.querySelector('.check-box');
      if (box.textContent === '☐') {
        box.textContent = '☑';
        box.style.color = 'var(--green)';
        item.style.opacity = '0.7';
      } else {
        box.textContent = '☐';
        box.style.color = '';
        item.style.opacity = '1';
      }
    });
  });


  // ── 11. HEADER shadow on scroll ──────────────
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.borderBottomColor = 'var(--red)';
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
    } else {
      header.style.borderBottomColor = '';
      header.style.boxShadow = '';
    }
  }, { passive: true });


  // ── 12. FACTION CARD hover — dossier stamp ───
  document.querySelectorAll('.faction-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const stamp = card.querySelector('.faction-photo-stamp');
      if (stamp) stamp.style.transform = 'scale(1.1)';
    });
    card.addEventListener('mouseleave', () => {
      const stamp = card.querySelector('.faction-photo-stamp');
      if (stamp) stamp.style.transform = '';
    });
  });


  // ── 13. STAFF LOYALTY hover ──────────────────
  document.querySelectorAll('.staff-item').forEach(item => {
    item.style.cursor = 'default';
    item.addEventListener('mouseenter', () => {
      item.style.borderColor = 'var(--mid)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderColor = '';
    });
  });

  console.log(
    '%c ПРАВДА v1.0 | Pitch Deck Loaded ',
    'background: #8b1a1a; color: #f0ece4; font-family: monospace; padding: 4px 8px; letter-spacing: 2px;'
  );

});
