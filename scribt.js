// Global o'zgaruvchi: Chegirma tugaydigan sana (misol: 2025-yil 31-dekabr)
// O'zingizga kerakli sanani shu yerga kiriting (Yil, Oy-1, Kun)
const PROMO_END_DATE = new Date(2025, 11, 31); // Misol: 31-dekabr 2025

// Global o'zgaruvchi: To'liq (chegirmasiz) narxlar
const FULL_PRICE_CHINA = 100000; // Hitoy Kursi
const FULL_PRICE_OPTOM = 250000; // Optom Kursi

// Global o'zgaruvchi: Chegirmali narxlar
const DISCOUNT_PRICE_CHINA = 50000; 
const DISCOUNT_PRICE_OPTOM = 125000; 


function isPromoActive() {
    const today = new Date();
    // Agar bugungi sana muddat tugashidan oldin bo'lsa, TRUE qaytadi
    return today <= PROMO_END_DATE;
}

// ... (qolgan kodlar o'zgarishsiz)

// --- 2. Formani Yuborish (register.html sahifasida ishlaydi) ---
if (registerForm) {
    registerForm.addEventListener('submit', function (e) { 
        e.preventDefault(); 

        const name = document.getElementById('user-name').value;
        const courseSelect = document.getElementById('user-course');
        const course = courseSelect.value;
        
        // ... (phone olish qismi o'zgarishsiz qoladi)

        const selectedOption = courseSelect.options[courseSelect.selectedIndex];
        
        // Chegirma faol bo'lsa, data-price'dagi narxni oladi (bu yerda 50.000 yoki 125.000)
        let priceToPay;
        if (isPromoActive()) {
            // Chegirma faol bo'lsa, chegirmali narxni o'qiydi
            priceToPay = parseFloat(selectedOption.getAttribute('data-price').replace('.', '')); 
        } else {
            // Chegirma tugagan bo'lsa, to'liq narxni tanlangan kursga qarab belgilaydi
            if (course.includes("Hitoydan Tavar Zakaz Qilish")) {
                priceToPay = FULL_PRICE_CHINA;
            } else if (course.includes("Optom Tavarlar Kursi")) {
                priceToPay = FULL_PRICE_OPTOM;
            } else {
                priceToPay = 0; // Xatolik holati
            }
            
            // Chegirma tugaganligi haqida ogohlantirish (ixtiyoriy)
            alert("⚠️ Chegirma muddati tugadi! Endi kurs narxi to'liq narxda hisoblanadi.");
        }

        const formattedPrice = new Intl.NumberFormat('uz-UZ', { 
            style: 'currency', 
            currency: 'UZS', 
            minimumFractionDigits: 0 
        }).format(priceToPay);

        // Ma'lumotlarni localStoragga saqlash
        localStorage.setItem('regName', name); 
        localStorage.setItem('regCourse', course); 
        localStorage.setItem('regPhone', phone); 
        localStorage.setItem('regPrice', formattedPrice); 
        
        // ... (console.log va redirect qismi o'zgarishsiz qoladi)
        setTimeout(() => {
            window.location.href = PAYMENT_PAGE_URL; 
        }, 50); 
    });
}
});
