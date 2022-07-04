import { useEffect, useState } from 'react';
import { getGroupDetails } from '../../api/Customers';
import { getLandscapesByGroupId } from '../../api/Landscapes';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { ILandscapeData } from './types';

// This component is used for fetching the organization data.
const useGetLandscapeNavigationData = (groupId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupLandscapeData, setGroupLandscapeData] = useState({
    groupId: '',
    groupName: '',
    landScapes: [] as ILandscapeData[],
  });
  const [error, setError] = useState('');

  const { showApplicationError } = useShowApplicationError();

  const mapToCustomerData = (responseData: any) => {
    if (responseData)
      setGroupLandscapeData((prevState) => ({
        ...prevState,
        groupId: responseData.id,
        groupName: responseData?.payload?.name,
      }));
  };

  const mapToLandscapeData = (responseData: any) => {
    if (responseData && responseData.data) {
      let landscapes: ILandscapeData[] = [];

      for (var landscapeData of responseData.data) {
        landscapes.push({
          id: landscapeData.id,
          name: landscapeData?.payload?.name,
          defaultLandscape: landscapeData?.payload?.defaultLandscape,
        });
      }

      setGroupLandscapeData((prevState) => ({
        ...prevState,
        landScapes: landscapes.sort((a, b) => a.name.localeCompare(b.name)),
      }));
    }
  };

  useEffect(() => {
    if (groupId) {
      getGroupDetails(groupId)
        .then((data: any) => {
          mapToCustomerData(data);
        })
        .catch((error) => setError('Error in getting Group details'));

      getLandscapesByGroupId(groupId)
        .then((data: any) => {
          mapToLandscapeData(data);
        })
        .catch((error) => setError('Error in getting Landscapes'));

      setIsLoading(false);
    }
  }, [groupId, showApplicationError]);

  return { groupLandscapeData, isLoading, error };
};

export default useGetLandscapeNavigationData;
