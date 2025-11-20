
import NewsPageLayout from "@/components/news/NewsPageLayout";
import NewsContent from "@/components/news/NewsContent";
import { NewsProvider } from "@/components/news/NewsProvider";
import SEO from "@/components/SEO";

const News = () => {
  return (
    <>
      <SEO 
        title="Latest News & Updates - Stay Informed"
        description="Stay up to date with the latest news, insights, and announcements from ƷBI. Industry trends, company updates, and expert analysis."
        keywords="business news, technology updates, industry insights, company announcements, tech trends"
        image="/og-images/news.png"
        type="website"
      />
      <NewsProvider>
        <NewsPageLayout>
          <NewsContent />
        </NewsPageLayout>
      </NewsProvider>
    </>
  );
};

export default News;

