import logger from '../../common/utils/logger';
import { FeedbackDataProps, FromDataProps as LookupsFromDataProps } from '../../pages/Lookups/types';
import ApiClient from '../apiClient';

export const getLookups = async () => {
  try {
    const response = await ApiClient.get('/api/lookups');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getLookupByID = async (id: string) => {
  try {
    const response = await ApiClient.get(`/api/lookups/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteLookupByID = async (id: string) => {
  try {
    const response = await ApiClient.delete(`/api/lookups/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createLookup = async (formData: LookupsFromDataProps) => {
  try {
    const response = await ApiClient.post('/api/lookups/', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateLookupByID = async (id: string, feedbackData: FeedbackDataProps) => {
  try {
    const response = await ApiClient.put(`/api/lookups/${id}`, feedbackData);
    if (response.status === 200) {
      logger.info(response.data);
    }
  } catch (error) {
    throw error;
  }
};

export const getLookupsByType = async (type: string) => {
  try {
    const response = await ApiClient.get(`/api/lookups/byType/${type}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
