export default {
  name: 'youtubeUrlSetting',
  title: 'YouTube URL Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Watch The Exhibition Energy Come Alive',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      initialValue:
        'A more cinematic look into the scale, atmosphere, and movement behind the GES Worldex experience, presented in a sharper, more modern showcase frame.',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Used for the featured YouTube section on the home page.',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'youtubeUrl',
    },
    prepare(selection) {
      return {
        title: selection.title || 'YouTube URL Settings',
        subtitle: selection.subtitle,
      }
    },
  },
}
