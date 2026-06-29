// 导航栏滚动效果
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// 联系表单提交处理（如果存在）
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 这里可以添加实际的表单提交逻辑
        // 例如：发送到服务器或使用第三方服务

        // 显示成功消息
        alert('感谢您的留言！我们会尽快与您联系。');

        // 重置表单
        contactForm.reset();
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 元素进入视口动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.querySelectorAll('.feature-card, .pricing-card, .overview-card, .screenshot-card, .scenario-card, .faq-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});



// 添加滚动到顶部按钮
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow);
`;

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.background = 'var(--primary-dark)';
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.background = 'var(--primary-color)';
    this.style.transform = 'scale(1)';
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// 深色模式切换
const darkModeBtn = document.createElement('button');
darkModeBtn.className = 'dark-mode-toggle';
darkModeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
`;

const sunIcon = '<img src="sun.svg" alt="Light Mode" style="width: 24px; height: 24px;">';
const moonIcon = '<img src="moon.svg" alt="Dark Mode" style="width: 24px; height: 24px;">';

darkModeBtn.innerHTML = moonIcon;

darkModeBtn.addEventListener('mouseenter', function() {
    this.style.background = 'var(--primary-dark)';
    this.style.transform = 'scale(1.1)';
});

darkModeBtn.addEventListener('mouseleave', function() {
    this.style.background = 'var(--primary-color)';
    this.style.transform = 'scale(1)';
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.innerHTML = sunIcon;
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeBtn.innerHTML = moonIcon;
        localStorage.setItem('darkMode', 'disabled');
    }
});

document.body.appendChild(darkModeBtn);

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = sunIcon;
}
