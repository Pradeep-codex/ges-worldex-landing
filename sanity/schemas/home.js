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
                  name: 'enableVisitorRegistration',
                  title: 'Enable Visitor Registration Redirect',
                  type: 'boolean',
                  description:
                    'Turn this on when visitors should be redirected to the visitor registration page after the interest form is saved to Excel.',
                  initialValue: false,
                },
                {
                  name: 'visitorRegistrationUrl',
                  title: 'Visitor Registration URL',
                  type: 'url',
                  description:
                    'Paste the visitor registration page URL here. Leave empty if visitor interest should only submit the form.',
                  validation: (rule) =>
                    rule
                      .uri({
                        scheme: ['http', 'https'],
                      })
                      .custom((value, context) =>
                        context.parent?.enableVisitorRegistration && !value
                          ? 'Visitor Registration URL is required when Visitor Registration Redirect is enabled.'
                          : true
                      ),
                },
                {
                  name: 'visitorRegistrationButtonLabel',
                  title: 'Visitor Button Label',
                  type: 'string',
                  description:
                    'Optional. Example: Register as Visitor. If left empty, the popup button uses the default label.',
                  initialValue: 'Register as Visitor',
                },
                {
                  name: 'enableExhibitorBooking',
                  title: 'Enable Exhibitor Booking Redirect',
                  type: 'boolean',
                  description:
                    'Turn this on when users selecting Exhibitor Interest should be redirected to the booth booking page after the form is saved to Excel.',
                  initialValue: false,
                },
                {
                  name: 'boothBookingUrl',
                  title: 'Booth Booking URL',
                  type: 'url',
                  description:
                    'Paste the booth / stall booking page URL here. Leave empty if exhibitor booking is closed and the popup should only submit the form.',
                  validation: (rule) =>
                    rule
                      .uri({
                        scheme: ['http', 'https'],
                      })
                      .custom((value, context) =>
                        context.parent?.enableExhibitorBooking && !value
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
