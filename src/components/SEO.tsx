
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  organization?: {
    name?: string;
    logo?: string;
    contactPoint?: {
      telephone?: string;
      contactType?: string;
    };
  };
}

const SEO = ({
  title,
  description = "ƷBI delivers innovative business technology solutions and expert consulting services to transform your operations and drive growth.",
  keywords = "business technology, digital transformation, IT consulting, ƷBI, technology solutions, business innovation",
  image = "/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png",
  url = window.location.href,
  type = "website",
  article,
  organization = {
    name: "ƷBI - Business Technology Solutions",
    logo: "/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png",
    contactPoint: {
      telephone: "+1-555-0123",
      contactType: "customer service"
    }
  }
}: SEOProps) => {
  const siteTitle = `${title} | ƷBI - Business Technology Solutions`;
  const siteName = "ƷBI - Business Technology Solutions";
  const baseUrl = "https://3bi.io";
  
  // Convert relative image paths to absolute URLs
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${baseUrl}${image}`;
    
  const absoluteLogoUrl = organization.logo?.startsWith('http')
    ? organization.logo
    : `${baseUrl}${organization.logo}`;

  // Generate structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organization.name,
    "url": baseUrl,
    "logo": absoluteLogoUrl,
    "description": description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": organization.contactPoint?.telephone,
      "contactType": organization.contactPoint?.contactType
    },
    "sameAs": [
      "https://www.linkedin.com/company/3bi-io",
      "https://twitter.com/3bi_io"
    ]
  };

  // Generate structured data for articles
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": absoluteImageUrl,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "author": {
      "@type": "Organization",
      "name": article.author || organization.name
    },
    "publisher": {
      "@type": "Organization",
      "name": organization.name,
      "logo": {
        "@type": "ImageObject",
        "url": absoluteLogoUrl
      }
    },
    "articleSection": article.section,
    "keywords": article.tags?.join(', ') || keywords
  } : null;

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
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@3bi_io" />
      <meta name="twitter:creator" content="@3bi_io" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImageUrl} />
      
      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={organization.name} />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="San Francisco" />
      <meta name="geo.position" content="37.7749;-122.4194" />
      <meta name="ICBM" content="37.7749, -122.4194" />
      
      {/* Performance and mobile optimization */}
      <meta name="theme-color" content="#0F172A" />
      <meta name="msapplication-navbutton-color" content="#0F172A" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.gpteng.co" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {/* Additional meta tags for better indexing */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="https://img.icons8.com/color/48/000000/circuit.png" type="image/png" />
      <link rel="apple-touch-icon" href="https://img.icons8.com/color/180/000000/circuit.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEO;
