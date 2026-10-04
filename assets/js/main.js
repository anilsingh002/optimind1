/**
 * OPTIMIND LABS - ULTRA-MODERN INTERACTIVE ENGINE
 * High-performance vanilla JavaScript for modern web interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroCanvas();
  initSpotlightCards();
  initServicesFilter();
  initIndustryTabs();
  initTechStack();
  initQuickCopy();
  initFaqAccordion();
  initContactForm();
  initPolicyModal();
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
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
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
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. HERO NEURAL NETWORK CANVAS ANIMATION (ELECTRIC BLUE & AMBER)
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
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 80);
  const maxDistance = 150;
  const colorPalette = ['#3b82f6', '#f59e0b', '#06b6d4', '#60a5fa'];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
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
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null, radius: 170 };
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
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. LUMINOUS SPOTLIGHT CARDS (LINEAR / VERCEL SIGNATURE GLOW)
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.service-card, .tech-bento-card, .glass-card, .value-card, .industry-content-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
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
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INDUSTRY DOMAIN SWITCHER TABS
   ========================================================================== */
function initIndustryTabs() {
  const tabBtns = document.querySelectorAll('.industry-tab-btn');
  const tabContents = document.querySelectorAll('.industry-content-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.style.display = 'grid';
          content.style.animation = 'fadeInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. TECHNOLOGY MATRIX FILTERING
   ========================================================================== */
function initTechStack() {
  const techCatBtns = document.querySelectorAll('.tech-cat-btn');
  const techCards = document.querySelectorAll('.tech-bento-card');

  techCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCat = btn.getAttribute('data-tech-cat');

      techCards.forEach(card => {
        const cardGroup = card.getAttribute('data-tech-group');
        if (selectedCat === 'all' || cardGroup === selectedCat) {
          card.style.display = 'block';
          card.style.animation = 'fadeInCard 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. 1-CLICK CLIPBOARD COPY
   ========================================================================== */
function initQuickCopy() {
  const copyBtns = document.querySelectorAll('.quick-copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="color: #10b981;">Copied!</span>
        `;
        showToast(`Copied "${textToCopy}" to clipboard.`);

        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        showToast(`Selected: ${textToCopy}`);
      }
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
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT INQUIRY FORM DISPATCH
   ========================================================================== */
function initContactForm() {
  const mainForm = document.getElementById('mainContactForm');
  if (!mainForm) return;

  mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('contactSubmitBtn');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Project Inquiry';

    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const phone = document.getElementById('contactPhone')?.value || '';
    const service = document.getElementById('contactService')?.value || 'AI-Assisted Software Development';
    const message = document.getElementById('contactMessage')?.value || '';

    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
        Preparing Inquiry...
      `;
      submitBtn.disabled = true;
    }

    const subject = `[Project Inquiry] ${service} - ${name || 'New Client'}`;
    const bodyText = 
`Hello Optimind Labs Leadership Team,

I would like to submit a new Project Inquiry for ${service}.

Project Details:
----------------------------------------
• Full Name: ${name}
• Work Email: ${email}
• Phone Number: ${phone}
• Service of Interest: ${service}
• Technical Objectives & Requirements:
${message}
----------------------------------------

Looking forward to connecting with Rajesh K Srivastva and the Optimind Labs team.

Best regards,
${name}`;

    const mailtoUrl = `mailto:optimindlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    setTimeout(() => {
      const mailLink = document.createElement('a');
      mailLink.href = mailtoUrl;
      mailLink.target = '_blank';
      document.body.appendChild(mailLink);
      mailLink.click();
      document.body.removeChild(mailLink);

      if (submitBtn) {
        submitBtn.innerHTML = `✓ Inquiry Prepared for optimindlabs@gmail.com`;
        submitBtn.style.background = '#10b981';
      }

      mainForm.reset();
      showToast(`Thank you ${name ? name : ''}! Your inquiry has been prepared for optimindlabs@gmail.com.`);

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }
      }, 5000);
    }, 600);
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  const msgSpan = toast.querySelector('.toast-msg');
  if (msgSpan) msgSpan.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   11. POLICY & LEGAL POPUP MODAL (PRIVACY, TERMS, SECURITY)
   ========================================================================== */
function initPolicyModal() {
  const modal = document.getElementById('policyModal');
  const modalTag = document.getElementById('policyModalTag');
  const modalTitle = document.getElementById('policyModalTitle');
  const modalBody = document.getElementById('policyModalBody');
  const closeBtn = document.getElementById('policyModalClose');
  const okBtn = document.getElementById('policyModalOkBtn');
  const triggers = document.querySelectorAll('.footer-legal-btn');

  if (!modal || !modalBody) return;

  const policies = {
    privacy: {
      tag: 'Legal & Privacy Governance',
      title: 'Privacy Policy',
      content: `
        <div class="policy-section">
          <h4>1. Commitment to Data Privacy</h4>
          <p>Optimind Labs ("we", "our", or "us") is dedicated to protecting the confidentiality and integrity of your corporate and personal information. This Privacy Policy outlines how we collect, handle, safeguard, and process information obtained through our website and engineering consulting engagements.</p>
        </div>
        <div class="policy-section">
          <h4>2. Information Collection</h4>
          <p>We collect information you voluntarily provide when initiating technical inquiries, scheduling consultations, or engaging our engineering services. This includes names, corporate email addresses, phone numbers, and project specifications. We also collect automated server diagnostics (IP address, browser type, device telemetry) solely for performance and security monitoring.</p>
        </div>
        <div class="policy-section">
          <h4>3. 100% Client Intellectual Property & Confidentiality</h4>
          <p>All source code, proprietary algorithms, database models, architecture designs, and training workflows created for client projects remain the exclusive intellectual property of the client upon milestone delivery. We operate under bilateral Non-Disclosure Agreements (NDAs) to protect all confidential proprietary systems.</p>
        </div>
        <div class="policy-section">
          <h4>4. Purpose & Data Usage</h4>
          <p>Information gathered is used exclusively to fulfill contractual services, respond to technical inquiries, facilitate communication with leadership, and maintain infrastructure reliability. We never sell, rent, monetize, or disclose your data to third-party advertisers or brokers.</p>
        </div>
        <div class="policy-section">
          <h4>5. Data Protection & Encryption</h4>
          <p>We deploy military-grade encryption standards, including AES-256 for data at rest and TLS 1.3 for data in transit. Access to client data is strictly governed by role-based access control (RBAC), multi-factor authentication (MFA), and secure sandboxed environments.</p>
        </div>
        <div class="policy-section">
          <h4>6. Inquiries & Data Rights</h4>
          <p>You have the right to request access, verification, modification, or complete deletion of your records from our systems at any time. For privacy inquiries, contact our leadership directly at <strong style="color: var(--brand-teal);">optimindlabs@gmail.com</strong> or call <strong style="color: var(--brand-amber);">+91 96502 28858</strong>.</p>
        </div>
      `
    },
    terms: {
      tag: 'Service Agreement & Terms',
      title: 'Terms of Service',
      content: `
        <div class="policy-section">
          <h4>1. Agreement to Terms</h4>
          <p>By accessing the Optimind Labs website or utilizing our software engineering, AI consulting, cloud infrastructure, or managed support services, you agree to comply with and be bound by these Terms of Service and all applicable laws and regulations.</p>
        </div>
        <div class="policy-section">
          <h4>2. Scope of Services & Engagements</h4>
          <p>Optimind Labs provides custom software development, artificial intelligence engineering, cloud architecture, and technical support. Specific project scope, milestones, timelines, acceptance criteria, and fee structures are formalized in individual Master Services Agreements (MSAs) and Statements of Work (SOWs).</p>
        </div>
        <div class="policy-section">
          <h4>3. IP Ownership & Work-for-Hire</h4>
          <p>Unless expressly stated otherwise in a specific SOW, all deliverables, custom software, scripts, and documentation developed specifically for the client are considered work-for-hire, and full ownership transfers to the client upon full payment of agreed fees.</p>
        </div>
        <div class="policy-section">
          <h4>4. Client Cooperation & Responsibilities</h4>
          <p>Clients agree to provide timely specifications, review feedback, and necessary development credentials to ensure smooth project progression. Unauthorized attempts to decompile, reverse-engineer, or breach Optimind Labs proprietary internal toolsets are strictly prohibited.</p>
        </div>
        <div class="policy-section">
          <h4>5. Warranty & Limitation of Liability</h4>
          <p>Our software engineering solutions are delivered according to industry-standard best practices. Optimind Labs shall not be liable for indirect, incidental, or consequential damages arising from third-party cloud provider outages, network disruptions, or unapproved third-party modifications to delivered codebases.</p>
        </div>
        <div class="policy-section">
          <h4>6. Termination & Governing Law</h4>
          <p>Either party may terminate an engagement as stipulated in the governing MSA/SOW. These terms are governed by and construed in accordance with applicable commercial and corporate laws.</p>
        </div>
      `
    },
    security: {
      tag: 'Enterprise Security Architecture',
      title: 'Security Policy',
      content: `
        <div class="policy-section">
          <h4>1. Zero-Trust Security Architecture</h4>
          <p>At Optimind Labs, security is a foundational engineering discipline embedded across every stage of development. We enforce a Zero-Trust architecture model across all cloud environments, repositories, and development squad workspaces.</p>
        </div>
        <div class="policy-section">
          <h4>2. End-to-End Encryption</h4>
          <p>All sensitive payloads, API communications, and database records utilize TLS 1.3 protocol encryption in transit and AES-256 encryption at rest. Cryptographic keys and cloud credentials are managed strictly via isolated hardware security modules and secret vaults.</p>
        </div>
        <div class="policy-section">
          <h4>3. Strict Access Control & MFA</h4>
          <p>Access to client repositories, staging clusters, and operational systems requires hardware-backed Multi-Factor Authentication (MFA) and least-privilege role separation. Access credentials and sessions are audited continuously and revoked automatically upon offboarding.</p>
        </div>
        <div class="policy-section">
          <h4>4. Secure Software Development (SSDLC)</h4>
          <p>Our engineering squads implement automated Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), automated dependency vulnerability scanning, and mandatory peer code reviews prior to any staging or production rollout.</p>
        </div>
        <div class="policy-section">
          <h4>5. Cloud & Container Hardening</h4>
          <p>Infrastructures are hosted in isolated Virtual Private Clouds (VPCs) with strict network ingress/egress filtering, container vulnerability scanning, and immutable Docker/Kubernetes deployment configurations.</p>
        </div>
        <div class="policy-section">
          <h4>6. 24/7 Incident Response & Reporting</h4>
          <p>We maintain automated telemetry pipelines and rapid escalation protocols for any anomalous security event. If you identify a security concern, please notify our team immediately at <strong style="color: var(--brand-teal);">optimindlabs@gmail.com</strong>.</p>
        </div>
      `
    }
  };

  function openModal(policyKey) {
    const policy = policies[policyKey];
    if (!policy) return;

    modalTag.textContent = policy.tag;
    modalTitle.textContent = policy.title;
    modalBody.innerHTML = policy.content;
    modalBody.scrollTop = 0;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = btn.getAttribute('data-policy');
      openModal(policyKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
