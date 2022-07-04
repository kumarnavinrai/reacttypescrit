export interface ICreateOrganizationDialogProps {
  dialogCallback(dialogOpen: boolean): void;
  dialogOpen: boolean;
  hasChangedCallback(): void;
  showNotification(message: string, severity?: string): void;
  parentGroupId: string | null;
  parentGroupName: string | null;
  resetNodeInfo(): void;
}

export interface IOrganizationsFormData {
  name?: string;
  description?: string;
  emailAddress?: string;
  groupTypeTag: string;
  internalGroup?: boolean;
  parentGroupId: null | string;
}

export interface IOrganizationData {
  id: string;
  organizationName: string | null;
  customerName: string;
  parentOrganizationId: string;
  parentOrganizationName: string | null;
  landscapes: number | null;
  extracts: number | null;
  customerContactEmail: string | null;
  actionsMenu: string | null;
  organizationType: string;
  totalCustomers: number | null;
}

export interface IOrganizationTreeData {
  id: string;
  organizationName: string;
  totalCustomers: number;
  totalOrgChildren: number;
  childOrganizations: IOrganizationTreeData[];
  childCustomers: IOrganizationData[];
}

export interface IOrganizationListViewProps {
  organizationData: IOrganizationData[];
  isLoading: boolean;
  showDialogBox(): void;
  handleParentOrgDataForNewOrganization(parentGroupId: string, parentGroupName: string): void;
  showNotification(message: string, severity?: string): void;
}

export interface IOrganizationTreeDialogProps {
  organizationTreeDialogOpen: boolean;
  setOrganizationTreeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectedOrganization(orgId: string, orgName: string): void;
}
