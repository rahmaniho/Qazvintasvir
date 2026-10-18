# BEHAVIOR-INVENTORY.md

> **منبع بررسی:** snapshot آرشیوشدهٔ `rahmaniho/Qazvi_tasvir`, `main`, commit `9a3cb79` (۱۸ اکتبر ۲۰۲۶) در `_legacy/source-snapshot/`; فایل‌های JS شامل `assets/js/main.js` (811 خط)، `assets/js/navigation.js` (582 خط) و `assets/js/service-pages.js` (47 خط). بازسازی در مخزن فعال `rahmaniho/Qazvintasvir`, branch `arena/5931c2bd-qazvintasvir` ادامه می‌یابد.

## رفتارهای `main.js`

| رفتار فعلی | توضیح/وابستگی | طبقه‌بندی مهاجرت پیشنهادی |
|---|---|---|
| نوار پیشرفت اسکرول | محاسبه نسبت `scrollY / (scrollHeight - innerHeight)` و transform روی `#scroll-progress`؛ scroll listener با `{ passive: true }`. | JS لازم، در layout مشترک، مشروط به حفظ عنصر بصری. |
| حالت هدر هنگام scroll | کلاس `scrolled` روی `.site-header` بعد از ۴۰px؛ در نسخهٔ فعلی comment منبع تصریح می‌کند کلاس در CSS اثر بصری نداشته/قلاب قدیمی بوده است. | با CSS sticky ادغام؛ اگر سبک حالت sticky جدید تغییری دارد، رفتار به‌صورت حداقلی حفظ شود. |
| بازگشت به بالا | دکمه `#back-to-top` پس از ۵۰۰px visible؛ click به بالا، با `prefers-reduced-motion` سازگار. | JS لازم فقط در صورتی که دکمهٔ visible در محتوا نگه داشته شود؛ در HTML پایه وجود دارد. |
| reveal هنگام ورود به viewport | `IntersectionObserver`, rootMargin `0px 0px -60px 0px`, threshold `0.1`; fallback کلاس visible در مرورگر فاقد observer. | حذف‌پذیر/ترجیحاً CSS-only؛ پنهان‌کردن محتوا پیش از JS ریسک دسترس‌پذیری دارد. |
| شمارش آمار hero | اعداد `[data-count]` در `.hero__stats`; ease-out cubic طی 1800ms؛ ارقام به فارسی؛ اجرای یک‌باره وقتی ۳۰٪ بخش visible. | JS اختیاری، اما برای برابری رفتاری لازم؛ با reduced-motion مقدار نهایی فوری. باید مشخص شود عددها/متن دقیق کدام‌اند. |
| کپی شماره تلفن + toast | `[data-copy-phone]` شمارهٔ `09122815189` را با Clipboard API کپی می‌کند؛ fallback شماره را در toast نشان می‌دهد؛ toast 3.5s. | JS لازم؛ Clipboard API محدود به secure context؛ toast باید accessible باشد. |
| تبدیل ارقام فارسی/عربی به لاتین | تابع مشترک برای شماره‌ها و متن واتساپ؛ ارقام فارسی و عربی پشتیبانی می‌شود. | JS لازم برای فرم‌ها. |
| فرم تماس اصلی | نام حداقل ۲ حرف؛ شماره با الگوی `^(\+98|0)?9\d{9}$` بعد از پاک‌سازی فاصله/خط تیره/پرانتز؛ خطا روی ورودی؛ پیام شامل نام، شماره، نوع خدمت و توضیحات اختیاری؛ `window.open(wa.me/989122815189...)`; تغییر موقت CTA، toast و reset پس از ۴ ثانیه. | JS لازم؛ به ContactForm.astro منتقل شده؛ باید متن/فرمت پیام و validation با منبع تطبیق نهایی شود. فرم فقط پیام را آماده می‌کند، ارسال واقعی را کاربر در WhatsApp تأیید می‌کند. |
| اسکلتون بارگذاری تصاویر ناوگان | برای `.fleet-card__img`; پس از load یا error کلاس `is-loaded` روی media؛ cached image هم بررسی می‌شود. | CSS-only با پس‌زمینه/aspect-ratio بهتر است؛ JS فقط اگر transition دقیق حفظ شود. |
| تب‌های accessible غذای پرسنل | `.food-tab`/`.food-panel`; هماهنگ‌سازی `aria-selected`, `tabindex`, active و hidden؛ click؛ ArrowLeft/Right با جهت معکوس در RTL؛ Home/End؛ انتقال focus. | JS لازم یا جایگزینی با `<details>` پس از تأیید UX؛ این رفتار بخشی از محتوای food است و حذف‌شدنی نیست. |
| آینه‌سازی انتخاب وعده | checkboxها به `.is-checked`، متن comma-separated در `#food-meals-mirror`؛ پاک‌شدن پیام خطا پس از انتخاب. | JS لازم در فرم درخواست غذای کامل. |
| فرم قرارداد غذای پرسنل | فیلدهای company/person حداقل ۲ حرف، mobile پشتیبانی `+98`/`0098`/`0`, headcount 10–50000، address حداقل ۵ حرف؛ فیلدهای خطا `aria-invalid`/feedback؛ وعدهٔ حداقل یکی؛ focus روی اولین نامعتبر؛ ساخت پیام WhatsApp شامل شرکت، رابط، تلفن، headcount، وعده‌ها، آدرس و توضیح؛ reset و success بعد از 4.5s. | JS لازم؛ بخشی از `personnel-food` باید کامل منتقل شود، نه فرم تماس ساده. |
| اعتبار/انیمیشن KarenSoft footer | برچسب «طراحی و توسعه» دو‌زبانه، جداسازی کلمه‌ای برای اتصال حروف فارسی، لینک accessible/tooltip، reveal مرحله‌ای با IntersectionObserver؛ رعایت reduced motion. | متن/اعتبار باید حفظ شود؛ انیمیشن حذف یا CSS-only. فایل‌های mark و wordmark متعلق به `assets/images/karensoft/`. |
| hash router صفحهٔ اصلی | `#hero/#about/#services/#fleet/#brands/#why-us/#clients/#trust/#resume/#legal/#contact` به `.site-page` وصل است؛ با hashchange محتوای جاری، title/description، active nav، scroll/focus و live-region صفحه‌خوان به‌روز می‌شود؛ کلاس‌های جلوگیری از flash و fallback بدون JS. | هدف معماری MPA: حذف router فقط پس از انتقال تک‌تک بخش‌ها به URLهای قابل‌دسترسی/محتوای با hash anchor؛ هیچ hash قدیمی نباید 404 شود. |
| لینک‌های legacy hash | `#fleet-specs` → `services/urban-vip.html`; `#personnel-food`, `#food-menu`, `#food-gallery`, `#food-request`, `#food-faq` → `services/personnel-food.html`; redirect از `window.location.replace`. | به redirectهای static/meta-refresh در URLهای واقعی جدید تبدیل شود؛ hash suffixهای food باید پس از redirect حفظ/به anchor متناظر map شوند. |
| کلیک مجدد روی hash جاری | چون hashchange تکراری رخ نمی‌دهد، کلیک روی hash فعلی به بالای صفحه یا anchor هدف smooth scroll می‌کند؛ offset هدر ۹۰px؛ reduced-motion respected. | JS لازم برای internal anchor در صفحات MPA یا CSS `scroll-margin-top`; رفتار focus باید حفظ شود. |
| page announcement/focus | region `#route-announcer` با `role=status`, `aria-live=polite`; صفحهٔ جدید `tabindex=-1`; focus با تغییر route در hash navigation. | برای MPA navigation مرورگر بخش مهمی از این کار را انجام می‌دهد؛ anchor transitions نیاز به focus management دسترس‌پذیر دارند. |
| parallax photo bands | فقط اگر کاهش حرکت خاموش؛ scroll RAF-throttled و passive listener؛ resize listener passive؛ متغیر `--py`. | حذف‌شدنی/ترجیحاً حذف برای پایداری و CLS، مگر کاربر حفظ بصری را لازم بداند. |
| تم سه‌حالته | روشن/تیره/اقیانوسی؛ `[data-theme]` روی `<html>` و localStorage `qt-theme`; مقادیر dark/ocean بازیابی پیش از render توسط inline head script؛ theme controls `aria-pressed`; close details on outside/Escape. | JS لازم؛ طراحی هدف فقط dark را صریحاً خواسته، اما ocean نیز رفتار موجود است؛ **حذف حالت ocean نیازمند تأیید** یا باید آن هم منتقل شود. |

## رفتارهای `navigation.js`

| رفتار فعلی | جزئیات | طبقه‌بندی مهاجرت پیشنهادی |
|---|---|---|
| آغاز کنترل‌گر مشترک | اجرا روی DOMContentLoaded یا فوری؛ guard روی `documentElement.dataset.qtNavigationReady`. | بازنویسی لازم متناسب با componentهای Astro؛ از duplicate scriptها پرهیز شود. |
| کنترل‌کنندهٔ ناوبری/Drawer | پیدا کردن button `.menu-toggle` و nav با aria-controls؛ break-point موبایل 1023px؛ toggle drawer؛ قفل `body`؛ aria-expanded/hidden/label همگام؛ انتقال focus به اولین لینک؛ restore focus؛ Escape؛ Tab focus trap؛ resize و media-query reset؛ کلیک مقصد drawer را می‌بندد. | JS لازم در MobileDrawer؛ قصد معماری جدید همین رفتارها را حفظ می‌کند. |
| زیرمنوی خدمات Disclosure | click/Enter/Space/ArrowDown؛ Escape close و برگرداندن focus؛ arrow key navigation و Home/End؛ hover/focus open در دسکتاپ؛ focusout/mouseleave close؛ outside click close؛ aria-expanded و aria-hidden sync. | JS لازم در mega-menu؛ باید disclosure باشد نه ARIA application menu؛ hover فقط enhancement و keyboard/touch باید مستقل کار کند. |
| Sidebar behavior | کنترل collapse/expand دسکتاپ و `qt-sidebar-collapsed`, `is-collapsed`, data-sidebar-state و labels؛ منبع فعلی `nav.js` هنوز API/sidebar nomenclature دارد. | در Header افقی جدید حذف معماری/کد، اما قبل از حذف تأیید لازم است چون سایت مرجع/checkout متناقض است؛ search sidebar هم ممکن است موجود باشد. |
| Search injection و filtering | در `enhanceSidebar`، ورودی جستجو، placeholder و shortcut Meta/Ctrl+K تزریق/فعال می‌شود؛ متن لینک‌های اصلی/زیرخدمات/پیام‌ها/پروفایل فیلتر می‌شود. | حذف از سایت محتوا احتمالاً مناسب است؛ چون حذف کارکرد محسوس است، تا تأیید مالک یا بررسی اثر روی محتوا حذف نشود. |
| محتوای تزریقی پیام‌ها و پروفایل | پیام‌های ساختگی/shortcut و کارت profile مدیر در sidebar ایجاد می‌شود؛ پروفایل به about لینک دارد. | احتمالاً کد/محتوای ناوبری قدیمی و جایگزین؛ بدون بررسی محتوایی تأیید کاربر لازم دارد. |
| فعال‌سازی لینک جاری | تکمیل `aria-current` برای markerهای `is-active`; به‌روزرسانی `.active` در hash router خانه؛ service route static state. | در Astro با pathname محاسبه شود. |
| Escape، کلیک بیرون و بستن همه | close dropdown/drawer، گاهی restore focus؛ click outside همه را می‌بندد. | حفظ. |

## رفتارهای `service-pages.js`

- Header scroll state (`is-scrolled` بعد از 12px) و scroll progress; scroll passive.
- Reveal با IntersectionObserver threshold `0.12`, rootMargin `0px 0px -40px 0px`; با reduced-motion یا نبود IO فوراً visible.
- مقدار `[data-year]` به‌صورت literal فارسی `۱۴۰۵` نوشته می‌شود.
- در معماری جدید: progress/header با shared layout ادغام شود؛ reveal ترجیحاً CSS/JS اختیاری؛ سال locale-aware و از build/runtime تاریخ به دست آید (نه hardcode ثابت) مگر حفظ سال ثابتی خواسته شود.

## CSS / media / قراردادهای رفتاری

- ورودی‌های CSS: `assets/css/style.css`, `service-pages.css`, `food-service.css`, `nav/nav-tokens.css`, `nav/nav-base.css`, `nav/nav-sidebar.css`.
- توکن‌های اصلی style.css: palette navy `#0A2540/#061829/#123A5E`, amber `#F59E0B/#FCD34D`, sky `#0EA5E9/#38BDF8`, surfaces `#F7F9FC/#FFFFFF`, text `#1E293B/#64748B/#94A3B8`; Vazirmatn/Inter; spacing scale 4,8,12,16,24,32,48,64px (plus 96,128); radius 8,12,16,20,28px; shadows sm/md/lg; breakpoints متعدد، نقاط برجسته 640/768/900/1024px؛ `food-service.css` توکن‌های سبز/کرم مستقل دارد.
- فایل‌های nav سه‌گانه و ماژول CSS قدیمی هنوز در snapshot منبع حاضرند؛ کد sidebar در JS به این فایل‌ها وابستگی دارد. شواهد منبع با توصیف کاربر («ناوبری حذف شده») یکسان نیست.
- `main.js`/`navigation.js` کد حذف‌شده/بایگانی‌شده در commitهای قبلی دارند؛ گزارش اینجا فقط رفتارهای موجود در working tree فعلی commit `9a3cb79` را ثبت می‌کند.

## تصمیم‌ها و موارد باز در مهاجرت

1. **مخزن مقصد مشخص است:** بازنویسی در checkout فعال `rahmaniho/Qazvintasvir` و شاخهٔ Arena آن انجام می‌شود؛ `rahmaniho/Qazvi_tasvir` فقط منبع خواندنی و snapshot آن در `_legacy/source-snapshot/` است.
2. **ناوبری:** Header، زیرمنوی خدمات و mobile drawer در سایت جدید پیاده‌سازی شده‌اند. با این حال، رفتارهای sidebar شامل search، profile/messages و collapse در source دیده می‌شوند و هنوز دربارهٔ ضرورت انتقال یا حذف آن‌ها تصمیم نهایی ثبت نشده است؛ پیش از کنارگذاشتن هر رفتار احتمالی، باید بررسی/تأیید شود.
3. **تم‌ها:** انتخاب سه‌حالتهٔ light/dark/ocean، ذخیرهٔ `qt-theme` و کنترل دسترس‌پذیر Header در بازنویسی حفظ شده است.
4. **URL و hashهای legacy:** redirectهای ایستای مسیرهای قدیمی ساخته شده‌اند؛ hashهای `fleet-specs` و مقصدهای غذای پرسنل به URLهای جدید نگاشت شده‌اند. smoke test این redirectها و hashها را بررسی می‌کند.
5. **سال:** نمایش سال در Footer به‌صورت پویا و locale-aware است؛ برای صفحهٔ خدمات نیز سال ثابت source به رفتار پویا تبدیل شده است.
6. **فرم تماس عمومی:** validation و متن/قالب پیام WhatsApp باید همچنان با رفتار دقیق source تطبیق نهایی شود؛ فرم غذای پرسنل، جداگانه و با تمام فیلدهای درخواست قرارداد منتقل شده است.
7. **ادامهٔ تطبیق:** انتقال کامل محتوا، metadata و schema هشت خدمت و ترجمهٔ کامل انگلیسی صفحهٔ غذای پرسنل هنوز باز است؛ مواردی که با source اختلاف دارند باید در همین inventory ثبت شوند.
