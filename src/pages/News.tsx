
import NewsPageLayout from "@/components/news/NewsPageLayout";
import NewsContent from "@/components/news/NewsContent";
import { NewsProvider } from "@/components/news/NewsProvider";

const News = () => {
  return (
    <NewsProvider>
      <NewsPageLayout>
        <NewsContent />
      </NewsPageLayout>
    </NewsProvider>
  );
};

export default News;
