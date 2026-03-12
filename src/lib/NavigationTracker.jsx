import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Автоматично превъртане най-горе при всяка нова страница
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
