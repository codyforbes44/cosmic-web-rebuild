
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { BusinessArticle } from "@/types/news";

interface ArticleListProps {
  articles: BusinessArticle[];
  categories: { value: string; label: string }[];
  onSelectArticle: (article: BusinessArticle) => void;
}

const ArticleList = ({ articles, categories, onSelectArticle }: ArticleListProps) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl text-white mb-2">No articles found</h3>
        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <div
          key={article.id}
          className="space-card overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => onSelectArticle(article)}
        >
          <div className="aspect-video overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center mb-3">
              <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                {categories.find(c => c.value === article.category)?.label || article.category}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center text-accent text-sm">
              <BookOpen className="mr-1 h-4 w-4" />
              Read full article
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
