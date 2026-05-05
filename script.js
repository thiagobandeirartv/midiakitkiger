// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll for anchor links (if browser doesn't support CSS scroll-behavior natively)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação do Contador de Orçamento
    const budgetCounter = document.getElementById('budget-counter');
    if (budgetCounter) {
        const targetValue = parseInt(budgetCounter.getAttribute('data-target'));
        const duration = 2500; // 2.5 segundos
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        // Efeito ease-out para desacelerar no final
                        const easeProgress = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(easeProgress * targetValue);
                        
                        // Formata para moeda brasileira
                        budgetCounter.innerText = 'R$ ' + currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);

                    // Animação da Barra de Progresso
                    const progressFill = budgetCounter.closest('.budget-highlight').querySelector('.progress-fill');
                    if (progressFill) {
                        const targetWidth = progressFill.getAttribute('data-width');
                        // Pequeno atraso para garantir que a transição CSS seja aplicada
                        setTimeout(() => {
                            progressFill.style.width = targetWidth;
                        }, 100);
                    }

                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counterObserver.observe(budgetCounter);
    }
});
