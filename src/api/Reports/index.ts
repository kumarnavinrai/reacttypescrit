import { readFileAsText } from '../../common/utils';
import { ITechDependencyFormDataProps } from '../../pages/Analysis/types';
import ApiClient from '../apiClient';

/*
GET Analysis report by Landscape Id
*/
export const getAnalysisReportByLandscapeId = async (landscapeId: string, pageNum: number, pageSize: number) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        landscapeId: landscapeId,
      },
    };

    const response = await ApiClient.post('/api/reports/search/downloadable/byLandscapeId', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
GET Analysis report for the default Landscape in a given group
*/
export const getAnalysisReportByDefaultLandscape = async (groupId: string, pageNum: number, pageSize: number) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        groupId: groupId,
      },
    };

    const response = await ApiClient.post('/api/reports/search/downloadable/byDefaultLandscapeForGroupId', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
Download reporty by Id
*/
export const downloadReportById = async (id: string) => {
  try {
    const response = await ApiClient.get(`/api/reports/download/${id}`, { responseType: 'blob' });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

/**
Counts per Report Title by Landscape Id
 */
export const countsPerReportTitleByLandscapeId = async (landscapeId: string) => {
  try {
    const response = await ApiClient.get(`/api/reports/countsPerReportTitle/byLandscapeId/${landscapeId}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/**
GET Package dependency graph nodes and edges by landscapeId
*/
export const getPackageDependencyGraph = async (
  landscapeId: string,
  entryDevClass: string,
  objectDevClass: string = '',
  searchTerm: string = '',
  pageNum: number = 0,
  pageSize: number = 200
) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        searchTerm: searchTerm,
        entryDevclass: entryDevClass,
        objectDevclass: objectDevClass,
      },
    };

    const url = `/api/reports/search/packageDependencyGraph/byLandscapeId/${landscapeId}`;
    const response = await ApiClient.post(url, requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/*
GET Package Dependencies data by Landscape Id
*/
export const getPackageDepDataByLandscapeId = async (
  landscapeId: string,
  search: string,
  pageNum: number,
  pageSize: number
) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        searchTerm: search,
      },
    };

    const response = await ApiClient.post(
      `/api/reports/search/packageDependency/byLandscapeId/${landscapeId}`,
      requestBody
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/*
GET TechDependency report by Landscape ID
*/
export const getTechDependencyLandscapeId = async (landscapeId: string, pageNum: number, pageSize: number) => {
  try {
    const requestBody = {
      pageNum: pageNum,
      pageSize: pageSize,
      filter: {
        landscapeId: landscapeId,
      },
    };

    const response = await ApiClient.post('/api/reports/search/downloadable/techDependency/byLandscapeId', requestBody);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/*
Create Tech Dependency Job
*/
export const createTechDepedencyJob = async (formData: ITechDependencyFormDataProps, fileSelected: File | null) => {
  const config = { headers: { Accept: '*/*', 'Content-Type': 'text/csv' } };
  try {
    let fileContent: any = null;
    if (fileSelected) fileContent = await readFileAsText(fileSelected);

    let queryParams = new URLSearchParams('');

    //Create Query Params
    formData.groupId && queryParams.append('groupId', formData.groupId);
    formData.landscapeId && queryParams.append('landscapeId', formData.landscapeId);
    formData.reportName && queryParams.append('reportName', formData.reportName);
    formData.sourceCodeDepth && queryParams.append('sourceCodeDepth', formData.sourceCodeDepth.toString());
    formData.dataDictDepth && queryParams.append('dataDictDepth', formData.dataDictDepth.toString());
    formData.otherDepth && queryParams.append('otherDepth', formData.otherDepth.toString());

    if (formData.fileObjectType.toLowerCase() === 'package' && fileSelected)
      queryParams.append('packageFilename', fileSelected.name);

    if (formData.fileObjectType.toLowerCase() === 'mainobject' && fileSelected)
      queryParams.append('mainObjectsFilename', fileSelected.name);

    const response = await ApiClient.post(
      `/api/reports/generate/techDependency?${queryParams.toString()}`,
      fileContent ? fileContent : null,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/*
GET Code Transformation report by Landscape ID
*/
export const getCodeTransformationRuleset = async (landscapeId: string) => {
  try {
    const response = await ApiClient.get(`/api/reports/data/codeTransformation/${landscapeId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

/*
GET Code Transformation report by Landscape ID
*/
export const getRepositoryOverviewReportData = async (landscapeId: string) => {
  try {
    const response = await ApiClient.get(`/api/reports/data/repositoryOverview/${landscapeId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
