import { IOrganizationsFormData } from '../../pages/Organizations/types';
import ApiClient from '../apiClient';

export const getOrgTreeData = async () => {
  try {
    const response = await ApiClient.get('/api/groups/orgTree');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getOrgList = async () => {
  try {
    const response = await ApiClient.get('/api/groups/orgsAsList');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getOrgTreeAsList = async () => {
  try {
    const response = await ApiClient.get('/api/groups/orgTreeAsList');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createOrganization = async (formData: IOrganizationsFormData) => {
  try {
    const response = await ApiClient.post('/api/groups/', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
