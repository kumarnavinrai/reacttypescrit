import ApiClient from '../apiClient';
import { UpdateEnvironmentFormDataType } from './../../pages/Environments/types';

export const createEnvironment = async (formData: any) => {
  try {
    const response = await ApiClient.post(`/api/environments`, formData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getEnvironmentsByGroupId = async (groupId: string) => {
  const requestBody = {
    pageNum: 0,
    pageSize: 20,
    filter: {
      groupId: groupId,
    },
  };

  try {
    const response = await ApiClient.post('/api/environments/search/byGroupId', requestBody);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getEnvironmentsWithAnalysisJobs = async (groupId: string) => {
  try {
    const response = await ApiClient.get(`/api/environments/withAnalysisJobs/${groupId}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getExtractsByEnvironmentId = async (environmentId: string) => {
  const requestBody = {
    pageNum: 0,
    pageSize: 20,
    filter: {
      environmentId: environmentId,
    },
  };

  try {
    const response = await ApiClient.post('/api/extracts/search/byEnvironmentId', requestBody);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deteteEnvironmentById = async (environmentId: string) => {
  try {
    const response = await ApiClient.delete(`/api/environments/${environmentId}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getEnvironmentById = async (environmentId: string) => {
  try {
    const response = await ApiClient.get(`/api/environments/${environmentId}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateEnvironmentById = async (updateEnvironmentFormData: UpdateEnvironmentFormDataType) => {
  try {
    const response = await ApiClient.put(
      `/api/environments/${updateEnvironmentFormData.id}`,
      updateEnvironmentFormData
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
