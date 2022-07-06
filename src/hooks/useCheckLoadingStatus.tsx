import { useState } from 'react';
import { useAppSelector } from '../redux/store/store';

const useCheckLoadingStatus: Function = () => {
  const [loadingStatus, setLoadingStatus] = useState<null | Boolean>(null);
  const { loadingStatusContent } = useAppSelector((state) => state.contentSlice);
  const { loadingStatusNavigation } = useAppSelector((state) => state.navigationSlice);
  if (loadingStatusContent === 'loading' || loadingStatusNavigation === 'loading') {
    setLoadingStatus(true);
  } else {
    setLoadingStatus(false);
  }
  return { loadingStatus };
};

export default useCheckLoadingStatus;
