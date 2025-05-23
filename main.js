/**
 * 瀚艺诚工贸有限公司 - 网站交互脚本
 */

// 确保DOM完全加载后执行脚本
document.addEventListener('DOMContentLoaded', () => {
  // 滚动效果
  handleScroll();

  // 导航菜单切换
  setupMobileNav();

  // 动画元素
  initAnimations();

  // 表单验证
  setupForm();

  // 图片懒加载
  setupLazyLoading();
});

// 滚动效果处理
function handleScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a');

  // 添加滚动事件监听器
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // 导航栏固定和颜色变化
    if (scrollPosition > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 激活当前视图中的导航链接
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // 淡入动画
    document.querySelectorAll('.fade-in').forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.8) {
        element.classList.add('active');
      }
    });
  });

  // 手动触发一次滚动事件以设置初始状态
  window.dispatchEvent(new Event('scroll'));
}

// 移动端导航菜单
function setupMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// 初始化动画元素
function initAnimations() {
  // 为每个需要动画的元素设置初始状态
  document.querySelectorAll('.fade-in').forEach((element, index) => {
    // 按顺序延迟，实现级联效果
    element.style.transitionDelay = `${index * 0.1}s`;
  });
}

// 表单验证和处理
function setupForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 获取表单字段
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // 简单验证
      if (!name || !email || !message) {
        alert('请填写所有必填字段');
        return;
      }

      if (!isValidEmail(email)) {
        alert('请输入有效的电子邮件地址');
        return;
      }

      // 模拟表单提交
      const submitButton = contactForm.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = '发送中...';
      submitButton.disabled = true;

      // 模拟网络延迟
      setTimeout(() => {
        // 在实际项目中，这里应该是AJAX请求或其他表单提交逻辑
        alert('感谢您的留言！我们将尽快联系您。');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
}

// 验证邮箱格式
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// 设置图片懒加载
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-image');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // 备用方案，针对不支持IntersectionObserver的浏览器
    let lazyloadThrottleTimeout;
    
    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        document.querySelectorAll('.lazy-image').forEach((img) => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
          }
        });
        
        if (document.querySelectorAll('.lazy-image').length === 0) { 
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        }
      }, 20);
    }

    document.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);
  }
}

// Syntax self-check
try {
  console.log("Syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}

// Function verification
console.assert(typeof handleScroll === 'function', "handleScroll function defined");
console.assert(typeof setupMobileNav === 'function', "setupMobileNav function defined");