const routeOptions = [
  { title: 'Booth Application', value: 'exhibitors/booth-application' },
  { title: 'Floor Plan', value: 'exhibitors/floor-plan' },
  { title: 'Exhibitor Portal', value: 'exhibitors/portal' },
  { title: 'Hotel Info', value: 'exhibitors/hotel-info' },
  { title: 'Vendor Info', value: 'exhibitors/vendor-info' },
  { title: 'Sponsorship Info', value: 'exhibitors/sponsorship' },
]

export default {
  name: 'exhibitorPageSetting',
  title: 'Exhibitor Page Setting',
  type: 'document',
  fields: [
    {
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: routeOptions,
        layout: 'dropdown',
      },
      validation: (rule) =>
        rule.required().custom(async (pageKey, context) => {
          if (!pageKey) return true

          const id = context.document?._id?.replace(/^drafts\./, '')
          const client = context.getClient({ apiVersion: '2026-07-22' })
          const count = await client.fetch(
            `count(*[_type == "exhibitorPageSetting" && pageKey == $pageKey && _id != $id && _id != "drafts." + $id])`,
            { pageKey, id }
          )

          return count === 0 || 'Only one setting document is allowed for each exhibitor page.'
        }),
    },
    {
      name: 'pageMode',
      title: 'Booth Application Mode',
      type: 'string',
      description: 'Only used for Booth Application. Choose whether the page should show CMS static content or redirect to a URL.',
      options: {
        list: [
          { title: 'Static Page', value: 'static' },
          { title: 'URL Redirect', value: 'url' },
        ],
        layout: 'radio',
      },
      initialValue: 'static',
      hidden: ({ document }) => document?.pageKey !== 'exhibitors/booth-application',
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Used for Booth Application URL mode and Exhibitor Portal redirects.',
      hidden: ({ document }) =>
        document?.pageKey !== 'exhibitors/portal' &&
        !(document?.pageKey === 'exhibitors/booth-application' && document?.pageMode === 'url'),
      validation: (rule) =>
        rule
          .uri({ scheme: ['http', 'https'] })
          .custom((value, context) => {
            const document = context.document
            const needsUrl =
              document?.pageKey === 'exhibitors/portal' ||
              (document?.pageKey === 'exhibitors/booth-application' && document?.pageMode === 'url')

            return needsUrl && !value ? 'External URL is required for this setting.' : true
          }),
    },
    {
      name: 'staticContent',
      title: 'Static Page Content',
      type: 'object',
      description: 'Used for Booth Application static page content.',
      hidden: ({ document }) =>
        !(document?.pageKey === 'exhibitors/booth-application' && document?.pageMode !== 'url'),
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'primaryCtaLabel',
          title: 'Primary CTA Label',
          type: 'string',
        },
        {
          name: 'primaryCtaHref',
          title: 'Primary CTA Link',
          type: 'string',
          description: 'Use a relative path like /contact, a tel: link, or a full URL.',
        },
        {
          name: 'secondaryCtaLabel',
          title: 'Secondary CTA Label',
          type: 'string',
        },
        {
          name: 'secondaryCtaHref',
          title: 'Secondary CTA Link',
          type: 'string',
        },
        {
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'Optional. If uploaded, the page will show this PDF viewer. If empty, the page keeps its current behavior.',
      options: {
        accept: 'application/pdf',
      },
      hidden: ({ document }) =>
        ![
          'exhibitors/floor-plan',
          'exhibitors/hotel-info',
          'exhibitors/vendor-info',
          'exhibitors/sponsorship',
        ].includes(document?.pageKey),
    },
    {
      name: 'pdfTitle',
      title: 'PDF Section Title',
      type: 'string',
      hidden: ({ document }) =>
        ![
          'exhibitors/floor-plan',
          'exhibitors/hotel-info',
          'exhibitors/vendor-info',
          'exhibitors/sponsorship',
        ].includes(document?.pageKey),
    },
    {
      name: 'pdfDescription',
      title: 'PDF Section Description',
      type: 'text',
      hidden: ({ document }) =>
        ![
          'exhibitors/floor-plan',
          'exhibitors/hotel-info',
          'exhibitors/vendor-info',
          'exhibitors/sponsorship',
        ].includes(document?.pageKey),
    },
  ],
  preview: {
    select: {
      title: 'pageKey',
      subtitle: 'externalUrl',
    },
    prepare(selection) {
      const route = routeOptions.find((option) => option.value === selection.title)
      return {
        title: route?.title || selection.title || 'Exhibitor Page Setting',
        subtitle: selection.subtitle,
      }
    },
  },
}
