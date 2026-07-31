const routeOptions = [
  { title: 'International Floor Plan', value: 'visitors/international-floor-plan' },
  { title: 'International Exhibitor List', value: 'visitors/international-exhibitor-list' },
  { title: 'International Hotel Info', value: 'visitors/international-hotel-info' },
  { title: 'International How to Reach Venue', value: 'visitors/international-how-to-reach' },
]

export default {
  name: 'internationalVisitorPageSetting',
  title: 'International Visitor Page Setting',
  type: 'document',
  fields: [
    {
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      description: 'This is fixed for each international visitor settings document.',
      readOnly: true,
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
            `count(*[_type == "internationalVisitorPageSetting" && pageKey == $pageKey && _id != $id && _id != "drafts." + $id])`,
            { pageKey, id }
          )

          return count === 0 || 'Only one setting document is allowed for each international visitor page.'
        }),
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'Optional. If uploaded, the page will show this PDF viewer for the selected international visitor page.',
      options: {
        accept: 'application/pdf',
      },
    },
    {
      name: 'pdfTitle',
      title: 'PDF Section Title',
      type: 'string',
    },
    {
      name: 'pdfDescription',
      title: 'PDF Section Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'pageKey',
      subtitle: 'pdf.asset.originalFilename',
    },
    prepare(selection) {
      const route = routeOptions.find((option) => option.value === selection.title)

      return {
        title: route?.title || selection.title || 'International Visitor Page Setting',
        subtitle: selection.subtitle,
      }
    },
  },
}
