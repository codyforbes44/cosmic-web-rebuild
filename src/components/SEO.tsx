
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title,
  description = "Boost efficiency and grow your business with ƷBI's innovative technology solutions. Expert consulting, custom software, and data analytics that deliver measurable results.",
  keywords = "business consulting, technology solutions, digital transformation, ƷBI, custom software development, data analytics, AI solutions, business efficiency",
  image = "/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png",
  url = window.location.href,
  type = "website"
}: SEOProps) => {
  const siteTitle = `${title} | ƷBI - Business Technology Solutions`;
  
  // Convert relative image paths to absolute URLs
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${window.location.origin}${image}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional SEO tags for business websites */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="ƷBI Technology Solutions" />
      <meta name="geo.region" content="US" />
    </Helmet>
  );
};

export default SEO;
