import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "CTA", type: "link" }),
        defineField({ name: "lightImage", title: "Light Theme Image", type: "imageWithAlt" }),
        defineField({ name: "darkImage", title: "Dark Theme Image", type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "story",
      title: "Our Story",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Additional Sections",
      type: "array",
      of: [defineArrayMember({ type: "simpleCard" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
