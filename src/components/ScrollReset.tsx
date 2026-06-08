'use client';

import { useEffect } from 'react';

/**
 * ScrollReset — Disables browser scroll restoration so the page
 * always starts at the top on refresh instead of jumping mid-page.
 */
export default function ScrollReset() {
  useEffect(() => {
    // Tell the browser: don't restore scroll position, we'll handle it
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to absolute top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return null; // renders nothing — purely a behavior component
}
