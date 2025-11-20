// Advanced structured data schemas for SEO

export const generateWebsiteSchema = (siteName: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateOrganizationSchema = (org: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  foundingDate?: string;
  founders?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "url": org.url,
    "logo": org.logo,
    ...(org.description && { "description": org.description }),
    ...(org.foundingDate && { "foundingDate": org.foundingDate }),
    ...(org.founders && { "founders": org.founders.map(founder => ({ "@type": "Person", "name": founder })) }),
    ...(org.contactPoint && { "contactPoint": org.contactPoint }),
    ...(org.sameAs && { "sameAs": org.sameAs })
  };
};

export const generateReviewSchema = (review: {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
  };
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.datePublished,
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.reviewRating.ratingValue,
      "bestRating": review.reviewRating.bestRating || 5
    }
  };
};

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    ...(product.brand && { "brand": { "@type": "Brand", "name": product.brand } }),
    ...(product.offers && {
      "offers": {
        "@type": "Offer",
        "price": product.offers.price,
        "priceCurrency": product.offers.priceCurrency,
        "availability": product.offers.availability || "https://schema.org/InStock"
      }
    }),
    ...(product.aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.aggregateRating.ratingValue,
        "reviewCount": product.aggregateRating.reviewCount
      }
    })
  };
};

export const generateVideoObjectSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    ...(video.duration && { "duration": video.duration }),
    ...(video.contentUrl && { "contentUrl": video.contentUrl }),
    ...(video.embedUrl && { "embedUrl": video.embedUrl })
  };
};

export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    ...(howTo.image && { "image": howTo.image }),
    ...(howTo.totalTime && { "totalTime": howTo.totalTime }),
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };
};

export const generateNewsArticleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": article.publisher.logo
      }
    }
  };
};

export const generateImageGallerySchema = (images: Array<{
  url: string;
  caption: string;
  description?: string;
}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "caption": img.caption,
      ...(img.description && { "description": img.description })
    }))
  };
};

export const generateOfferSchema = (offer: {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": offer.name,
    "description": offer.description,
    "price": offer.price,
    "priceCurrency": offer.priceCurrency,
    "availability": offer.availability || "https://schema.org/InStock",
    ...(offer.validFrom && { "validFrom": offer.validFrom }),
    ...(offer.validThrough && { "validThrough": offer.validThrough })
  };
};
