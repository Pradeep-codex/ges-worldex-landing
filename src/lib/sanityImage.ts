import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanityClient";

const builder = imageUrlBuilder(sanityClient as any);

export const urlFor = (source: any) => builder.image(source);

export default urlFor;
