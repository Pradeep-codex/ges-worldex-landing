import { HomePageContent } from "@/components/HomePageContent";
import { getHomePageContent } from "@/sanity/lib/home";

export default async function Home() {
  const homePage = await getHomePageContent();

  return <HomePageContent content={homePage} />;
}
