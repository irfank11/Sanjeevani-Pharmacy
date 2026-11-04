import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageMetadata } from '../seo';

export default function SeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    updatePageMetadata(pathname);
  }, [pathname]);

  return null;
}
