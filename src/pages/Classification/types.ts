export interface FormClassificationDataProps {
  objectClassificationName: string;
  objectClassificationTag: string;
  defaultType: boolean;
  groupId: string;
  groupName: string;
}

export interface FormSubClassificationDataProps extends FormClassificationDataProps {
  objectSubClassificationName: string;
  objectSubClassificationTag: string;
  parentClassificationTag: string;
  parentObjectClassificationTag: string;
  defaultSubType: boolean;
}

export interface FormAttributeDataProps {
  groupId: string;
  defaultGroup: boolean;
  objectClassificationTag: string;
  objectSubClassificationTag: string;
  attributeName: string;
  attributeTypeTag: string;
  sequence: number;
  attributeValue: string;
  entityCheckOperatorTag: string;
}
