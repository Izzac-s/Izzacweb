// Component classes for better organization
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle?.querySelector('i');
    this.themeText = this.themeToggle?.querySelector('span');
    this.init();
  }

  init() {
    if (!this.themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem(CONFIG.THEME.STORAGE_KEY) || CONFIG.THEME.DEFAULT;
    this.setTheme(savedTheme);

    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(CONFIG.THEME.STORAGE_KEY, theme);
    
    if (theme === 'dark') {
      this.themeIcon.className = 'fas fa-sun';
      this.themeText.textContent = 'Light';
    } else {
      this.themeIcon.className = 'fas fa-moon';
      this.themeText.textContent = 'Dark';
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles');
    this.init();
  }

  init() {
    if (!this.container) return;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < CONFIG.ANIMATION.PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = Utils.random(
        CONFIG.ANIMATION.PARTICLE_DURATION_MIN,
        CONFIG.ANIMATION.PARTICLE_DURATION_MAX
      ) + 's';
      this.container.appendChild(particle);
    }
  }
}

class AudioManager {
  constructor() {
    this.notification = document.getElementById('music-notification');
    this.soundInitialized = false;
    this.sound = null;
    this.init();
  }

  init() {
    if (!this.notification) return;
    document.body.addEventListener('click', () => this.initializeSound(), { once: true });
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }

  initializeSound() {
    if (this.soundInitialized || typeof Howl === 'undefined') {
      this.handleError('Thư viện âm thanh chưa tải.');
      return;
    }

    try {
      this.sound = new Howl({
        src: [CONFIG.AUDIO.FILE],
        autoplay: true,
        loop: CONFIG.AUDIO.LOOP,
        volume: CONFIG.AUDIO.VOLUME,
        html5: CONFIG.AUDIO.HTML5,
        onplayerror: (id, error) => this.handlePlayError(error),
        onloaderror: (id, error) => this.handleLoadError(error),
        onload: () => this.handleLoadSuccess()
      });
      this.soundInitialized = true;
    } catch (error) {
      this.handleError('Lỗi khởi tạo trình phát nhạc.');
    }
  }

  handlePlayError(error) {
    console.warn("Audio autoplay was blocked:", error);
    this.sound?.once('unlock', () => {
      console.log("Audio unlocked, attempting to play again.");
      this.sound?.play();
    });
    this.updateNotification('Phát nhạc tự động bị chặn. Nhấn để bật.');
  }

  handleLoadError(error) {
    console.error("Audio load error:", error);
    this.updateNotification('Lỗi: Không thể tải tệp âm thanh.');
  }

  handleLoadSuccess() {
    console.log("Audio file loaded successfully.");
    this.hideNotification();
  }

  handleError(message) {
    this.updateNotification(`❌ ${message}`);
    this.soundInitialized = true;
  }

  updateNotification(message) {
    if (this.notification) {
      this.notification.innerHTML = `🎵 ${message}<br>🎵 ${message}`;
    }
  }

  hideNotification() {
    if (this.notification) {
      this.notification.classList.add('hide');
      setTimeout(() => {
        if (this.notification.parentNode) {
          this.notification.parentNode.removeChild(this.notification);
        }
      }, 1000);
    }
  }

  handleVisibilityChange() {
    if (!this.soundInitialized || !this.sound?.playing) return;
    
    if (document.visibilityState === 'hidden') {
      this.sound.pause();
    } else {
      if (this.sound.state() === 'loaded') this.sound.play();
    }
  }
}

class GalleryManager {
  constructor() {
    this.container = document.getElementById('gallery-container');
    this.imagesData = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.loadGalleryImages();
  }

  loadGalleryImages() {
    CONFIG.GALLERY_IMAGES.forEach((imageData, index) => {
      const galleryItem = this.createGalleryItem(imageData, index);
      this.container.appendChild(galleryItem);
    });
    this.imagesData = [...CONFIG.GALLERY_IMAGES];
  }

  createGalleryItem(imageData, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Xem ảnh ${imageData.alt}`);
    item.setAttribute('data-aos', CONFIG.AOS_EFFECTS[index % CONFIG.AOS_EFFECTS.length]);

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.loading = 'lazy';
    img.style.webkitUserDrag = 'none';
    img.style.userSelect = 'none';

    item.appendChild(img);

    // Add event listeners
    item.addEventListener('click', () => this.openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.openLightbox(index);
      }
    });

    return item;
  }

  openLightbox(index) {
    if (window.lightboxManager) {
      window.lightboxManager.show(index, this.imagesData);
    }
  }
}

class LightboxManager {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    this.lightboxPrevBtn = document.getElementById('lightbox-prev');
    this.lightboxNextBtn = document.getElementById('lightbox-next');
    this.currentIndex = 0;
    this.imagesData = [];
    this.init();
  }

  init() {
    if (!this.lightbox) return;

    // Add event listeners
    this.lightboxCloseBtn?.addEventListener('click', () => this.close());
    this.lightboxPrevBtn?.addEventListener('click', () => this.showPrevious());
    this.lightboxNextBtn?.addEventListener('click', () => this.showNext());
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  show(index, imagesData) {
    this.imagesData = imagesData;
    this.currentIndex = index;
    this.updateImage();
    this.lightbox.classList.add('active');
    document.body.classList.add('modal-open');
    this.lightboxCloseBtn?.focus();
  }

  close() {
    const shareModalActive = document.getElementById('share-modal')?.classList.contains('active');
    this.lightbox.classList.remove('active');
    if (!shareModalActive) {
      document.body.classList.remove('modal-open');
    }
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateImage();
    }
  }

  showNext() {
    if (this.currentIndex < this.imagesData.length - 1) {
      this.currentIndex++;
      this.updateImage();
    }
  }

  updateImage() {
    if (!this.imagesData[this.currentIndex]) return;

    const imageData = this.imagesData[this.currentIndex];
    this.lightboxImg.src = imageData.src;
    this.lightboxImg.alt = imageData.alt;
    this.lightboxCaption.textContent = imageData.alt;

    // Update navigation buttons
    this.lightboxPrevBtn.disabled = this.currentIndex === 0;
    this.lightboxNextBtn.disabled = this.currentIndex === this.imagesData.length - 1;
  }

  handleKeydown(e) {
    if (!this.lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.showPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.showNext();
        break;
    }
  }
}

class ShareManager {
  constructor() {
    this.shareIcon = document.getElementById('share-icon');
    this.shareModal = document.getElementById('share-modal');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.copyLinkBtn = document.getElementById('copy-link-btn');
    this.shareLinkInput = document.getElementById('share-link-input');
    this.init();
  }

  init() {
    if (!this.shareModal) return;

    // Add event listeners
    this.shareIcon?.addEventListener('click', () => this.open());
    this.closeModalBtn?.addEventListener('click', () => this.close());
    this.copyLinkBtn?.addEventListener('click', () => this.copyLink());
    
    this.shareModal.addEventListener('click', (e) => {
      if (e.target === this.shareModal) this.close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.shareModal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.shareLinkInput.value = window.location.href;
    this.shareModal.classList.add('active');
    document.body.classList.add('modal-open');
    this.resetCopyButton();
    this.shareLinkInput.focus();
    this.shareLinkInput.select();
  }

  close() {
    const lightboxActive = document.getElementById('lightbox')?.classList.contains('active');
    this.shareModal.classList.remove('active');
    if (!lightboxActive) {
      document.body.classList.remove('modal-open');
    }
    this.resetCopyButton();
  }

  async copyLink() {
    const linkToCopy = this.shareLinkInput.value;
    const success = await Utils.copyToClipboard(linkToCopy);
    
    if (success) {
      this.copyLinkBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i><span>Đã sao chép!</span>';
      this.copyLinkBtn.disabled = true;
      setTimeout(() => this.resetCopyButton(), 2000);
    } else {
      alert('Không thể sao chép liên kết. Vui lòng sao chép thủ công.');
    }
  }

  resetCopyButton() {
    this.copyLinkBtn.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i><span>Sao chép</span>';
    this.copyLinkBtn.disabled = false;
  }
}

class BackToTopManager {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    if (!this.button) return;

    // Throttled scroll handler
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > CONFIG.ANIMATION.BACK_TO_TOP_THRESHOLD) {
        this.button.classList.add('show');
      } else {
        this.button.classList.remove('show');
      }
    }, CONFIG.ANIMATION.SCROLL_THROTTLE);

    window.addEventListener('scroll', handleScroll);
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}