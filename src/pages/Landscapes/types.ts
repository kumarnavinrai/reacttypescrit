export interface ILandscapesProps {
  groupId: string;
  rerenderEnvironmentsFlag: number;
  setRerenderEnvironmentsFlag: () => void;
}

export interface ICollapsibleLandscapeProps {
  groupId: string;
  landscapesData: {
    id: string;
    payload: {
      name: string;
      environmentIds: string[];
    };
  }[];
  environmentsData: unknown;
  rerenderEnvironmentsFlag: number;
  setRerenderEnvironmentsFlag: () => void;
  hasChangedCallback: () => void;
}

export interface ILandscapeProps extends Omit<ICollapsibleLandscapeProps, 'landscapesData'> {
  landscape: {
    id: string;
    payload: {
      name: string;
      environmentIds: string[];
    };
  };
}

export interface ILandscapeData {
  id: string;
  name: string;
  defaultLandscape: boolean;
}
