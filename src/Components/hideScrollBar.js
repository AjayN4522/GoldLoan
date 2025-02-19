import { useEffect } from 'react';

const useHideScrollbar = () => {
  useEffect(() => {
    let hideTimeout;

    const handleScroll = () => {
      // Add the "show-scrollbar" class
      document.body.classList.add('show-scrollbar');
      document.body.classList.remove('hide-scrollbar');

      // Clear any previous timeout
      clearTimeout(hideTimeout);

      // Set a timeout to hide the scrollbar
      hideTimeout = setTimeout(() => {
        document.body.classList.add('hide-scrollbar');
        document.body.classList.remove('show-scrollbar');
      }, 1000); // 1 second
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);
};

export default useHideScrollbar;
