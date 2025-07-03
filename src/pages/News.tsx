
import NewsPageLayout from "@/components/news/NewsPageLayout";
import NewsContent from "@/components/news/NewsContent";
import { NewsProvider } from "@/components/news/NewsProvider";
import SEO from "@/components/SEO";

const News = () => {
  return (
    <>
      <SEO 
        title="Technology News & Industry Updates"
        description="Stay informed with the latest technology news, industry trends, and digital innovation updates from trusted sources."
        keywords="technology news, tech trends, industry updates, digital innovation, tech journalism"
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop&crop=center"
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
