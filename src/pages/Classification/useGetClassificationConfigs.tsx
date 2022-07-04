import { useEffect, useState } from 'react';
import { getClassificationConfigsByType, getClassificationConfigsByTypeAndSubtype } from '../../api/Classification';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';

// Custom hook for fetching classificationConfigs for Attributes
const useGetClassificationConfigs = (type: string, subtype: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [classificationConfig, setClassificationConfig] = useState({ data: [] });
  const [fetchDataFlag, setFetchDataFlag] = useState(true);

  const { showApplicationError } = useShowApplicationError();

  useEffect(() => {
    if (type && subtype) {
      getClassificationConfigsByTypeAndSubtype(type, subtype)
        .then((data: any) => {
          setClassificationConfig(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in getting Classification Configs');
        });
    } else if (type && !subtype) {
      getClassificationConfigsByType(type)
        .then((data: any) => {
          setClassificationConfig(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in getting Classification Configs');
        });
    } else {
      setClassificationConfig({ data: [] });
      setIsLoading(false);
    }
  }, [showApplicationError, subtype, type, fetchDataFlag]);

  return { classificationConfig, isLoading, fetchDataFlag, setFetchDataFlag };
};

export default useGetClassificationConfigs;
