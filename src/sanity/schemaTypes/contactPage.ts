import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "officeAddress", title: "Office Address", type: "text", rows: 3 }),
    defineField({ name: "officeMapsUrl", title: "Office Maps URL", type: "url" }),
    defineField({ name: "formTitle", title: "Form Title", type: "string" }),
    defineField({ name: "formDescription", title: "Form Description", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
