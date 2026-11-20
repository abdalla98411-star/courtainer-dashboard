
const HTML_CONTENT = "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n <meta charset=\"UTF-8\">\n <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n <title>نظام إدارة وتصنيع الستائر | أمر التشغيل وعروض الأسعار مع الربط بأودو</title>\n <!-- Tailwind CSS CDN -->\n <script src=\"https://cdn.tailwindcss.com\"></script>\n <style>/* public/style.css - تنسيقات مخصصة ودعم الطباعة A4 */\n@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');\n\nbody {\n font-family: 'Cairo', sans-serif;\n direction: rtl;\n background-color: #f8fafc;\n color: #1e293b;\n}\n\n/* تنسيقات شريط التمرير */\n::-webkit-scrollbar {\n width: 6px;\n height: 6px;\n}\n::-webkit-scrollbar-track {\n background: #f1f5f9;\n}\n::-webkit-scrollbar-thumb {\n background: #cbd5e1;\n border-radius: 4px;\n}\n\n/* لوحة الرسم التوضيحي للموديل */\n#sketchCanvas {\n touch-action: none;\n cursor: crosshair;\n background-color: #ffffff;\n border: 2px dashed #94a3b8;\n border-radius: 8px;\n}\n\n/* ======================================================== */\n/* كروكي المعاينة البصرية والارتفاع المعماري (Visual Inspection Sketch) */\n/* ======================================================== */\n.wall-sketch-canvas {\n background: #fdfdfd;\n background-image: \n linear-gradient(to right, rgba(226, 232, 240, 0.6) 1px, transparent 1px),\n linear-gradient(to bottom, rgba(226, 232, 240, 0.6) 1px, transparent 1px);\n background-size: 20px 20px;\n position: relative;\n border: 2px solid #334155;\n border-radius: 12px;\n}\n\n/* خطوط الأبعاد المعمارية */\n.dim-line-h {\n position: absolute;\n height: 2px;\n background-color: #0284c7;\n display: flex;\n align-items: center;\n justify-content: center;\n}\n.dim-line-h::before, .dim-line-h::after {\n content: '';\n position: absolute;\n width: 2px;\n height: 14px;\n background-color: #0284c7;\n}\n.dim-line-h::before { left: 0; }\n.dim-line-h::after { right: 0; }\n\n.dim-line-v {\n position: absolute;\n width: 2px;\n background-color: #0284c7;\n display: flex;\n align-items: center;\n justify-content: center;\n}\n.dim-line-v::before, .dim-line-v::after {\n content: '';\n position: absolute;\n height: 2px;\n width: 14px;\n background-color: #0284c7;\n}\n.dim-line-v::before { top: 0; }\n.dim-line-v::after { bottom: 0; }\n\n/* حقول الإدخال الموزعة على الكروكي */\n.croquis-input {\n background-color: #ffffff;\n border: 2px solid #0284c7;\n border-radius: 6px;\n font-weight: 800;\n color: #0369a1;\n text-align: center;\n box-shadow: 0 2px 4px rgba(0,0,0,0.08);\n transition: all 0.2s ease;\n z-index: 20;\n}\n.croquis-input:focus {\n border-color: #4f46e5;\n box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);\n outline: none;\n}\n.croquis-label {\n font-size: 10px;\n font-weight: 700;\n color: #0284c7;\n background: rgba(255, 255, 255, 0.95);\n padding: 1px 4px;\n border-radius: 3px;\n white-space: nowrap;\n}\n\n/* تمثيل الشباك وباب البلكونة */\n.window-glass {\n background: linear-gradient(135deg, rgba(186, 230, 253, 0.5) 0%, rgba(224, 242, 254, 0.8) 100%);\n border: 4px solid #475569;\n border-radius: 4px;\n box-shadow: inset 0 0 10px rgba(0,0,0,0.1);\n position: relative;\n}\n\n.window-sill {\n height: 8px;\n background: #334155;\n border-radius: 2px;\n width: 106%;\n margin-right: -3%;\n}\n\n/* تمثيل بيت الستارة في السقف */\n.ceiling-pocket-visual {\n background: repeating-linear-gradient(\n 45deg,\n #fef3c7,\n #fef3c7 8px,\n #fde68a 8px,\n #fde68a 16px\n );\n border: 2px dashed #d97706;\n border-radius: 4px;\n}\n\n/* بطاقات لقاء العميل المريحة للموبايل */\n.mobile-input-row {\n display: flex;\n align-items: center;\n justify-content: space-between;\n padding: 0.6rem 0;\n border-bottom: 1px solid #f1f5f9;\n}\n\n/* تخصيص الطباعة لورقة A4 */\n@media print {\n body {\n background-color: #ffffff !important;\n padding: 0 !important;\n margin: 0 !important;\n font-size: 11pt;\n }\n .no-print {\n display: none !important;\n }\n .print-only {\n display: block !important;\n }\n .page-a4 {\n width: 210mm;\n min-height: 297mm;\n padding: 10mm 15mm;\n margin: 0 auto;\n background: #ffffff;\n box-shadow: none !important;\n border: none !important;\n page-break-after: always;\n }\n table {\n border-collapse: collapse !important;\n width: 100% !important;\n }\n th, td {\n border: 1px solid #000000 !important;\n padding: 4px 6px !important;\n }\n}\n\n/* ورقة أمر التشغيل المشابهة للورقة الأصلية */\n.factory-sheet {\n background: #ffffff;\n border: 2px solid #0f172a;\n border-radius: 6px;\n padding: 16px;\n color: #0f172a;\n}\n\n.sheet-table {\n width: 100%;\n border-collapse: collapse;\n text-align: center;\n font-size: 0.85rem;\n}\n\n.sheet-table th, .sheet-table td {\n border: 1px solid #1e293b;\n padding: 4px 6px;\n}\n\n.sheet-table th {\n background-color: #f1f5f9;\n font-weight: 700;\n}\n\n.sheet-box-title {\n display: inline-block;\n border: 2px solid #0f172a;\n border-radius: 12px;\n padding: 4px 24px;\n font-weight: 800;\n font-size: 1.25rem;\n background-color: #ffffff;\n}\n</style>\n</head>\n<body class=\"bg-slate-50 text-slate-900 min-h-screen flex flex-col\">\n\n <!-- شريط التنقل العلوي -->\n <header class=\"bg-indigo-900 text-white shadow-md sticky top-0 z-50 no-print\">\n <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n <div class=\"flex items-center justify-between h-16\">\n <!-- الشعار والعنوان -->\n <div class=\"flex items-center space-x-3 space-x-reverse\">\n <div class=\"w-10 h-10 rounded-lg bg-amber-400 text-indigo-950 flex items-center justify-center font-extrabold text-xl shadow\">\n ستائر\n </div>\n <div>\n <h1 class=\"text-lg font-bold leading-tight\">نظام تشغيل مصنع الستائر</h1>\n <p class=\"text-xs text-indigo-200\">النموذج الرقمي الذكي المتكامل مع أودو Odoo</p>\n </div>\n </div>\n\n <!-- أزرار التبويبات -->\n <nav class=\"hidden md:flex space-x-1 space-x-reverse\">\n <button onclick=\"switchTab('inspection')\" id=\"nav-inspection\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition bg-indigo-800 text-white shadow flex items-center gap-1.5\">\n <span>📐</span> معاينة الموقع (كروكي)\n </button>\n <button onclick=\"switchTab('meeting')\" id=\"nav-meeting\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition text-indigo-200 hover:text-white hover:bg-indigo-800\">\n 📋 التسعير ولقاء العميل\n </button>\n <button onclick=\"switchTab('jobSheet')\" id=\"nav-jobSheet\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition text-indigo-200 hover:text-white hover:bg-indigo-800\">\n 🖨️ أمر التشغيل A4\n </button>\n <button onclick=\"switchTab('quoteSheet')\" id=\"nav-quoteSheet\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition text-indigo-200 hover:text-white hover:bg-indigo-800\">\n 💰 عرض السعر\n </button>\n <button onclick=\"switchTab('crm')\" id=\"nav-crm\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition text-indigo-200 hover:text-white hover:bg-indigo-800\">\n 📊 مراحل المبيعات والمهام\n </button>\n <button onclick=\"switchTab('odoo')\" id=\"nav-odoo\" class=\"tab-btn px-4 py-2 rounded-md text-sm font-semibold transition text-amber-300 hover:text-amber-100 hover:bg-indigo-800 flex items-center gap-1\">\n 🔌 الربط مع أودو (APIs)\n </button>\n </nav>\n\n <!-- الحالة والتجربة السريعة -->\n <div class=\"flex items-center space-x-2 space-x-reverse\">\n <span class=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300\">\n <span class=\"w-2 h-2 mr-1 rounded-full bg-emerald-500 animate-pulse\"></span>\n APIs متصلة\n </span>\n <button onclick=\"loadSampleData()\" class=\"text-xs bg-indigo-800 hover:bg-indigo-700 text-indigo-100 px-3 py-1.5 rounded border border-indigo-700 transition\">\n تحميل مثال جاهز\n </button>\n </div>\n </div>\n </div>\n\n <!-- شريط تنقل الموبايل -->\n <div class=\"md:hidden flex border-t border-indigo-800 bg-indigo-950 overflow-x-auto px-2 py-1 space-x-1 space-x-reverse text-xs\">\n <button onclick=\"switchTab('inspection')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap bg-indigo-800 text-white font-bold\">معاينة الموقع</button>\n <button onclick=\"switchTab('meeting')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap text-indigo-200\">التسعير</button>\n <button onclick=\"switchTab('jobSheet')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap text-indigo-200\">أمر التشغيل</button>\n <button onclick=\"switchTab('quoteSheet')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap text-indigo-200\">عرض السعر</button>\n <button onclick=\"switchTab('crm')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap text-indigo-200\">الفرص</button>\n <button onclick=\"switchTab('odoo')\" class=\"tab-mobile-btn px-3 py-1.5 rounded whitespace-nowrap text-amber-300\">أودو APIs</button>\n </div>\n </header>\n\n <!-- محتوى التطبيق -->\n <main class=\"flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8\">\n\n <!-- ======================================================== -->\n <!-- التبويب 0: معاينة الموقع - كروكي الأبعاد المعمارية (جديد) -->\n <!-- ======================================================== -->\n <section id=\"tab-inspection\" class=\"tab-content block\">\n \n <!-- شريط معلومات الموقع السريع -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6\">\n <div class=\"flex flex-wrap items-center justify-between gap-4\">\n <div>\n <h2 class=\"text-lg font-bold text-slate-800 flex items-center gap-2\">\n <span class=\"text-2xl text-indigo-600\">📐</span> كروكي معاينة الموقع ورفع المقاسات الميداني\n </h2>\n <p class=\"text-xs text-slate-500\">أدخل المقاسات الـ 11 مباشرة على الرسم التوضيحي للحائط والشباك، وسيقوم النظام بتدقيقها واقتراح مقاسات الستارة المناسبة.</p>\n </div>\n \n <!-- نوع الفتحة: شباك أم باب بلكونة -->\n <div class=\"flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border text-xs font-bold\">\n <span class=\"text-slate-600 px-2\">نوع الفتحة:</span>\n <button type=\"button\" onclick=\"setWindowOpeningMode('window')\" id=\"btn-mode-window\" class=\"px-3 py-1.5 rounded-md bg-indigo-600 text-white shadow\">\n 🪟 شباك عادي\n </button>\n <button type=\"button\" onclick=\"setWindowOpeningMode('balcony')\" id=\"btn-mode-balcony\" class=\"px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900\">\n 🚪 باب بلكونة / شرفة\n </button>\n </div>\n </div>\n\n <!-- حقول العميل والغرفة للمعاينة -->\n <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اسم العميل *</label>\n <input type=\"text\" id=\"insp_client_name\" value=\"م. أحمد عبد الرحمن\" oninput=\"syncClientDataToMeeting()\" class=\"w-full px-3 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">رقم الهاتف *</label>\n <input type=\"tel\" id=\"insp_client_phone\" value=\"01012345678\" oninput=\"syncClientDataToMeeting()\" class=\"w-full px-3 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اسم الغرفة / الشباك</label>\n <input type=\"text\" id=\"insp_room_name\" value=\"غرفة النوم الرئيسية\" oninput=\"syncClientDataToMeeting()\" class=\"w-full px-3 py-1.5 border rounded-lg\">\n </div>\n </div>\n </div>\n\n <!-- ======================================================== -->\n <!-- الرسم الكروكي البصري التفاعلي للحائط والمقاسات الـ 11 -->\n <!-- ======================================================== -->\n <div class=\"bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6\">\n \n <div class=\"flex items-center justify-between mb-4\">\n <div class=\"flex items-center gap-2\">\n <span class=\"text-xs font-bold uppercase tracking-wider text-slate-400\">واجهة الحائط المعمارية (Elevation View)</span>\n <span id=\"insp_consistency_badge\" class=\"px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800\">\n الأبعاد متطابقة ✓\n </span>\n </div>\n <button type=\"button\" onclick=\"resetInspectionDefaults()\" class=\"text-xs text-indigo-600 hover:text-indigo-800 font-semibold\">\n استعادة المقاسات القياسية\n </button>\n </div>\n\n <!-- الحاوية المعمارية للحائط -->\n <div class=\"wall-sketch-canvas w-full min-h-[580px] p-6 flex flex-col justify-between relative overflow-hidden select-none\">\n \n <!-- خط السقف العلوي وبيت الستارة -->\n <div class=\"w-full border-b-4 border-slate-800 pt-2 pb-1 relative\">\n <div class=\"flex justify-between items-center text-xs font-bold text-slate-700\">\n <span class=\"flex items-center gap-1\">🏛️ خط السقف الخرساني</span>\n \n <!-- خانة 5: عرض بيت الستارة + خانة 10 و 11: السقوط والعمق -->\n <div class=\"ceiling-pocket-visual px-4 py-2 flex items-center gap-4 shadow-sm\">\n <div class=\"flex items-center gap-1.5\">\n <span class=\"croquis-label\">٥. عرض بيت الستارة:</span>\n <input type=\"number\" id=\"insp_pocket_width\" value=\"300\" oninput=\"recalculateInspection()\" class=\"croquis-input w-20 py-1 text-sm\">\n <span class=\"text-xs text-amber-900 font-bold\">سم</span>\n </div>\n <div class=\"border-r border-amber-400 pr-3 flex items-center gap-1.5\">\n <span class=\"croquis-label\">١٠. السقوط:</span>\n <input type=\"number\" id=\"insp_pocket_drop\" value=\"15\" oninput=\"recalculateInspection()\" class=\"croquis-input w-16 py-1 text-sm\">\n <span class=\"text-xs text-amber-900 font-bold\">سم</span>\n </div>\n <div class=\"border-r border-amber-400 pr-3 flex items-center gap-1.5\">\n <span class=\"croquis-label\">١١. العمق:</span>\n <input type=\"number\" id=\"insp_pocket_depth\" value=\"25\" oninput=\"recalculateInspection()\" class=\"croquis-input w-16 py-1 text-sm\">\n <span class=\"text-xs text-amber-900 font-bold\">سم</span>\n </div>\n </div>\n\n <span>زاوية السقف</span>\n </div>\n </div>\n\n <!-- مساحة الحائط والشباك والمقاسات الرأسية والأفقية -->\n <div class=\"flex-1 flex my-4 relative\">\n\n <!-- الجانب الأيمن من الحائط: بعد الارتفاع الكلي (خانة 6) -->\n <div class=\"w-24 flex flex-col justify-between items-center border-l-2 border-dashed border-sky-400 px-2 py-4 relative\">\n <span class=\"text-[10px] font-bold text-sky-800 writing-vertical\">٦. الارتفاع الكلي</span>\n <div class=\"my-auto text-center\">\n <label class=\"block text-[11px] font-black text-sky-900 mb-1\">الارتفاع الكلي</label>\n <input type=\"number\" id=\"insp_total_height\" value=\"280\" oninput=\"recalculateInspection()\" class=\"croquis-input w-20 py-1.5 text-base text-indigo-900 bg-amber-50\">\n <span class=\"block text-[10px] text-slate-500 mt-1\">سم</span>\n </div>\n <div class=\"text-[10px] text-slate-400 font-mono\" id=\"insp_vert_sum_hint\">مجموع: 280</div>\n </div>\n\n <!-- قلب الحائط: اليمين + الشباك في الوسط + اليسار -->\n <div class=\"flex-1 flex flex-col justify-between px-4\">\n \n <!-- خانة 8: أعلى الشباك (بين السقف وحلق الشباك العلوي) -->\n <div class=\"flex justify-center items-center py-2\">\n <div class=\"flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-sky-300 shadow-sm\">\n <span class=\"text-sky-500 font-bold\">↕</span>\n <span class=\"croquis-label\">٨. أعلى الشباك (حتى السقف):</span>\n <input type=\"number\" id=\"insp_above_window\" value=\"50\" oninput=\"recalculateInspection()\" class=\"croquis-input w-16 py-1 text-sm\">\n <span class=\"text-xs text-slate-600 font-bold\">سم</span>\n </div>\n </div>\n\n <!-- صف الفتحة (يمين الشباك + الشباك + يسار الشباك) -->\n <div class=\"flex items-center justify-between gap-4 my-2\">\n \n <!-- خانة 1: يمين الشباك (المسافة من الشباك للحائط الأيمن) -->\n <div class=\"flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50\">\n <span class=\"croquis-label mb-1\">١. يمين الشباك:</span>\n <div class=\"flex items-center gap-1\">\n <span class=\"text-sky-600 text-sm\">◀</span>\n <input type=\"number\" id=\"insp_right_width\" value=\"75\" oninput=\"recalculateInspection()\" class=\"croquis-input w-20 py-1.5 text-sm\">\n <span class=\"text-sky-600 text-sm\">▶</span>\n </div>\n <span class=\"text-[10px] text-slate-500 mt-1\">سم حتى زاوية اليمين</span>\n </div>\n\n <!-- الفتحة في المنتصف: الشباك / باب البلكونة -->\n <div id=\"window-visual-box\" class=\"w-72 min-h-[220px] window-glass flex flex-col justify-between p-3 relative shadow-inner\">\n \n <!-- ترويسة الشباك وعرض الشباك (خانة 2) -->\n <div class=\"text-center z-10\">\n <div class=\"inline-flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-md border border-slate-400 shadow-sm\">\n <span class=\"croquis-label\">٢. عرض الشباك:</span>\n <input type=\"number\" id=\"insp_window_width\" value=\"150\" oninput=\"recalculateInspection()\" class=\"croquis-input w-20 py-1 text-base text-indigo-700\">\n <span class=\"text-xs font-bold text-slate-700\">سم</span>\n </div>\n </div>\n\n <!-- شكل زجاج الشباك ومقبض الباب / النافذة -->\n <div class=\"flex-1 flex items-center justify-center relative my-2\">\n <div class=\"w-full h-full border border-sky-300 grid grid-cols-2 gap-1 p-1\">\n <div class=\"border border-white/60 bg-sky-100/30 flex items-center justify-end pr-2\">\n <div class=\"w-1.5 h-6 bg-slate-600 rounded\"></div>\n </div>\n <div class=\"border border-white/60 bg-sky-100/30\"></div>\n </div>\n\n <!-- خانة 7: ارتفاع الشباك (على الجانب الأيسر للنافذة) -->\n <div class=\"absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-10\">\n <span class=\"croquis-label text-[9px] mb-0.5\">٧. ارتفاع الشباك</span>\n <div class=\"flex items-center gap-0.5\">\n <input type=\"number\" id=\"insp_window_height\" value=\"140\" oninput=\"recalculateInspection()\" class=\"croquis-input w-16 py-1 text-sm\">\n </div>\n <span class=\"text-[10px] text-slate-500\">سم</span>\n </div>\n </div>\n\n <!-- جلسة الشباك السفلية -->\n <div class=\"window-sill\" id=\"window-sill-bar\"></div>\n </div>\n\n <!-- خانة 3: يسار الشباك (المسافة من الشباك للحائط الأيسر) -->\n <div class=\"flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50\">\n <span class=\"croquis-label mb-1\">٣. يسار الشباك:</span>\n <div class=\"flex items-center gap-1\">\n <span class=\"text-sky-600 text-sm\">◀</span>\n <input type=\"number\" id=\"insp_left_width\" value=\"75\" oninput=\"recalculateInspection()\" class=\"croquis-input w-20 py-1.5 text-sm\">\n <span class=\"text-sky-600 text-sm\">▶</span>\n </div>\n <span class=\"text-[10px] text-slate-500 mt-1\">سم حتى زاوية اليسار</span>\n </div>\n\n </div>\n\n <!-- خانة 9: أسفل الشباك (جلسة الشباك حتى الأرضية) -->\n <div class=\"flex justify-center items-center py-2\" id=\"below-window-container\">\n <div class=\"flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-sky-300 shadow-sm\">\n <span class=\"text-sky-500 font-bold\">↕</span>\n <span class=\"croquis-label\">٩. أسفل الشباك (الجلسة للأرض):</span>\n <input type=\"number\" id=\"insp_below_window\" value=\"90\" oninput=\"recalculateInspection()\" class=\"croquis-input w-16 py-1 text-sm\">\n <span class=\"text-xs text-slate-600 font-bold\">سم</span>\n </div>\n </div>\n\n </div>\n\n </div>\n\n <!-- خط الأرضية السفلي والعرض الكلي للحائط (خانة 4) -->\n <div class=\"w-full border-t-4 border-amber-900 bg-amber-50/80 p-3 rounded-b-lg\">\n <div class=\"flex flex-wrap items-center justify-between gap-4\">\n <span class=\"text-xs font-bold text-amber-950 flex items-center gap-1\">\n 🪵 خط الأرضية / الباركيه\n </span>\n \n <!-- خانة 4: العرض الكلي للحائط -->\n <div class=\"flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-indigo-600 shadow\">\n <span class=\"text-indigo-700 text-sm\">◀</span>\n <span class=\"text-xs font-black text-indigo-950\">٤. العرض الكلي للحائط:</span>\n <input type=\"number\" id=\"insp_total_width\" value=\"300\" oninput=\"recalculateInspection()\" class=\"croquis-input w-24 py-1.5 text-base text-indigo-900 bg-indigo-50 font-black\">\n <span class=\"text-xs font-bold text-slate-700\">سم</span>\n <span class=\"text-indigo-700 text-sm\">▶</span>\n </div>\n\n <div class=\"text-xs text-slate-600 font-mono\" id=\"insp_horiz_sum_hint\">\n المجموع الأفقي: 75 + 150 + 75 = 300 سم\n </div>\n </div>\n </div>\n\n </div>\n\n <!-- ملاحظات العوائق بالموقع -->\n <div class=\"mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs\">\n <div class=\"md:col-span-2\">\n <label class=\"block font-bold text-slate-700 mb-1\">ملاحظات عوائق الموقع (تكييف، مفاتيح إنارة، فتحات تهوية):</label>\n <input type=\"text\" id=\"insp_obstacles\" value=\"لا توجد عوائق، يوجد مفتاح إنارة على بعد 15 سم من يمين الشباك\" class=\"w-full px-3 py-2 border rounded-lg\" placeholder=\"اكتب أي عوائق في مسار حركة الستارة...\">\n </div>\n <div class=\"flex items-end\">\n <button type=\"button\" onclick=\"saveInspectionToDB()\" class=\"w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg shadow text-xs flex items-center justify-center gap-1.5\">\n <span>💾</span> حفظ بيانات المعاينة في السجل\n </button>\n </div>\n </div>\n\n </div>\n\n <!-- ======================================================== -->\n <!-- بطاقة النتائج الذكية واعتماد المقاسات للتسعير والتفصيل -->\n <!-- ======================================================== -->\n <div class=\"bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-xl shadow-xl p-6\">\n <div class=\"flex flex-wrap items-center justify-between gap-4\">\n \n <div>\n <span class=\"text-xs text-amber-300 font-bold uppercase tracking-wider block mb-1\">\n ✨ التوليد الذكي لمقاسات الستارة من واقع المعاينة\n </span>\n <h3 class=\"text-xl font-black\">المقاسات المعتمدة لتفصيل الستارة</h3>\n <p class=\"text-xs text-indigo-200 mt-1\">تم احتساب أبعاد الستارة تلقائياً بناءً على بيت الستارة، الخلوص الأرضي، وتغطية الشباك.</p>\n </div>\n\n <!-- المقاسين الرئيسيين للستارة -->\n <div class=\"flex items-center gap-6 bg-white/10 px-6 py-3 rounded-xl border border-white/20\">\n <div class=\"text-center\">\n <span class=\"text-xs text-indigo-200 block mb-0.5\">عرض الستارة المقترح:</span>\n <span class=\"text-2xl font-black text-amber-300\" id=\"suggested_curtain_w_badge\">300 سم</span>\n <span class=\"text-[10px] text-indigo-300 block\" id=\"suggested_w_reason\">(كامل عرض بيت الستارة)</span>\n </div>\n <div class=\"border-r border-white/20 h-10\"></div>\n <div class=\"text-center\">\n <span class=\"text-xs text-indigo-200 block mb-0.5\">ارتفاع الستارة المقترح:</span>\n <span class=\"text-2xl font-black text-amber-300\" id=\"suggested_curtain_h_badge\">263 سم</span>\n <span class=\"text-[10px] text-indigo-300 block\" id=\"suggested_h_reason\">(الارتفاع الكلي 280 - سقوط 15 - خلوص 2)</span>\n </div>\n </div>\n\n <!-- زر النقل المباشر للمرحلة التالية -->\n <div>\n <button type=\"button\" onclick=\"transferInspectionToCurtainPricing()\" class=\"bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2 text-sm\">\n <span>➔</span> اعتماد المقاسات والبدء في التسعير واختيار الأقمشة\n </button>\n </div>\n\n </div>\n </div>\n\n </section>\n\n <!-- ======================================================== -->\n <!-- التبويب 1: شاشة لقاء العميل السريعة (شاشة الموبايل والمكتب) -->\n <!-- ======================================================== -->\n <section id=\"tab-meeting\" class=\"tab-content hidden\">\n \n <!-- شريط الخطوتين -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6\">\n <div class=\"flex items-center justify-between\">\n <div class=\"flex items-center space-x-3 space-x-reverse\">\n <button onclick=\"setMeetingStep(1)\" id=\"step-btn-1\" class=\"flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200\">\n <span class=\"w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs\">1</span>\n المرحلة 1: التسعير والأمتار المباشرة\n </button>\n <button onclick=\"setMeetingStep(2)\" id=\"step-btn-2\" class=\"flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-50 border border-transparent\">\n <span class=\"w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs\">2</span>\n المرحلة 2: تفاصيل التشغيل والرسم التوضيحي\n </button>\n </div>\n <div class=\"flex gap-2\">\n <button onclick=\"saveAndGenerateJob()\" class=\"bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition flex items-center gap-1\">\n 💾 حفظ وإصدار أمر التشغيل\n </button>\n </div>\n </div>\n </div>\n\n <!-- محتوى المرحلة 1: التسعير والأمتار -->\n <div id=\"meeting-step-1\">\n <div class=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">\n\n <!-- العمود الأيمن والأوسط: المقاسات والأقمشة والإكسسوار -->\n <div class=\"lg:col-span-2 space-y-6\">\n\n <!-- 1. البيانات الأساسية السريعة -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <h2 class=\"text-base font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2\">\n <span class=\"text-indigo-600\">👤</span> بيانات العميل والغرفة\n </h2>\n <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اسم العميل *</label>\n <input type=\"text\" id=\"client_name\" value=\"م. أحمد عبد الرحمن\" class=\"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none\" placeholder=\"الاسم ثلاثي\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">رقم التليفون *</label>\n <input type=\"tel\" id=\"client_phone\" value=\"01012345678\" class=\"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none\" placeholder=\"010xxxxxxxx\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اسم الغرفة / الشباك</label>\n <input type=\"text\" id=\"room_name\" value=\"غرفة النوم الرئيسية\" class=\"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اسم البائع</label>\n <input type=\"text\" id=\"seller_name\" value=\"محمد علي\" class=\"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none\">\n </div>\n </div>\n </div>\n\n <!-- 2. المقاسات والميل وخصائص السقف -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <h2 class=\"text-base font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2\">\n <span class=\"text-indigo-600\">📐</span> المقاسات وخيارات التثبيت\n </h2>\n \n <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">العرض (سم) *</label>\n <input type=\"number\" id=\"room_width\" value=\"300\" oninput=\"triggerRecalculate()\" class=\"w-full px-3 py-2 border rounded-lg text-lg font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 outline-none\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">الارتفاع (سم) *</label>\n <input type=\"number\" id=\"room_height\" value=\"250\" oninput=\"triggerRecalculate()\" class=\"w-full px-3 py-2 border rounded-lg text-lg font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 outline-none\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">ميل في الارتفاع؟</label>\n <select id=\"has_incline\" onchange=\"toggleInclineFields(); triggerRecalculate();\" class=\"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none\">\n <option value=\"false\">لا يوجد ميل (مستوي)</option>\n <option value=\"true\">يوجد ميل</option>\n </select>\n </div>\n </div>\n\n <!-- حقول الميل إن وجدت -->\n <div id=\"incline_fields\" class=\"hidden grid grid-cols-3 gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200 mb-4 text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-amber-800 mb-1\">ارتفاع يمين (سم)</label>\n <input type=\"number\" id=\"incline_right\" value=\"290\" oninput=\"triggerRecalculate()\" class=\"w-full px-2 py-1.5 border rounded bg-white\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-amber-800 mb-1\">ارتفاع منتصف (سم)</label>\n <input type=\"number\" id=\"incline_center\" value=\"270\" oninput=\"triggerRecalculate()\" class=\"w-full px-2 py-1.5 border rounded bg-white\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-amber-800 mb-1\">ارتفاع يسار (سم)</label>\n <input type=\"number\" id=\"incline_left\" value=\"250\" oninput=\"triggerRecalculate()\" class=\"w-full px-2 py-1.5 border rounded bg-white\">\n </div>\n </div>\n\n <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">التركيب على</label>\n <select id=\"installation_on\" onchange=\"triggerRecalculate()\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"سقف\">سقف</option>\n <option value=\"حائط\">حائط</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">خامة السقف</label>\n <select id=\"ceiling_material\" onchange=\"triggerRecalculate()\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"جبس\">جبس</option>\n <option value=\"خرسانة\">خرسانة</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">شكل السقف</label>\n <select id=\"ceiling_shape\" onchange=\"triggerRecalculate()\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"بيت ستارة\">بيت ستارة</option>\n <option value=\"سقف عادي\">سقف عادي</option>\n <option value=\"كورنيشة\">كورنيشة</option>\n </select>\n </div>\n </div>\n </div>\n\n <!-- 3. طبقات القماش (حتى 5 طبقات) مع الحساب الفوري -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <div class=\"flex items-center justify-between mb-4 border-b pb-2\">\n <h2 class=\"text-base font-bold text-slate-800 flex items-center gap-2\">\n <span class=\"text-indigo-600\">🧵</span> طبقات القماش (المحسوبة تلقائياً)\n </h2>\n <div class=\"flex items-center gap-2\" id=\"layer-tabs\">\n <!-- أزرار الطبقات تضاف هنا -->\n </div>\n </div>\n\n <!-- بطاقة الطبقة النشطة -->\n <div id=\"active-layer-form\" class=\"space-y-4\">\n <div class=\"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">نوع القماش</label>\n <select id=\"layer_fabric_type\" onchange=\"updateCurrentLayer()\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n <option value=\"تقيل\">تقيل</option>\n <option value=\"خفيف\">خفيف</option>\n <option value=\"بلاك\">بلاك</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">الصنف</label>\n <input type=\"text\" id=\"layer_category\" oninput=\"updateCurrentLayer()\" value=\"مخمل قطيفة فاخر\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">الكود</label>\n <input type=\"text\" id=\"layer_code\" oninput=\"updateCurrentLayer()\" value=\"VEL-304\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">نوع التفصيل *</label>\n <select id=\"layer_tailoring_type\" onchange=\"updateCurrentLayer()\" class=\"w-full px-2.5 py-1.5 border rounded-lg font-bold text-indigo-700\">\n <option value=\"ويفي\">ويفي (تموجات متساوية)</option>\n <option value=\"عادي\">عادي (كشكشة علوية)</option>\n <option value=\"كالونات\">كالونات</option>\n <option value=\"حلقات\">حلقات (ماسورة)</option>\n <option value=\"كسرات\">كسرات</option>\n <option value=\"مفرود\">مفرود</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">عرض الرول *</label>\n <select id=\"layer_roll_width\" onchange=\"updateCurrentLayer()\" class=\"w-full px-2.5 py-1.5 border rounded-lg font-bold\">\n <option value=\"عريض\">عريض</option>\n <option value=\"عرض\">عرض (طبيعي)</option>\n <option value=\"قلب ط\">قلب ط</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">زيادة الارتفاع (سم)</label>\n <input type=\"number\" id=\"layer_height_add\" oninput=\"updateCurrentLayer()\" value=\"25\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">نوع الريل</label>\n <select id=\"layer_rail_type\" onchange=\"updateCurrentLayer()\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n <option value=\"عادي\">حسب نوع التفصيل</option>\n <option value=\"ريل كهربائي\">ريل كهربائي (موتور)</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">اللون</label>\n <input type=\"text\" id=\"layer_color\" oninput=\"updateCurrentLayer()\" value=\"تاوبي #a08a76\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">سعر المتر (ج.م)</label>\n <input type=\"number\" id=\"layer_price\" oninput=\"updateCurrentLayer()\" value=\"650\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">سعر التفصيل للمتر (ج.م)</label>\n <input type=\"number\" id=\"layer_tailoring_price\" oninput=\"updateCurrentLayer()\" value=\"60\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">خصم القماش %</label>\n <input type=\"number\" id=\"layer_discount\" oninput=\"updateCurrentLayer()\" value=\"0\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">شكل الستارة</label>\n <select id=\"layer_curtain_shape\" onchange=\"updateCurrentLayer()\" class=\"w-full px-2.5 py-1.5 border rounded-lg\">\n <option value=\"عادية\">عادية</option>\n <option value=\"ملموم\">ملموم (مربوطة بحامل)</option>\n </select>\n </div>\n </div>\n\n <!-- نتيجة الحساب الفوري للطبقة مع سطر المعادلة -->\n <div class=\"bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-indigo-900 flex flex-wrap items-center justify-between text-sm\">\n <div class=\"flex items-center gap-4\">\n <div>\n <span class=\"text-xs text-indigo-600 block\">عدد العروض المحسوب:</span>\n <span class=\"text-base font-extrabold\" id=\"calc_layer_widths\">--</span>\n </div>\n <div class=\"border-r border-indigo-200 pr-4\">\n <span class=\"text-xs text-indigo-600 block\">إجمالي أمتار القماش:</span>\n <span class=\"text-lg font-black text-indigo-700\" id=\"calc_layer_meters\">-- م</span>\n </div>\n <div class=\"border-r border-indigo-200 pr-4\">\n <span class=\"text-xs text-indigo-600 block\">تكلفة القماش والتفصيل:</span>\n <span class=\"text-base font-extrabold text-emerald-700\" id=\"calc_layer_cost\">-- ج.م</span>\n </div>\n </div>\n <div class=\"text-xs text-indigo-700 mt-2 sm:mt-0 font-mono bg-white px-2 py-1 rounded border border-indigo-200\" id=\"calc_layer_formula\">\n --\n </div>\n </div>\n </div>\n </div>\n\n <!-- 4. جدول الإكسسوارات المحسوبة تلقائياً مع إمكانية التعديل -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <div class=\"flex items-center justify-between mb-3 border-b pb-2\">\n <h2 class=\"text-base font-bold text-slate-800 flex items-center gap-2\">\n <span class=\"text-indigo-600\">🔩</span> جدول الإكسسوارات (مولد تلقائياً حسب القواعد)\n </h2>\n <button onclick=\"addManualAccessory()\" class=\"text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded border font-semibold\">\n + إضافة بند يدوي\n </button>\n </div>\n <div class=\"overflow-x-auto\">\n <table class=\"w-full text-sm text-right\">\n <thead>\n <tr class=\"bg-slate-100 text-slate-700 text-xs\">\n <th class=\"p-2\">البند</th>\n <th class=\"p-2\">الكود</th>\n <th class=\"p-2\">الكمية</th>\n <th class=\"p-2\">الوحدة</th>\n <th class=\"p-2\">سعر الوحدة</th>\n <th class=\"p-2\">الإجمالي</th>\n <th class=\"p-2 text-center\">النوع</th>\n </tr>\n </thead>\n <tbody id=\"accessories-table-body\" class=\"divide-y divide-slate-100\">\n <!-- تعبأ ديناميكياً -->\n </tbody>\n </table>\n </div>\n </div>\n\n </div>\n\n <!-- العمود الأيسر: إرشادات بيت الستارة والملخص الحي الثابت -->\n <div class=\"space-y-6\">\n\n <!-- مؤشر إرشادات بيت الستارة (Section 8.4) -->\n <div id=\"pocket-box\" class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <h3 class=\"text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2\">\n <span>📏</span> كفاية عمق وارتفاع بيت الستارة\n </h3>\n <div class=\"space-y-3 text-xs\">\n <div class=\"grid grid-cols-2 gap-2\">\n <div>\n <label class=\"block text-slate-500 mb-1\">العمق الفعلي (سم)</label>\n <input type=\"number\" id=\"pocket_depth\" value=\"25\" oninput=\"triggerRecalculate()\" class=\"w-full px-2 py-1 border rounded font-bold\">\n </div>\n <div>\n <label class=\"block text-slate-500 mb-1\">الارتفاع الفعلي (سم)</label>\n <input type=\"number\" id=\"pocket_height\" value=\"15\" oninput=\"triggerRecalculate()\" class=\"w-full px-2 py-1 border rounded font-bold\">\n </div>\n </div>\n\n <div class=\"p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2\">\n <div class=\"flex justify-between items-center\">\n <span class=\"text-slate-600\">حالة العمق للطبقات:</span>\n <span id=\"pocket_status_badge\" class=\"px-2 py-0.5 rounded font-bold text-xs bg-emerald-100 text-emerald-800\">\n كاف ✓\n </span>\n </div>\n <div class=\"text-[11px] text-slate-500\" id=\"pocket_details_text\">\n العمق المطلوب للطبقات: 18 - 22 سم\n </div>\n <div class=\"border-t pt-2 flex justify-between items-center\">\n <span class=\"text-slate-600\">شريط الستارة:</span>\n <span id=\"tape_visibility_badge\" class=\"font-bold text-indigo-700\">\n مخفي داخل البيت\n </span>\n </div>\n </div>\n </div>\n </div>\n\n <!-- ملخص الفاتورة الحي الدائم -->\n <div class=\"bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-lg p-5 sticky top-20\">\n <h3 class=\"text-base font-extrabold mb-3 flex items-center justify-between border-b border-indigo-700 pb-2\">\n <span>ملخص التكلفة الحية</span>\n <span class=\"text-xs bg-indigo-700 px-2 py-0.5 rounded text-indigo-200\">فوري</span>\n </h3>\n \n <div class=\"space-y-2 text-sm text-indigo-100\">\n <div class=\"flex justify-between\">\n <span>إجمالي القماش:</span>\n <span id=\"live_fabric_total\" class=\"font-bold text-white\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between\">\n <span>إجمالي التفصيل:</span>\n <span id=\"live_tailoring_total\" class=\"font-bold text-white\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between\">\n <span>إجمالي الإكسسوار:</span>\n <span id=\"live_acc_total\" class=\"font-bold text-white\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between\">\n <span>إجمالي العقادة:</span>\n <span id=\"live_tassel_total\" class=\"font-bold text-white\">0 ج.م</span>\n </div>\n \n <div class=\"border-t border-indigo-700 pt-2 flex justify-between text-base font-bold text-amber-300\">\n <span>إجمالي الغرفة:</span>\n <span id=\"live_room_total\">0 ج.م</span>\n </div>\n </div>\n\n <!-- أزرار الإجراء السريع -->\n <div class=\"mt-5 space-y-2\">\n <button onclick=\"setMeetingStep(2)\" class=\"w-full bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold py-2 rounded-lg text-sm shadow transition\">\n التالي: تفاصيل التشغيل والرسم ➔\n </button>\n <button onclick=\"saveAndGenerateJob()\" class=\"w-full bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg text-sm shadow transition\">\n 💾 حفظ وإصدار أمر التشغيل A4\n </button>\n </div>\n </div>\n\n </div>\n\n </div>\n </div>\n\n <!-- محتوى المرحلة 2: تفاصيل التشغيل والرسم التوضيحي -->\n <div id=\"meeting-step-2\" class=\"hidden\">\n <div class=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n\n <!-- مساحة الرسم التوضيحي للموديل (Canvas) مطابق للورقة -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5\">\n <div class=\"flex items-center justify-between mb-3 border-b pb-2\">\n <h2 class=\"text-base font-bold text-slate-800 flex items-center gap-2\">\n <span>🎨</span> رسم توضيحي للموديل (ارسم بالماوس أو القلم)\n </h2>\n <div class=\"flex gap-2\">\n <button onclick=\"clearCanvas()\" class=\"text-xs bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1 rounded border border-rose-200 font-semibold\">\n مسح اللوحة\n </button>\n </div>\n </div>\n \n <p class=\"text-xs text-slate-500 mb-2\">ارسم شكل الموديل أو تقسيمات الطبقات، وستظهر تلقائياً في خانة الرسم بأمر التشغيل المطبوع A4.</p>\n \n <div class=\"relative\">\n <canvas id=\"sketchCanvas\" width=\"500\" height=\"320\" class=\"w-full h-72 border bg-white rounded-lg\"></canvas>\n </div>\n </div>\n\n <!-- تفاصيل التشغيل الإضافية -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4\">\n <h2 class=\"text-base font-bold text-slate-800 flex items-center gap-2 border-b pb-2\">\n <span>⚙️</span> خيارات التشغيل للمصنع\n </h2>\n\n <div class=\"grid grid-cols-2 gap-4 text-sm\">\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">نوع فتح الشباك</label>\n <select id=\"window_open_type\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"جرار\">جرار</option>\n <option value=\"مفصلي\">مفصلي</option>\n <option value=\"ثابت\">ثابت</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">تاريخ التسليم المتوقع</label>\n <input type=\"date\" id=\"expected_delivery\" class=\"w-full px-3 py-2 border rounded-lg\">\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">نوع أمر التشغيل</label>\n <select id=\"order_type\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"جديد\">جديد</option>\n <option value=\"استكمال\">استكمال</option>\n <option value=\"تعديل\">تعديل</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">مرحلة العمل</label>\n <select id=\"work_stage\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"تركيب\">تركيب</option>\n <option value=\"تسليم\">تسليم</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">البلتكالة (النوع)</label>\n <select id=\"pelmet_type\" class=\"w-full px-3 py-2 border rounded-lg\">\n <option value=\"تشييد بوكس\">تشييد بوكس</option>\n <option value=\"اويبة\">اويبة</option>\n <option value=\"استنلس\">استنلس</option>\n </select>\n </div>\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">أمتار البلتكالة</label>\n <input type=\"number\" id=\"pelmet_meters\" value=\"3.2\" step=\"0.1\" class=\"w-full px-3 py-2 border rounded-lg\">\n </div>\n </div>\n\n <div>\n <label class=\"block text-xs font-semibold text-slate-600 mb-1\">ملاحظات المكتب الفني</label>\n <textarea id=\"technical_notes\" rows=\"4\" class=\"w-full px-3 py-2 border rounded-lg text-sm\" placeholder=\"أي تعليمات خاصة للمصنع والفنيين...\"></textarea>\n </div>\n\n <div class=\"flex gap-3 pt-3\">\n <button onclick=\"setMeetingStep(1)\" class=\"w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold\">\n ⬅ العودة للتسعير\n </button>\n <button onclick=\"saveAndGenerateJob()\" class=\"w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-sm shadow\">\n 💾 حفظ وتوليد أمر التشغيل للطباعة\n </button>\n </div>\n </div>\n\n </div>\n </div>\n\n </section>\n\n <!-- ======================================================== -->\n <!-- التبويب 2: أمر التشغيل المطبوع A4 (مطابق للورقة تماماً!) -->\n <!-- ======================================================== -->\n <section id=\"tab-jobSheet\" class=\"tab-content hidden\">\n \n <!-- شريط تحكم الطباعة -->\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex items-center justify-between no-print\">\n <div class=\"flex items-center gap-2\">\n <span class=\"text-xl\">🖨️</span>\n <div>\n <h2 class=\"font-bold text-slate-800\">أمر تشغيل مصنع الستائر (ورقة A4)</h2>\n <p class=\"text-xs text-slate-500\">تم تصميم هذا النموذج ليتطابق مع الورقة المعتمدة للمصنع بنسبة 100% وبدون إظهار الأسعار.</p>\n </div>\n </div>\n <div class=\"flex gap-2\">\n <button onclick=\"window.print()\" class=\"bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-lg text-sm shadow flex items-center gap-2\">\n <span>🖨️</span> طباعة أمر التشغيل A4\n </button>\n </div>\n </div>\n\n <!-- الورقة المطبوعة (A4 Container) -->\n <div class=\"page-a4 factory-sheet max-w-4xl mx-auto bg-white shadow-xl p-8 border-2 border-slate-900 rounded-lg\">\n \n <!-- رأسية أمر التشغيل (طابق الورقة الأصلية) -->\n <div class=\"flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-3\">\n \n <!-- خانات الحالة يسار -->\n <div class=\"text-xs font-bold space-y-1 w-28\">\n <label class=\"flex items-center gap-1.5\"><input type=\"checkbox\" id=\"sheet_chk_new\" checked> جديد</label>\n <label class=\"flex items-center gap-1.5\"><input type=\"checkbox\" id=\"sheet_chk_complete\"> استكمال</label>\n <label class=\"flex items-center gap-1.5\"><input type=\"checkbox\" id=\"sheet_chk_edit\"> تعديل</label>\n </div>\n\n <!-- العنوان في المنتصف داخل إطار بيضاوي -->\n <div class=\"text-center\">\n <div class=\"sheet-box-title\">\n أمر تشغيل مصنع الستائر\n </div>\n <div class=\"text-xs text-slate-600 font-mono mt-1\" id=\"sheet_check_number\">رقم الشيك: CHK-9041</div>\n </div>\n\n <!-- خانات التركيب وشباك رقم -->\n <div class=\"flex gap-4\">\n <div class=\"text-xs font-bold space-y-1\">\n <label class=\"flex items-center gap-1.5\"><input type=\"checkbox\" id=\"sheet_chk_install\" checked> تركيب</label>\n <label class=\"flex items-center gap-1.5\"><input type=\"checkbox\" id=\"sheet_chk_deliver\"> تسليم</label>\n </div>\n <div class=\"border-2 border-slate-900 rounded p-1 text-center w-20\">\n <span class=\"text-[10px] font-bold block border-b border-slate-900\">شباك رقم</span>\n <span class=\"text-sm font-black\" id=\"sheet_window_num\">1</span>\n </div>\n </div>\n\n </div>\n\n <!-- بيانات العميل والتسليم (سطور منقطة مطابقة للورقة) -->\n <div class=\"grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs mb-3 border-b pb-3\">\n <div class=\"flex\"><span class=\"font-bold w-20\">التاريخ:</span> <span id=\"sheet_date\" class=\"border-b border-dotted border-slate-700 flex-1\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">اسم الفرع:</span> <span id=\"sheet_branch\" class=\"border-b border-dotted border-slate-700 flex-1\">فرع المعادي</span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">اسم العميل:</span> <span id=\"sheet_client_name\" class=\"border-b border-dotted border-slate-700 flex-1 font-bold\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">اسم البائع:</span> <span id=\"sheet_seller_name\" class=\"border-b border-dotted border-slate-700 flex-1\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">رقم التليفون:</span> <span id=\"sheet_client_phone\" class=\"border-b border-dotted border-slate-700 flex-1 font-mono\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">تاريخ التسليم:</span> <span id=\"sheet_due_date\" class=\"border-b border-dotted border-slate-700 flex-1 font-bold\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">اسم الغرفة:</span> <span id=\"sheet_room_name\" class=\"border-b border-dotted border-slate-700 flex-1\"></span></div>\n <div class=\"flex\"><span class=\"font-bold w-20\">الموقع:</span> <span id=\"sheet_location\" class=\"border-b border-dotted border-slate-700 flex-1\">التجمع الخامس - كمبوند ميفيدا</span></div>\n </div>\n\n <!-- الرسم التوضيحي للموديل + المقاسات والخيارات -->\n <div class=\"grid grid-cols-2 gap-3 mb-3\">\n <!-- مربع الرسم التوضيحي -->\n <div class=\"border-2 border-slate-900 rounded p-2 text-center h-44 flex flex-col justify-between\">\n <span class=\"text-xs font-bold block text-right border-b pb-1\">رسم توضيحي للموديل:</span>\n <div class=\"flex-1 flex items-center justify-center overflow-hidden\">\n <img id=\"sheet_sketch_img\" src=\"\" class=\"max-h-36 max-w-full object-contain hidden\" alt=\"رسم الموديل\">\n <span id=\"sheet_no_sketch_text\" class=\"text-xs text-slate-400\">لا يوجد رسم توضيحي مدخل</span>\n </div>\n </div>\n\n <!-- المقاسات والديكور والقناع -->\n <div class=\"border-2 border-slate-900 rounded p-2 text-xs flex flex-col justify-between\">\n <div class=\"grid grid-cols-2 gap-2 text-center\">\n <div class=\"border border-slate-700 rounded p-1 bg-slate-50\">\n <span class=\"block text-[11px] font-bold\">العرض</span>\n <span id=\"sheet_width\" class=\"text-base font-black\">300 سم</span>\n </div>\n <div class=\"border border-slate-700 rounded p-1 bg-slate-50\">\n <span class=\"block text-[11px] font-bold\">الارتفاع</span>\n <span id=\"sheet_height\" class=\"text-base font-black\">250 سم</span>\n </div>\n </div>\n\n <div class=\"mt-2 space-y-1\">\n <div class=\"flex items-center justify-between border-b pb-1\">\n <span class=\"font-bold\">نوع القناع:</span>\n <span class=\"flex gap-2 text-[11px]\">\n <label><input type=\"radio\" name=\"sheet_mask\" id=\"mask_hinge\"> مفصلي</label>\n <label><input type=\"radio\" name=\"sheet_mask\" id=\"mask_slide\" checked> جرار</label>\n <label><input type=\"radio\" name=\"sheet_mask\" id=\"mask_fixed\"> ثابت</label>\n </span>\n </div>\n <div class=\"flex items-center justify-between pt-1\">\n <span class=\"font-bold\">الديكور:</span>\n <span class=\"flex gap-2 text-[11px]\">\n <label><input type=\"radio\" name=\"sheet_decor\" id=\"decor_box\" checked> بيت ستارة</label>\n <label><input type=\"radio\" name=\"sheet_decor\" id=\"decor_cornice\"> كورنيشة</label>\n <label><input type=\"radio\" name=\"sheet_decor\" id=\"decor_regular\"> سقف عادي</label>\n </span>\n </div>\n </div>\n </div>\n </div>\n\n <!-- جدول القماش (مطابق تماماً للورقة: بدون أسعار) -->\n <div class=\"mb-3\">\n <div class=\"text-xs font-bold mb-1\">القماش:</div>\n <table class=\"sheet-table\">\n <thead>\n <tr>\n <th class=\"w-16\">نوع القماش</th>\n <th class=\"w-16\">الكود</th>\n <th>الصنف</th>\n <th class=\"w-14\">الأمتار</th>\n <th class=\"w-16\">عدد العروض</th>\n <th class=\"w-20\">نوع التقصيص</th>\n <th class=\"w-20\">تطريز / أزرار</th>\n <th class=\"w-14\">تهديل</th>\n </tr>\n </thead>\n <tbody id=\"sheet_fabric_rows\">\n <!-- تعبأ ديناميكياً -->\n </tbody>\n </table>\n </div>\n\n <!-- جدول الإكسسوار (الأعمدة من الورقة الأصلية) -->\n <div class=\"mb-3\">\n <div class=\"text-xs font-bold mb-1\">الإكسسوار:</div>\n <table class=\"sheet-table text-[11px]\">\n <thead>\n <tr>\n <th>البند</th>\n <th>طنب</th>\n <th>رول</th>\n <th>قانوني رول</th>\n <th>شماطة</th>\n <th>ماسورة</th>\n <th>قضبان/ريل</th>\n <th>نهاية</th>\n <th>طبة</th>\n <th>فلانشة</th>\n <th>مسامير خابور</th>\n </tr>\n </thead>\n <tbody>\n <tr>\n <td class=\"font-bold bg-slate-100\">الكود</td>\n <td id=\"acc_code_tanab\">-</td>\n <td id=\"acc_code_roll\">-</td>\n <td id=\"acc_code_qanun\">-</td>\n <td id=\"acc_code_shamat\">-</td>\n <td id=\"acc_code_pipe\">-</td>\n <td id=\"acc_code_rail\">ويفي</td>\n <td id=\"acc_code_end\">-</td>\n <td id=\"acc_code_plug\">-</td>\n <td id=\"acc_code_flange\">-</td>\n <td id=\"acc_code_screws\">-</td>\n </tr>\n <tr>\n <td class=\"font-bold bg-slate-100\">العدد / متر</td>\n <td id=\"acc_qty_tanab\">-</td>\n <td id=\"acc_qty_roll\">-</td>\n <td id=\"acc_qty_qanun\">-</td>\n <td id=\"acc_qty_shamat\">2</td>\n <td id=\"acc_qty_pipe\">-</td>\n <td id=\"acc_qty_rail\" class=\"font-bold\">3 م</td>\n <td id=\"acc_qty_end\">-</td>\n <td id=\"acc_qty_plug\">-</td>\n <td id=\"acc_qty_flange\">-</td>\n <td id=\"acc_qty_screws\">6</td>\n </tr>\n </tbody>\n </table>\n </div>\n\n <!-- البلتكالة والحواشي وملاحظات المكتب الفني -->\n <div class=\"grid grid-cols-2 gap-3 mb-3 text-xs\">\n <!-- ملاحظات المكتب الفني -->\n <div class=\"border border-slate-900 rounded p-2\">\n <span class=\"font-bold block border-b pb-1 mb-1\">ملاحظات المكتب الفني:</span>\n <p id=\"sheet_technical_notes\" class=\"text-[11px] text-slate-700 min-h-12 leading-relaxed\">\n يراعى تركيب محول الريل الكهربائي بجوار فتحة الكهرباء اليمنى، وترك مسافة 5 سم للتهوية.\n </p>\n </div>\n\n <!-- البلتكالة والحواشي -->\n <div class=\"border border-slate-900 rounded p-2 space-y-2\">\n <div class=\"flex items-center justify-between border-b pb-1\">\n <span class=\"font-bold\">نوع البلتكالة:</span>\n <span class=\"flex gap-2 text-[11px]\">\n <label><input type=\"radio\" name=\"sheet_pelmet\" id=\"pel_box\" checked> تنجيد بوكس</label>\n <label><input type=\"radio\" name=\"sheet_pelmet\" id=\"pel_weba\"> اويبة</label>\n <label><input type=\"radio\" name=\"sheet_pelmet\" id=\"pel_steel\"> استانلس</label>\n </span>\n </div>\n <div class=\"flex items-center justify-between\">\n <span class=\"font-bold\">المتر:</span>\n <span id=\"sheet_pelmet_m\" class=\"font-bold\">3.2 م</span>\n </div>\n \n <!-- جدول العقادة / الحواشي -->\n <table class=\"sheet-table text-[10px] mt-1\">\n <thead>\n <tr>\n <th>البند</th>\n <th>فرنشة</th>\n <th>شرابة أم جنب</th>\n <th>شرابة ديكور</th>\n <th>حزام</th>\n </tr>\n </thead>\n <tbody>\n <tr>\n <td class=\"font-bold\">العدد</td>\n <td id=\"tassel_fringe\">-</td>\n <td id=\"tassel_side\">-</td>\n <td id=\"tassel_decor\">2</td>\n <td id=\"tassel_belt\">2</td>\n </tr>\n </tbody>\n </table>\n </div>\n </div>\n\n <!-- التوقيعات الثلاثة مطابقة للورقة الأصلية -->\n <div class=\"grid grid-cols-3 gap-4 pt-4 border-t-2 border-slate-900 text-center text-xs\">\n <div>\n <span class=\"font-bold block mb-6\">توقيع البائع</span>\n <div class=\"border-b border-dashed border-slate-600 w-3/4 mx-auto\"></div>\n </div>\n <div>\n <span class=\"font-bold block mb-6\">توقيع العميل</span>\n <div class=\"border-b border-dashed border-slate-600 w-3/4 mx-auto\"></div>\n </div>\n <div>\n <span class=\"font-bold block mb-6\">توقيع مدير التشغيل</span>\n <div class=\"border-b border-dashed border-slate-600 w-3/4 mx-auto\"></div>\n </div>\n </div>\n\n </div>\n\n </section>\n\n <!-- ======================================================== -->\n <!-- التبويب 3: عرض السعر المعتمد (Quotation) -->\n <!-- ======================================================== -->\n <section id=\"tab-quoteSheet\" class=\"tab-content hidden\">\n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex items-center justify-between no-print\">\n <div class=\"flex items-center gap-2\">\n <span class=\"text-xl\">💰</span>\n <div>\n <h2 class=\"font-bold text-slate-800\">عرض سعر الستائر والمستلزمات</h2>\n <p class=\"text-xs text-slate-500\">مستند تسعير رسمي مفصل بالغرف ومشتمل على البنود والخدمات والدفعات.</p>\n </div>\n </div>\n <button onclick=\"window.print()\" class=\"bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-lg text-sm shadow\">\n 🖨️ طباعة عرض السعر\n </button>\n </div>\n\n <div class=\"page-a4 max-w-4xl mx-auto bg-white shadow-xl p-8 border border-slate-200 rounded-lg\">\n <!-- ترويسة العرض -->\n <div class=\"flex justify-between items-center border-b pb-4 mb-4\">\n <div>\n <h1 class=\"text-2xl font-black text-indigo-950\">عرض سعر ستائر مفصلة</h1>\n <p class=\"text-xs text-slate-500 mt-1\" id=\"quote_full_num\">رقم العرض: S000102</p>\n </div>\n <div class=\"text-left text-xs space-y-1\">\n <div><span class=\"text-slate-500\">التاريخ:</span> <span id=\"quote_date\" class=\"font-bold\"></span></div>\n <div><span class=\"text-slate-500\">صلاحية العرض:</span> <span class=\"font-bold\">7 أيام</span></div>\n </div>\n </div>\n\n <!-- جدول تفاصيل الغرف والبنود -->\n <div id=\"quote_rooms_container\" class=\"space-y-4 mb-6\">\n <!-- يملأ ديناميكياً -->\n </div>\n\n <!-- الإجماليات وشروط الدفع -->\n <div class=\"grid grid-cols-2 gap-6 pt-4 border-t\">\n <div class=\"text-xs space-y-2 text-slate-600\">\n <h4 class=\"font-bold text-slate-800\">شروط وأحكام العرض:</h4>\n <p>• يبدأ التصنيع فور تحصيل دفعة المقدم وتأكيد المقاسات النهائية.</p>\n <p>• مدة التوريد والتركيب 14 يوماً من تاريخ استلام المقدم.</p>\n <p>• شروط الدفع: 50% مقدم عند التعاقد، والباقي عند إتمام التركيب والتسليم.</p>\n </div>\n\n <div class=\"bg-slate-50 p-4 rounded-lg border text-sm space-y-2\">\n <div class=\"flex justify-between\">\n <span>إجمالي البنود:</span>\n <span id=\"quote_items_total\" class=\"font-bold\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between text-rose-600\">\n <span>الخصم الإضافي:</span>\n <span id=\"quote_discount_val\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between text-indigo-700\">\n <span>الخدمات (شحن وتركيب ومعاينة):</span>\n <span id=\"quote_services_total\">0 ج.م</span>\n </div>\n <div class=\"border-t pt-2 flex justify-between text-base font-black text-slate-900\">\n <span>الصافي النهائي:</span>\n <span id=\"quote_net_total\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between text-emerald-700 font-bold\">\n <span>المقدم المدفوع:</span>\n <span id=\"quote_advance_val\">0 ج.م</span>\n </div>\n <div class=\"flex justify-between text-slate-700 font-bold border-t pt-1\">\n <span>المتبقي عند التسليم:</span>\n <span id=\"quote_remaining_val\">0 ج.م</span>\n </div>\n </div>\n </div>\n </div>\n </section>\n\n <!-- ======================================================== -->\n <!-- التبويب 4: مراحل المبيعات والمهام (CRM Pipeline) -->\n <!-- ======================================================== -->\n <section id=\"tab-crm\" class=\"tab-content hidden\">\n <div class=\"flex justify-between items-center mb-6\">\n <div>\n <h2 class=\"text-xl font-bold text-slate-800\">متابعة الفرص والمبيعات (CRM)</h2>\n <p class=\"text-xs text-slate-500\">إدارة دورة العميل من الفرصة وحتى التسليم والفيد باك وفق وثيقة التحليل.</p>\n </div>\n </div>\n\n <!-- بطاقات مهام اليوم (Today's Tasks - Section 6) -->\n <div class=\"grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6\">\n <div class=\"bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-900\">\n <span class=\"text-xs font-bold block mb-1\">⚠️ مهام متأخرة</span>\n <span class=\"text-2xl font-black\" id=\"count_overdue\">0</span>\n </div>\n <div class=\"bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900\">\n <span class=\"text-xs font-bold block mb-1\">📅 مهام اليوم</span>\n <span class=\"text-2xl font-black\" id=\"count_today\">0</span>\n </div>\n <div class=\"bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900\">\n <span class=\"text-xs font-bold block mb-1\">❓ بدون موعد متابعة</span>\n <span class=\"text-2xl font-black\" id=\"count_no_followup\">0</span>\n </div>\n <div class=\"bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900\">\n <span class=\"text-xs font-bold block mb-1\">⭐ فيد باك مطلوب</span>\n <span class=\"text-2xl font-black\" id=\"count_feedback\">0</span>\n </div>\n </div>\n\n <!-- مسار الفرص الكانبان -->\n <div class=\"flex gap-4 overflow-x-auto pb-4\" id=\"crm_pipeline_lanes\">\n <!-- تملأ ديناميكياً بأعمدة المراحل -->\n </div>\n </section>\n\n <!-- ======================================================== -->\n <!-- التبويب 5: مركز التكامل والربط مع أودو (Odoo APIs Hub) -->\n <!-- ======================================================== -->\n <section id=\"tab-odoo\" class=\"tab-content hidden space-y-6\">\n \n <div class=\"bg-white rounded-xl shadow-sm border border-slate-200 p-6\">\n <div class=\"flex items-center justify-between border-b pb-4 mb-4\">\n <div>\n <h2 class=\"text-lg font-bold text-slate-900 flex items-center gap-2\">\n <span class=\"text-2xl\">🔌</span> مركز الربط والتكامل البرمجي مع أودو (Odoo REST & XML-RPC)\n </h2>\n <p class=\"text-xs text-slate-500\">\n جميع أوامر التشغيل وعروض الأسعار والعملاء مهيأة بحمولات JSON مطابقة لهياكل أودو 17 / 18.\n </p>\n </div>\n <span class=\"text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300\">\n OpenAPI 3.0 Ready\n </span>\n </div>\n\n <div class=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n\n <!-- الكود الجاهز لبايثون وأودو -->\n <div class=\"space-y-4\">\n <h3 class=\"text-sm font-bold text-slate-800 flex items-center justify-between\">\n <span>كود بايثون للربط المباشر مع أودو (XML-RPC):</span>\n <button onclick=\"copyPythonCode()\" class=\"text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-1 rounded border border-indigo-200 font-semibold\">\n 📋 نسخ الكود\n </button>\n </h3>\n <pre class=\"bg-slate-900 text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto h-72\" id=\"python_code_box\">\n# كود ربط أودو مع تطبيق مصنع الستائر\nimport xmlrpc.client\nimport urllib.request\nimport json\n\nODOO_URL = 'http://localhost:8069'\nODOO_DB = 'curtain_factory_db'\nODOO_USER = 'admin'\nODOO_PASSWORD = 'admin_password'\n\nCURTAIN_APP_URL = 'http://localhost:3000'\n\n# 1. جلب بيانات أمر التشغيل المهيأ لأودو\nreq = urllib.request.urlopen(f\"{CURTAIN_APP_URL}/api/v1/odoo/payload/job/1\")\njob_payload = json.loads(req.read().decode('utf-8'))['payload']\n\n# 2. تسجيل الدخول في أودو\ncommon = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')\nuid = common.authenticate(ODOO_DB, ODOO_USER, ODOO_PASSWORD, {})\nmodels = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/object')\n\n# 3. إنشاء السجل داخل موديول curtain.job\njob_id = models.execute_kw(\n ODOO_DB, uid, ODOO_PASSWORD,\n 'curtain.job', 'create',\n [job_payload['values']]\n)\nprint(f\"تم ربط السجل بنجاح في أودو برقم: {job_id}\")\n </pre>\n </div>\n\n <!-- تجربة استدعاء الـ API الحي للحصول على كائن أودو -->\n <div class=\"space-y-4\">\n <h3 class=\"text-sm font-bold text-slate-800 flex items-center justify-between\">\n <span>حمولة أمر التشغيل المتوافقة مع أودو (Live JSON Payload):</span>\n <button onclick=\"fetchOdooPayload()\" class=\"text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-1 rounded border font-semibold\">\n 🔄 تحديث الحمولة\n </button>\n </h3>\n <pre class=\"bg-slate-900 text-amber-300 p-4 rounded-lg text-xs font-mono overflow-x-auto h-72\" id=\"odoo_payload_box\">\nجاري جلب الحمولة الحية...\n </pre>\n </div>\n\n </div>\n\n <!-- قائمة روابط APIs المتاحة للتكامل -->\n <div class=\"mt-6 border-t pt-4\">\n <h3 class=\"text-sm font-bold text-slate-800 mb-3\">نقاط الوصول البرمجية المتاحة (REST Endpoints):</h3>\n <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono\">\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-emerald-700 font-bold\">GET</span> /api/v1/customers</div>\n <span class=\"text-slate-500 font-sans\">قائمة العملاء مع كشف التكرار</span>\n </div>\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-indigo-700 font-bold\">POST</span> /api/v1/calculate</div>\n <span class=\"text-slate-500 font-sans\">محرك الحسابات الفوري للستائر</span>\n </div>\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-emerald-700 font-bold\">GET</span> /api/v1/jobs/:id</div>\n <span class=\"text-slate-500 font-sans\">أمر التشغيل بكامل تفاصيله</span>\n </div>\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-amber-700 font-bold\">GET</span> /api/v1/odoo/payload/job/:id</div>\n <span class=\"text-slate-500 font-sans\">حمولة أودو جاهزة لـ curtain.job</span>\n </div>\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-amber-700 font-bold\">GET</span> /api/v1/odoo/payload/sale-order/:id</div>\n <span class=\"text-slate-500 font-sans\">حمولة أودو جاهزة لـ sale.order</span>\n </div>\n <div class=\"p-2.5 bg-slate-50 border rounded flex items-center justify-between\">\n <div><span class=\"text-blue-700 font-bold\">GET</span> /api/v1/backup/json</div>\n <span class=\"text-slate-500 font-sans\">تصدير قاعدة البيانات (القسم 13)</span>\n </div>\n </div>\n </div>\n\n </div>\n\n </section>\n\n </main>\n\n <script>
function parseArabicNumber(val) {
if (val === null || val === undefined || val === '') return 0;
if (typeof val === 'number') return val;
const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
let str = String(val).trim();
for (let i = 0; i < 10; i++) {
str = str.replace(new RegExp(arabicDigits[i], 'g'), i.toString());
}
str = str.replace(/[،٫]/g, '.');
const num = parseFloat(str);
return isNaN(num) ? 0 : num;
}
function normalizePhone(phone) {
if (!phone) return '';
let str = String(phone).trim();
const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
for (let i = 0; i < 10; i++) {
str = str.replace(new RegExp(arabicDigits[i], 'g'), i.toString());
}
return str.replace(/\D/g, '');
}
function q25(x) {
return (Math.round(x / 25) * 25) / 100;
}
function getEffectiveHeight(room) {
const baseH = parseArabicNumber(room.height);
if (room.has_incline) {
const hr = parseArabicNumber(room.incline_right || 0);
const hc = parseArabicNumber(room.incline_center || 0);
const hl = parseArabicNumber(room.incline_left || 0);
return Math.max(baseH, hr, hc, hl);
}
return baseH;
}
function calculateLayerMeters(width, effectiveHeight, layer) {
const W = parseArabicNumber(width);
const H = effectiveHeight;
const add = layer.height_addition !== undefined && layer.height_addition !== null && layer.height_addition !== ''
? parseArabicNumber(layer.height_addition)
: 25;
const H_add = H + add;
const q25_H_add = q25(H_add);
const tailoring = (layer.tailoring_type || 'عادي').trim();
const rollWidth = (layer.roll_width || 'عرض').trim();
let n = 0;
let meters = 0;
let formulaStr = '';
const isWefeGroup = ['ويفي', 'كالونات', 'كسرات', 'حلقات'].includes(tailoring);
if (isWefeGroup) {
if (rollWidth === 'عريض') {
meters = q25(W * 3);
n = 1;
formulaStr = `q25(${W} × 3) / 100 = ${meters} م`;
} else if (rollWidth === 'عرض') {
n = Math.ceil(W / 50);
meters = n * q25_H_add;
formulaStr = `ceil(${W}/50) = ${n} عروض × q25(${H}+${add}) = ${meters} م`;
} else if (rollWidth === 'قلب ط') {
n = Math.ceil(W / 90);
meters = n * q25_H_add;
formulaStr = `ceil(${W}/90) = ${n} عروض × q25(${H}+${add}) = ${meters} م`;
}
} else if (tailoring === 'عادي') {
if (rollWidth === 'عريض') {
meters = q25(W * 2);
n = 1;
formulaStr = `q25(${W} × 2) / 100 = ${meters} م`;
} else if (rollWidth === 'عرض') {
n = Math.ceil(W / 70);
meters = n * q25_H_add;
formulaStr = `ceil(${W}/70) = ${n} عروض × q25(${H}+${add}) = ${meters} م`;
} else if (rollWidth === 'قلب ط') {
n = Math.ceil(W / 140);
meters = n * q25_H_add;
formulaStr = `ceil(${W}/140) = ${n} عروض × q25(${H}+${add}) = ${meters} م`;
}
} else if (tailoring === 'مفرود') {
if (rollWidth === 'عريض') {
meters = (W + 75) / 100;
n = 1;
formulaStr = `(${W} + 75) / 100 = ${meters} م`;
} else if (rollWidth === 'قلب ط') {
n = Math.ceil((W + 50) / 280);
meters = n * q25_H_add;
formulaStr = `ceil((${W}+50)/280) = ${n} عروض × q25(${H}+${add}) = ${meters} م`;
} else if (rollWidth === 'عرض') {
meters = 0;
n = 0;
formulaStr = 'لا توجد معادلة للمفرود بعرض قماش عادي';
}
}
meters = Math.round(meters * 100) / 100;
return { number_of_widths: n, meters, height_used: H, height_addition: add, formula: formulaStr };
}
function calculateRoomAccessories(room) {
const W = parseArabicNumber(room.width);
const layers = room.layers || [];
const W_meters = W / 100;
const accessories = [];
const wefeLayers = layers.filter(l => (l.tailoring_type || '').trim() === 'ويفي' && l.rail_type !== 'ريل كهربائي');
const normalRailLayers = layers.filter(l => ['عادي', 'كالونات', 'كسرات', 'مفرود'].includes((l.tailoring_type || '').trim()) && l.rail_type !== 'ريل كهربائي');
const ringLayers = layers.filter(l => (l.tailoring_type || '').trim() === 'حلقات');
const electricLayers = layers.filter(l => l.rail_type === 'ريل كهربائي');
if (wefeLayers.length > 0) {
const count = wefeLayers.length;
accessories.push({ item: 'ريل', code: 'ويفي', quantity_display: count > 1 ? `${W_meters}×${count}` : `${W_meters} م`, quantity: W_meters * count, unit: 'متر', unit_price: 180, is_auto: true });
}
if (normalRailLayers.length > 0) {
const count = normalRailLayers.length;
accessories.push({ item: 'ريل عادي', code: 'عادي', quantity_display: count > 1 ? `${W_meters}×${count}` : `${W_meters} م`, quantity: W_meters * count, unit: 'متر', unit_price: 120, is_auto: true });
}
if (ringLayers.length > 0) {
const count = ringLayers.length;
accessories.push({ item: 'ماسورة', code: 'ماسورة', quantity_display: count > 1 ? `${W_meters}×${count}` : `${W_meters} م`, quantity: W_meters * count, unit: 'متر', unit_price: 220, is_auto: true });
}
if (electricLayers.length > 0) {
const count = electricLayers.length;
accessories.push({ item: 'ريل كهربائي', code: 'كهربائي', quantity_display: `${W_meters * count} م`, quantity: W_meters * count, unit: 'متر', unit_price: 650, is_auto: true });
accessories.push({ item: 'موتور ريل كهربائي', code: 'موتور', quantity_display: `${count}`, quantity: count, unit: 'قطعة', unit_price: 2800, is_auto: true });
}
if (ringLayers.length >= 1) {
accessories.push({ item: 'نهاية', code: 'نهاية', quantity_display: `${2 * ringLayers.length}`, quantity: 2 * ringLayers.length, unit: 'قطعة', unit_price: 45, is_auto: true });
}
if (ringLayers.length >= 2) {
accessories.push({ item: 'طبة', code: 'طبة', quantity_display: '2', quantity: 2, unit: 'قطعة', unit_price: 35, is_auto: true });
}
const bracketQty = W < 220 ? 2 : 3;
if (ringLayers.length === 1) {
accessories.push({ item: 'كابولي ماسورة مفرد', code: 'كابولي مفرد', quantity_display: `${bracketQty}`, quantity: bracketQty, unit: 'قطعة', unit_price: 60, is_auto: true });
} else if (ringLayers.length >= 2) {
accessories.push({ item: 'كابولي ماسورة مزدوج', code: 'كابولي مزدوج', quantity_display: `${bracketQty}`, quantity: bracketQty, unit: 'قطعة', unit_price: 95, is_auto: true });
}
if (room.installation_on === 'حائط') {
const caneQty = Math.ceil(W / 50);
accessories.push({ item: 'كانة', code: 'كانة', quantity_display: `${caneQty}`, quantity: caneQty, unit: 'قطعة', unit_price: 25, is_auto: true });
}
if (room.ceiling_shape === 'بيت ستارة') {
accessories.push({ item: 'خشب', code: 'خشب', quantity_display: `${W_meters} م`, quantity: W_meters, unit: 'متر', unit_price: 120, is_auto: true });
}
if (room.ceiling_material === 'جبس') {
const screwQty = Math.ceil(W / 50);
accessories.push({ item: 'مسامير عصفورة', code: 'مسامير عصفورة', quantity_display: `${screwQty}`, quantity: screwQty, unit: 'قطعة', unit_price: 15, is_auto: true });
}
let tieHolders = 0;
for (const layer of layers) {
if (layer.curtain_shape === 'ملموم') {
tieHolders += (layer.pieces_count === 'قطعتان' ? 2 : 1);
}
}
if (tieHolders > 0) {
accessories.push({ item: 'شماعة', code: 'شماعة', quantity_display: `${tieHolders}`, quantity: tieHolders, unit: 'قطعة', unit_price: 85, is_auto: true });
}
return accessories;
}
function evaluateCurtainPocket(room) {
if (room.ceiling_shape !== 'بيت ستارة') return null;
const pocketDepth = parseArabicNumber(room.curtain_box_depth || 0);
const pocketHeight = parseArabicNumber(room.curtain_box_height || 0);
const layers = room.layers || [];
let sumMin = 0, sumMax = 0, maxTapeHeight = 0;
const tapeHeights = { 'مفرود': 5, 'ويفي': 7, 'كالونات': 10, 'كسرات': 12, 'عادي': 10, 'حلقات': 6 };
for (const layer of layers) {
const t = (layer.tailoring_type || 'عادي').trim();
if (layer.rail_type === 'ريل كهربائي') { sumMin += 8; sumMax += 8; }
else if (['ويفي', 'حلقات'].includes(t)) { sumMin += 10; sumMax += 12; }
else { sumMin += 4; sumMax += 6; }
const th = tapeHeights[t] || 7;
if (th > maxTapeHeight) maxTapeHeight = th;
}
let depthStatus = 'كاف ✓', depthBadge = 'success', deficit = 0;
if (pocketDepth >= sumMax) { depthStatus = 'كاف ✓'; depthBadge = 'success'; }
else if (pocketDepth >= sumMin) { depthStatus = 'ضيق ⚠'; depthBadge = 'warning'; }
else { deficit = sumMin - pocketDepth; depthStatus = `لا يكفي (عجز: ${deficit} سم) ❌`; depthBadge = 'danger'; }
let tapeVisibility = pocketHeight >= maxTapeHeight ? 'مخفي داخل البيت' : `ظاهر أسفل البيت بمقدار ${maxTapeHeight - pocketHeight} سم`;
return { pocketDepth, pocketHeight, sumMin, sumMax, depthStatus, depthBadge, deficit, maxTapeHeight, tapeVisibility };
}
function calculateRoomTotals(room) {
const effectiveHeight = getEffectiveHeight(room);
let fabricTotal = 0, tailoringTotal = 0;
const processedLayers = (room.layers || []).map(l => {
const calc = calculateLayerMeters(room.width, effectiveHeight, l);
const pricePerMeter = parseArabicNumber(l.price_per_meter || 0);
const tailoringPrice = parseArabicNumber(l.tailoring_price_per_meter || 0);
const discountPct = parseArabicNumber(l.discount_pct || 0);
const layerFabricCost = calc.meters * pricePerMeter * (1 - discountPct / 100);
const layerTailoringCost = calc.meters * tailoringPrice * (1 - discountPct / 100);
fabricTotal += layerFabricCost;
tailoringTotal += layerTailoringCost;
return { ...l, ...calc, fabric_cost: Math.round(layerFabricCost * 100) / 100, tailoring_cost: Math.round(layerTailoringCost * 100) / 100 };
});
let accessoriesTotal = 0;
const processedAccessories = (room.accessories || []).map(acc => {
const unitPrice = parseArabicNumber(acc.unit_price || 0);
const qty = parseArabicNumber(acc.quantity || 0);
const total = qty * unitPrice;
accessoriesTotal += total;
return { ...acc, line_total: Math.round(total * 100) / 100 };
});
let tasselsTotal = 0;
const processedTassels = (room.tassels || []).map(tas => {
const unitPrice = parseArabicNumber(tas.unit_price || 0);
const qty = parseArabicNumber(tas.quantity || 0);
const total = qty * unitPrice;
tasselsTotal += total;
return { ...tas, line_total: Math.round(total * 100) / 100 };
});
const roomTotal = fabricTotal + tailoringTotal + accessoriesTotal + tasselsTotal;
return {
effectiveHeight,
layers: processedLayers,
accessories: processedAccessories,
tassels: processedTassels,
fabricTotal: Math.round(fabricTotal * 100) / 100,
tailoringTotal: Math.round(tailoringTotal * 100) / 100,
accessoriesTotal: Math.round(accessoriesTotal * 100) / 100,
tasselsTotal: Math.round(tasselsTotal * 100) / 100,
roomTotal: Math.round(roomTotal * 100) / 100,
pocketAdvice: evaluateCurtainPocket(room)
};
}
function processInspectionData(insp) {
const wRight = parseArabicNumber(insp.right_width || 0);
const wWindow = parseArabicNumber(insp.window_width || 0);
const wLeft = parseArabicNumber(insp.left_width || 0);
const wTotalEntered = parseArabicNumber(insp.total_width || 0);
const wPocket = parseArabicNumber(insp.pocket_width || 0);
const hTotalEntered = parseArabicNumber(insp.total_height || 0);
const hWindow = parseArabicNumber(insp.window_height || 0);
const hAbove = parseArabicNumber(insp.above_window || 0);
const hBelow = parseArabicNumber(insp.below_window || 0);
const hPocketDrop = parseArabicNumber(insp.pocket_drop || 0);
const pocketDepth = parseArabicNumber(insp.pocket_depth || 0);
const horizontalSum = wRight + wWindow + wLeft;
const horizontalConsistent = (wTotalEntered > 0 && horizontalSum > 0) ? Math.abs(horizontalSum - wTotalEntered) <= 2 : true;
const effectiveTotalWidth = wTotalEntered > 0 ? wTotalEntered : horizontalSum;
const verticalSum = hAbove + hWindow + hBelow;
const verticalConsistent = (hTotalEntered > 0 && verticalSum > 0) ? Math.abs(verticalSum - hTotalEntered) <= 2 : true;
const effectiveTotalHeight = hTotalEntered > 0 ? hTotalEntered : verticalSum;
let suggestedCurtainWidth = 0;
if (wPocket > 0) {
suggestedCurtainWidth = wPocket;
} else if (effectiveTotalWidth > 0 && effectiveTotalWidth <= (wWindow + 60)) {
suggestedCurtainWidth = effectiveTotalWidth;
} else if (wWindow > 0) {
const margin = Math.min(wRight, 25) + Math.min(wLeft, 25);
suggestedCurtainWidth = wWindow + (margin > 0 ? margin : 40);
} else {
suggestedCurtainWidth = effectiveTotalWidth;
}
let suggestedCurtainHeight = 0;
if (effectiveTotalHeight > 0) {
suggestedCurtainHeight = effectiveTotalHeight - hPocketDrop - 2;
if (suggestedCurtainHeight < 0) suggestedCurtainHeight = effectiveTotalHeight;
}
return {
horizontalSum, horizontalConsistent, effectiveTotalWidth,
verticalSum, verticalConsistent, effectiveTotalHeight,
suggestedCurtainWidth: Math.round(suggestedCurtainWidth),
suggestedCurtainHeight: Math.round(suggestedCurtainHeight),
pocketDepth, pocketDrop: hPocketDrop
};
}
export default {
async fetch(request, env) {
const url = new URL(request.url);
const path = url.pathname;
const method = request.method;
const corsHeaders = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
if (method === 'OPTIONS') {
return new Response(null, { headers: corsHeaders });
}
const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), {
status,
headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders }
});
try {
if (path === '/api/v1/health') {
return json({ status: 'healthy', app: 'Courtainer ERP (Cloudflare Edition)', version: '1.1.2', d1: !!env.DB });
}
if (path === '/api/v1/calculate' && method === 'POST') {
const body = await request.json();
const roomCalc = calculateRoomTotals(body.room || body);
const autoAccessories = calculateRoomAccessories(body.room || body);
return json({ success: true, calculation: roomCalc, suggested_accessories: autoAccessories });
}
if (path === '/api/v1/inspections/validate' && method === 'POST') {
const body = await request.json();
const processed = processInspectionData(body);
return json({ success: true, data: processed });
}
if (path === '/api/v1/customers') {
if (method === 'GET') {
const { results } = await env.DB.prepare('SELECT * FROM customers ORDER BY id DESC LIMIT 50').all();
return json({ success: true, count: results.length, data: results });
}
if (method === 'POST') {
const b = await request.json();
const normPhone = normalizePhone(b.phone);
const res = await env.DB.prepare(
'INSERT INTO customers (name, phone, phone_normalized, notes) VALUES (?, ?, ?, ?)'
).bind(b.name, b.phone, normPhone, b.notes || '').run();
return json({ success: true, id: res.meta.last_row_id });
}
}
if (path === '/api/v1/leads') {
if (method === 'GET') {
const { results } = await env.DB.prepare(`
SELECT l.*, c.name as customer_name, c.phone as customer_phone
FROM leads l JOIN customers c ON l.customer_id = c.id
ORDER BY l.id DESC
`).all();
return json({ success: true, data: results });
}
}
if (path === '/api/v1/today-tasks') {
const today = new Date().toISOString().split('T')[0];
const overdue = await env.DB.prepare("SELECT COUNT(*) as c FROM leads WHERE stage NOT IN ('تم التسليم', 'خسارة') AND follow_up_date < ?").bind(today).first('c');
const todayCount = await env.DB.prepare("SELECT COUNT(*) as c FROM leads WHERE stage NOT IN ('تم التسليم', 'خسارة') AND follow_up_date = ?").bind(today).first('c');
const noFollowup = await env.DB.prepare("SELECT COUNT(*) as c FROM leads WHERE stage IN ('فرصة بيع', 'عرض سعر') AND (follow_up_date IS NULL OR follow_up_date = '')").first('c');
const feedbackReq = await env.DB.prepare("SELECT COUNT(*) as c FROM leads WHERE stage = 'تم التسليم'").first('c');
return json({
success: true,
stats: {
overdue_count: overdue || 0,
today_count: todayCount || 0,
no_followup_count: noFollowup || 0,
feedback_required_count: feedbackReq || 0
}
});
}
if (path === '/api/v1/inspections') {
if (method === 'GET') {
const { results } = await env.DB.prepare('SELECT * FROM inspections ORDER BY id DESC LIMIT 50').all();
return json({ success: true, data: results });
}
if (method === 'POST') {
const b = await request.json();
const p = processInspectionData(b);
const res = await env.DB.prepare(`
INSERT INTO inspections (
customer_name, customer_phone, room_name, window_type,
right_width, window_width, left_width, total_width, pocket_width,
total_height, window_height, above_window, below_window,
pocket_drop, pocket_depth, obstacles_notes,
suggested_curtain_width, suggested_curtain_height, data_json
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).bind(
b.customer_name || 'عميل معاينة', b.customer_phone || '', b.room_name || 'غرفة', b.window_type || 'شباك',
b.right_width || 0, b.window_width || 0, b.left_width || 0, b.total_width || 0, b.pocket_width || 0,
b.total_height || 0, b.window_height || 0, b.above_window || 0, b.below_window || 0,
b.pocket_drop || 0, b.pocket_depth || 0, b.obstacles_notes || '',
p.suggestedCurtainWidth, p.suggestedCurtainHeight, JSON.stringify({ ...b, processed: p })
).run();
return json({ success: true, inspection_id: res.meta.last_row_id, processed: p });
}
}
if (path === '/api/v1/jobs') {
if (method === 'GET') {
const { results } = await env.DB.prepare('SELECT * FROM jobs ORDER BY id DESC').all();
return json({ success: true, data: results.map(j => ({ ...j, data: JSON.parse(j.data_json || '{}') })) });
}
if (method === 'POST') {
const b = await request.json();
const checkNum = b.check_number || `CHK-${Math.floor(1000 + Math.random() * 9000)}`;
const res = await env.DB.prepare(`
INSERT INTO jobs (
check_number, order_type, work_stage, expected_delivery,
seller_name, customer_name, customer_phone, room_name, status, data_json
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).bind(
checkNum, b.order_type || 'جديد', b.work_stage || 'تركيب', b.expected_delivery || '',
b.seller_name || '', b.customer_name || '', b.customer_phone || '', b.room_name || 'شباك 1',
b.status || 'تحت التشغيل', JSON.stringify(b)
).run();
return json({ success: true, job_id: res.meta.last_row_id, check_number: checkNum });
}
}
if (path.startsWith('/api/v1/odoo/payload/job/')) {
const id = parseInt(path.split('/')[5], 10) || 1;
const job = await env.DB.prepare('SELECT * FROM jobs WHERE id = ?').bind(id).first();
if (!job) return json({ error: 'أمر التشغيل غير موجود' }, 404);
const data = JSON.parse(job.data_json || '{}');
const room = data.room || {};
return json({
success: true,
odoo_version_target: 'Odoo 17 / 18',
target_model: 'curtain.job',
payload: {
model: 'curtain.job',
method: 'create',
values: {
check_number: job.check_number,
order_type: job.order_type,
work_stage: job.work_stage,
customer_name: job.customer_name,
customer_phone: job.customer_phone,
state: 'in_progress'
}
}
});
}
return new Response(HTML_CONTENT, {
headers: { 'Content-Type': 'text/html; charset=utf-8' }
});
} catch (e) {
return json({ error: e.message, stack: e.stack }, 500);
}
}
};
