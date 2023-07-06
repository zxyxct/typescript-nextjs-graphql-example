import { useState, useCallback, useEffect } from 'react';
export function WindowWidthHook() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    handleResize();
    // Add event listener to update the width when the window is resized
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { currentWidth: windowWidth };
}
