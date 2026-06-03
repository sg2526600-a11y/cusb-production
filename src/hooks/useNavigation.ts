// ─── useNavigation ────────────────────────────────────────────────────────────
// Drop-in replacement for the old usePage() hook.
// Wraps React Router so all existing components can migrate with minimal churn.

import { useNavigate, useLocation } from 'react-router-dom';
import { PAGE_ID_TO_PATH } from '@/routes';
import type { PageId } from '@/types';

interface NavigationHook {
  /** Navigate to a page by its legacy PageId */
  navigateTo: (id: PageId) => void;
  /** The current active PageId derived from the URL path */
  currentPage: PageId;
}

// Reverse map: path → pageId
const PATH_TO_PAGE_ID = Object.entries(PAGE_ID_TO_PATH).reduce<Record<string, PageId>>(
  (acc, [id, path]) => {
    acc[path] = id as PageId;
    return acc;
  },
  {}
);

export function useNavigation(): NavigationHook {
  const navigate  = useNavigate();
  const location  = useLocation();

  const navigateTo = (id: PageId) => {
    const path = PAGE_ID_TO_PATH[id] ?? '/';
    navigate(path);
  };

  const currentPage: PageId =
    PATH_TO_PAGE_ID[location.pathname] ?? 'home';

  return { navigateTo, currentPage };
}
