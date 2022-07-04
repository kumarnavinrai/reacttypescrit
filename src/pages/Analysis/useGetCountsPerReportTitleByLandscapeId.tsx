import { useEffect, useState } from 'react';
import { countsPerReportTitleByLandscapeId } from '../../api/Reports';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { ICountsPerReportTitle } from './types';

// This component is used for fetching the organization data.
const useGetCountsPerReportTitleByLandscapeId = (landscapeId: string) => {
  const [countsPerReportTitle, setCountsPerReportTitle] = useState<ICountsPerReportTitle[]>([]);

  const { showApplicationError } = useShowApplicationError();

  const mapToCountsPerReportTitle = (data: any) => {
    let countsPerReportTitleData: ICountsPerReportTitle[] = [];

    for (var item of data) {
      countsPerReportTitleData.push({
        reportTitle: item.reportTitleTag,
        totalCount: item.totalCount,
      } as ICountsPerReportTitle);
    }
    setCountsPerReportTitle(countsPerReportTitleData);
  };

  useEffect(() => {
    if (landscapeId) {
      countsPerReportTitleByLandscapeId(landscapeId)
        .then((data: any) => {
          mapToCountsPerReportTitle(data);
        })
        .catch((error) => {
          showApplicationError(error, 'Error in loading counts per Report title');
        });
    }
  }, [landscapeId]);

  return { countsPerReportTitle };
};

export default useGetCountsPerReportTitleByLandscapeId;
