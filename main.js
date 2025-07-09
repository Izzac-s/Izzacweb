// Main application initialization
class App {
  constructor() {
    this.mainContent = document.querySelector('main');
    this.galleryStart = document.getElementById('gallery-start');
    this.viewGalleryBtns = document.querySelectorAll('.header-button');
    this.dateElements = document.querySelectorAll('.header-date');
    this.galleryRevealed = false;
    this.components = {};
    
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      // Initialize date display
      this.initializeDateDisplay();
      
      // Initialize all components
      this.initializeComponents();
      
      // Setup gallery reveal functionality
      this.setupGalleryReveal();
      
      // Disable context menu
      this.disableContextMenu();
      
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  initializeDateDisplay() {
    const now = new Date();
    const formattedDate = Utils.formatDate(now);
    
    this.dateElements.forEach(el => {
      if (el) el.textContent = formattedDate;
    });
    
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = now.getFullYear();
    }
  }

  initializeComponents() {
    // Initialize all component managers
    this.components.theme = new ThemeManager();
    this.components.particles = new ParticleSystem();
    this.components.audio = new AudioManager();
    this.components.gallery = new GalleryManager();
    this.components.lightbox = new LightboxManager();
    this.components.share = new ShareManager();
    this.components.backToTop = new BackToTopManager();
    
    // Make lightbox manager globally available for gallery
    window.lightboxManager = this.components.lightbox;
  }

  setupGalleryReveal() {
    // Setup scroll-based gallery reveal
    const revealOnScroll = () => {
      if (window.scrollY > CONFIG.ANIMATION.GALLERY_REVEAL_THRESHOLD) {
        this.revealGallery();
      }
    };

    window.addEventListener('scroll', revealOnScroll);

    // Setup view gallery button functionality
    this.viewGalleryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.revealGallery();
        setTimeout(() => {
          if (this.galleryStart) {
            Utils.smoothScrollTo(this.galleryStart, 80);
          }
        }, 50);
      });
    });
  }

  revealGallery() {
    if (this.galleryRevealed) return;

    this.mainContent.classList.add('revealed');
    this.galleryRevealed = true;

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        offset: 100,
        delay: 100
      });
    } else {
      console.warn("AOS library not loaded yet for initialization.");
    }

    // Remove scroll listener after reveal
    window.removeEventListener('scroll', this.revealOnScroll);
  }

  disableContextMenu() {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  // Error handling
  handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    
    // You could add user-friendly error notifications here
    // For example, show a toast notification
  }
}

// Initialize the application
const app = new App();

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});