export default {
  name: 'visionSectionSetting',
  title: 'Vision Section Setting',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Our Vision',
    },
    {
      name: 'titlePrefix',
      title: 'Title Prefix',
      type: 'string',
      initialValue: 'We Build Powerful',
    },
    {
      name: 'rotatingPhrases',
      title: 'Rotating Phrases',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'These words rotate in the highlighted title pill.',
      initialValue: [
        'Business Ecosystem',
        'Industry Networking',
        'Trade Synergy',
        'Global Partnership',
        'Market Linkage',
        'Commerce Connection',
        'Strategic Alliance',
        'Business Impact',
        'Growth-Driven',
        'Industry Transformation',
        'Opportunity-Driven',
      ],
    },
    {
      name: 'titleSuffix',
      title: 'Title Suffix',
      type: 'string',
      initialValue: 'Experiences',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      initialValue:
        'GES Worldex India Pvt. Ltd. is a B2B trade exhibition organizer, committed to creating world-class business platforms that connect industries, foster innovation, and drive global opportunities. With a strong international presence, we bridge businesses, buyers, and emerging markets through impactful exhibitions and strategic networking experiences.',
    },
    {
      name: 'bullets',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        '29+ Years of Industry Leadership & Excellence',
        'Connecting 50,000+ Business Professionals Annually',
        'Delivering High-Impact B2B Exhibitions & Trade Platforms',
        'Trusted Partner for International Business Growth',
      ],
    },
    {
      name: 'images',
      title: 'Section Images',
      type: 'array',
      description: 'Add exactly three images for the stacked card layout.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Vision image',
                media: selection.media,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string', initialValue: 'Discover Our Story' },
        { name: 'href', title: 'Button Link', type: 'string', initialValue: '/about' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'eyebrow',
      subtitle: 'titlePrefix',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Vision Section Setting',
        subtitle: selection.subtitle || 'Home page vision section',
      }
    },
  },
}
