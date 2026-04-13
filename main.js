document.addEventListener('DOMContentLoaded', function() {
    
    // АНИМАЦИЯ ПРИ СКРОЛЛЕ
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });
    
    // СЧЁТЧИКИ ЦИФР
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText.replace(/\D/g, '')) || 0;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 20);
        } else {
            counter.innerText = target;
        }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ГАЛЕРЕЯ: открытие фото на весь экран
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('active');
            modalImg.src = img.src;
        });
    });
    
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // КНОПКА НАВЕРХ
    const scrollBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // АКТИВНОЕ МЕНЮ ПРИ СКРОЛЛЕ (опционально)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// ========== ПРЕЛОАДЕР ==========
window.addEventListener('load', function() {
    // Ждём полной загрузки страницы
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 700); // 1 секунда загрузки
});