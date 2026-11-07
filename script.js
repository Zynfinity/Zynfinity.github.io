document.addEventListener('DOMContentLoaded', () => {
  // Preloader & Hero Animation Synchronization
  const preloader = document.getElementById('preloader');
  let heroAnimationTriggered = false;

  const triggerHeroAnimations = () => {
    if (heroAnimationTriggered) return;
    heroAnimationTriggered = true;

    const heroElements = [
      { selector: '.line1', anim: 'animate__fadeInDown', delay: '0.05s' },
      { selector: '.sunburst', anim: 'animate__zoomIn', delay: '0.2s' },
      { selector: '.sparkle-2', anim: 'animate__zoomIn', delay: '0.3s' },
      { selector: '.left-copy', anim: 'animate__fadeInLeft', delay: '0.12s' },
      { selector: '.portrait-stage', anim: 'animate__fadeInUp', delay: '0.18s' },
      { selector: '.rating', anim: 'animate__fadeInRight', delay: '0.22s' }
    ];

    heroElements.forEach(({ selector, anim, delay }) => {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        el.style.animationDelay = delay;
        el.classList.add('animate__animated', anim);
      });
    });
  };

  if (preloader) {
    const dismissPreloader = () => {
      preloader.classList.add('loaded');
      // Fire hero animation right as the preloader curtain fades away
      setTimeout(triggerHeroAnimations, 100);
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 550);
    };

    if (document.readyState === 'complete') {
      setTimeout(dismissPreloader, 300);
    } else {
      window.addEventListener('load', () => setTimeout(dismissPreloader, 300));
      setTimeout(dismissPreloader, 1800);
    }
  } else {
    triggerHeroAnimations();
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking outside of menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking any menu link
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Navbar appearance adapts when scrolling past hero
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('beranda');

  function handleNavbarScroll() {
    if (!navbar || !heroSection) return;
    const heroRect = heroSection.getBoundingClientRect();
    const navHeight = navbar.offsetHeight;

    if (heroRect.bottom > navHeight + 20) {
      navbar.classList.add('in-hero');
      navbar.classList.remove('scrolled-dark');
    } else {
      navbar.classList.remove('in-hero');
      navbar.classList.add('scrolled-dark');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  window.addEventListener('resize', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Scroll to Top Button with Smooth Eased Glide
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    const handleScrollBtn = () => {
      if (window.scrollY > 450) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScrollBtn, { passive: true });
    handleScrollBtn();

    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================
  // Animate.css + Native IntersectionObserver (Ultra-Lightweight)
  // ========================================================

  // Scroll Reveal Animations with Native IntersectionObserver
  if ('IntersectionObserver' in window) {
    const scrollRevealSingles = [
      '#tentang .about-top',
      '#tentang .about-photo-wrapper',
      '#tentang .about-copy',
      '#pendidikan .header',
      '#pengalaman .header',
      '#pengalaman .exp-card',
      '#keahlian .skills-card',
      '#sertifikasi .header-3',
      '#sertifikasi .cert-subhead',
      '#proyek .work-header',
      '#kontak .contact-card',
      '.footer .footer-block'
    ];

    const scrollRevealGroups = [
      { parent: '#pendidikan .timeline', items: '.block-s1, .block-smk' },
      { parent: '#sertifikasi .cert-groups', items: '.org-ketua-himpunan, .org-volunteer-lead, .org-mentor-ui-ux' },
      { parent: '#proyek .work-grid', items: '.card-skylearn, .card-lintas-pay, .card-ruang-baca' }
    ];

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.remove('will-animate');
          target.classList.add('animate__animated', 'animate__fadeInUp');
          obs.unobserve(target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    // Observe single blocks
    scrollRevealSingles.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('will-animate');
        observer.observe(el);
      });
    });

    // Observe group items with cascading stagger delays
    scrollRevealGroups.forEach(({ parent, items }) => {
      const container = document.querySelector(parent);
      if (container) {
        const els = container.querySelectorAll(items);
        els.forEach((el, index) => {
          el.classList.add('will-animate');
          el.style.animationDelay = `${(index * 0.14).toFixed(2)}s`;
          observer.observe(el);
        });
      }
    });
  }
});
