export interface PromoSection {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  /** Numbered cards rendered as a grid. */
  cards?: Array<[string, string]>;
  bullets?: string[];
  note?: { title: string; text: string };
}

export interface PromoCopy {
  slug: string;
  /** Short label above the H1. */
  eyebrow: string;
  /** H1 and document title (<= 60 characters). */
  title: string;
  /** Meta description (70-160 characters). */
  description: string;
  lead: string;
  hero: [image: string, alt: string, caption: string];
  answer: [title: string, text: string];
  tocTitle: string;
  toc: Array<[string, string]>;
  sections: PromoSection[];
  gallery: { title: string; items: Array<[string, string, string]> };
  faqTitle: string;
  faqs: Array<[string, string]>;
  cta: {
    kicker: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
  relatedTitle: string;
  related: Array<[string, string]>;
  disclaimer: string;
  keywords: string[];
  labels: {
    home: string;
    articles: string;
    current: string;
    relatedKicker: string;
    sectionKicker: string;
  };
}

export interface PromoArticleMeta {
  slug: string;
  href: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  summary: string;
}
