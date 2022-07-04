import fileDownload from 'js-file-download';
import { useCallback } from 'react';
import { downloadReportById } from '../../api/Reports';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';

// This component is used for downloading Analysis report data.
const useDownloadReport = () => {
  const { showApplicationError } = useShowApplicationError();

  const downloadReport = useCallback((id: string) => {
    if (id) {
      downloadReportById(id)
        .then((response: any) => {
          const contentDisposition = response.headers['content-disposition'];
          const fileName = contentDisposition.match(/\bfilename=([^;]*)/)[1].trim();
          fileDownload(response.data, fileName);
        })
        .catch((error) => {
          showApplicationError(error, 'Error in downloading Reporting data');
        });
    }
  }, []);

  return { downloadReport };
};

export default useDownloadReport;
