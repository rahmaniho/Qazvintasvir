# کلادفلر برای qazvintasvir.ir — چک‌لیست اجرایی

هدف: کاربر ایرانی بدون VPN سایت را ببیند. الان دامنه به IPهای GitHub Pages اشاره می‌کند
(`185.199.108.153` تا `185.199.111.153`) و همان بازه در ایران بلاک است. با گذاشتن کلادفلر
جلوی سایت، مرورگر کاربر به لبه‌ی کلادفلر وصل می‌شود و درخواست از آنجا به گیت‌هاب می‌رود.

> ⚠️ کلادفلر «بهترین» راه برای ایران نیست، «سریع‌ترین راه» است: بعضی ISPها ترافیک کلادفلر را
> هم کند می‌کنند. بعد از راه‌اندازی، از گره‌های ایرانی تست بگیرید؛ اگر چند ISP جواب نداد،
> مسیر مطمئن، میزبان/ CDN ایرانی است (آروان‌کلاد). سایت استاتیک است و جابه‌جایی‌اش سئو را
> به‌هم نمی‌زند.

## ۰. وضعیت فعلی دامنه (بررسی‌شده)

```
NS   qazvintasvir.ir → ines.ns.cloudflare.com , dexter.ns.cloudflare.com   ← از قبل روی کلادفلر
A    qazvintasvir.ir → 185.199.108-111.153                                   ← ابر خاکستری، همین مشکل است
MX   → route1/2/3.mx.cloudflare.net                                          ← ایمیل روی Cloudflare Email Routing
TXT  → google-site-verification=MBflR… , v=spf1 include:_spf.mx.cloudflare.net ~all
www  → بدون رکورد
```

پس **نیم‌سرورها را دست نزنید** (کار انجام شده) و رکوردهای MX/TXT را هم پاک نکنید؛ فقط پراکسی
رکوردهای A را روشن کنید. پروکسی کردن A هیچ اثری روی ایمیل ندارد.

## ۱. رکوردهای DNS

در داشبورد: دامنه → **DNS → Records**.

۱. چهار رکورد `A` با نام `@` و مقادیر `185.199.108.153`، `.109.153`، `.110.153`، `.111.153` را باز کنید
   و برای هر چهار تا **Proxy status → Proxied (ابر نارنجی)** بگذارید و Save کنید.
   اگر رکوردی نبود، با همین مقادیر و ابر نارنجی بسازید.
۲. رکورد `www` وجود ندارد؛ اضافه کنید: **Type: CNAME**، **Name: www**، **Target: qazvintasvir.ir**، **Proxied**.
۳. رکوردهای `MX`، `TXT` (تأیید Search Console و SPF) و هر رکورد ایمیل دیگر را **دست نزنید**.

بررسی: تا یک دقیقه بعد، `getent hosts qazvintasvir.ir` باید IPهای کلادفلر (`104.x` یا `172.6x`) را
نشان دهد، نه `185.199.*`.

## ۲. SSL/TLS — مهم‌ترین بخش

| تنظیم | مقدار درست | چرا |
| --- | --- | --- |
| SSL/TLS mode | **Full (strict)** | گیت‌هاب برای دامنه‌ی اختصاصی گواهی معتبر دارد. اگر **Flexible** بگذارید، حلقه‌ی ریدایرکت می‌گیرید و سایت بالا نمی‌آید. |
| Always Use HTTPS | **On** | جلوگیری از نسخه‌ی http. |
| Automatic HTTPS Rewrites | **On** | رفع محتوای مختلط. |
| Minimum TLS Version | **TLS 1.2** | سازگاری با گوشی‌های قدیمی‌تر کاربران ایرانی. |
| Opportunistic Encryption | On | بی‌ضرر. |
| HSTS | **فعلاً Off** | اگر DNS یا گواهی جایی بلنگد، HSTS دسترسی را برای همه قطع می‌کند و برگشتش سخت است. بعد از دو هفته پایداری، با `max-age=15552000` روشن کنید. |

## ۳. کش — تا گیت‌هاب کم‌تر درگیر شود

**Caching → Cache Rules** دو قانون بسازید:

**قانون ۱ — فایل‌های استاتیک** (بالاترین اولویت)

- Expression: `(starts_with(http.request.uri.path, "/assets/")) or (starts_with(http.request.uri.path, "/_astro/"))`
- Edge TTL: **1 month** · Browser TTL: **1 year** · Cache eligibility: Eligible

**قانون ۲ — HTML**

- Expression: `(http.request.uri.path.extension in {"" "html"})`
- Edge TTL: **2 hours** · Browser TTL: **respect origin** · Cache eligibility: **Eligible for cache**

> قانون ۲ یعنی HTML هم در لبه کش می‌شود. برای همین بعد از هر انتشار باید کش پاک شود؛
> این کار در workflow انجام می‌شود (بخش ۶). بدون آن، تا دو ساعت نسخه‌ی قبلی به کاربر نشان داده می‌شود.

**Speed:** Brotli **On**، Early Hints **On**.

**Bot Fight Mode: Off** — می‌تواند Googlebot و ابزارهای Search Console را هم بلاک کند و رتبه را به خطر بیندازد.

## ۴. دو چیز که نباید روشن شود

- **Cloudflare Pages / `*.pages.dev`** — در ایران فیلتر است؛ میزبانی را به آن منتقل نکنید.
- **Under Attack Mode** — برای سایت تجاری که ربات گوگل باید بخواندش سم است.

## ۵. پاک کردن کش بعد از هر انتشار (خودکار)

در مخزن این‌ها اضافه شده است:

- `scripts/purge-cloudflare-cache.mjs` — کش زون را از API پاک می‌کند.
- مرحله‌ی **Purge Cloudflare edge cache** در `.github/workflows/deploy-pages.yml`، بعد از `deploy-pages`.

فقط دو secret لازم است (**Settings → Secrets and variables → Actions**):

| Secret | از کجا |
| --- | --- |
| `CLOUDFLARE_ZONE_ID` | داشبورد کلادفلر → دامنه → **Overview** → ستون راست، `Zone ID` |
| `CLOUDFLARE_API_TOKEN` | **My Profile → API Tokens → Create Token** → قالب **Edit zone DNS** را انتخاب و دسترسی را به `Zone → Cache Purge → Purge` محدود کنید، Zone = `qazvintasvir.ir` |

تا وقتی این دو secret نباشند، مرحله با پیام `cloudflare purge skipped` رد می‌شود و دیپلوی
شکست نمی‌خورد. تست دستی:

```bash
CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ZONE_ID=… node scripts/purge-cloudflare-cache.mjs --dry-run
```

## ۶. تست بعد از راه‌اندازی

```bash
# باید IPهای کلادفلر (104.x / 172.6x) را ببینید، نه 185.199.*
getent hosts qazvintasvir.ir

# هدرها باید cf-cache-status و server: cloudflare داشته باشند
curl -sI https://qazvintasvir.ir/fa/ | grep -iE "server|cf-cache-status|strict-transport"

# ساده‌ترین تست از مرورگر خودتان: باید colo و ip کلادفلر را ببینید
# https://qazvintasvir.ir/cdn-cgi/trace

# بررسی از گره‌های ایران (بدون VPN)
# https://check-host.net/check-http?host=https://qazvintasvir.ir/fa/
```

روی برگه‌ی check-host، گره‌های تهران/مشهد/تبریز را انتخاب کنید؛ اگر همه سبز شدند کار تمام است.
اگر فقط بعضی ISPها قرمز بودند، همان‌جا تصمیم بگیرید که به میزبان ایرانی مهاجرت کنیم.

## ۷. سئو — چه چیزی تغییر می‌کند و چه چیزی نه

- آدرس‌ها، canonical، hreflang، sitemap و `lastmod` **هیچ تغییری نمی‌کنند**؛ پس رتبه جابه‌جا نمی‌شود.
- در Search Console → **Settings → Crawl stats** بعد از جابه‌جایی ممکن است چند روز خطای DNS/۵xx ببینید؛ طبیعی است.
- بعد از پایدار شدن، در Search Console یک **Validate fix** برای خطاهای موجود بزنید و همان `sitemap.xml` قبلی را دوباره submit کنید.
- رکورد `TXT` تأیید Search Console را حذف نکنید، وگرنه مالکیت دامنه از دست می‌رود.
