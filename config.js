// Configuration constants
const CONFIG = {
  // Gallery images data
  GALLERY_IMAGES: [
    { src: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.png', alt: 'Ảnh bầu trời xanh tuyệt đẹp với mây trắng' },
    { src: 'bhj1x32x12hbj31hbvhb21bhv3123.png', alt: 'Hoàng hôn rực rỡ trên biển' },
    { src: '3.jpg', alt: 'Bầu trời đêm đầy sao lấp lánh' },
    { src: '4.jpg', alt: 'Phong cảnh làng quê Việt Nam yên bình' },
    { src: '5.jpg', alt: 'Bãi biển Nha Trang với cát trắng nắng vàng' },
    { src: '444480754_448634121089524_5185917173484269147_n.jpg', alt: 'Góc ngồi kỷ niệm thân quen' },
    { src: '444488758_448634007756202_6302989081924096881_n.jpg', alt: 'Bàn ăn ấm cúng gia đình' },
    { src: '2.jpg', alt: 'Không gian một quán ăn nhỏ' },
    { src: '432358009_1356549485053461_7477607390175533651_n.jpg', alt: 'Buổi cắm trại vui vẻ bên bạn bè' },
    { src: '433144599_452789943746601_8230563332010302463_n.jpg', alt: 'Con thuyền nhẹ trôi trên dòng sông' },
    { src: '433217226_328524740212165_6810297370740165090_n.jpg', alt: 'Đóa hoa phai màu theo thời gian' },
    { src: 'asjdksadskdasldsal.png', alt: 'Khoảnh khắc tĩnh lặng và bình yên' },
    { src: 'LDskakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.png', alt: 'Phút giây chia tay bạn bè đầy cảm xúc' },
    { src: '1321321z-min.png', alt: 'Bức ảnh trừu tượng đầy màu sắc' },
    { src: '2 photoshop-min.png', alt: 'Biểu tượng của hòa bình và hy vọng' },
    { src: '13-min.png', alt: 'Thành phố nhìn từ trên cao' },
    { src: '1.jpg', alt: 'Vương quốc của những giấc mơ' },
    { src: '5fb98a89-fcdd-4fef-a123-280a27fcca71-min.jpg', alt: 'Sài Gòn ngày giải phóng lịch sử' }
  ],

  // AOS animation effects for gallery items
  AOS_EFFECTS: [
    'fade-up', 'zoom-in', 'flip-up', 'fade-up-right', 'flip-left',
    'zoom-out', 'fade-left', 'zoom-in-up', 'fade-up-left', 'flip-up',
    'zoom-out-up', 'fade-right', 'fade-down-left', 'fade', 'flip-right',
    'flip-down', 'fade', 'zoom-in'
  ],

  // Animation settings
  ANIMATION: {
    PARTICLE_COUNT: 15,
    PARTICLE_DURATION_MIN: 4,
    PARTICLE_DURATION_MAX: 8,
    SCROLL_THROTTLE: 100,
    BACK_TO_TOP_THRESHOLD: 300,
    GALLERY_REVEAL_THRESHOLD: 50
  },

  // Audio settings
  AUDIO: {
    FILE: 'videoplayback.mp3',
    VOLUME: 0.4,
    LOOP: true,
    HTML5: true
  },

  // Date formatting
  MONTH_NAMES: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],

  // Theme settings
  THEME: {
    STORAGE_KEY: 'theme',
    DEFAULT: 'light'
  }
};