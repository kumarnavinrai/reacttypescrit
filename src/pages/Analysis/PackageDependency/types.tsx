import { IPagination } from '../../../types';

export interface IAnalysisReportingPaginatedList extends IPagination {
  data: IAnalysisPackageDepData[];
}

export interface IAnalysisPackageDepData {
  id: string;
  entryDevclass: string;
  entryDevcText: string;
  objectDevclass: string;
  objectDevcText: string;
  pdevc: string;
  pdevcText: string;
  component: string;
  componentText: string;
  dlvunit: string;
  onlyDdDependencies: string;
  countOfReferences: string;
  reverseCountOfReferences: string;
}

export interface IAnalysisPackageDepProps {
  landscapeId: string;
  search: string;
}
export interface IPackageDependencyGraphData {
  nodes: NodeData[];
  edges: EdgeData[];
  pageIndex: number;
  pageRowCount: number;
  totalCount: number;
}
export interface NodeData {
  id: string;
  label: string;
  summarizedNode: boolean;
  color: any;
  font: any;
  payload: Payload;
}

export interface EdgeData {
  from: string;
  to: string;
  label: string;
  title: any;
  payload: Payload;
}

export interface Payload {
  uuid: string;
  entryDevclass: string;
  entryDevcText: string;
  objectDevclass: string;
  objectDevcText: string;
  pdevc: string;
  pdevcText: string;
  component: string;
  componentText: string;
  dlvunit: string;
  onlyDdDependencies: boolean;
  countOfReferences: string;
  reverseCountOfReferences: string;
}

export interface IPackageDependencyNetworkGraphProps {
  groupId: string;
  landscapeId: string;
  entryDevClassParam: string;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeData | null>>;
}

export interface IPackageDependencyGraphDetailsPanelProps {
  selectedNode: NodeData | null;
}
