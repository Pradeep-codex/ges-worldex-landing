export default {
  name: 'upcomingShow',
  title: 'Upcoming Show',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'date', type: 'datetime' },
    { name: 'description', type: 'text' },
    { name: 'image', type: 'image' },
    { name: 'location', type: 'string' },
  ],
};
