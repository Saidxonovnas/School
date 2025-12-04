// Global o'zgaruvchi: Telegram manzili
const TELEGRAM_URL = 'https://t.me/Saidxonovnas_School'; 
// Global o'zgaruvchi: To'lovni tasdiqlash sahifasi
const PAYMENT_PAGE_URL = 'payment.html'; 

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle'); 
    const mainNav = document.getElementById('mainNav'); 
    const registerForm = document.getElementById('register-form'); 

    // --- 1. Hamburger menyu funksiyasi ---
    if (menuToggle && mainNav) { 
        menuToggle.addEventListener('click', function () { 
            mainNav.classList.toggle('active'); 
        });
        // Menyudagi linkni bosganda yopish
        mainNav.querySelectorAll('a').forEach(link => { 
            link.addEventListener('click', () => { 
                mainNav.classList.remove('active'); 
            });
        });
    }

    // --- 2. Formani Yuborish (register.html sahifasida ishlaydi) ---
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) { 
            e.preventDefault(); 

            const name = document.getElementById('user-name').value;
            const courseSelect = document.getElementById('user-course');
            const course = courseSelect.value;
            
            // Telefon raqamini olish va +998 bilan to'g'irlash
            const rawPhone = document.getElementById('user-phone').value.replace(/\D/g, ''); 
            
            // Agar foydalanuvchi 9 raqam (masalan, 901234567) kirgizgan bo'lsa, +998 ni qo'shamiz
            const phone = (rawPhone.length === 9) ? `+998${rawPhone}` : rawPhone; 
            
            const selectedOption = courseSelect.options[courseSelect.selectedIndex];
            
            // data-price ni raqam sifatida olish va formatlash
            const priceValue = parseFloat(selectedOption.getAttribute('data-price')); 
            
            const formattedPrice = new Intl.NumberFormat('uz-UZ', { 
                style: 'currency', 
                currency: 'UZS', 
                minimumFractionDigits: 0 
            }).format(priceValue); 

            // Ma'lumotlarni localStoragga saqlash
            localStorage.setItem('regName', name); 
            localStorage.setItem('regCourse', course); 
            localStorage.setItem('regPhone', phone); 
            localStorage.setItem('regPrice', formattedPrice); 
            
            console.log(`Foydalanuvchi Ro'yxatdan O'tdi: Ism: ${name}, Kurs: ${course}, Telefon: ${phone}`);

            // Ma'lumot saqlanib ulgurishi uchun qisqa kutish (50ms) beriladi, keyin sahifaga o'tiladi
            setTimeout(() => {
                window.location.href = PAYMENT_PAGE_URL; 
            }, 50); 
        });
    }
});
