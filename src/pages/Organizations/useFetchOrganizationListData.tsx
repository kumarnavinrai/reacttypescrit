import { useEffect, useState } from 'react';
import { getOrgTreeAsList } from '../../api/Organizations';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { IOrganizationData } from './types';

// This component is used for fetching the organization data.
const useFetchOrganizationListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState<IOrganizationData[]>([]);
  const [fetchDataFlag, setFetchDataFlag] = useState(0);
  const { showApplicationError } = useShowApplicationError();

  const mapToOrganizationData = (data: any) => {
    let organizations: IOrganizationData[] = [];

    for (var orgData of data) {
      organizations.push({
        id: orgData.groupId,
        parentOrganizationId: orgData.parentGroupId,
        parentOrganizationName: orgData.parentGroupName,
        organizationName: orgData.groupTypeTag && orgData.groupTypeTag === 'ORGANIZATION' ? orgData.groupName : null,
        customerName: orgData.groupTypeTag && orgData.groupTypeTag === 'CUSTOMER' ? orgData.groupName : null,
        landscapes: orgData.groupTypeTag && orgData.groupTypeTag === 'CUSTOMER' ? orgData.numLandscapes : null,
        extracts: orgData.groupTypeTag && orgData.groupTypeTag === 'CUSTOMER' ? orgData.numExtracts : null,
        customerContactEmail: orgData.contactEmail,
        actionsMenu: null,
        organizationType: orgData.groupTypeTag,
        totalCustomers: orgData.totalChildCustomers,
      } as IOrganizationData);
    }

    setOrganizationData(organizations);
  };

  useEffect(() => {
    getOrgTreeAsList()
      .then((data: any) => {
        mapToOrganizationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showApplicationError(error, 'Error in loading Org tree list data');
      });
  }, [fetchDataFlag]);

  return { isLoading, organizationData, fetchDataFlag, setFetchDataFlag };
};

export default useFetchOrganizationListData;
