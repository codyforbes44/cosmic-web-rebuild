
import SearchFilter from './SearchFilter';
import ArticleList from './ArticleList';
import ArticleModal from './ArticleModal';
import { useNews } from './NewsProvider';

const NewsContent = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedArticle,
    setSelectedArticle,
    filteredArticles,
    categories,
  } = useNews();

  return (
    <>
      <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl mb-8 sm:mb-12">
        <SearchFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
      </div>

      <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl">
        <ArticleList 
          articles={filteredArticles} 
          categories={categories}
          onSelectArticle={setSelectedArticle}
        />
      </div>

      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle}
          categories={categories}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
};

export default NewsContent;
