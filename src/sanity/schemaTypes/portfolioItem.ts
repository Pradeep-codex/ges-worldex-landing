import { defineArrayMember, defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Exhibition",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({
      name: "focus",
      title: "Focus Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "image", title: "Card Image", type: "imageWithAlt" }),
    defineField({ name: "detailImage", title: "Detail Image", type: "imageWithAlt" }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "editions",
      title: "Editions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "date", title: "Date", type: "string" }),
            defineField({ name: "city", title: "City", type: "string" }),
            defineField({
              name: "stats",
              title: "Stats",
              type: "array",
              of: [defineArrayMember({ type: "stat" })],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "label", media: "image" },
  },
});
