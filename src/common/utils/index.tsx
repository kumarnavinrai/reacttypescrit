/**
 * Read file as Text
 * @param inputFile
 * @returns
 */
export const readFileAsText = (inputFile: File): Promise<string | ArrayBuffer | null> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsText(inputFile);
  });
};

/**
 * Formats file size to human readable format
 * @param bytes
 * @param decimals
 * @returns
 */
export const formatBytes = (bytes: any, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Returns a chunk of data from file
 * @param file
 * @param chunkSize
 * @param start
 * @returns Blob object
 */
export const readFileChunk = (file: File, chunkSize: number, start: number): Blob => {
  const chunkEnd = Math.min(start + chunkSize, file.size);
  return file.slice(start, chunkEnd);
};

/**
 * Returns a human readable string representation
 * @param value
 * @returns string
 */
export const NumberFormater = (value: number) => {
  if (value > 1000000000) {
    return (value / 1000000000).toString() + 'B';
  } else if (value > 1000000) {
    return (value / 1000000).toString() + 'M';
  } else if (value > 1000) {
    return (value / 1000).toString() + 'K';
  } else {
    return value.toString();
  }
};
