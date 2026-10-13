// 1. حدد معرفات الأزرار التي تريدها هنا داخل المصفوفة
const buttonIds = ['theme-toggle', 'theme-toggle-mobile'];

// الكود الافتراضي للتحقق من الثيم عند تحميل الصفحة لمنع الوميض (FOUC)
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// دالة لتحديث ظهور الأيقونات داخل جميع الأزرار المحددة
function updateAllIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    
    buttonIds.forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return; // تخطي الزر إذا لم يكن موجوداً في الصفحة الحالية
        
        // البحث عن الأيقونات داخل هذا الزر تحديداً
        const darkIcon = btn.querySelector('[id^="theme-toggle-dark-icon"]');
        const lightIcon = btn.querySelector('[id^="theme-toggle-light-icon"]');
        
        if (isDark) {
            if (lightIcon) lightIcon.classList.remove('hidden');
            if (darkIcon) darkIcon.classList.add('hidden');
        } else {
            if (darkIcon) darkIcon.classList.remove('hidden');
            if (lightIcon) lightIcon.classList.add('hidden');
        }
    });
}

// تشغيل تحديث الأيقونات لأول مرة عند تحميل الصفحة بناءً على الوضع الحالي
document.addEventListener('DOMContentLoaded', () => {
    updateAllIcons();

    // إضافة حدث الضغط (Click) لكل الأزرار
    buttonIds.forEach(id => {
        const toggleBtn = document.getElementById(id);
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function () {
            // تبديل الوضع في عنصر الـ html الرئيسي
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
            
            // تحديث الأيقونات في كل الأزرار معاً لتتوافق مع الوضع الجديد
            updateAllIcons();
        });
    });
});
