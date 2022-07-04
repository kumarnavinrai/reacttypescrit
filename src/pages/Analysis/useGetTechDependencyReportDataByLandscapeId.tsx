import { useEffect, useState } from 'react';
import { getTechDependencyLandscapeId } from '../../api/Reports';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { ITechDependencyReportingData, ITechDependencyReportingPaginatedList } from './types';

// This component is used for fetching the Tech Dependency report data.
const useGetTechDependencyReportDataByLandscapeId = (
  landscapeId: string,
  pageSizeParam: number = 5,
  pageIndexParam: number = 0
) => {
  const [fetchDataFlag, setFetchDataFlag] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(pageIndexParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const [reportDataByLandscape, setReportDataByLandscape] = useState<ITechDependencyReportingPaginatedList>({
    data: [],
    pageIndex: 0,
    pageRowCount: 0,
    totalCount: 0,
  });

  const { showApplicationError } = useShowApplicationError();

  const mapToReportingData = (responseData: any) => {
    let analysisReportingData: ITechDependencyReportingData[] = [];

    for (var reportData of responseData.data) {
      analysisReportingData.push({
        id: reportData.id,
        jobName: reportData.payload.name,
        criteriaName: reportData.payload.criteria?.name,
        groupId: reportData.payload.groupId,
        jobStatusCode: reportData.payload.jobStatus?.code,
        occuredAt: new Date(reportData.payload.jobStatus?.occuredAt).toLocaleDateString(),
        environmentId: reportData.payload.environmentId,
        associatedExtractFilename: reportData.payload.associatedExtractFilename,
      } as ITechDependencyReportingData);
    }

    const analysisReportingPaginatedList: ITechDependencyReportingPaginatedList = {
      data: analysisReportingData,
      pageIndex: responseData.pageNum,
      pageRowCount: responseData.numItems,
      totalCount: responseData.totalCount,
    };
    setReportDataByLandscape(analysisReportingPaginatedList);
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
      getTechDependencyLandscapeId(landscapeId, pageIndex, pageSize)
        .then((responseData: any) => {
          mapToReportingData(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in loading Tech Dependency Reporting data by Landscape');
        });
    }
  }, [landscapeId, pageIndex, pageSize, fetchDataFlag]);

  return {
    isLoading,
    reportDataByLandscape,
    pageSize,
    pageIndex,
    onPageChange,
    onPageSizeChange,
    fetchDataFlag,
    setFetchDataFlag,
  };
};

export default useGetTechDependencyReportDataByLandscapeId;
