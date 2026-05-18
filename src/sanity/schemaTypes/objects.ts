import { defineArrayMember, defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "number" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", value: "value", suffix: "suffix" },
    prepare({ title, value, suffix }) {
      return { title, subtitle: `${value ?? ""}${suffix ?? ""}` };
    },
  },
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL / Path", type: "string" }),
  ],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
  ],
});

export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta Title", type: "string" }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "image", title: "Social Image", type: "imageWithAlt" }),
  ],
});

export const simpleCard = defineType({
  name: "simpleCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "link", title: "Link", type: "link" }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", media: "image" },
  },
});
