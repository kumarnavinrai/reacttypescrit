import ApiClient from '../apiClient';

export const getCustomerSummary = async () => {
  try {
    const response = await ApiClient.get('/api/groups/customerSummary');

    if (response.status === 200) {
      const rows = response.data.map((customer: any) => ({
        id: customer.groupId,
        ...customer,
      }));
      return rows;
    }
  } catch (error) {
    throw error;
  }
};

export const getOrgsAsList = async () => {
  try {
    const response = await ApiClient.get('/api/groups/orgsAsList');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getGroupDetails = async (id: string) => {
  try {
    const response = await ApiClient.get(`/api/groups/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createCustomer = async (formData: any) => {
  try {
    const response = await ApiClient.post('/api/groups', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id: string, feedbackData: any) => {
  try {
    const response = await ApiClient.put(`/api/groups/${id}`, feedbackData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
