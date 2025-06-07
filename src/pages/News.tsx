
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { businessArticles, categories } from "@/data/newsData";
import ArticleList from "@/components/news/ArticleList";
import ArticleModal from "@/components/news/ArticleModal";
import SearchFilter from "@/components/news/SearchFilter";
import { BusinessArticle } from "@/types/news";
import { Newspaper } from "lucide-react";

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BusinessArticle | null>(null);

  const filteredArticles = businessArticles.filter(article => {
    // Filter by category if one is selected
    const categoryMatch = activeCategory ? article.category === activeCategory : true;
    
    // Filter by search query if one is entered
    const searchMatch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return categoryMatch && searchMatch;
  });

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
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Business Insights" />
          
          {/* Page Header */}
          <PageHeader 
            title="Business Insights"
            description="Stay informed with the latest industry insights, technology trends, and success stories from our business experts"
            icon={Newspaper}
          />

          <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl mb-8 sm:mb-12">
            {/* Search and Filter */}
            <SearchFilter 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
            />
          </div>

          {/* News Articles */}
          <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl">
            <ArticleList 
              articles={filteredArticles} 
              categories={categories}
              onSelectArticle={setSelectedArticle}
            />
          </div>
        </div>

        {/* Modal for Selected Article */}
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle}
            categories={categories}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default News;
