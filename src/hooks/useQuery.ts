import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/** Hook, that parse query string */
export function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
