/**
 * THEME.JS - JavaScript principal
 * Lunetier & Co Theme
 */

(function() {
  'use strict';

  /**
   * Debounce utility
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Header Scroll Management
   * Gère l'apparence du header au scroll
   */
  function initHeaderScroll() {
    const headerSections = document.querySelectorAll('[id^="shopify-section-header"]');
    
    headerSections.forEach(section => {
      const headerWrapper = section.querySelector('.lunetier-header-wrapper');
      if (!headerWrapper) return;

      const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
          headerWrapper.classList.add('is-scrolled');
        } else {
          headerWrapper.classList.remove('is-scrolled');
        }
      }, 10);

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    });
  }

  /**
   * Mobile Drawer Management
   * Gère l'ouverture/fermeture du menu mobile
   */
  function initMobileDrawer() {
    document.addEventListener('click', (e) => {
      // Open drawer
      if (e.target.closest('[id^="MobileMenuTrigger-"]')) {
        const trigger = e.target.closest('[id^="MobileMenuTrigger-"]');
        const sectionId = trigger.id.split('MobileMenuTrigger-')[1];
        const drawer = document.getElementById(`MobileDrawer-${sectionId}`);
        const overlay = document.getElementById(`MobileDrawerOverlay-${sectionId}`);
        
        if (drawer && overlay) {
          drawer.classList.add('is-open');
          overlay.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      }

      // Close drawer
      if (e.target.closest('[id^="MobileDrawerClose-"]') || e.target.closest('[id^="MobileDrawerOverlay-"]')) {
        const element = e.target.closest('[id^="MobileDrawerClose-"], [id^="MobileDrawerOverlay-"]');
        const sectionId = element.id.includes('Close') 
          ? element.id.split('MobileDrawerClose-')[1] 
          : element.id.split('MobileDrawerOverlay-')[1];
        
        const drawer = document.getElementById(`MobileDrawer-${sectionId}`);
        const overlay = document.getElementById(`MobileDrawerOverlay-${sectionId}`);
        
        if (drawer && overlay) {
          drawer.classList.remove('is-open');
          overlay.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openDrawers = document.querySelectorAll('.lunetier-drawer.is-open');
        openDrawers.forEach(drawer => {
          const sectionId = drawer.id.split('MobileDrawer-')[1];
          const overlay = document.getElementById(`MobileDrawerOverlay-${sectionId}`);
          
          drawer.classList.remove('is-open');
          if (overlay) overlay.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      }
    });
  }

  /**
   * Lazy Load Images
   * Utilise Intersection Observer pour lazy load les images
   */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Cart Update Handler
   * Gère les mises à jour du panier via AJAX
   */
  function initCartHandlers() {
    // Quantity buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.lunetier-qty-btn')) {
        const btn = e.target.closest('.lunetier-qty-btn');
        const container = btn.closest('.lunetier-qty-container');
        const input = container.querySelector('.lunetier-qty-input');
        const change = btn.classList.contains('plus') || btn.textContent.includes('+') ? 1 : -1;
        const newValue = Math.max(0, parseInt(input.value) + change);
        
        input.value = newValue;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  /**
   * Product Variant Selection
   * Gère la sélection des variantes produit
   */
  function initProductVariants() {
    const variantInputs = document.querySelectorAll('.lunetier-prod-radio-input');
    
    variantInputs.forEach(input => {
      input.addEventListener('change', function() {
        const index = this.dataset.optionIndex;
        const labelSpan = document.getElementById(`selected-option-${index}`);
        
        if (labelSpan) {
          labelSpan.textContent = this.value;
        }

        // TODO: Implémenter la logique de mise à jour du variant ID
        // selon les options sélectionnées
      });
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor && anchor.hash) {
        const target = document.querySelector(anchor.hash);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.lunetier-header-wrapper')?.offsetHeight || 80;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  /**
   * Focus Trap for Modals/Drawers
   */
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  /**
   * Initialize all features when DOM is ready
   */
  function init() {
    initHeaderScroll();
    initMobileDrawer();
    initLazyLoad();
    initCartHandlers();
    initProductVariants();
    initSmoothScroll();

    // Trap focus in open drawers
    document.querySelectorAll('.lunetier-drawer.is-open').forEach(trapFocus);

    console.log('%c✨ Lunetier & Co Theme loaded', 'color: #111827; font-weight: bold;');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities globally if needed
  window.LunetierTheme = {
    debounce,
    trapFocus
  };
})();
