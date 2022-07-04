import { useEffect, useState } from 'react';
import { getClassificationSubypesByParentType } from '../../api/Classification';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';

// Custom hook for fetching classificationSubtypes for left navigation
const useGetClassificationSubtypes = (parentTypeTag: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [classificationSubtypes, setClassificationSubtypes] = useState([]);

  const { showApplicationError } = useShowApplicationError();

  useEffect(() => {
    if (parentTypeTag) {
      getClassificationSubypesByParentType(parentTypeTag)
        .then((data: any) => {
          setClassificationSubtypes(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in getting Classification Subtypes');
        });
    } else {
      setIsLoading(false);
    }
  }, [parentTypeTag, showApplicationError]);

  return { classificationSubtypes, isLoading };
};

export default useGetClassificationSubtypes;
