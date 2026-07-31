const routeOptions = [
  { title: 'Floor Plan', value: 'visitors/floor-plan' },
  { title: 'Exhibitor List', value: 'visitors/exhibitor-list' },
  { title: 'Hotel Info', value: 'visitors/hotel-info' },
  { title: 'How to Reach Venue', value: 'visitors/how-to-reach' },
]

export default {
  name: 'visitorPageSetting',
  title: 'Domestic Visitor Page Setting',
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
            `count(*[_type == "visitorPageSetting" && pageKey == $pageKey && _id != $id && _id != "drafts." + $id])`,
            { pageKey, id }
          )

          return count === 0 || 'Only one setting document is allowed for each visitor page.'
        }),
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'Optional. If uploaded, the page will show this PDF viewer. If empty, the page keeps its current behavior.',
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
        title: route?.title || selection.title || 'Domestic Visitor Page Setting',
        subtitle: selection.subtitle,
      }
    },
  },
}
