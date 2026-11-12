                            // مثال على التواريخ المتاحة للسيارة في الأشهر المحددة (YYYY-MM-DD)
                            const availableDates = [
                                "2026-11-25", "2026-11-26", "2026-11-27",
                                "2026-11-15", "2026-11-16", "2026-11-17",
                                "2026-11-20", "2026-11-21", "2026-11-22",
                                "2026-11-23", "2026-12-1", "2026-12-2",
                                "2026-12-12", "2026-12-13", "2026-12-14",
                                "2026-12-17", "2026-12-18", "2026-12-19",


                                "2027-01-4", "2027-01-5", "2027-01-6","2027-01-7",
                                "2027-01-11", "2027-01-12", "2027-01-13","2027-01-14",
                                "2027-01-26", "2027-01-27", "2027-01-28","2027-01-29",
                            ];

                            // يبدأ التقويم تلقائياً من شهر 10 (أكتوبر) لعام 2026
                            // ملاحظة: في JavaScript الأشهر تبدأ من 0 (0 = يناير، 9 = أكتوبر،
                            //  10 = نوفمبر، 11 = ديسمبر)
                            let currentDate = new Date(2026, 10, 1);

                            const monthNames = [
                                "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                                "يوليو", "أغسطس", "سبتمبر", "تشرين الأول", "تشرين الثاني", "كانون الأول"
                            ];

                            function renderCalendar() {
                                const year = currentDate.getFullYear();
                                const month = currentDate.getMonth();

                                // تحديث النص العلوي
                                document.getElementById("monthYearLabel").innerText 
                                = `${monthNames[month]} ${year}`;

                                // التحكم في تفعيل وتعطيل أزرار التنقل بناءً على شروطك
                                const prevBtn = document.getElementById("prevMonth");
                                const nextBtn = document.getElementById("nextMonth");

                                // إذا كان الشهر الحالي أكتوبر (9)، عطّل زر العودة للخلف
                                prevBtn.disabled = (month === 9);
                                // إذا كان الشهر الحالي ديسمبر (11)، عطّل زر التقدم للأمام
                                nextBtn.disabled = (month === 11);

                                const calendarDays = document.getElementById("calendarDays");
                                calendarDays.innerHTML = "";

                                const firstDayIndex = new Date(year, month, 1).getDay();
                                const totalDays = new Date(year, month + 1, 0).getDate();

                                // 1. مربعات فارغة لبداية الشهر
                                for (let i = 0; i < firstDayIndex; i++) {
                                    const emptyDiv = document.createElement("div");
                                    calendarDays.appendChild(emptyDiv);
                                }

                                // 2. بناء الأيام للعرض فقط
                                for (let day = 1; day <= totalDays; day++) {
                                    const dayDiv = document.createElement("div");
                                    dayDiv.innerText = day;
                                    dayDiv.className = "py-2 pointer-events-none rounded-lg font-medium";

                                    const formattedMonth = String(month + 1).padStart(2, '0');
                                    const formattedDay = String(day).padStart(2, '0');
                                    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

                                    if (availableDates.includes(dateString)) {
                                        dayDiv.classList.add("bg-primary", "text-white", "shadow-sm", "font-bold");
                                    } else {
                                        dayDiv.classList.add("text-gray-300");
                                    }

                                    calendarDays.appendChild(dayDiv);
                                }
                            }

                            // أحداث التنقل
                            document.getElementById("prevMonth").addEventListener("click", () => {
                                if (currentDate.getMonth() > 9) { // منع الانتقال لما قبل أكتوبر
                                    currentDate.setMonth(currentDate.getMonth() - 1);
                                    renderCalendar();
                                }
                            });

                            document.getElementById("nextMonth").addEventListener("click", () => {
                                if (currentDate.getMonth() < 11) { // منع الانتقال لما بعد ديسمبر
                                    currentDate.setMonth(currentDate.getMonth() + 1);
                                    renderCalendar();
                                }
                            });

                            // تشغيل التقويم
                            renderCalendar();
