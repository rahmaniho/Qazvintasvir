import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
      title: z.string(),
      lang: z.enum(['fa','en']).optional(),
    kicker: z.string().optional(),
    tag: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string(),
    meta: z.string().optional(),
    summary: z.string().optional(),
    highlight: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    story_image: z.string().optional(),
    order: z.number().optional(),
    points: z.array(z.string()).optional(),
    metrics: z.array(z.tuple([z.string(), z.string()])).optional(),
    features: z.array(z.tuple([z.string(), z.string(), z.string()])).optional(),
    process: z.array(z.tuple([z.string(), z.string(), z.string()])).optional(),
    process_title: z.string().optional(),
    process_desc: z.string().optional(),
    details_title: z.string().optional(),
    details_body: z.string().optional(),
    details_items: z.array(z.string()).optional(),
    intro_title: z.string().optional(),
    intro: z.array(z.string()).optional(),
    aside_title: z.string().optional(),
    aside_text: z.string().optional(),
    aside_items: z.array(z.string()).optional(),
    story_kicker: z.string().optional(),
    story_title: z.string().optional(),
    story_body: z.string().optional(),
    story_items: z.array(z.string()).optional(),
    theme: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  })
});

export const collections = { services };
