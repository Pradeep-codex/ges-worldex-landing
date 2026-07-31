export const homeQuery = `*[_type == "home"][0]{
  heroSection,
  "aboutSection": *[_type == "visionSectionSetting"][0]{
    eyebrow,
    titlePrefix,
    rotatingPhrases,
    titleSuffix,
    description,
    bullets,
    images[]{
      alt,
      image
    },
    cta
  },
  "featuredVideoSection": *[_type == "youtubeUrlSetting"][0]{
    title,
    description,
    youtubeUrl
  }
}`;

export default homeQuery;
