import { IPagination } from '../../types';

export interface IAnalysisCardProps {
  title: string;
  totalCount?: number;
  cardType: string;
  groupId: string;
  landscapeId: string;
}

export interface IAnalysisReportingPaginatedList extends IPagination {
  data: IAnalysisReportingData[];
}

export interface ITechDependencyReportingPaginatedList extends IPagination {
  data: ITechDependencyReportingData[];
}

export interface IAnalysisReportingData {
  id: string;
  environment: string;
  reportType: string;
  reportDate: string;
  reportTitle: string;
  extractFileName: string;
  reportStatus: string;
  download: string;
}

export interface ITechDependencyReportingData {
  id: string;
  jobName: string;
  criteriaName: string;
  groupId: string;
  landscapeId: string;
  jobStatusCode: string;
  occuredAt: string;
  environmentId: string;
  associatedExtractFilename: string;
}

export interface IAnalysisReportingProps {
  landscapeId: string;
}

export interface ITechDependencyReportingProps {
  landscapeId: string;
  reportDataByLandscape: ITechDependencyReportingPaginatedList;
  pageSize: number;
  pageIndex: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (newPageIndex: number) => void;
  isLoading: boolean;
  setFetchDataFlag: React.Dispatch<React.SetStateAction<number>>;
  fetchDataFlag: number;
}

export interface ITechDependencyFormProps {
  landscapeId: string;
  fetchDataFlag: number;
  setFetchDataFlag: React.Dispatch<React.SetStateAction<number>>;
}

export interface INavigatorProps {
  groupId: string;
  landscapeSelected: { id: string; name: string };
  setLandscapeSelected: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
  hideLandscapeSelection: boolean;
  tailText: string;
}

export interface ICountsPerReportTitle {
  reportTitle: string;
  totalCount: number;
}

export interface ITechDependencyFormDataProps {
  reportName: string;
  landscapeId: string;
  groupId: string;
  sourceCodeDepth: number;
  dataDictDepth: number;
  otherDepth: number;
  fileObjectType: string;
}
