export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'slides',
          title: 'Slides',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'edition', title: 'Edition', type: 'string' },
                { name: 'date', title: 'Date', type: 'string' },
                { name: 'location', title: 'Location', type: 'string' },
                { name: 'venue', title: 'Venue', type: 'text' },
                { name: 'image', title: 'Banner Image', type: 'image' },
                {
                  name: 'buttonAction',
                  title: 'Button Action',
                  type: 'string',
                  description: 'Choose whether this show should open a registration URL or collect interest through the form.',
                  options: {
                    list: [
                      { title: 'Interested Form', value: 'interested' },
                      { title: 'Register Link', value: 'register' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'interested',
                },
                {
                  name: 'enableExhibitorBooking',
                  title: 'Enable Exhibitor Booking Redirect',
                  type: 'boolean',
                  description:
                    'Turn this on when users selecting Exhibitor Interest should be redirected to the booth booking page after the form is saved to Excel.',
                  initialValue: false,
                  hidden: ({ parent }) => parent?.buttonAction !== 'interested',
                },
                {
                  name: 'boothBookingUrl',
                  title: 'Booth Booking URL',
                  type: 'url',
                  description:
                    'Paste the booth / stall booking page URL here. Leave empty if exhibitor booking is closed and the popup should only submit the form.',
                  hidden: ({ parent }) => parent?.buttonAction !== 'interested',
                  validation: (rule) =>
                    rule
                      .uri({
                        scheme: ['http', 'https'],
                      })
                      .custom((value, context) =>
                        context.parent?.buttonAction === 'interested' &&
                        context.parent?.enableExhibitorBooking &&
                        !value
                          ? 'Booth Booking URL is required when Exhibitor Booking Redirect is enabled.'
                          : true
                      ),
                },
                {
                  name: 'boothBookingButtonLabel',
                  title: 'Exhibitor Button Label',
                  type: 'string',
                  description:
                    'Optional. Example: Book Booth Now. If left empty, the popup button uses the default label.',
                  initialValue: 'Book Booth Now',
                  hidden: ({ parent }) => parent?.buttonAction !== 'interested',
                },
                {
                  name: 'registerUrl',
                  title: 'Register URL',
                  type: 'url',
                  description:
                    'Used when Button Action is set to Register Link. Leave empty if this show should use the Interested popup instead.',
                  hidden: ({ parent }) => parent?.buttonAction !== 'register',
                  validation: (rule) =>
                    rule
                      .uri({
                        scheme: ['http', 'https'],
                      })
                      .custom((value, context) =>
                        context.parent?.buttonAction === 'register' && !value
                          ? 'Register URL is required when Button Action is Register Link.'
                          : true
                      ),
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'subtitle',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
