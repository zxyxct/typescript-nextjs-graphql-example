'use client';
import { useEffect, useCallback, useMemo } from 'react';
import { CartLocalStorageI } from '../../graphql/types';
import { CartItemsVar, CustomInMemoryCache } from '../../graphql/cache';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
export const InitCart = () => {
  //  const [persistor, setPersistor] =
  //  useState<CachePersistor<NormalizedCacheObject>>();
  //const [loaded, setLoaded] = useState(false);
  const init = useCallback(() => {
    try {
      let currentCart: CartLocalStorageI;
      const localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        currentCart = JSON.parse(localStorageValue);
        CartItemsVar(currentCart);
      }
      const newPersistor = new CachePersistor({
        cache: CustomInMemoryCache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });
      newPersistor.restore();
      //    setPersistor(newPersistor);
      //   setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const memoizedInit = useMemo(() => init, [init]);

  useEffect(() => {
    memoizedInit();
  }, [memoizedInit]);
};
