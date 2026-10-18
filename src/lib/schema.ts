export function organizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "شرکت قزوین تصویر",
    alternateName: "قزوین تصویر",
    url: siteUrl,
    logo: `${siteUrl}/assets/images/brand/qazvin-tasvir-favicon.png`,
    image: `${siteUrl}/assets/images/og-image.svg`,
    description: "ارائه‌دهنده خدمات بازرگانی، واردات و صادرات کلیه کالاهای مجاز، ترخیص گمرکی و ترابری و سرویس ایاب و ذهاب پرسنل کارخانه‌ها و شرکت‌ها با بیش از ۳۱ سال سابقه درخشان.",
    identifier: "10861415215",
    taxID: "411386837665",
    foundingDate: "1995-05-04",
    founder: { "@type": "Person", name: "سعید امین‌زاده", jobTitle: "مدیرعامل و بنیان‌گذار" },
    employee: [
      { "@type": "Person", name: "سعید امین‌زاده", jobTitle: "مدیرعامل و عضو هیئت مدیره" },
      { "@type": "Person", name: "اصغر تقی‌لو", jobTitle: "رئیس هیئت مدیره" }
    ],
    telephone: "+989122815189",
    address: {
      "@type": "PostalAddress",
      streetAddress: "اول خیابان فردوسی، مجتمع تجاری آبادگران، طبقه ششم، اتاق ۶۰۴",
      addressLocality: "قزوین",
      addressRegion: "استان قزوین",
      postalCode: "3413691589",
      addressCountry: "IR"
    },
    geo: { "@type": "GeoCoordinates", latitude: 36.2687, longitude: 50.0041 },
    areaServed: { "@type": "Country", name: "Iran" }
  };
}

export function serviceSchema(service: { title: string; description: string; image?: string; url: string; providerUrl: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "قزوین تصویر", url: service.providerUrl },
    url: service.url,
    image: service.image,
    areaServed: { "@type": "Country", name: "Iran" }
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
      ...(item.url ? { item: item.url } : {})
    }))
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
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
      url: it.url
    }))
  };
}
