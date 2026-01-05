/**
 * 汝窑网站 - 主JavaScript文件
 * 包含：图片轮播、回到顶部、表单验证、作品筛选等交互功能
 * 日期：2025
 */

// ========== DOM加载完成后执行 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各功能模块
    initSlider();
    initBackToTop();
    initContactForm();
    initGalleryFilter();
});

// ========== 图片轮播功能 ==========
function initSlider() {
    const slider = document.querySelector('.banner-slider');
    if (!slider) return; // 如果页面没有轮播图则退出

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayInterval = 5000; // 自动播放间隔5秒

    // 切换到指定幻灯片
    function goToSlide(index) {
        // 处理边界情况
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // 移除所有active类
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 添加active类到当前项
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;
    }

    // 下一张
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // 上一张
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 开始自动播放
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    // 停止自动播放
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    // 绑定事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            startAutoPlay(); // 重置自动播放计时器
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            startAutoPlay();
        });
    }

    // 指示点点击事件
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            startAutoPlay();
        });
    });

    // 鼠标悬停时暂停自动播放
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // 启动自动播放
    startAutoPlay();
}

// ========== 回到顶部功能 ==========
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    const showThreshold = 300; // 滚动超过300px显示按钮

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > showThreshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== 联系表单验证功能 ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // 表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除之前的错误信息
        clearErrors();
        
        // 验证表单
        let isValid = true;

        // 验证姓名
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('nameError', '请输入您的姓名');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError('nameError', '姓名至少需要2个字符');
            isValid = false;
        }

        // 验证电话
        const phone = document.getElementById('phone');
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phone.value.trim()) {
            showError('phoneError', '请输入您的联系电话');
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError('phoneError', '请输入有效的手机号码');
            isValid = false;
        }

        // 验证邮箱（可选，但如果填写了需要验证格式）
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() && !emailRegex.test(email.value.trim())) {
            showError('emailError', '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证主题
        const subject = document.getElementById('subject');
        if (!subject.value.trim()) {
            showError('subjectError', '请输入咨询主题');
            isValid = false;
        }

        // 验证留言内容
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('messageError', '请输入留言内容');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', '留言内容至少需要10个字符');
            isValid = false;
        }

        // 如果验证通过
        if (isValid) {
            // 模拟提交成功
            alert('感谢您的留言！我们将尽快与您联系。');
            form.reset();
        }
    });

    // 显示错误信息
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.style.color = '#c0392b';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
        }
    }

    // 清除所有错误信息
    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(function(el) {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    // 输入时清除对应的错误信息
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
}

// ========== 作品筛选功能 ==========
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0 || galleryItems.length === 0) return;

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 获取筛选类别
            const filter = this.getAttribute('data-filter');

            // 筛选作品
            galleryItems.forEach(function(item) {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    item.style.opacity = '0';
                    setTimeout(function() {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========== 平滑滚动到锚点 ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


// ========== 登录表单验证 ==========
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAuthErrors();
        
        let isValid = true;

        // 验证用户名
        const username = document.getElementById('username');
        if (!username.value.trim()) {
            showAuthError('usernameError', '请输入用户名或手机号');
            isValid = false;
        }

        // 验证密码
        const password = document.getElementById('password');
        if (!password.value.trim()) {
            showAuthError('passwordError', '请输入密码');
            isValid = false;
        }

        if (isValid) {
            alert('登录成功！欢迎回来。');
            // 这里可以添加实际的登录逻辑
        }
    });
}

// ========== 注册表单验证 ==========
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAuthErrors();
        
        let isValid = true;

        // 验证用户名
        const username = document.getElementById('regUsername');
        if (!username.value.trim()) {
            showAuthError('regUsernameError', '请输入用户名');
            isValid = false;
        } else if (username.value.trim().length < 4 || username.value.trim().length > 16) {
            showAuthError('regUsernameError', '用户名需要4-16位字符');
            isValid = false;
        }

        // 验证手机号
        const phone = document.getElementById('regPhone');
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phone.value.trim()) {
            showAuthError('regPhoneError', '请输入手机号');
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showAuthError('regPhoneError', '请输入有效的手机号码');
            isValid = false;
        }

        // 验证邮箱（可选）
        const email = document.getElementById('regEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() && !emailRegex.test(email.value.trim())) {
            showAuthError('regEmailError', '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证密码
        const password = document.getElementById('regPassword');
        if (!password.value.trim()) {
            showAuthError('regPasswordError', '请输入密码');
            isValid = false;
        } else if (password.value.length < 6 || password.value.length > 20) {
            showAuthError('regPasswordError', '密码需要6-20位字符');
            isValid = false;
        }

        // 验证确认密码
        const confirmPassword = document.getElementById('regConfirmPassword');
        if (!confirmPassword.value.trim()) {
            showAuthError('regConfirmPasswordError', '请再次输入密码');
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            showAuthError('regConfirmPasswordError', '两次输入的密码不一致');
            isValid = false;
        }

        if (isValid) {
            alert('注册成功！请登录您的账户。');
            window.location.href = 'login.html';
        }
    });
}

// 显示认证错误
function showAuthError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = '#c0392b';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
    }
}

// 清除认证错误
function clearAuthErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// 初始化登录注册表单
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
    initRegisterForm();
});
