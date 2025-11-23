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
            const phone = document.getElementById('user-phone').value;

            // Narxni olish
            const selectedOption = courseSelect.options[courseSelect.selectedIndex];
            const priceUZS = selectedOption.getAttribute('data-price');

            // Narxni UZS formatiga o'tkazish
            const formattedPrice = new Intl.NumberFormat('uz-UZ', {
                style: 'currency',
                currency: 'UZS',
                minimumFractionDigits: 0
            }).format(priceUZS);

            // Ma'lumotlarni vaqtinchalik brauzerga saqlash
            localStorage.setItem('regName', name);
            localStorage.setItem('regCourse', course);
            localStorage.setItem('regPhone', phone);
            localStorage.setItem('regPrice', formattedPrice);

            console.log(`Foydalanuvchi Ro'yxatdan O'tdi: Ism: ${name}, Kurs: ${course}, Narx: ${formattedPrice}, Telefon: ${phone}`);

            // Alert funksiyasi o'chirildi. Endi to'g'ridan-to'g'ri yo'naltiriladi.

            // To'lov sahifasiga o'tish (Joriy oynada)
            window.location.href = PAYMENT_PAGE_URL;
        });
    }
});