import { AxiosRequestConfig, CancelToken } from 'axios';
import { stringify } from 'query-string';
import { readFileChunk } from '../../common/utils';
import ApiClient from '../apiClient';

export const validateExtractFile = async (groupId: string, file: File) => {
  const config = { headers: { 'Content-Type': 'application/xml' } };
  try {
    //Validation requires first few bytes of file. Sending chunk of bytes to validate
    const chunkData = readFileChunk(file, 2000, 0);
    const response = await ApiClient.post(
      `/api/extracts/validateFile?groupId=${groupId}&filename=${file.name}`,
      chunkData,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const uploadExtractFileMultipart = async (
  groupId: string,
  file: File,
  descriptionTag: string,
  relatedEnvs: string[],
  setProgress: any,
  cancelToken: CancelToken
) => {
  const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    },
    cancelToken: cancelToken,
  };
  try {
    const relatedEnvsString =
      relatedEnvs && relatedEnvs.length > 0 ? `&${stringify({ relatedEnvs: relatedEnvs })}` : '';
    const formData = new FormData();
    formData.append('file', file);
    const response = await ApiClient.post(
      `/api/extracts/uploadMultipartFile?groupId=${groupId}&filename=${file.name}&descriptionTag=${descriptionTag}${relatedEnvsString}`,
      formData,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
