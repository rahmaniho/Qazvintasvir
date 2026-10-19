type Locale = 'fa' | 'en';

const serviceEntries: Record<Locale, Array<{ slug: string; name: string; description: string }>> = {
  fa: [
    { slug: 'import-export', name: 'واردات و صادرات کالاهای مجاز', description: 'هماهنگی مسیر تأمین، اسناد و حمل کالاهای مجاز.' },
    { slug: 'customs-port', name: 'ترخیص گمرکی و امور بندری', description: 'کنترل مدارک و هماهنگی مراحل اجرایی پرونده‌های گمرکی و بندری.' },
    { slug: 'sourcing', name: 'تأمین مواد اولیه و تجهیزات', description: 'نیازسنجی و هماهنگی تأمین، خرید و تحویل اقلام صنعتی.' },
    { slug: 'factory-transport', name: 'ترابری پرسنل کارخانجات', description: 'سرویس شیفتی کارخانه با اتوبوس، مینی‌بوس و ون.' },
    { slug: 'urban-vip', name: 'حمل‌ونقل درون‌شهری و سرویس‌های VIP', description: 'جابجایی سازمانی و VIP با برنامه‌ریزی مسیر و زمان.' },
    { slug: 'school-office', name: 'سرویس مدارس، ادارات و شرکت‌ها', description: 'راهکار رفت‌وآمد روزانه برای مجموعه‌های آموزشی و سازمانی.' },
    { slug: 'personnel-food', name: 'تأمین غذای پرسنل و وعده‌های سازمانی', description: 'تأمین صبحانه، ناهار، شام و میان‌وعده با توزیع در محل.' },
    { slug: 'trade-consulting', name: 'مشاوره بازرگانی و گشایش', description: 'بررسی مسیر پرونده، اسناد و هماهنگی‌های بازرگانی.' },
  ],
  en: [
    { slug: 'import-export', name: 'Permitted goods import and export', description: 'Supply-route, documentation and freight coordination for permitted goods.' },
    { slug: 'customs-port', name: 'Customs clearance and port affairs', description: 'Document control and operational coordination for customs and port files.' },
    { slug: 'sourcing', name: 'Raw materials and equipment sourcing', description: 'Needs assessment and coordination of industrial procurement and delivery.' },
    { slug: 'factory-transport', name: 'Factory staff transportation', description: 'Shift-based factory staff shuttle service with buses, minibuses and vans.' },
    { slug: 'urban-vip', name: 'Urban transport and VIP services', description: 'Planned organisational and VIP mobility with route and schedule coordination.' },
    { slug: 'school-office', name: 'School, office and company shuttles', description: 'Daily mobility solutions for educational and organisational groups.' },
    { slug: 'personnel-food', name: 'Staff meals and corporate catering', description: 'Breakfast, lunch, dinner and snacks prepared and delivered to the workplace.' },
    { slug: 'trade-consulting', name: 'Trade consulting and opening', description: 'File, documentation and trade coordination advice for the next practical step.' },
  ],
};

export function organizationSchema(siteUrl: string, lang: Locale = 'fa') {
  const isFa = lang === 'fa';
  const entries = serviceEntries[lang];
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: isFa ? "شرکت قزوین تصویر" : "Qazvin Tasvir Company",
    alternateName: isFa ? "قزوین تصویر" : ["Qazvin Tasvir", "قزوین تصویر"],
    url: siteUrl,
    logo: `${siteUrl}/assets/images/brand/qazvin-tasvir-favicon.png`,
    image: `${siteUrl}/assets/images/og-image.svg`,
    description: isFa
      ? "ارائه‌دهنده خدمات بازرگانی، واردات و صادرات کلیه کالاهای مجاز، ترخیص گمرکی و ترابری و سرویس ایاب و ذهاب پرسنل کارخانه‌ها و شرکت‌ها با بیش از ۳۱ سال سابقه درخشان."
      : "Provider of trading, import and export services for all permitted goods, customs clearance, transport and staff shuttle services for factories and companies, with more than 31 years of proven experience.",
    identifier: "10861415215",
    taxID: "411386837665",
    foundingDate: "1995-05-04",
    founder: {
      "@type": "Person",
      name: isFa ? "سعید امین‌زاده" : "Saeed Aminzadeh",
      jobTitle: isFa ? "مدیرعامل و بنیان‌گذار" : "CEO and founder",
    },
    employee: isFa
      ? [
          { "@type": "Person", name: "سعید امین‌زاده", jobTitle: "مدیرعامل و عضو هیئت مدیره" },
          { "@type": "Person", name: "اصغر تقی‌لو", jobTitle: "رئیس هیئت مدیره" },
        ]
      : [
          { "@type": "Person", name: "Saeed Aminzadeh", jobTitle: "CEO and Board Member" },
          { "@type": "Person", name: "Asghar Taghilou", jobTitle: "Chairman of the Board" },
        ],
    telephone: ["+982832573842", "+989122815189", "+989352815189"],
    email: "qazvin.tasvir@gmail.com",
    // The office street is company-confirmed; legacy postal code/coordinates remain unverified pending updated details.
    address: isFa
      ? {
          "@type": "PostalAddress",
          streetAddress: "جنب بیمارستان پاستور، مجتمع تجاری نیایش، طبقه ۲، واحد ۲۰۸",
          addressLocality: "قزوین",
          addressRegion: "استان قزوین",
          postalCode: "3413691589",
          addressCountry: "IR",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: "Next to Pasteur Hospital, Niayesh Commercial Complex, 2nd floor, Unit 208",
          addressLocality: "Qazvin",
          addressRegion: "Qazvin Province",
          postalCode: "3413691589",
          addressCountry: "IR",
        },
    geo: { "@type": "GeoCoordinates", latitude: 36.2687, longitude: 50.0041 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "20:00",
    },
    areaServed: { "@type": "Country", name: "Iran" },
    knowsAbout: entries.map((entry) => entry.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFa ? "خدمات شرکت قزوین تصویر" : "Services of Qazvin Tasvir Company",
      itemListElement: entries.map((entry) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: entry.name,
          url: `${siteUrl}/${lang}/services/${entry.slug}/`,
          description: entry.description,
        },
      })),
    },
    sameAs: [
      "https://rasmio.com/company/10861415215/قزوین-تصویر/",
      "https://wa.me/989122815189",
    ],
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  image?: string;
  url: string;
  providerUrl: string;
  lang?: Locale;
}) {
  const isFa = service.lang !== 'en';
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: isFa ? "قزوین تصویر" : "Qazvin Tasvir Company",
      alternateName: isFa ? "قزوین تصویر" : "Qazvin Tasvir",
      url: service.providerUrl,
    },
    url: service.url,
    image: service.image,
    areaServed: { "@type": "Country", name: "Iran" },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListSchema(name: string, items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      url: it.url,
    })),
  };
}
