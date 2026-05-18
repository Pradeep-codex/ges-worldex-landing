import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "statsSection",
      title: "Stats Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Exhibition Metrics",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "headline",
          title: "Headline Lines",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          initialValue: [
            "Expand Your Reach.",
            "Elevate Your Brand.",
            "Multiply Opportunities.",
          ],
          validation: (rule) => rule.required().min(1).max(4),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          initialValue:
            "A Platform that's Built for Scale, Visibility & Business Impact.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "number",
                  validation: (rule) => rule.required().min(0),
                }),
                defineField({
                  name: "suffix",
                  title: "Suffix",
                  type: "string",
                  description: "Examples: +, K+, M+",
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  value: "value",
                  suffix: "suffix",
                },
                prepare({ title, value, suffix }) {
                  return {
                    title,
                    subtitle: `${value ?? 0}${suffix ?? ""}`,
                  };
                },
              },
            }),
          ],
          initialValue: [
            { value: 400, suffix: "+", label: "Exhibitions" },
            { value: 4, suffix: "K+", label: "Brands" },
            { value: 10, suffix: "M+", label: "Products" },
            { value: 100, suffix: "K+", label: "Visitors" },
          ],
          validation: (rule) => rule.required().min(1).max(4),
        }),
      ],
    }),
    defineField({
      name: "heroSection",
      title: "Hero Slider",
      type: "object",
      fields: [
        defineField({
          name: "slides",
          title: "Slides",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                defineField({ name: "edition", title: "Edition", type: "string" }),
                defineField({ name: "date", title: "Date", type: "string" }),
                defineField({ name: "venue", title: "Venue", type: "string" }),
                defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "Home About / Vision Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titlePrefix", title: "Title Prefix", type: "string" }),
        defineField({ name: "titleSuffix", title: "Title Suffix", type: "string" }),
        defineField({
          name: "rotatingPhrases",
          title: "Rotating Phrases",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({
          name: "bullets",
          title: "Bullets",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "cta", title: "CTA", type: "link" }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [defineArrayMember({ type: "imageWithAlt" })],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),
    defineField({
      name: "exhibitionCategoriesSection",
      title: "Exhibition Categories Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "categories",
          title: "Categories",
          type: "array",
          of: [defineArrayMember({ type: "simpleCard" })],
        }),
      ],
    }),
    defineField({
      name: "whySection",
      title: "Why Exhibit / Visit Section",
      type: "object",
      fields: [
        defineField({
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "key",
                  title: "Key",
                  type: "string",
                  options: { list: ["exhibit", "visit"] },
                }),
                defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                defineField({
                  name: "highlights",
                  title: "Highlights",
                  type: "array",
                  of: [defineArrayMember({ type: "stat" })],
                }),
                defineField({
                  name: "points",
                  title: "Points",
                  type: "array",
                  of: [defineArrayMember({ type: "simpleCard" })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "upcomingCitiesSection",
      title: "Upcoming Cities Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "cities",
          title: "Cities",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "city", title: "City", type: "string" }),
                defineField({ name: "date", title: "Date", type: "string" }),
                defineField({ name: "venue", title: "Venue", type: "string" }),
                defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredVideoSection",
      title: "Featured Video Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" }),
        defineField({ name: "embedUrl", title: "Embed URL", type: "url" }),
      ],
    }),
    defineField({
      name: "gallerySection",
      title: "World Gallery Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
        subtitle: "Homepage content management",
      };
    },
  },
});
