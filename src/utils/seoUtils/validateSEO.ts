// SEO validation utilities for development

interface SEOValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

export const validateSEOTags = (): SEOValidationResult => {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check for title tag
  const titleTag = document.querySelector('title');
  if (!titleTag) {
    errors.push('Missing <title> tag');
  } else if (titleTag.textContent && titleTag.textContent.length > 60) {
    warnings.push(`Title tag is too long (${titleTag.textContent.length} chars). Recommended: 50-60 chars`);
  } else if (titleTag.textContent && titleTag.textContent.length < 30) {
    warnings.push(`Title tag is too short (${titleTag.textContent.length} chars). Recommended: 50-60 chars`);
  }

  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    errors.push('Missing meta description');
  } else {
    const content = metaDescription.getAttribute('content');
    if (content && content.length > 160) {
      warnings.push(`Meta description is too long (${content.length} chars). Recommended: 150-160 chars`);
    } else if (content && content.length < 120) {
      warnings.push(`Meta description is too short (${content.length} chars). Recommended: 150-160 chars`);
    }
  }

  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    warnings.push('Missing canonical URL');
  }

  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle) warnings.push('Missing og:title');
  if (!ogDescription) warnings.push('Missing og:description');
  if (!ogImage) warnings.push('Missing og:image');

  // Check for H1 tag
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    errors.push('No H1 tag found on page');
  } else if (h1Tags.length > 1) {
    warnings.push(`Multiple H1 tags found (${h1Tags.length}). Recommended: exactly 1 H1 per page`);
  }

  // Check for alt attributes on images
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  if (imagesWithoutAlt > 0) {
    warnings.push(`${imagesWithoutAlt} image(s) missing alt attributes`);
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors
  };
};

export const validateStructuredData = (): SEOValidationResult => {
  const warnings: string[] = [];
  const errors: string[] = [];

  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  
  if (scripts.length === 0) {
    warnings.push('No structured data (JSON-LD) found on page');
  }

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || '');
      if (!data['@context']) {
        errors.push(`Structured data block ${index + 1} missing @context`);
      }
      if (!data['@type']) {
        errors.push(`Structured data block ${index + 1} missing @type`);
      }
    } catch (e) {
      errors.push(`Structured data block ${index + 1} contains invalid JSON`);
    }
  });

  return {
    valid: errors.length === 0,
    warnings,
    errors
  };
};

export const logSEOValidation = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const seoValidation = validateSEOTags();
  const structuredDataValidation = validateStructuredData();

  console.group('🔍 SEO Validation Report');
  
  if (seoValidation.errors.length > 0) {
    console.group('❌ Errors');
    seoValidation.errors.forEach(error => console.error(error));
    console.groupEnd();
  }

  if (seoValidation.warnings.length > 0) {
    console.group('⚠️ Warnings');
    seoValidation.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }

  if (structuredDataValidation.errors.length > 0) {
    console.group('❌ Structured Data Errors');
    structuredDataValidation.errors.forEach(error => console.error(error));
    console.groupEnd();
  }

  if (structuredDataValidation.warnings.length > 0) {
    console.group('⚠️ Structured Data Warnings');
    structuredDataValidation.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }

  if (seoValidation.valid && structuredDataValidation.valid && 
      seoValidation.warnings.length === 0 && structuredDataValidation.warnings.length === 0) {
    console.log('✅ All SEO checks passed!');
  }

  console.groupEnd();
};
