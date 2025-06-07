
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Newspaper } from "lucide-react";

interface NewsPageLayoutProps {
  children: React.ReactNode;
}

const NewsPageLayout: React.FC<NewsPageLayoutProps> = ({ children }) => {
  return (
    <>
      <SEO 
        title="Business Insights" 
        description="Stay informed with the latest industry insights, technology trends and success stories from ƷBI's business experts."
        keywords="business technology, digital transformation, custom software, data analytics, AI solutions, web development"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
          <BreadcrumbNav currentPageLabel="Business Insights" />
          
          <PageHeader 
            title="Business Insights"
            description="Stay informed with the latest industry insights, technology trends, and success stories from our business experts"
            icon={Newspaper}
          />

          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsPageLayout;
