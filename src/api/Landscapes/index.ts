import ApiClient from '../apiClient';

export const getLandscapesByGroupId = async (groupId: string) => {
  const requestBody = {
    pageNum: 0,
    pageSize: 20,
    filter: {
      groupId: groupId,
    },
  };

  try {
    const response = await ApiClient.post('/api/landscapes/search/byGroupId', requestBody);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createLandscape = async (requestBody: any) => {
  try {
    const response = await ApiClient.post('/api/landscapes', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateLandscapeById = async (id: string, feedbackData: any) => {
  try {
    const response = await ApiClient.put(`/api/landscapes/${id}`, feedbackData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteLandscape = async (id: string) => {
  try {
    const response = await ApiClient.delete(`/api/landscapes/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};