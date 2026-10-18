export function organizationSchema(siteUrl: string, lang: 'fa' | 'en' = 'fa') {
  const isFa = lang === 'fa';
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
      : "Qazvin Tasvir Company provides trading, permitted-goods import and export, customs coordination, staff transportation and corporate catering for organizations in Qazvin Province. Founded in 1995.",
    identifier: "10861415215",
    taxID: "411386837665",
    foundingDate: "1995-05-04",
    founder: {
      "@type": "Person",
      name: isFa ? "سعید امین‌زاده" : "Saeed Aminzadeh",
      jobTitle: isFa ? "مدیرعامل و بنیان‌گذار" : "CEO and Founder",
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
    telephone: "+989122815189",
    address: isFa
      ? {
          "@type": "PostalAddress",
          streetAddress: "اول خیابان فردوسی، مجتمع تجاری آبادگران، طبقه ششم، اتاق ۶۰۴",
          addressLocality: "قزوین",
          addressRegion: "استان قزوین",
          postalCode: "3413691589",
          addressCountry: "IR",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: "Room 604, 6th Floor, Abadgaran Commercial Complex, beginning of Ferdowsi Street",
          addressLocality: "Qazvin",
          addressRegion: "Qazvin Province",
          postalCode: "3413691589",
          addressCountry: "IR",
        },
    geo: { "@type": "GeoCoordinates", latitude: 36.2687, longitude: 50.0041 },
    areaServed: { "@type": "Country", name: "Iran" },
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  image?: string;
  url: string;
  providerUrl: string;
  lang?: 'fa' | 'en';
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
