import { useEffect, useState } from 'react';
import { getAnalysisReportByLandscapeId } from '../../api/Reports';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { IAnalysisReportingData, IAnalysisReportingPaginatedList } from './types';

// This component is used for fetching the organization data.
const useGetReportDataByLandscapeId = (landscapeId: string, pageSizeParam: number, pageIndexParam: number = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(pageIndexParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const [reportDataByLandscape, setReportDataByLandscape] = useState<IAnalysisReportingPaginatedList>({
    data: [],
    pageIndex: 0,
    pageRowCount: 0,
    totalCount: 0,
  });

  const { showApplicationError } = useShowApplicationError();

  const mapToReportingData = (responseData: any) => {
    let analysisReportingData: IAnalysisReportingData[] = [];

    for (var reportData of responseData.data) {
      analysisReportingData.push({
        id: reportData.id,
        environment: reportData.payload.environmentSapSystemId,
        reportType: reportData.payload.reportTypeTag,
        reportDate: new Date(reportData.metadata.createdAt).toLocaleDateString(),
        reportTitle: reportData.payload.reportTitleTag,
        extractFileName: reportData.payload.associatedExtractFilename,
        reportStatus: reportData.payload.jobStatus.code,
        download: '',
      } as IAnalysisReportingData);
    }

    const analysisReportingPaginatedList: IAnalysisReportingPaginatedList = {
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
      getAnalysisReportByLandscapeId(landscapeId, pageIndex, pageSize)
        .then((responseData: any) => {
          mapToReportingData(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in loading Analysis Reporting data by Landscape');
        });
    }
  }, [landscapeId, pageIndex, pageSize]);

  return { isLoading, reportDataByLandscape, pageSize, pageIndex, onPageChange, onPageSizeChange };
};

export default useGetReportDataByLandscapeId;
