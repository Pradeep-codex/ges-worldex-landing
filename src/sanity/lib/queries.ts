import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroSection {
      slides[] {
        title,
        subtitle,
        description,
        edition,
        date,
        venue,
        "image": image.asset->url,
        "imageAlt": image.alt
      }
    },
    aboutSection {
      eyebrow,
      titlePrefix,
      titleSuffix,
      rotatingPhrases,
      description,
      bullets,
      cta,
      images[] {
        "src": asset->url,
        alt
      }
    },
    statsSection {
      eyebrow,
      headline,
      description,
      stats[] {
        value,
        suffix,
        label
      }
    },
    exhibitionCategoriesSection {
      eyebrow,
      title,
      description,
      categories[] {
        title,
        eyebrow,
        description,
        "image": image.asset->url,
        "imageAlt": image.alt,
        link
      }
    },
    whySection {
      tabs[] {
        key,
        eyebrow,
        title,
        body,
        highlights[] {
          value,
          suffix,
          label
        },
        points[] {
          title,
          eyebrow,
          description
        }
      }
    },
    upcomingCitiesSection {
      title,
      description,
      cities[] {
        city,
        date,
        venue,
        copy
      }
    },
    featuredVideoSection {
      title,
      description,
      youtubeUrl,
      embedUrl
    },
    gallerySection {
      title
    }
  }
`;

export const genericPageQuery = groq`
  *[_type == "genericPage" && slug.current == $slug][0] {
    title,
    eyebrow,
    description,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    cards[] {
      title,
      eyebrow,
      description,
      "image": image.asset->url,
      "imageAlt": image.alt,
      link
    },
    body,
    seo
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    eyebrow,
    title,
    description,
    email,
    phone,
    officeAddress,
    officeMapsUrl,
    formTitle,
    formDescription,
    seo
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    hero {
      eyebrow,
      title,
      description,
      cta,
      "lightImage": lightImage.asset->url,
      "lightImageAlt": lightImage.alt,
      "darkImage": darkImage.asset->url,
      "darkImageAlt": darkImage.alt
    },
    story {
      eyebrow,
      title,
      paragraphs
    },
    sections[] {
      title,
      eyebrow,
      description,
      "image": image.asset->url,
      "imageAlt": image.alt,
      link
    },
    seo
  }
`;

export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(coalesce(order, 999) asc, title asc) {
    title,
    "id": slug.current,
    label,
    overview,
    focus,
    "image": image.asset->url,
    "detailImage": detailImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
    editions[] {
      name,
      date,
      city,
      stats[] {
        value,
        suffix,
        label
      }
    }
  }
`;
