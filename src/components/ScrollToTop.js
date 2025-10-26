import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (like #section), don't scroll to top
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 0);
      return;
    }

    // Smooth scroll to top for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Alternative: Instant scroll (uncomment if you prefer)
    // window.scrollTo(0, 0);

  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;