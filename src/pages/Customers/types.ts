import { CustomerFormDataProps } from './Customer';

export interface OrgsListProps {
  groupId: string;
  groupName: string;
}

export interface GroupDetailProps {
  id: string;
  payload: CustomerFormDataProps;
  metadata: CustomerMetaDataProps;
}

export interface CustomerMetaDataProps {
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}
