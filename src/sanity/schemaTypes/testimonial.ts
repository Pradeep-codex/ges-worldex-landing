import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role / Company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
