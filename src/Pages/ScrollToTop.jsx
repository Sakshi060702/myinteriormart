import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Retrieve the saved scroll position from sessionStorage
    const savedPosition = sessionStorage.getItem(`scroll-position-${location.pathname}`);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
      // If there's no saved position, scroll to the top
      window.scrollTo(0, 0);
    }

    // Save the scroll position on unmount
    return () => {
      sessionStorage.setItem(`scroll-position-${location.pathname}`, window.scrollY);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
