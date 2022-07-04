import { useEffect, useState } from 'react';
import { getPackageDepDataByLandscapeId } from '../../../api/Reports';
import { useShowApplicationError } from '../../../components/common/useShowApplicationError';
import { IAnalysisPackageDepData, IAnalysisReportingPaginatedList } from './types';

// This component is used for fetching the package dependency data.
const useGetPackageDepDataByLandscapeId = (
  landscapeId: string,
  search: string = '',
  pageSizeParam: number,
  pageIndexParam: number = 0
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(pageIndexParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const [packageDepDataByLandscape, setPackageDepDataByLandscape] = useState<IAnalysisReportingPaginatedList>({
    data: [],
    pageIndex: 0,
    pageRowCount: 0,
    totalCount: 0,
  });

  const { showApplicationError } = useShowApplicationError();

  const mapToReportingData = (responseData: any) => {
    const analysisReportingData: IAnalysisPackageDepData[] = responseData.data.map((data: any) => ({
      id: data.uuid,
      ...data,
    }));

    const analysisReportingPaginatedList: IAnalysisReportingPaginatedList = {
      data: analysisReportingData,
      pageIndex: responseData.pageNum,
      pageRowCount: responseData.numItems,
      totalCount: responseData.totalCount,
    };

    setPackageDepDataByLandscape(analysisReportingPaginatedList);
  };

  const onPageChange = (newPageIndex: number) => {
    setIsLoading(true);
    setpageIndex(newPageIndex);
  };

  const onPageSizeChange = (pageSize: number) => {
    setIsLoading(true);
    setpageIndex(0);
    setPageSize(pageSize);
  };

  useEffect(() => {
    if (landscapeId) {
      getPackageDepDataByLandscapeId(landscapeId, search, pageIndex, pageSize)
        .then((responseData: any) => {
          mapToReportingData(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in loading Package Dependency data by Landscape');
        });
    }
  }, [landscapeId, search, pageIndex, pageSize]);

  return { isLoading, packageDepDataByLandscape, pageSize, pageIndex, onPageChange, onPageSizeChange };
};

export default useGetPackageDepDataByLandscapeId;
