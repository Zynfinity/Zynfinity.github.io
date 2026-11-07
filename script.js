document.addEventListener('DOMContentLoaded', () => {
  // Preloader transition
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const dismissPreloader = () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 550);
    };

    if (document.readyState === 'complete') {
      setTimeout(dismissPreloader, 400);
    } else {
      window.addEventListener('load', () => setTimeout(dismissPreloader, 400));
      setTimeout(dismissPreloader, 2000);
    }
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

  // 1. Hero Entrance Animations
  const initHeroAnimations = () => {
    const heroElements = [
      { selector: '.line1', anim: 'animate__fadeIn', delay: '0s' },
      { selector: '.sunburst, .sparkle-2', anim: 'animate__fadeIn', delay: '0.15s' },
      { selector: '.left-copy', anim: 'animate__fadeInUp', delay: '0.1s' },
      { selector: '.portrait-stage', anim: 'animate__fadeIn', delay: '0.15s' },
      { selector: '.rating', anim: 'animate__fadeInUp', delay: '0.2s' }
    ];

    heroElements.forEach(({ selector, anim, delay }) => {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        el.style.animationDelay = delay;
        el.classList.add('animate__animated', anim);
        el.addEventListener('animationend', () => {
          el.classList.remove('animate__animated', anim);
          el.style.animationDelay = '';
        }, { once: true });
      });
    });
  };

  if (preloader) {
    setTimeout(initHeroAnimations, 400);
  } else {
    initHeroAnimations();
  }

  // 2. Scroll Reveal Animations with Native IntersectionObserver
  if ('IntersectionObserver' in window) {
    const scrollRevealGroups = [
      '#tentang .about-top',
      '#tentang .about-photo-wrapper',
      '#tentang .about-copy',
      '#pendidikan .header',
      '#pendidikan .block-s1',
      '#pendidikan .block-smk',
      '#pengalaman .header',
      '#pengalaman .exp-card',
      '#keahlian .skills-card',
      '#sertifikasi .header-3',
      '#sertifikasi .cert-group',
      '#proyek .work-header',
      '#proyek .card-skylearn',
      '#proyek .card-lintas-pay',
      '#proyek .card-ruang-baca',
      '#kontak .contact-card',
      '.footer .footer-block'
    ];

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.remove('will-animate');
          target.classList.add('animate__animated', 'animate__fadeInUp');
          target.addEventListener('animationend', () => {
            target.classList.remove('animate__animated', 'animate__fadeInUp');
          }, { once: true });
          obs.unobserve(target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollRevealGroups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('will-animate');
        observer.observe(el);
      });
    });
  }
});
