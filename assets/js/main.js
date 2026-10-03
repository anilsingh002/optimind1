/**
 * OPTIMIND LABS - CORE INTERACTIVE ENGINE
 * High-performance vanilla JavaScript for modern web interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroCanvas();
  initCounters();
  initServicesFilter();
  initIndustryTabs();
  initTechStack();
  initQuickCopy();
  initFaqAccordion();
  initContactForm();
  initModals();
});

/* ==========================================================================
   1. HEADER & NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. HERO NEURAL NETWORK CANVAS ANIMATION (ROYAL BLUE & AMBER)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroNeuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  const maxDistance = 145;
  const colorPalette = ['#2563eb', '#f59e0b', '#0284c7', '#00a8a8'];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1.2;
      this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Blended stroke
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Connect to mouse with amber tint
      if (mouse.x !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${mAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. COUNTER ANIMATION
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
              clearInterval(timer);
            } else {
              el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const statSection = document.querySelector('.hero-stats-row');
  if (statSection) observer.observe(statSection);
}

/* ==========================================================================
   4. SERVICES FILTERING
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INDUSTRY TABS (BFSI vs HEALTHCARE)
   ========================================================================== */
function initIndustryTabs() {
  const tabBtns = document.querySelectorAll('.industry-tab-btn');
  const contentCards = document.querySelectorAll('.industry-content-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-tab');

      contentCards.forEach(card => {
        if (card.id === targetId) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. TECH STACK BENTO GRID FILTERING
   ========================================================================== */
function initTechStack() {
  const techBtns = document.querySelectorAll('.tech-cat-btn');
  const bentoCards = document.querySelectorAll('.tech-bento-card');

  techBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-tech-cat');

      bentoCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-tech-group') === cat) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. QUICK 1-CLICK CLIPBOARD COPY
   ========================================================================== */
function initQuickCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotification');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#10b981';

        if (toast) {
          const msgEl = toast.querySelector('.toast-msg');
          if (msgEl) msgEl.textContent = `Copied "${textToCopy}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3500);
        }

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2500);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  });
}



/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(f => f.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT & LEAD FORMS (DIRECT EMAIL TO OPTIMINDLABS@GMAIL.COM)
   ========================================================================== */
function initContactForm() {
  const mainForm = document.getElementById('mainContactForm');
  const modalForm = document.getElementById('modalConsultForm');
  const toast = document.getElementById('toastNotification');

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 6000);
  }

  function handleFormSubmission(form, isModal) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      let name = '';
      let email = '';
      let phone = '';
      let service = '';
      let message = '';

      if (isModal) {
        name = document.getElementById('modalConsultName')?.value || form.querySelector('input[type="text"]')?.value || '';
        email = document.getElementById('modalConsultEmail')?.value || form.querySelector('input[type="email"]')?.value || '';
        phone = document.getElementById('modalConsultPhone')?.value || form.querySelector('input[type="tel"]')?.value || '';
        service = document.getElementById('modalConsultService')?.value || form.querySelector('select')?.value || 'AI-Assisted Software Development';
        message = 'Requested Architecture Strategy Session & Consultation';
      } else {
        name = document.getElementById('contactName')?.value || form.querySelector('input[type="text"]')?.value || '';
        email = document.getElementById('contactEmail')?.value || form.querySelector('input[type="email"]')?.value || '';
        phone = document.getElementById('contactPhone')?.value || form.querySelector('input[type="tel"]')?.value || '';
        service = document.getElementById('contactService')?.value || form.querySelector('select')?.value || 'AI-Assisted Software Development';
        message = document.getElementById('contactMessage')?.value || form.querySelector('textarea')?.value || '';
      }

      if (submitBtn) {
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
          </svg>
          Preparing Email...
        `;
        submitBtn.disabled = true;
      }

      // Build subject & structured body
      const subject = isModal
        ? `[Consultation Request] ${service} - ${name || 'New Client'}`
        : `[Project Inquiry] ${service} - ${name || 'New Client'}`;

      const bodyText = 
`Hello Optimind Labs Team,

${isModal ? 'I would like to request an Architecture Consultation Strategy Session.' : 'I would like to submit a new Project Inquiry.'}

Here are my project details:
----------------------------------------
• Full Name: ${name}
• Work Email: ${email}
• Phone Number: ${phone}
• Service of Interest: ${service}
• Project Scope & Details:
${message}
----------------------------------------

Looking forward to connecting with Rajesh K Srivastva and the Optimind Labs team.

Best regards,
${name}`;

      const mailtoUrl = `mailto:optimindlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      // Execute mail dispatch and UI update
      setTimeout(() => {
        // Trigger pre-filled email client
        const mailLink = document.createElement('a');
        mailLink.href = mailtoUrl;
        mailLink.target = '_blank';
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);

        if (submitBtn) {
          submitBtn.innerHTML = `✓ Email Dispatched to optimindlabs@gmail.com`;
          submitBtn.style.background = '#10b981';
        }

        form.reset();
        showToast(`Thank you ${name ? name : ''}! Your inquiry has been prepared for optimindlabs@gmail.com. Rajesh K Srivastva will connect with you within 2 business hours.`);

        // If inside modal, close smoothly
        if (isModal) {
          const openModal = document.getElementById('consultModal');
          if (openModal) {
            setTimeout(() => {
              openModal.classList.remove('open');
              document.body.style.overflow = '';
            }, 1800);
          }
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }
        }, 5000);
      }, 700);
    });
  }

  handleFormSubmission(mainForm, false);
  handleFormSubmission(modalForm, true);
}

/* ==========================================================================
   10. MODALS & CONSULTATION SCHEDULER
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloses = document.querySelectorAll('.modal-close-btn, .modal-backdrop');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', (e) => {
      if (e.target === close || close.classList.contains('modal-close-btn')) {
        const modal = close.closest('.modal-backdrop');
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });
}
