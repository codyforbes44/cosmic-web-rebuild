
import NewsletterForm from './newsletter/NewsletterForm';
import NewsletterContent from './newsletter/NewsletterContent';
import BackgroundStars from './newsletter/BackgroundStars';

const Newsletter = () => {
  return (
    <section className="py-20 bg-space-dark-blue relative overflow-hidden">
      {/* Background stars */}
      <BackgroundStars />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-space-deep-blue/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <NewsletterContent />
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
