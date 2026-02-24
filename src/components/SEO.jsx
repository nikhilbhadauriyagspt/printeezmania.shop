import { useEffect } from 'react';

export default function SEO({ title, description, keywords, schemaType = "Website" }) {
  useEffect(() => {
    // Update Title
    const baseTitle = "PrinteezMania";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const finalDesc = description || "Authorized HP partner specializing in pro workstations, precision printing, and genuine Product accessories.";
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDesc);
    }

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || "HP Authorized Partner, Premium Laptops, Business Printers, Tech Support");

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Add Schema.org JSON-LD
    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType === "Product" ? "Product" : "Organization",
      "name": "PrinteezMania",
      "url": "https://printeezmania.shop",
      "logo": "https://printeezmania.shop/logo/logo.png",
      "description": finalDesc,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1327 Eraste Landry Rd",
        "addressLocality": "Lafayette",
        "addressRegion": "LA",
        "postalCode": "70506",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@printeezmania.shop"
      }
    };

    script.text = JSON.stringify(schemaData);

  }, [title, description, keywords, schemaType]);

  return null;
}
