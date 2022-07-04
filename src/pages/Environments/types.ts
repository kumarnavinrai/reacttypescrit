export interface EnvironmentsProps {
  groupId: string;
  rerenderEnvironmentsFlag: number;
  setRerenderEnvironmentsFlag: () => void;
}

export interface ManageEnvironmentsDialogProps {
  groupId: string;
  dialogClose: () => void;
  dialogOpen: boolean;
  hasChangedCallback: () => void;
  updateEnvironmentId?: string;
  action: string;
  defaultSID?: string | null;
}

export interface EnvironmentFormDataType {
  name?: string;
  groupId: string;
  sapSystemId: string;
  description: string;
  environmentTypeTag: string;
  applicationTag: string;
  applicationVersionTag: string;
}

export interface UpdateEnvironmentFormDataType {
  id: string;
  version: number;
  payload: {
    name: string;
    groupId: string;
    description: string;
    sapSystemId: string;
    applicationTag: string;
    environmentTypeTag: string;
    applicationVersionTag: string;
  };
}

export interface DropdownType {
  ENVIRONMENT_TYPE:
    | {
        payload: {
          name: string;
          tag: string;
        };
      }[]
    | null;
  APPLICATION:
    | {
        payload: {
          name: string;
          tag: string;
        };
      }[]
    | null;
  APPLICATION_VERSION:
    | {
        payload: {
          name: string;
          tag: string;
        };
      }[]
    | null;
}

export interface EnvironmentsDataType {
  id: string;
  payload: EnvironmentsPayloadType;
}

export interface EnvironmentsPayloadType {
  sapSystemId: string;
  applicationTag: string;
  applicationVersionTag: string;
  environmentTypeTag: string;
  extractCount: number;
  latestExtractInfo: {
    extractTypeTag: string;
    jobInProgress: boolean;
    latestJobStatusDate: string;
  };
}

export interface ExtractsPayloadType {
  id: string;
  payload: {
    descriptionTag: string;
    latestJobInfo: {
      name: string;
      currentStatus: {
        code: string;
        message: string;
        occuredAt: string;
      };
    };
    extractInfo: {
      sapSystemInfo: {
        extractTypeTag: string;
      };
    };
  };
}

export interface CollapsibleEnvironmentsTableProps {
  groupId: string;
  rerenderEnvironmentsFlag: number;
  environmentsDataUnderLandscape?: any;
  setRerenderEnvironmentsFlag: () => void;
}
