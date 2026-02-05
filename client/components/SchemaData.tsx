import { Helmet } from 'react-helmet-async';

interface SchemaDataProps {
  type: 'organization' | 'product' | 'review' | 'breadcrumb';
  data: any;
}

export default function SchemaData({ type, data }: SchemaDataProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Trendaryo",
          "description": "Premium technology and wellness products for modern living",
          "url": "https://trendaryo.com",
          "logo": "https://trendaryo.com/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-TRENDAR",
            "contactType": "customer service",
            "availableLanguage": ["English", "Dari", "Pashto"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressRegion": "Global"
          },
          "sameAs": [
            "https://facebook.com/trendaryo",
            "https://twitter.com/trendaryo",
            "https://instagram.com/trendaryo"
          ]
        };
        
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.image,
          "brand": {
            "@type": "Brand",
            "name": data.brand || "Trendaryo"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Trendaryo"
            }
          },
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 1
          } : undefined
        };
        
      case 'review':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.rating,
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": data.author
          },
          "reviewBody": data.text,
          "itemReviewed": {
            "@type": "Product",
            "name": data.productName
          }
        };
        
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
        
      default:
        return null;
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}