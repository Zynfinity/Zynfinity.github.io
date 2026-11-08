document.addEventListener('DOMContentLoaded', () => {
  // Preloader & Hero Entrance (Powered by GSAP for Silky Smooth 60fps Motion)
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.querySelector('.preloader-bar');
  let heroAnimationTriggered = false;

  const triggerHeroAnimations = () => {
    if (heroAnimationTriggered) return;
    heroAnimationTriggered = true;

    if (window.gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        }
      });

      if (preloader) {
        tl.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            if (window.ScrollTrigger) ScrollTrigger.refresh();
          }
        });
      }

      tl.fromTo('.line1', 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
        preloader ? '-=0.4' : 0
      )
      .fromTo('.left-copy', 
        { x: -22, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
        '-=0.85'
      )
      .fromTo('.portrait-stage', 
        { y: 22, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, 
        '-=0.88'
      )
      .fromTo('.rating', 
        { x: 22, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
        '-=0.88'
      )
      .fromTo(['.sunburst', '.sparkle-2'], 
        { scale: 0.3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.4)', stagger: 0.1 }, 
        '-=0.75'
      );
    } else {
      if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 600);
      }
    }
  };

  if (preloader) {
    if (window.gsap && preloaderBar) {
      preloaderBar.style.animation = 'none'; // Ganti looping CSS kasar dengan interpolasi halus GSAP
      gsap.fromTo(preloaderBar, 
        { scaleX: 0, transformOrigin: 'left center' }, 
        { scaleX: 1, duration: 0.65, ease: 'power2.inOut', onComplete: triggerHeroAnimations }
      );
    } else {
      setTimeout(triggerHeroAnimations, 600);
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

  // Optimized Navbar & Scroll-to-Top Handling (Zero Layout Reflow)
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('beranda');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  let heroHeight = heroSection ? heroSection.offsetHeight : 700;
  let scrollTicking = false;

  window.addEventListener('resize', () => {
    if (heroSection) heroHeight = heroSection.offsetHeight;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }, { passive: true });

  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar appearance adapts without querying DOM geometry on scroll
        if (navbar) {
          if (scrollY < heroHeight - 80) {
            navbar.classList.add('in-hero');
            navbar.classList.remove('scrolled-dark');
          } else {
            navbar.classList.remove('in-hero');
            navbar.classList.add('scrolled-dark');
          }
        }

        // Scroll to top button visibility
        if (scrollToTopBtn) {
          if (scrollY > 450) {
            scrollToTopBtn.classList.add('visible');
          } else {
            scrollToTopBtn.classList.remove('visible');
          }
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================
  // GSAP ScrollTrigger (Hardware-Accelerated Silky Scroll Reveal)
  // ========================================================
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

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

    scrollRevealSingles.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
              fastScrollEnd: true
            }
          }
        );
      });
    });

    const scrollRevealGroups = [
      { parent: '#pendidikan .timeline', items: '.block-s1, .block-smk' },
      { parent: '#sertifikasi .cert-groups', items: '.org-ketua-himpunan, .org-volunteer-lead, .org-mentor-ui-ux' },
      { parent: '#proyek .work-grid', items: '.card-skylearn, .card-lintas-pay, .card-ruang-baca' }
    ];

    scrollRevealGroups.forEach(({ parent, items }) => {
      const container = document.querySelector(parent);
      if (container) {
        const els = container.querySelectorAll(items);
        gsap.fromTo(els,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
              fastScrollEnd: true
            }
          }
        );
      }
    });

    // Pre-calculate and cache all trigger positions immediately so the first scroll is instant
    ScrollTrigger.refresh();
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  } else if ('IntersectionObserver' in window) {
    // Fallback if GSAP is unavailable
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('#tentang .about-top, #tentang .about-photo-wrapper, #tentang .about-copy, #pendidikan .header, #pengalaman .header, #pengalaman .exp-card, #keahlian .skills-card, #sertifikasi .header-3, #proyek .work-header, #kontak .contact-card, .footer .footer-block, .block-s1, .block-smk, .card-skylearn, .card-lintas-pay, .card-ruang-baca').forEach((el) => {
      observer.observe(el);
    });
  }
});
