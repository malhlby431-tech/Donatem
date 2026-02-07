// Translations
const translations = {
    en: {
        title: "Together for Hope",
        subtitle: "Your donation makes a real difference in Gaza",
        customLabel: "Or enter a custom amount:",
        placeholder: "Enter amount in euros",
        donate: "Donate Now",
        donateRedirect: "Donate €",
        impactText: "Every contribution helps provide essential aid to families in need",
        whatsappText: "Contact us via WhatsApp",
        footerText: "Secure donation via Stripe • 100% safe",
        securityText: "Encrypted and secure payments"
    },
    ar: {
        title: "معًا من أجل الأمل",
        subtitle: "تبرعك يُحدث فرقًا حقيقيًا في غزة",
        customLabel: "أو أدخل مبلغًا مخصصًا:",
        placeholder: "أدخل المبلغ باليورو",
        donate: "تبرع الآن",
        donateRedirect: "تبرع بقيمة €",
        impactText: "كل مساهمة تساعد في تقديم مساعدات أساسية للأسر المحتاجة",
        whatsappText: "تواصل معنا عبر واتساب",
        footerText: "تبرع آمن عبر Stripe • آمن 100%",
        securityText: "مدفوعات مشفرة ومأمونة"
    },
    fr: {
        title: "Ensemble pour l'Espoir",
        subtitle: "Votre don fait une réelle différence à Gaza",
        customLabel: "Ou entrez un montant personnalisé:",
        placeholder: "Entrez le montant en euros",
        donate: "Faire un Don",
        donateRedirect: "Donner €",
        impactText: "Chaque contribution aide à fournir une aide essentielle aux familles dans le besoin",
        whatsappText: "Contactez-nous via WhatsApp",
        footerText: "Don sécurisé via Stripe • 100% sûr",
        securityText: "Paiements cryptés et sécurisés"
    },
    es: {
        title: "Juntos por la Esperanza",
        subtitle: "Tu don marca una verdadera diferencia en Gaza",
        customLabel: "O introduce una cantidad personalizada:",
        placeholder: "Introduce la cantidad en euros",
        donate: "Donar Ahora",
        donateRedirect: "Donar €",
        impactText: "Cada contribución ayuda a proporcionar ayuda esencial a familias necesitadas",
        whatsappText: "Contáctanos por WhatsApp",
        footerText: "Donación segura vía Stripe • 100% seguro",
        securityText: "Pagos encriptados y seguros"
    },
    de: {
        title: "Gemeinsam für Hoffnung",
        subtitle: "Ihre Spende macht einen echten Unterschied in Gaza",
        customLabel: "Oder geben Sie einen benutzerdefinierten Betrag ein:",
        placeholder: "Betrag in Euro eingeben",
        donate: "Jetzt spenden",
        donateRedirect: "Spenden €",
        impactText: "Jeder Beitrag hilft, lebenswichtige Hilfe für bedürftige Familien zu leisten",
        whatsappText: "Kontaktieren Sie uns über WhatsApp",
        footerText: "Sichere Spende über Stripe • 100% sicher",
        securityText: "Verschlüsselte und sichere Zahlungen"
    }
};

// Language names for display
const languageNames = {
    en: "English",
    ar: "العربية",
    fr: "Français",
    es: "Español",
    de: "Deutsch"
};

// Donation links
const donationLinks = {
    '30': 'https://donate.stripe.com/fZuaEPfSr7xIeKJbGA1wY01',
    '50': 'https://donate.stripe.com/bJe28j5dN9FQ6ed6mg1wY02',
    '100': 'https://donate.stripe.com/5kQ28jfSr9FQ5a94e81wY03',
    '150': 'https://donate.stripe.com/bJe5kv35F6tEeKJ6mg1wY04',
    '200': 'https://donate.stripe.com/5kQeV5bCb6tE5a9h0U1wY05',
    '500': 'https://donate.stripe.com/28E14f9u39FQbyx4e81wY06',
    '1000': 'https://donate.stripe.com/7sYbIT35F9FQauteSM1wY07'
};

// DOM Elements
const donateOptions = document.querySelectorAll('.donation-option');
const customInput = document.getElementById('customInput');
const donateBtn = document.getElementById('donateBtn');
const langSelector = document.getElementById('langSelector');
const langMenu = document.getElementById('langMenu');
const currentLangSpan = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');

let selectedAmount = null;
let selectedLink = null;
let currentLang = 'en';

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;
        
        const colors = ['#ffb6a5', '#fdd7a3', '#18b68a', '#ff6b8a'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Set animation delays for donation options
function setDonationOptionDelays() {
    const donationOptions = document.querySelectorAll('.donation-option');
    donationOptions.forEach((option, index) => {
        option.style.setProperty('--item-index', index);
        option.style.animationDelay = `${index * 0.1}s`;
    });
}

// Detect user language
function detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    
    if (userLang.startsWith('ar')) return 'ar';
    if (userLang.startsWith('fr')) return 'fr';
    if (userLang.startsWith('es')) return 'es';
    if (userLang.startsWith('de')) return 'de';
    
    return 'en';
}

// Set language
function setLanguage(lang) {
    currentLang = lang;
    const texts = translations[lang];
    
    // Update texts
    document.getElementById('title').textContent = texts.title;
    document.getElementById('subtitle').textContent = texts.subtitle;
    document.getElementById('custom-label').textContent = texts.customLabel;
    document.getElementById('customInput').placeholder = texts.placeholder;
    document.getElementById('donateBtn').textContent = texts.donate;
    document.getElementById('impact-text').textContent = texts.impactText;
    document.getElementById('whatsapp-text').textContent = texts.whatsappText;
    document.getElementById('footer-text').textContent = texts.footerText;
    document.getElementById('security-text').textContent = texts.securityText;
    
    // Update current language display
    currentLangSpan.textContent = languageNames[lang];
    
    // Update WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappText = lang === 'ar' ? 
        "مرحبًا، أود الاستفسار عن حملة التبرعات للطرد الرمضاني" :
        "Hello, I'd like to inquire about the Gaza donation campaign";
    whatsappBtn.href = `https://wa.me/970592244923?text=${encodeURIComponent(whatsappText)}`;
    
    // Update text direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update active language option
    langOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        }
    });
    
    // Update donate button if enabled
    if (selectedAmount) {
        donateBtn.textContent = `${texts.donateRedirect}${selectedAmount}`;
    }
    
    // Save to localStorage
    localStorage.setItem('preferred-language', lang);
    
    // Close language menu
    langMenu.classList.remove('show');
    langSelector.classList.remove('active');
}

// Enable donate button
function enableDonateButton(amount, link) {
    selectedAmount = amount;
    selectedLink = link;
    donateBtn.disabled = false;
    donateBtn.classList.add('enabled');
    donateBtn.textContent = `${translations[currentLang].donateRedirect}${amount}`;
}

// Disable donate button
function disableDonateButton() {
    selectedAmount = null;
    selectedLink = null;
    donateBtn.disabled = true;
    donateBtn.classList.remove('enabled');
    donateBtn.textContent = translations[currentLang].donate;
}

// Handle donation option clicks
donateOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        donateOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        const amount = this.getAttribute('data-amount');
        const link = donationLinks[amount];
        
        customInput.value = '';
        enableDonateButton(amount, link);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Add touch feedback for mobile
    option.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
    });
    
    option.addEventListener('touchend', function() {
        this.style.opacity = '1';
    });
});

// Handle custom input
customInput.addEventListener('input', function() {
    const value = this.value.trim();
    
    if (value) {
        donateOptions.forEach(opt => opt.classList.remove('active'));
        
        if (donationLinks[value]) {
            enableDonateButton(value, donationLinks[value]);
        } else {
            enableDonateButton(value, donationLinks['30']);
        }
    } else {
        disableDonateButton();
    }
});

// Handle donate button click
donateBtn.addEventListener('click', function(e) {
    if (!selectedLink) return;
    
    e.preventDefault();
    
    // Add click animation
    this.style.transform = 'scale(0.98)';
    this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLang].donate}`;
    
    setTimeout(() => {
        window.location.href = selectedLink;
    }, 300);
});

// Toggle language menu
langSelector.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    langMenu.classList.toggle('show');
    this.classList.toggle('active');
    
    // Add subtle animation
    this.style.transform = 'translateY(-2px)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
});

// Handle language selection
langOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.dataset.lang;
        setLanguage(lang);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Close language menu when clicking outside
document.addEventListener('click', function(e) {
    if (!langSelector.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('show');
        langSelector.classList.remove('active');
    }
});

// Prevent zoom on double tap
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Initialize on page load
window.addEventListener('load', () => {
    createParticles();
    setDonationOptionDelays();
    
    // Use saved language or detect automatically
    const savedLang = localStorage.getItem('preferred-language');
    const detectedLang = detectUserLanguage();
    
    const initialLang = savedLang || detectedLang;
    setLanguage(initialLang);
    
    // Smooth card appearance
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 200);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any dynamic sizes if needed
    }, 250);
});