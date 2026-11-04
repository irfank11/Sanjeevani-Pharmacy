export const siteUrl = 'https://sanjeevani-pharmacy-b5dc.vercel.app';

export const business = {
  name: 'Sanjeevani Pharmacy',
  category: 'Pharmacy',
  address: {
    streetAddress: 'Harsaur Road, Gandhi Chowk',
    addressLocality: 'Parbatsar',
    addressRegion: 'Rajasthan',
    postalCode: '341512',
    addressCountry: 'IN',
  },
  geo: {
    latitude: '26.53',
    longitude: '74.46',
  },
} as const;

interface PageMetadata {
  title: string;
  description: string;
  indexable: boolean;
}

const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Sanjeevani Pharmacy | Pharmacy in Parbatsar, Rajasthan',
    description: 'Visit Sanjeevani Pharmacy on Harsaur Road, Gandhi Chowk, Parbatsar, Rajasthan. Find location details and learn about eye consultations with Dr Tanveer Alam Khan.',
    indexable: true,
  },
  '/about': {
    title: 'About Dr Tanveer Alam Khan | Sanjeevani Pharmacy',
    description: 'Learn about Dr Tanveer Alam Khan, his ophthalmology background, and his weekly eye consultations at Sanjeevani Pharmacy in Parbatsar, Rajasthan.',
    indexable: true,
  },
  '/services': {
    title: 'Eye Consultation Services in Parbatsar | Sanjeevani Pharmacy',
    description: 'Explore eye consultation services with Dr Tanveer Alam Khan at Sanjeevani Pharmacy, Gandhi Chowk, Parbatsar. Surgical care is referred to the Ajmer centre.',
    indexable: true,
  },
  '/contact': {
    title: 'Contact Sanjeevani Pharmacy | Gandhi Chowk, Parbatsar',
    description: 'Find Sanjeevani Pharmacy at Harsaur Road, Gandhi Chowk, Parbatsar, Didwana-Kuchaman, Rajasthan 341512, and view consultation contact details.',
    indexable: true,
  },
  '/privacy': {
    title: 'Privacy Policy | Sanjeevani Pharmacy',
    description: 'Read the privacy policy for the Sanjeevani Pharmacy website and its appointment and contact features.',
    indexable: true,
  },
  '/refund': {
    title: 'Refund and Cancellation Policy | Sanjeevani Pharmacy',
    description: 'Read the refund and cancellation policy for appointments at Sanjeevani Pharmacy in Parbatsar, Rajasthan.',
    indexable: true,
  },
  '/book': {
    title: 'Book an Appointment | Sanjeevani Pharmacy',
    description: 'Use the appointment booking page for Sanjeevani Pharmacy in Parbatsar, Rajasthan.',
    indexable: false,
  },
  '/check': {
    title: 'Check Appointment Status | Sanjeevani Pharmacy',
    description: 'Check the status of an appointment with Sanjeevani Pharmacy.',
    indexable: false,
  },
  '/admin': {
    title: 'Administration | Sanjeevani Pharmacy',
    description: 'Private administration page.',
    indexable: false,
  },
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function updatePageMetadata(pathname: string) {
  const normalizedPath = pathname || '/';
  const page = pageMetadata[normalizedPath] ?? {
    title: 'Page Not Found | Sanjeevani Pharmacy',
    description: 'The requested page could not be found on the Sanjeevani Pharmacy website.',
    indexable: false,
  };
  const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;

  document.title = page.title;
  document.documentElement.lang = 'en-IN';
  setMeta('name', 'description', page.description);
  setMeta('name', 'robots', page.indexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow');
  setMeta('name', 'author', 'Sanjeevani Pharmacy');
  setMeta('property', 'og:locale', 'en_IN');
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', business.name);
  setMeta('property', 'og:title', page.title);
  setMeta('property', 'og:description', page.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('name', 'twitter:card', 'summary');
  setMeta('name', 'twitter:title', page.title);
  setMeta('name', 'twitter:description', page.description);

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.createElement('link');
  canonical.setAttribute('rel', 'canonical');
  canonical.href = canonicalUrl;
  if (!canonical.parentNode) {
    document.head.appendChild(canonical);
  }

  const structuredDataId = 'sanjeevani-local-business-schema';
  const structuredData = document.getElementById(structuredDataId) as HTMLScriptElement | null;

  if (normalizedPath === '/') {
    const script = structuredData ?? document.createElement('script');
    script.id = structuredDataId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Pharmacy',
      name: business.name,
      url: siteUrl,
      telephone: '+91-7947149526',
      category: business.category,
      description: 'Sanjeevani Pharmacy is a local pharmacy and eye care consultation point in Parbatsar, Rajasthan.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      areaServed: 'Parbatsar, Didwana-Kuchaman, Rajasthan',
      sameAs: ['https://sanjeevani-pharmacy-b5dc.vercel.app/'],
    });
    if (!structuredData) {
      document.head.appendChild(script);
    }
  } else if (structuredData) {
    structuredData.remove();
  }
}
