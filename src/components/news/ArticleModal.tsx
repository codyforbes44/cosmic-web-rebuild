
import { Button } from "@/components/ui/button";
import { BusinessArticle } from "@/types/news";
import { Share } from "lucide-react";

interface ArticleModalProps {
  article: BusinessArticle;
  categories: { value: string; label: string }[];
  onClose: () => void;
}

const ArticleModal = ({ article, categories, onClose }: ArticleModalProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-space-deep-blue border border-gray-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto max-h-[40vh] object-cover"
          />
          <button
            className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
              {categories.find(c => c.value === article.category)?.label || article.category}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <button 
              onClick={handleShare}
              className="ml-auto text-gray-400 hover:text-accent"
              aria-label="Share article"
            >
              <Share size={18} />
            </button>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{article.title}</h2>
          <p className="text-gray-400 mb-6">By {article.author}</p>
          <div className="prose prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-300">{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <Button 
              onClick={onClose} 
              className="bg-accent hover:bg-accent/80 text-white"
            >
              Back to articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
