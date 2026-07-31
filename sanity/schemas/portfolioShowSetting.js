export default {
  name: 'portfolioShowSetting',
  title: 'Portfolio Show Setting',
  type: 'document',
  fields: [
    {
      name: 'settingsKey',
      title: 'Settings Key',
      type: 'string',
      initialValue: 'portfolio-shows',
      readOnly: true,
      hidden: true,
      validation: (rule) =>
        rule.required().custom(async (settingsKey, context) => {
          if (!settingsKey) return true

          const id = context.document?._id?.replace(/^drafts\./, '')
          const client = context.getClient({ apiVersion: '2026-07-22' })
          const count = await client.fetch(
            `count(*[_type == "portfolioShowSetting" && settingsKey == $settingsKey && _id != $id && _id != "drafts." + $id])`,
            { settingsKey, id }
          )

          return count === 0 || 'Only one Portfolio Show Setting document is allowed.'
        }),
    },
    {
      name: 'shows',
      title: 'Shows',
      type: 'array',
      description: 'Add, remove, and reorder the shows that appear in the Our Shows list.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Show Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Show Label',
              type: 'string',
              description: 'Small badge label shown in the portfolio hero for this show.',
            },
            {
              name: 'overview',
              title: 'Overview',
              type: 'text',
              rows: 4,
            },
            {
              name: 'focus',
              title: 'Focus Tracks',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'theme',
              title: 'Theme Colors',
              type: 'object',
              fields: [
                { name: 'accent', title: 'Accent Color', type: 'string' },
                { name: 'accentSoft', title: 'Soft Accent Color', type: 'string' },
                { name: 'ink', title: 'Ink Color', type: 'string' },
              ],
            },
            {
              name: 'coverImage',
              title: 'Cover Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'detailImage',
              title: 'Detail Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'galleryImages',
              title: 'Gallery Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
            },
            {
              name: 'editions',
              title: 'Editions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Edition Name', type: 'string' },
                    { name: 'date', title: 'Date', type: 'string' },
                    { name: 'city', title: 'City', type: 'string' },
                    {
                      name: 'description',
                      title: 'Edition Description',
                      type: 'text',
                      rows: 3,
                    },
                    {
                      name: 'image',
                      title: 'Edition Image',
                      type: 'image',
                      options: { hotspot: true },
                    },
                    {
                      name: 'galleryImages',
                      title: 'Edition Gallery Images',
                      type: 'array',
                      of: [
                        {
                          type: 'image',
                          options: { hotspot: true },
                        },
                      ],
                    },
                    { name: 'visitors', title: 'Visitors', type: 'number' },
                    { name: 'exhibitors', title: 'Exhibitors', type: 'number' },
                    { name: 'reputedJewellers', title: 'Reputed Jewellers', type: 'number' },
                    { name: 'stalls', title: 'Stalls', type: 'number' },
                    { name: 'hostedBuyers', title: 'Hosted Buyers', type: 'number' },
                    { name: 'jewelleryDesigns', title: 'Jewellery Designs', type: 'number' },
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'date',
                      media: 'image',
                    },
                    prepare(selection) {
                      return {
                        title: selection.title || 'Edition',
                        subtitle: selection.subtitle,
                        media: selection.media,
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'label',
              media: 'coverImage',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Show',
                subtitle: selection.subtitle,
                media: selection.media,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'settingsKey',
      subtitle: 'shows.0.title',
    },
    prepare(selection) {
      return {
        title: 'Portfolio Show Setting',
        subtitle: selection.subtitle ? `Starts with ${selection.subtitle}` : 'Manage all portfolio shows',
      }
    },
  },
}
