import { useEffect, useState } from 'react';
import { getOrgTreeData } from '../../api/Organizations';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { IOrganizationTreeData } from './types';

// This component is used for fetching the organization Tree data.
const useGetOrgTreeData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgTreeData, setOrgTreeData] = useState<IOrganizationTreeData[]>([]);
  const { showApplicationError } = useShowApplicationError();

  const mapToTreeData = (data: any): IOrganizationTreeData[] => {
    return data.map((dataItem: any) => {
      let childOrgs = undefined;
      if (dataItem.childOrgs && dataItem.childOrgs.length > 0) {
        childOrgs = mapToTreeData(dataItem.childOrgs);
      }
      return {
        id: dataItem.groupId,
        totalOrgChildren: dataItem.totalOrgChildren,
        totalCustomers: dataItem.totalCustomers,
        organizationName: dataItem.groupName,
        childOrganizations: childOrgs ? childOrgs : ([] as IOrganizationTreeData[]),
      } as IOrganizationTreeData;
    });
  };

  useEffect(() => {
    getOrgTreeData()
      .then((data: any) => {
        let treeData = mapToTreeData(data);
        setOrgTreeData(treeData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showApplicationError(error, 'Error in loading Org tree data');
      });
  }, []);

  return { isLoading, orgTreeData };
};

export default useGetOrgTreeData;
