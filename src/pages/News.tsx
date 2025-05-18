
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import { businessArticles, categories } from "@/data/newsData";
import ArticleList from "@/components/news/ArticleList";
import ArticleModal from "@/components/news/ArticleModal";
import SearchFilter from "@/components/news/SearchFilter";
import { BusinessArticle } from "@/types/news";
import { Card, CardContent } from "@/components/ui/card";

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
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Business Insights
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Stay informed with the latest industry insights, technology trends, and success stories from our business experts
              </p>
            </CardContent>
          </Card>

          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
            <CardContent className="p-6">
              {/* Search and Filter */}
              <SearchFilter 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
              />
            </CardContent>
          </Card>

          {/* News Articles Container */}
          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl">
            <CardContent className="p-6">
              {/* News Articles */}
              <ArticleList 
                articles={filteredArticles} 
                categories={categories}
                onSelectArticle={setSelectedArticle}
              />
            </CardContent>
          </Card>
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
