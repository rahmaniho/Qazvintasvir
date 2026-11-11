export interface PromoSection {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  /** Numbered cards rendered as a grid. */
  cards?: Array<[string, string]>;
  /** Data table, first column rendered as a row header. */
  table?: {
    caption?: string;
    head: string[];
    rows: string[][];
  };
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
  /** Optional schematic coverage map, also emitted as an AreaServed Service node. */
  coverage?: {
    kicker: string;
    title: string;
    intro: string;
    /** Schema.org name for the coverage Service node. */
    schemaName: string;
    groups: Array<{
      label: string;
      note: string;
      areas: Array<{ name: string; detail: string }>;
    }>;
    legend: string;
    note?: { title: string; text: string };
  };
  gallery: {
    title: string;
    /** [image, alt, caption, credit?] — credit is shown when the photo is licensed externally. */
    items: Array<[string, string, string] | [string, string, string, string]>;
  };
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
