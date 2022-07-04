import ApiClient from '../apiClient';

export const getClassificationTypes = async () => {
  try {
    const response = await ApiClient.get('/api/classificationTypes');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get all Classification sub-types
 * @returns
 */
export const getAllClassificationSubypes = async () => {
  try {
    const response = await ApiClient.get(`/api/classificationSubtypes`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getClassificationSubypesByParentType = async (parentTypeTag: string) => {
  try {
    const response = await ApiClient.get(`/api/classificationSubtypes/byParentType/${parentTypeTag}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getClassificationConfigsByType = async (type: string, pageNum: number = 0, pageSize: number = 100) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        classificationTypeTag: type,
      },
    };

    const response = await ApiClient.post('/api/classificationConfigs/search/byType', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getClassificationConfigsByTypeAndSubtype = async (
  type: string,
  subtype: string,
  pageNum: number = 0,
  pageSize: number = 100
) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        classificationTypeTag: type,
        classificationSubtypeTag: subtype,
      },
    };

    const response = await ApiClient.post('/api/classificationConfigs/search/byTypeAndSubtype', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get Classification Attributes
 * @returns
 */
export const getClassificationAttributes = async () => {
  try {
    const response = await ApiClient.get('/api/classificationAttributes');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get Default Classification Group
 * @returns
 */
export const getDefaultClassificationGroup = async () => {
  try {
    const response = await ApiClient.get('/api/classificationConfigs/defaultClassificationGroup');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Create Classification Type API
 * @param formData
 * @returns
 */
export const createClassification = async (data: any) => {
  try {
    const formData = {
      name: data.objectClassificationName,
      tag: data.objectClassificationTag.toUpperCase(),
      defaultType: data.defaultGroup,
      groupId: data.groupId,
    };

    const response = await ApiClient.post('/api/classificationTypes', formData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Create Classification Subtype API
 * @param data
 * @returns
 */
export const createSubClassification = async (data: any) => {
  try {
    const formData = {
      name: data.objectSubClassificationName,
      tag: data.objectSubClassificationTag.toUpperCase(),
      defaultSubtype: data.defaultGroup,
      groupId: data.groupId,
      parentClassificationTypeTag: data.parentObjectClassificationTag,
    };

    const response = await ApiClient.post('/api/classificationSubtypes', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Create Classification Config API
 * @param data
 * @returns
 */
export const createClassificationConfig = async (data: any) => {
  try {
    const formData = {
      groupId: data.groupId,
      defaultConfig: data.defaultGroup,
      classificationTypeTag: data.objectClassificationTag.toUpperCase(),
      classificationSubtypeTag: data.objectSubClassificationTag.toUpperCase(),
      attributeName: data.attributeName,
      classificationAttributeTag: data.attributeTypeTag.toUpperCase(),
      sequence: data.sequence,
      attributeValue: data.attributeValue,
      entityCheckOperatorTag: data.entityCheckOperatorTag,
    };

    const response = await ApiClient.post('/api/classificationConfigs', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Edit Classification Config API
 * @param data
 * @returns
 */
export const editClassificationConfig = async (formData: any) => {
  try {
    const response = await ApiClient.put(`/api/classificationConfigs/${formData.id}`, formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Delete Classification Config
 * @param id
 * @returns
 */
export const deleteClassificationConfig = async (id: string) => {
  try {
    const response = await ApiClient.delete(`/api/classificationConfigs/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get Classification Config by Id
 * @param id
 * @returns
 */
export const getClassificationConfig = async (id: string) => {
  try {
    //return testClassificationConfig;
    const response = await ApiClient.get(`/api/classificationConfigs/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const testClassificationConfig = {
  sequence: 108374,
  id: 'b2d61696-2ef4-4573-9404-409456dd7a97',
  aggregateType: 'amp.ClassificationConfig',
  version: 1,
  payload: {
    name: null,
    groupId: '00ff7d33-c001-4353-acae-0550cab03c8e',
    sequence: 2,
    artifactId: null,
    attributeName: 'alfa name',
    defaultConfig: true,
    attributeValue: 'alfa value',
    entityLookupNameCol: null,
    classificationTypeTag: 'TEST RA5',
    entityLookupTableName: null,
    entityCheckOperatorTag: 'MATCHES',
    entityLookupSmttypeCol: null,
    classificationSubtypeTag: 'TEST SUB RA1',
    classificationAttributeTag: 'INTERFACE_ACCESS',
    entityLookupEntityTypeOverride: null,
  },
  metadata: {
    createdBy: 'rjain@smartshift.com',
    createdAt: '2021-12-08T13:54:40.932734',
    modifiedBy: null,
    modifiedAt: null,
    deletedBy: null,
    deletedAt: null,
    tenantId: '00ff7d33-c001-4353-acae-0550cab03c8e',
  },
  logDate: '2021-12-08T13:54:40.967964',
  type: 'CreatedEvent',
};
