# CONTENT-INVENTORY.md

> **منبع بررسی:** snapshot خواندنی `rahmaniho/Qazvi_tasvir`، شاخهٔ `main`، commit `9a3cb79` (۱۸ اکتبر ۲۰۲۶)، اکنون آرشیوشده در `_legacy/source-snapshot/`. پیاده‌سازی Astro هدف این نشست در مخزن فعال `rahmaniho/Qazvintasvir` و شاخهٔ `arena/5931c2bd-qazvintasvir` ادامه می‌یابد. این snapshot مرجع محتوا/دارایی است؛ هدف deployment و URL پروژه، مخزن فعال است.

## ۱) نمای کلی و URLهای فعلی

| URL/مسیر | عنوان صفحه | محتوای اصلی |
|---|---|---|
| `/` | قزوین تصویر | بازرگانی، واردات و صادرات، ترابری و تأمین غذای پرسنل — تأسیس ۱۳۷۴ | صفحهٔ خانهٔ فارسی؛ صفحه‌بندی hash درون یک HTML، ۱۱ بخش اصلی. |
| `/en/` | Qazvin Tasvir Company | Trading, Import & Export, Transport and Staff Catering — Founded 1995 | خانهٔ انگلیسی؛ صفحهٔ کامل تک‌صفحه‌ای و معادل عمدهٔ خانهٔ فارسی. |
| `/services/` | خدمات تخصصی | قزوین تصویر | هاب هشت خدمت و کارت‌های تصویری. |
| `/services/customs-port.html` | ترخیص گمرکی و امور بندری | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/factory-transport.html` | ترابری پرسنل کارخانجات | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/import-export.html` | واردات و صادرات کالاهای مجاز | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/personnel-food.html` | تأمین غذای پرسنل و وعده‌های سازمانی | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/school-office.html` | سرویس مدارس، ادارات و شرکت‌ها | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/sourcing.html` | تأمین مواد اولیه و تجهیزات | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/trade-consulting.html` | مشاوره بازرگانی و گشایش | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/services/urban-vip.html` | حمل‌ونقل درون‌شهری و سرویس‌های VIP | قزوین تصویر | صفحهٔ مستقل خدمت، با هیرو، معرفی، مزایا، مراحل، جزئیات، story، CTA؛ food شامل محتوای تکمیلی. |
| `/404.html` | ۴۰۴ — صفحه پیدا نشد | قزوین تصویر | خطای دوزبانه، هدر/ناوبری و مسیر بازگشت. |

## ۲) محتوای صفحهٔ خانه

ساختار/شناسهٔ بخش‌های فارسی و انگلیسی در `index.html` و `en/index.html` همسان است:
- `#hero` — هیرو و آمار آغازین
- `#about` — دربارهٔ شرکت
- `#services` — خلاصه/کارت خدمات
- `#fleet` — ناوگان
- `#brands` — برندهای همکار/تولیدکنندگان ناوگان
- `#why-us` — دلایل انتخاب
- `#clients` — مشتریان
- `#trust` — اعتبار و اعتماد
- `#resume` — رزومه
- `#legal` — شناسنامه حقوقی
- `#contact` — تماس و فرم

### تیترهای استخراج‌شده — فارسی (`index.html`)
- قزوین تصویر؛ بیش از ۳۱ سال تجربه در بازرگانی، واردات و صادرات و ترابری
- بیش از ۳۱ سال اعتماد، از قزوین تا بازارهای جهانی
- خدمات تخصصی قزوین تصویر
- حمل و نقل مسافربری
- خدمات و تشریفات و تهیه و پخش غذا
- واردات و صادرات
- تأمین مواد اولیه و تجهیزات
- ناوگان مجهز ترابری
- اتوبوس‌های بین‌شهری و درون‌شهری
- مینی‌بوس‌های مسافربری
- ون‌های مسافربری
- برندهای همکار و مورد اعتماد
- چرا شرکت‌ها قزوین تصویر را انتخاب می‌کنند؟
- ۳۱+ سال سابقه صنعتی (تأسیس ۱۳۷۴)
- مدیریت آقای سعید امین‌زاده
- ناوگان ملکی و مجهز
- شبکه تأمین داخلی و خارجی
- پشتیبانی ۲۴/۷ و قراردادهای منعطف
- رضایت بالا و تمدید مداوم قراردادها
- برندهای شاخصی که به قزوین تصویر اعتماد کرده‌اند
- یاتاقان بوش ایران
- شیر سحر
- AGT
- آسان پک
- هنکل
- یونیلیور
- BAT
- گلدایران
- ال‌جی
- کابل البرز
- آلکاپلاستیک
- نستله
- نظرات مشتریان
- مدیریت ایاب‌وذهاب ۵۰۰ پرسنل در شهرک صنعتی کاسپین
- سوابق همکاری قراردادی
- اعتبار ثبت‌شده و قابل استعلام
- رزومه شرکت قزوین تصویر
- شناسنامه شرکت
- حوزه‌های فعالیت
- ناوگان و تجهیزات
- اعتبارنامه و شناسنامه حقوقی شرکت
- مدیریت و سهامداران
- زمینه‌های فعالیت (موضوعات ثبت‌شده)
- درخواست مشاوره، استعلام قیمت و عقد قرارداد
- ارسال پیام و درخواست همکاری

### تیترهای استخراج‌شده — انگلیسی (`en/index.html`)
- Qazvin Tasvir: more than 31 years of experience in trading, import and export and transport
- More than 31 years of trust, from Qazvin to global markets
- Specialized Services of Qazvin Tasvir
- Passenger Transport
- Catering and Hospitality Services
- Import and Export
- Industrial Sourcing
- A fully equipped transport fleet
- Intercity and intracity buses
- Passenger minibuses
- Passenger vans
- Trusted partner brands
- Why do companies choose Qazvin Tasvir?
- 31+ years of industrial experience (founded 1995)
- Management by Mr Saeed Aminzadeh
- Company-owned, fully equipped fleet
- Domestic and international supply network
- 24/7 support and flexible contracts
- High satisfaction and continuous contract renewals
- Leading brands that have trusted Qazvin Tasvir
- Yataqan Bosh Iran
- Shir Sahar
- AGT
- Asan Pack
- Henkel
- Unilever
- BAT
- Goldiran
- LG
- Alborz Cable
- Alkaplastik
- Nestlé
- Client Testimonials
- Managing daily transport for 500 staff at Caspian Industrial Park
- Contract Collaboration History
- Registered credentials open to verification
- Qazvin Tasvir Company Resume
- Company Registration Details
- Fields of Activity
- Fleet & Equipment
- Company Legal Credentials & Registration Identity
- Management & Shareholders
- Fields of Activity (Registered Subjects)
- Request advice, a price quote or a contract
- Send a message or partnership request

## ۳) هشت خدمت و ساختار محتوای مبنا

محتوای واقعی صفحات خدمت در `tools/build-service-pages.py` (دادهٔ generator) و برای غذای پرسنل همچنین `tools/personnel-food-detail.html` نگهداری می‌شود. HTMLهای خروجی generated هستند؛ هر صفحهٔ معمولی متن و داده‌های اختصاصی دارد و نباید با template عمومی جایگزین محتوای اختصاصی شود.

### `/services/customs-port.html` — <span class="highlight">ترخیص گمرکی</span> و امور بندری
- Meta description: خدمات ترخیص گمرکی و امور بندری قزوین تصویر؛ کنترل مدارک، هماهنگی مراحل پرونده و پیگیری عملیات اجرایی.
- تیترهای H2/H3: کاهش اصطکاک در مسیر گمرک و بندر؛ کنترل اسناد پرونده؛ هماهنگی عملیات بندری؛ پیگیری مرحله‌به‌مرحله؛ چهار گام برای نظم دادن به پرونده؛ دریافت اطلاعات؛ بررسی مدارک؛ تعریف مسیر؛ اعلام وضعیت؛ پشتیبانی برای پرونده‌های مختلف؛ مسیر هر پرونده اختصاصی است؛ وقتی بندر و اسناد در یک قاب دیده شوند؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/factory-transport.html` — <span class="highlight">ترابری پرسنل</span> کارخانجات
- Meta description: خدمات ترابری پرسنل کارخانجات قزوین تصویر؛ طراحی مسیر، سرویس شیفتی، ناوگان اتوبوس، مینی‌بوس و ون.
- تیترهای H2/H3: رفت‌وآمد منظم، بخشی از بهره‌وری کارخانه است؛ طراحی مسیر و شیفت؛ ناوگان متناسب؛ پشتیبانی اجرای روزانه؛ راه‌اندازی سرویس کارخانه در چهار گام؛ دریافت اطلاعات؛ بازدید و مسیرسنجی؛ تنظیم برنامه؛ پایش و بهبود؛ برای کارخانه‌های چندشیفته؛ ایمنی و انضباط در اولویت؛ مسیر کارخانه باید برای همه قابل پیش‌بینی باشد؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/import-export.html` — واردات و صادرات <span class="highlight">کالاهای مجاز</span>
- Meta description: صفحه خدمات واردات و صادرات کالاهای مجاز شرکت قزوین تصویر؛ بررسی نیاز، هماهنگی خرید، اسناد و حمل بین‌المللی.
- تیترهای H2/H3: یک نقطه تماس برای زنجیره واردات و صادرات؛ شناخت دقیق نیاز؛ هماهنگی خرید و حمل؛ پیگیری اسناد و گزارش؛ فرآیند همکاری برای شروع یک پرونده بازرگانی؛ دریافت درخواست؛ بررسی مسیر؛ هماهنگی اجرا؛ گزارش و پیگیری؛ مناسب برای چه مجموعه‌هایی؟؛ شفافیت پیش از تعهد؛ از محموله تا مقصد، هر مرحله قابل پیگیری است؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/personnel-food.html` — تأمین غذای پرسنل و <span class="gradient-text">وعده‌های سازمانی</span>
- Meta description: خدمات تأمین غذای پرسنل و وعده‌های سازمانی قزوین تصویر؛ منوی چرخشی، آشپزخانه بهداشتی و توزیع در محل.
- تیترهای H2/H3: چرا کارخانه‌ها تأمین غذا را به قزوین تصویر می‌سپارند؟؛ از درخواست اولیه تا شروع توزیع، در ۵ گام؛ منوی پیشنهادی وعده‌های سازمانی؛ نگاهی به آشپزخانه، غذا و فرآیند توزیع؛ فرم درخواست مشاوره و عقد قرارداد؛ پرسش‌های مدیران کارخانه‌ها و واحدهای رفاهی؛ امروز قرارداد تأمین غذای پرسنل خود را نهایی کنید
- تصویرهای inline در صفحه: 30؛ شامل هیرو، آشپزخانه، چهار دسته وعده/منو با ۱۶ آیتم تصویری، گالری، تحویل و سایر تصاویر. نام تمام فایل‌های تصویری موجود در بند ۷ درج شده است.

### `/services/school-office.html` — سرویس <span class="highlight">مدارس، ادارات و شرکت‌ها</span>
- Meta description: خدمات سرویس مدارس، ادارات و شرکت‌ها توسط قزوین تصویر؛ برنامه‌ریزی مسیر، زمان‌بندی و ناوگان متناسب.
- تیترهای H2/H3: رفت‌وآمد روزانه، با برنامه‌ای قابل اتکا؛ مسیر و زمان‌بندی؛ انتخاب وسیله نقلیه؛ قرارداد و پشتیبانی؛ راه‌اندازی یک سرویس منظم؛ شناخت مجموعه؛ مسیرسنجی؛ پیشنهاد و قرارداد؛ شروع و پایش؛ سه محیط، سه مدل نیاز؛ اول ایمنی، بعد زمان‌بندی؛ اعتماد از تکرار منظم ساخته می‌شود؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/sourcing.html` — تأمین <span class="highlight">مواد اولیه و تجهیزات</span>
- Meta description: خدمات تأمین مواد اولیه و تجهیزات صنعتی قزوین تصویر؛ نیازسنجی، بررسی تأمین‌کنندگان و هماهنگی خرید و حمل.
- تیترهای H2/H3: تأمین دقیق برای توقف کمتر عملیات؛ نیازسنجی و مشخصات؛ بررسی تأمین‌کننده؛ هماهنگی تحویل؛ از شرح نیاز تا تحویل، چهار مرحله روشن؛ ثبت نیاز؛ ارزیابی گزینه‌ها؛ برنامه‌ریزی خرید؛ تحویل و پیگیری؛ برای چه نیازهایی قابل تعریف است؟؛ مشخصات فنی، نقطه شروع است؛ تصمیم تأمین وقتی ساده‌تر می‌شود که اطلاعات کنار هم باشد؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/trade-consulting.html` — <span class="highlight">مشاوره بازرگانی</span> و گشایش
- Meta description: خدمات مشاوره بازرگانی و گشایش قزوین تصویر؛ بررسی مسیر تجارت، اسناد، هماهنگی ارزی و اعتبارات بر اساس پرونده.
- تیترهای H2/H3: مشاوره‌ای که به اقدام بعدی وصل می‌شود؛ شناخت پرونده؛ تحلیل مسیر و مدارک؛ راهبری اقدام بعدی؛ مشاوره از سؤال درست شروع می‌شود؛ تعریف مسئله؛ مطالعه اطلاعات؛ ارائه گزینه‌ها؛ برنامه اقدام؛ موضوعات قابل بررسی؛ مشاوره جایگزین بررسی حقوقی نیست؛ وقتی اطلاعات پراکنده به یک مسیر تبدیل می‌شود؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

### `/services/urban-vip.html` — حمل‌ونقل درون‌شهری و <span class="highlight">سرویس‌های VIP</span>
- Meta description: خدمات حمل‌ونقل درون‌شهری و سرویس‌های VIP قزوین تصویر؛ جابه‌جایی مدیران، مهمانان و گروه‌های سازمانی.
- تیترهای H2/H3: حمل‌ونقل برای موقعیت‌هایی که زمان مهم است؛ خودروی متناسب؛ زمان‌بندی دقیق؛ پشتیبانی هماهنگ؛ سرویس VIP، از برنامه سفر شروع می‌شود؛ شناخت برنامه؛ پیشنهاد خودرو؛ هماهنگی اجرا؛ پیگیری سفر؛ مناسب برای برنامه‌های سازمانی؛ سرویس VIP با نیاز واقعی تعریف می‌شود؛ وقتی مسافر فقط باید به برنامه‌اش فکر کند؛ خدمات مرتبط؛ برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم

## ۴) متادیتا، Open Graph و canonical

### `index.html`
- title: قزوین تصویر | بازرگانی، واردات و صادرات، ترابری و تأمین غذای پرسنل — تأسیس ۱۳۷۴
- description: شرکت قزوین تصویر (شناسه ملی ۱۰۸۶۱۴۱۵۲۱۵)، با مدیریت سعید امین‌زاده؛ هشت خدمت تخصصی در واردات و صادرات، ترخیص، تأمین صنعتی، ترابری، سرویس VIP و سازمانی، غذای پرسنل و مشاوره بازرگانی. تأسیس ۱۳۷۴. تماس: ۰۹۱۲ ۲۸۱ ۵۱۸۹
- canonical: https://qazvintasvir.ir/
- keywords: قزوین تصویر, سعید امین‌زاده, بازرگانی قزوین, واردات و صادرات, ترخیص گمرکی, ترابری کارخانجات قزوین, سرویس ایاب و ذهاب پرسنل, ناوگان ترابری, اتوبوس سرویس پرسنل, مینی‌بوس, ون مسافربری, تأمین غذای پرسنل, کیترینگ سازمانی, وعده‌های سازمانی, غذای کارخانه, پیمان‌کاری غذای پرسنل, صبحانه و ناهار سازمانی, شهرک صنعتی کاسپین, شهرک صنعتی البرز
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/", "title": "قزوین تصویر | بازرگانی، واردات و صادرات، ترابری و تأمین غذای پرسنل", "description": "شرکت قزوین تصویر با بیش از ۳۱ سال سابقه تحت مدیریت سعید امین‌زاده؛ هشت مسیر خدمت در بازرگانی، ترخیص، تأمین صنعتی، ترابری، سرویس VIP، شاتل سازمانی، کیترینگ و مشاوره.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "ناوگان اتوبوس سرویس پرسنل شرکت قزوین تصویر", "locale": "fa_IR", "site_name": "قزوین تصویر"}`
- Twitter: `{"card": "summary_large_image", "title": "قزوین تصویر | بازرگانی، ترابری و تأمین غذای پرسنل", "description": "شرکت قزوین تصویر (شناسه ۱۰۸۶۱۴۱۵۲۱۵) — هشت مسیر خدمت تخصصی در بازرگانی، ترخیص، تأمین صنعتی، ترابری، کیترینگ و مشاوره با مدیریت سعید امین‌زاده.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "ناوگان اتوبوس سرویس پرسنل شرکت قزوین تصویر"}`
- hreflang `fa` → `https://qazvintasvir.ir/`
- hreflang `en` → `https://qazvintasvir.ir/en/`
- hreflang `x-default` → `https://qazvintasvir.ir/`
### `en/index.html`
- title: Qazvin Tasvir Company | Trading, Import & Export, Transport and Staff Catering — Founded 1995
- description: Qazvin Tasvir Company (National ID 10861415215), managed by Saeed Aminzadeh: eight specialist services spanning permitted trade, customs, industrial sourcing, staff transport, VIP mobility, corporate shuttles, catering and trade consulting. Founded 1995. Phone: 0912 281 5189
- canonical: https://qazvintasvir.ir/en/
- keywords: Qazvin Tasvir, Saeed Aminzadeh, Qazvin trading company, import and export, customs clearance, factory transport Qazvin, staff shuttle service, transport fleet, staff bus service, minibus, passenger van, staff catering, corporate catering, corporate meals, factory meals, staff meal contracting, corporate breakfast and lunch, Caspian Industrial Park, Alborz Industrial Park
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/en/", "title": "Qazvin Tasvir Company | Trading, Import & Export, Transport and Staff Catering", "description": "Qazvin Tasvir Company, with more than 31 years of experience under the management of Saeed Aminzadeh: eight specialist paths across trade, customs, sourcing, transport, VIP mobility, corporate shuttles, catering and consulting.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "Qazvin Tasvir Company staff bus fleet", "locale": "en_US", "site_name": "Qazvin Tasvir Company"}`
- Twitter: `{"card": "summary_large_image", "title": "Qazvin Tasvir Company | Trading, Transport and Staff Catering", "description": "Qazvin Tasvir Company (ID 10861415215) — eight specialist service paths in trade, customs, sourcing, transport, catering and consulting, managed by Saeed Aminzadeh.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "Qazvin Tasvir Company staff bus fleet"}`
- hreflang `fa` → `https://qazvintasvir.ir/`
- hreflang `en` → `https://qazvintasvir.ir/en/`
- hreflang `x-default` → `https://qazvintasvir.ir/`
### `services/index.html`
- title: خدمات تخصصی | قزوین تصویر
- description: هشت صفحه مستقل خدمات شرکت قزوین تصویر در حوزه بازرگانی، ترابری و تأمین غذای سازمانی.
- canonical: https://qazvintasvir.ir/services/
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/", "title": "خدمات تخصصی | قزوین تصویر", "description": "هشت صفحه مستقل خدمات شرکت قزوین تصویر در حوزه بازرگانی، ترابری و تأمین غذای سازمانی.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/`
- hreflang `x-default` → `https://qazvintasvir.ir/services/`
### `services/customs-port.html`
- title: ترخیص گمرکی و امور بندری | قزوین تصویر
- description: خدمات ترخیص گمرکی و امور بندری قزوین تصویر؛ کنترل مدارک، هماهنگی مراحل پرونده و پیگیری عملیات اجرایی.
- canonical: https://qazvintasvir.ir/services/customs-port.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/customs-port.html", "title": "ترخیص گمرکی و امور بندری | قزوین تصویر", "description": "خدمات ترخیص گمرکی و امور بندری قزوین تصویر؛ کنترل مدارک، هماهنگی مراحل پرونده و پیگیری عملیات اجرایی.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/customs-port.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/customs-port.html`
### `services/factory-transport.html`
- title: ترابری پرسنل کارخانجات | قزوین تصویر
- description: خدمات ترابری پرسنل کارخانجات قزوین تصویر؛ طراحی مسیر، سرویس شیفتی، ناوگان اتوبوس، مینی‌بوس و ون.
- canonical: https://qazvintasvir.ir/services/factory-transport.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/factory-transport.html", "title": "ترابری پرسنل کارخانجات | قزوین تصویر", "description": "خدمات ترابری پرسنل کارخانجات قزوین تصویر؛ طراحی مسیر، سرویس شیفتی، ناوگان اتوبوس، مینی‌بوس و ون.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/factory-transport.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/factory-transport.html`
### `services/import-export.html`
- title: واردات و صادرات کالاهای مجاز | قزوین تصویر
- description: صفحه خدمات واردات و صادرات کالاهای مجاز شرکت قزوین تصویر؛ بررسی نیاز، هماهنگی خرید، اسناد و حمل بین‌المللی.
- canonical: https://qazvintasvir.ir/services/import-export.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/import-export.html", "title": "واردات و صادرات کالاهای مجاز | قزوین تصویر", "description": "صفحه خدمات واردات و صادرات کالاهای مجاز شرکت قزوین تصویر؛ بررسی نیاز، هماهنگی خرید، اسناد و حمل بین‌المللی.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/import-export.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/import-export.html`
### `services/index.html`
- title: خدمات تخصصی | قزوین تصویر
- description: هشت صفحه مستقل خدمات شرکت قزوین تصویر در حوزه بازرگانی، ترابری و تأمین غذای سازمانی.
- canonical: https://qazvintasvir.ir/services/
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/", "title": "خدمات تخصصی | قزوین تصویر", "description": "هشت صفحه مستقل خدمات شرکت قزوین تصویر در حوزه بازرگانی، ترابری و تأمین غذای سازمانی.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/`
- hreflang `x-default` → `https://qazvintasvir.ir/services/`
### `services/personnel-food.html`
- title: تأمین غذای پرسنل و وعده‌های سازمانی | قزوین تصویر
- description: خدمات تأمین غذای پرسنل و وعده‌های سازمانی قزوین تصویر؛ منوی چرخشی، آشپزخانه بهداشتی و توزیع در محل.
- canonical: https://qazvintasvir.ir/services/personnel-food.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/personnel-food.html", "title": "تأمین غذای پرسنل و وعده‌های سازمانی | قزوین تصویر", "description": "خدمات تأمین غذای پرسنل و وعده‌های سازمانی قزوین تصویر؛ منوی چرخشی، آشپزخانه بهداشتی و توزیع در محل.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/personnel-food.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/personnel-food.html`
### `services/school-office.html`
- title: سرویس مدارس، ادارات و شرکت‌ها | قزوین تصویر
- description: خدمات سرویس مدارس، ادارات و شرکت‌ها توسط قزوین تصویر؛ برنامه‌ریزی مسیر، زمان‌بندی و ناوگان متناسب.
- canonical: https://qazvintasvir.ir/services/school-office.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/school-office.html", "title": "سرویس مدارس، ادارات و شرکت‌ها | قزوین تصویر", "description": "خدمات سرویس مدارس، ادارات و شرکت‌ها توسط قزوین تصویر؛ برنامه‌ریزی مسیر، زمان‌بندی و ناوگان متناسب.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/school-office.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/school-office.html`
### `services/sourcing.html`
- title: تأمین مواد اولیه و تجهیزات | قزوین تصویر
- description: خدمات تأمین مواد اولیه و تجهیزات صنعتی قزوین تصویر؛ نیازسنجی، بررسی تأمین‌کنندگان و هماهنگی خرید و حمل.
- canonical: https://qazvintasvir.ir/services/sourcing.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/sourcing.html", "title": "تأمین مواد اولیه و تجهیزات | قزوین تصویر", "description": "خدمات تأمین مواد اولیه و تجهیزات صنعتی قزوین تصویر؛ نیازسنجی، بررسی تأمین‌کنندگان و هماهنگی خرید و حمل.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/sourcing.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/sourcing.html`
### `services/trade-consulting.html`
- title: مشاوره بازرگانی و گشایش | قزوین تصویر
- description: خدمات مشاوره بازرگانی و گشایش قزوین تصویر؛ بررسی مسیر تجارت، اسناد، هماهنگی ارزی و اعتبارات بر اساس پرونده.
- canonical: https://qazvintasvir.ir/services/trade-consulting.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/trade-consulting.html", "title": "مشاوره بازرگانی و گشایش | قزوین تصویر", "description": "خدمات مشاوره بازرگانی و گشایش قزوین تصویر؛ بررسی مسیر تجارت، اسناد، هماهنگی ارزی و اعتبارات بر اساس پرونده.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/trade-consulting.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/trade-consulting.html`
### `services/urban-vip.html`
- title: حمل‌ونقل درون‌شهری و سرویس‌های VIP | قزوین تصویر
- description: خدمات حمل‌ونقل درون‌شهری و سرویس‌های VIP قزوین تصویر؛ جابه‌جایی مدیران، مهمانان و گروه‌های سازمانی.
- canonical: https://qazvintasvir.ir/services/urban-vip.html
- keywords: —
- OG: `{"type": "website", "url": "https://qazvintasvir.ir/services/urban-vip.html", "title": "حمل‌ونقل درون‌شهری و سرویس‌های VIP | قزوین تصویر", "description": "خدمات حمل‌ونقل درون‌شهری و سرویس‌های VIP قزوین تصویر؛ جابه‌جایی مدیران، مهمانان و گروه‌های سازمانی.", "image": "https://qazvintasvir.ir/assets/images/og-image.jpg", "image:alt": "—", "locale": "fa_IR", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`
- hreflang `fa` → `https://qazvintasvir.ir/services/urban-vip.html`
- hreflang `x-default` → `https://qazvintasvir.ir/services/urban-vip.html`
### `404.html`
- title: ۴۰۴ — صفحه پیدا نشد | قزوین تصویر
- description: صفحه‌ای که به دنبال آن بودید پیدا نشد. به صفحه اصلی شرکت قزوین تصویر بازگردید.
- canonical: —
- keywords: —
- OG: `{"type": "—", "url": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—", "locale": "—", "site_name": "—"}`
- Twitter: `{"card": "—", "title": "—", "description": "—", "image": "—", "image:alt": "—"}`

## ۵) Schema.org

Schema.org JSON-LD موجود و تعهدات حفظ:
- `index.html`: Organization, LocalBusiness, Person, PostalAddress, GeoCoordinates, OpeningHoursSpecification, Country, OfferCatalog, Offer, Service
- `en/index.html`: Organization, LocalBusiness, Person, PostalAddress, GeoCoordinates, OpeningHoursSpecification, Country, OfferCatalog, Offer, Service
- `services/index.html`: ItemList, ListItem
- `services/customs-port.html`: Service, Organization, Country
- `services/factory-transport.html`: Service, Organization, Country
- `services/import-export.html`: Service, Organization, Country
- `services/index.html`: ItemList, ListItem
- `services/personnel-food.html`: Service, Organization, Country
- `services/school-office.html`: Service, Organization, Country
- `services/sourcing.html`: Service, Organization, Country
- `services/trade-consulting.html`: Service, Organization, Country
- `services/urban-vip.html`: Service, Organization, Country
- `404.html`: JSON-LD ندارد/قابل استخراج نبود

### جزئیات Organization/LocalBusiness صفحهٔ فارسی
- کلیدهای سطح اول: @context, @type, name, alternateName, url, logo, image, description, identifier, taxID, foundingDate, founder, employee, telephone, address, geo, openingHoursSpecification, areaServed, knowsAbout, hasOfferCatalog, sameAs
- مشخصات حساس/ساختاری: نام و نام جایگزین؛ URL/لوگو/تصویر؛ شرح؛ شناسهٔ ملی `10861415215`؛ شناسهٔ مالیاتی `411386837665`؛ تاریخ تأسیس `1995-05-04`؛ بنیان‌گذار و کارکنان/سمت‌ها؛ تلفن `+989122815189`؛ آدرس و کدپستی `3413691589`؛ مختصات `36.2687, 50.0041`؛ ساعت کاری شنبه تا پنجشنبه 08:00–20:00؛ ناحیهٔ خدمت ایران؛ knowsAbout و catalog خدمات.

## ۶) تصاویر و دارایی‌های رسانه‌ای

تمام فایل‌های تصویری زیر در source repository موجودند. جفت JPG/WebPها هر دو asset منبع‌اند و حذف یکی از آن‌ها پیش از بررسی همهٔ referenceها مجاز نیست. همچنین PDF رزومه، SVGها و فونت‌های محلی در مهاجرت asset محسوب می‌شوند.

- `assets/images/brand/qazvin-tasvir-apple-touch.png`
- `assets/images/brand/qazvin-tasvir-favicon.png`
- `assets/images/brand/qazvin-tasvir-icon-32.png`
- `assets/images/brand/qazvin-tasvir-lockup.png`
- `assets/images/brand/qazvin-tasvir-mark.png`
- `assets/images/bus-fleet.jpg`
- `assets/images/bus-fleet.webp`
- `assets/images/clients/agt.png`
- `assets/images/clients/alborz-cable.png`
- `assets/images/clients/alkaplastik.png`
- `assets/images/clients/asanpack.png`
- `assets/images/clients/bat.png`
- `assets/images/clients/goldiran.png`
- `assets/images/clients/henkel.png`
- `assets/images/clients/lg.png`
- `assets/images/clients/nestle.png`
- `assets/images/clients/sahar.png`
- `assets/images/clients/unilever.png`
- `assets/images/clients/yataqan-bosh.png`
- `assets/images/karensoft/mark.png`
- `assets/images/karensoft/wordmark-en.png`
- `assets/images/karensoft/wordmark-fa.png`
- `assets/images/logo.svg`
- `assets/images/logo_qazvin_tasvir.jpg`
- `assets/images/minibus-fleet.jpg`
- `assets/images/minibus-fleet.webp`
- `assets/images/og-image.jpg`
- `assets/images/og-image.svg`
- `assets/images/qazvin_tasvir.png`
- `assets/images/saeed-aminzadeh-avatar.jpg`
- `assets/images/saeed-aminzadeh-avatar.webp`
- `assets/images/saeed-aminzadeh.webp`
- `assets/images/van-fleet.jpg`
- `assets/images/van-fleet.webp`
- `assets/img/fleet-specs/fleet-photo-01.jpg`
- `assets/img/fleet-specs/fleet-photo-01.webp`
- `assets/img/fleet-specs/fleet-photo-02.jpg`
- `assets/img/fleet-specs/fleet-photo-02.webp`
- `assets/img/fleet-specs/fleet-photo-03.jpg`
- `assets/img/fleet-specs/fleet-photo-03.webp`
- `assets/img/fleet-specs/fleet-photo-04.jpg`
- `assets/img/fleet-specs/fleet-photo-04.webp`
- `assets/img/fleet-specs/fleet-photo-05.jpg`
- `assets/img/fleet-specs/fleet-photo-05.webp`
- `assets/img/fleet-specs/fleet-photo-06.jpg`
- `assets/img/fleet-specs/fleet-photo-06.webp`
- `assets/img/fleet-specs/fleet-photo-07.jpg`
- `assets/img/fleet-specs/fleet-photo-07.webp`
- `assets/img/fleet-specs/fleet-photo-08.jpg`
- `assets/img/fleet-specs/fleet-photo-08.webp`
- `assets/img/fleet-specs/vip-catering.jpg`
- `assets/img/fleet-specs/vip-catering.webp`
- `assets/img/fleet-specs/vip-seats.jpg`
- `assets/img/fleet-specs/vip-seats.webp`
- `assets/img/personnel-food/buffet-setup.jpg`
- `assets/img/personnel-food/buffet-setup.webp`
- `assets/img/personnel-food/catering-menu.jpg`
- `assets/img/personnel-food/catering-menu.webp`
- `assets/img/personnel-food/dishes/chelojoojeh-zaferani.jpg`
- `assets/img/personnel-food/dishes/chelojoojeh-zaferani.webp`
- `assets/img/personnel-food/dishes/chelokebab-koobideh.jpg`
- `assets/img/personnel-food/dishes/chelokebab-koobideh.webp`
- `assets/img/personnel-food/dishes/dessert-fresh.jpg`
- `assets/img/personnel-food/dishes/dessert-fresh.webp`
- `assets/img/personnel-food/dishes/dry-pack.jpg`
- `assets/img/personnel-food/dishes/dry-pack.webp`
- `assets/img/personnel-food/dishes/fish-ghazel-ala.jpg`
- `assets/img/personnel-food/dishes/fish-ghazel-ala.webp`
- `assets/img/personnel-food/dishes/fruit-pack.jpg`
- `assets/img/personnel-food/dishes/fruit-pack.webp`
- `assets/img/personnel-food/dishes/gheymeh-bademjan.jpg`
- `assets/img/personnel-food/dishes/gheymeh-bademjan.webp`
- `assets/img/personnel-food/dishes/ghormeh-sabzi.jpg`
- `assets/img/personnel-food/dishes/ghormeh-sabzi.webp`
- `assets/img/personnel-food/dishes/halim.jpg`
- `assets/img/personnel-food/dishes/halim.webp`
- `assets/img/personnel-food/dishes/kuku-sabzi.jpg`
- `assets/img/personnel-food/dishes/kuku-sabzi.webp`
- `assets/img/personnel-food/dishes/light-breakfast.jpg`
- `assets/img/personnel-food/dishes/light-breakfast.webp`
- `assets/img/personnel-food/dishes/omelette-tomato.jpg`
- `assets/img/personnel-food/dishes/omelette-tomato.webp`
- `assets/img/personnel-food/dishes/sandwich-chicken-grill.jpg`
- `assets/img/personnel-food/dishes/sandwich-chicken-grill.webp`
- `assets/img/personnel-food/dishes/sangak-cheese.jpg`
- `assets/img/personnel-food/dishes/sangak-cheese.webp`
- `assets/img/personnel-food/dishes/soup-joo.jpg`
- `assets/img/personnel-food/dishes/soup-joo.webp`
- `assets/img/personnel-food/dishes/zereshk-polo-morgh.jpg`
- `assets/img/personnel-food/dishes/zereshk-polo-morgh.webp`
- `assets/img/personnel-food/food-delivery.jpg`
- `assets/img/personnel-food/food-delivery.webp`
- `assets/img/personnel-food/hero-kitchen.jpg`
- `assets/img/personnel-food/hero-kitchen.webp`
- `assets/img/personnel-food/hygienic-kitchen.jpg`
- `assets/img/personnel-food/hygienic-kitchen.webp`
- `assets/img/personnel-food/menu-breakfast.jpg`
- `assets/img/personnel-food/menu-breakfast.webp`
- `assets/img/personnel-food/menu-dinner.jpg`
- `assets/img/personnel-food/menu-dinner.webp`
- `assets/img/personnel-food/menu-lunch.jpg`
- `assets/img/personnel-food/menu-lunch.webp`
- `assets/img/personnel-food/menu-snack.jpg`
- `assets/img/personnel-food/menu-snack.webp`
- `assets/img/personnel-food/personnel-meal.jpg`
- `assets/img/personnel-food/personnel-meal.webp`
- `assets/img/sections/about-office.jpg`
- `assets/img/sections/about-office.webp`
- `assets/img/sections/contact-city.jpg`
- `assets/img/sections/contact-city.webp`
- `assets/img/sections/hero-graphic.jpg`
- `assets/img/sections/hero-graphic.png`
- `assets/img/sections/hero-graphic.webp`
- `assets/img/sections/hero-port.jpg`
- `assets/img/sections/hero-port.webp`
- `assets/img/sections/trade-customs.jpg`
- `assets/img/sections/trade-customs.webp`
- `assets/img/sections/why-banner.jpg`
- `assets/img/sections/why-banner.webp`
- `assets/logos/irankhodro.svg`
- `assets/logos/iveco.svg`
- `assets/logos/mercedes.svg`
- `assets/logos/scania.svg`
- `assets/logos/volvo.svg`
- `assets/icons/navigation-sprite.svg`

### فایل‌های غیرتصویری مهم
- `assets/docs/qazvin-tasvir-company-resume.pdf` — رزومهٔ شرکت.
- `assets/fonts/vazirmatn-arabic-wght-normal.woff2`, `vazirmatn-latin-wght-normal.woff2`, `inter-latin-wght-normal.woff2` و دو فایل license — فونت‌های محلی.
- `assets/icons/navigation-sprite.svg` و پنج SVG خودروساز در `assets/logos/` — آیکون/لوگو.
- تصاویر برند در `assets/images/brand/` شامل favicon، touch icon، mark، lockup و آیکون 32px.

## ۷) لینک‌ها و مقصدها

این فهرست مقصدهای literal از HTMLهای صفحه‌ای را پوشش می‌دهد؛ لینک‌های تولیدشده از داده‌ها نیز در URLهای ۸ خدمت و دادهٔ generator بالا هستند.
### `index.html`
- `#about`
- `#brands`
- `#clients`
- `#contact`
- `#fleet`
- `#hero`
- `#legal`
- `#main-content`
- `#resume`
- `#services`
- `#trust`
- `#why-us`
- `./`
- `assets/css/nav/nav-base.css`
- `assets/css/nav/nav-sidebar.css`
- `assets/css/nav/nav-tokens.css`
- `assets/css/style.css`
- `assets/docs/qazvin-tasvir-company-resume.pdf`
- `assets/fonts/vazirmatn-arabic-wght-normal.woff2`
- `assets/images/brand/qazvin-tasvir-apple-touch.png`
- `assets/images/brand/qazvin-tasvir-icon-32.png`
- `assets/img/sections/hero-port.webp`
- `en/`
- `https://qazvintasvir.ir/`
- `https://qazvintasvir.ir/en/`
- `https://rasmio.com/company/10861415215/قزوین-تصویر/`
- `https://wa.me/989122815189`
- `https://www.karen-soft.ir`
- `services/customs-port.html`
- `services/factory-transport.html`
- `services/import-export.html`
- `services/index.html`
- `services/personnel-food.html`
- `services/school-office.html`
- `services/sourcing.html`
- `services/trade-consulting.html`
- `services/urban-vip.html`
- `tel:+989122815189`
### `en/index.html`
- `#about`
- `#brands`
- `#clients`
- `#contact`
- `#fleet`
- `#hero`
- `#legal`
- `#main-content`
- `#resume`
- `#services`
- `#trust`
- `#why-us`
- `../`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/style.css`
- `../assets/docs/qazvin-tasvir-company-resume.pdf`
- `../assets/fonts/vazirmatn-arabic-wght-normal.woff2`
- `../assets/images/brand/qazvin-tasvir-apple-touch.png`
- `../assets/images/brand/qazvin-tasvir-icon-32.png`
- `../assets/img/sections/hero-port.webp`
- `../services/customs-port.html`
- `../services/factory-transport.html`
- `../services/import-export.html`
- `../services/index.html`
- `../services/personnel-food.html`
- `../services/school-office.html`
- `../services/sourcing.html`
- `../services/trade-consulting.html`
- `../services/urban-vip.html`
- `./`
- `https://qazvintasvir.ir/`
- `https://qazvintasvir.ir/en/`
- `https://rasmio.com/company/10861415215/قزوین-تصویر/`
- `https://wa.me/989122815189`
- `https://www.karen-soft.ir`
- `tel:+989122815189`
### `services/index.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/sections/hero-graphic.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/customs-port.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/sections/trade-customs.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/customs-port.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/factory-transport.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/images/bus-fleet.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/factory-transport.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/import-export.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/sections/hero-port.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/import-export.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/personnel-food.html`
- `#food-request`
- `#main-content`
- `../assets/css/food-service.css`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/personnel-food/hero-kitchen.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/personnel-food.html`
- `https://wa.me/989122815189`
- `https://wa.me/989122815189?text=%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%20%D9%82%D8%B1%D8%A7%D8%B1%D8%AF%D8%A7%D8%AF%20%D8%AA%D8%A3%D9%85%DB%8C%D9%86%20%D8%BA%D8%B0%D8%A7%DB%8C%20%D9%BE%D8%B1%D8%B3%D9%86%D9%84`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `tel:+989122815189`
- `trade-consulting.html`
- `urban-vip.html`
### `services/school-office.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/images/minibus-fleet.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/school-office.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/sourcing.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/sections/trade-customs.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/sourcing.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/trade-consulting.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/sections/about-office.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/trade-consulting.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `services/urban-vip.html`
- `#main-content`
- `../assets/css/nav/nav-base.css`
- `../assets/css/nav/nav-sidebar.css`
- `../assets/css/nav/nav-tokens.css`
- `../assets/css/service-pages.css`
- `../assets/images/brand/qazvin-tasvir-favicon.png`
- `../assets/img/fleet-specs/vip-catering.webp`
- `../index.html`
- `../index.html#about`
- `../index.html#brands`
- `../index.html#contact`
- `../index.html#fleet`
- `../index.html#resume`
- `customs-port.html`
- `factory-transport.html`
- `https://qazvintasvir.ir/services/urban-vip.html`
- `import-export.html`
- `index.html`
- `personnel-food.html`
- `school-office.html`
- `sourcing.html`
- `trade-consulting.html`
- `urban-vip.html`
### `404.html`
- `./`
- `./#contact`
- `assets/css/nav/nav-base.css`
- `assets/css/nav/nav-sidebar.css`
- `assets/css/nav/nav-tokens.css`
- `assets/css/service-pages.css`
- `index.html`
- `services/customs-port.html`
- `services/factory-transport.html`
- `services/import-export.html`
- `services/index.html`
- `services/personnel-food.html`
- `services/school-office.html`
- `services/sourcing.html`
- `services/trade-consulting.html`
- `services/urban-vip.html`

## ۸) فایل‌های محتوایی و tooling مرتبط

- `i18n/GLOSSARY.md` — واژه‌نامه/ترجمه/worksheet
- `i18n/README.md` — واژه‌نامه/ترجمه/worksheet
- `i18n/en.json` — واژه‌نامه/ترجمه/worksheet
- `i18n/strings.fa.json` — واژه‌نامه/ترجمه/worksheet
- `i18n/worksheet.csv` — واژه‌نامه/ترجمه/worksheet
- `tools/brand-og-image.py` — generator/checker/محتوای کمکی
- `tools/build-fleet-specs-assets.py` — generator/checker/محتوای کمکی
- `tools/build-i18n-site.py` — generator/checker/محتوای کمکی
- `tools/build-karensoft-assets.py` — generator/checker/محتوای کمکی
- `tools/build-qazvin-logo.py` — generator/checker/محتوای کمکی
- `tools/build-service-pages.py` — generator/checker/محتوای کمکی
- `tools/check-css-direction.py` — generator/checker/محتوای کمکی
- `tools/check-html.py` — generator/checker/محتوای کمکی
- `tools/check-no-content-drift.py` — generator/checker/محتوای کمکی
- `tools/extract-i18n-strings.py` — generator/checker/محتوای کمکی
- `tools/i18n_core.py` — generator/checker/محتوای کمکی
- `tools/personnel-food-detail.html` — generator/checker/محتوای کمکی
- `tools/smoke-test.mjs` — generator/checker/محتوای کمکی

## ۹) نکات حفظ محتوا و ابهام‌های نیازمند تأیید

- صفحهٔ اصلی فارسی و انگلیسی هرکدام ۱۱ بخش اصلی و متن‌های متعدد دارند؛ انتقال نباید صرفاً به محتوای نمونه/خلاصه محدود شود.
- صفحهٔ `personnel-food` حجم ویژه دارد: منو، چهار دسته وعده، ۱۶ تصویر غذا، گالری، FAQ، درخواست قرارداد/فرم و رفتارهای تب‌محور/تعاملات. نسخهٔ فارسی با source تطبیق داده شده است؛ نسخهٔ انگلیسی اکنون ساختار متناظر و ترجمه‌شده با ۱۶ کارت غذا، چهار تب، شش تصویر گالری، فرم و چهار FAQ دارد و تست‌ها آن را کنترل می‌کنند.
- source فعلی خودش لینک hash قدیمی را به صفحات مستقل خدمات هدایت می‌کند؛ URLها و hashهای قدیمی در BEHAVIOR-INVENTORY آمده‌اند.
- canonical فعلی HTMLها روی `https://qazvintasvir.ir` است؛ مقصد canonical نهایی و وضعیت اتصال دامنه در فاز ۵ باید با تأیید صریح کاربر انتخاب شود. تا آن زمان از URL آزمایشی GitHub Pages مخزن فعال استفاده می‌شود.
- snapshot کامل source (شامل HTML، CSS، JS، تصاویر، فونت‌ها، PDF رزومه، ترجمه‌ها و ابزارها) در `_legacy/source-snapshot/` نگهداری شده است. این آرشیو برای مقایسه/بازگشت است و در build جدید به‌عنوان صفحهٔ قابل انتشار استفاده نمی‌شود.
- مسیرهای قدیمی، hashها، تصاویر و Schema باید در گزارش نهایی map شوند؛ هیچ متن/تصویر/دادهٔ ساختاری را حذف‌شده تلقی نکنید.

## ۱۰) وضعیت پیاده‌سازی مهاجرت در Qazvintasvir

- صفحه‌های خانهٔ `/fa/` و `/en/` اکنون شامل شناسه‌های اصلی source (`hero`, `about`, `services`, `fleet`, `brands`, `why-us`, `clients`, `trust`, `resume`, `legal`, `contact`) هستند.
- بخش‌های ناوگان/برندها شامل پنج لوگوی سازنده؛ بخش مشتریان شامل ۱۲ نشان، سه testimonial و جدول ۱۱ ردیف سابقهٔ همکاری است. داده‌ها با متن و دارایی‌های source تطبیق داده شده‌اند.
- صفحهٔ فارسی `/fa/services/personnel-food/` از بخش کامل source (۱۰۱۷ خط HTML) مهاجرت داده شده و ۱۶ کارت غذا، چهار تب وعده، گالری، فرم قرارداد و FAQ را حفظ می‌کند. نسخهٔ انگلیسی `/en/services/personnel-food/` نیز اکنون component اختصاصی با منوی ترجمه‌شده (۱۶ کارت، چهار تب)، شش تصویر گالری، فرم قرارداد، FAQ و metadata/schema انگلیسی دارد. فایل‌های فعال: `src/content/food/personnel-food-fa.html`, `src/components/food/PersonnelFoodSectionEn.astro`, `src/scripts/food-service.js`; stylesheet مشترک و محدود به صفحه در `src/styles/food-service.css`.
- URLهای legacy `/services/` و `/services/{slug}.html` به HTMLهای ایستا در `public/services/` منتقل می‌شوند؛ generator آن‌ها `scripts/generate-legacy-redirects.mjs` است و fragmentهای فهرست‌شده در `BEHAVIOR-INVENTORY.md` در مقصد جدید حفظ/نگاشت می‌شوند.
- URL ریشهٔ `/` اکنون با slash صحیح به `/fa/` می‌رود؛ sitemap فقط مسیرهای محتوایی اصلی را می‌گیرد، نه redirectهای ریشه/legacy.
- فونت‌های local در build از assetهای `src/assets/fonts/` بسته‌بندی می‌شوند؛ تم‌های light/dark/ocean و انتخاب کاربر از `localStorage` در Header حفظ شده‌اند.
- تست‌های smoke مبتنی بر Node در `tests/static-output.test.mjs` و workflow در `.github/workflows/ci.yml` مسیرها، تعداد کلیدی محتوا، assetها، redirectها و sitemap را بررسی می‌کنند.
- متن فعال و metadata هشت سند انگلیسی در `src/content/services/en/` ترجمه/تکمیل شده‌اند؛ schemaهای Organization و Service نیز برای انگلیسی localized هستند. هنوز لازم است محتوای اختصاصی هر هشت صفحه با generator و HTMLهای قدیمی snapshot سطر‌به‌سطر تطبیق داده شود؛ ترجمهٔ انگلیسی صفحهٔ غذا نیز باید با جزئیات metadata/schema منبع بازبینی نهایی شود. این milestone پایان بازنویسی نیست.
- دامنهٔ canonical در `astro.config.mjs` همچنان provisional است؛ انتخاب/تغییر دامنهٔ نهایی تا تأیید صریح کاربر انجام نمی‌شود. `public/robots.txt` هنوز دستور sitemap منبع (`https://qazvintasvir.ir/sitemap.xml`) را دارد، درحالی‌که build فعلی `sitemap-index.xml` تولید می‌کند؛ پس از تأیید دامنه باید آدرس sitemap نیز با خروجی واقعی هماهنگ شود، بدون تغییر دامنه پیش از تأیید.
