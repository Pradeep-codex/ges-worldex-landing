import { defineArrayMember, defineField, defineType } from "sanity";

export const genericPage = defineType({
  name: "genericPage",
  title: "Exhibitor / Visitor Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Page Path",
      type: "slug",
      description: "Example: exhibitors, visitors/hotel-info, exhibitors/sponsorship",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "imageWithAlt" }),
    defineField({
      name: "cards",
      title: "Cards / Links",
      type: "array",
      of: [defineArrayMember({ type: "simpleCard" })],
    }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
