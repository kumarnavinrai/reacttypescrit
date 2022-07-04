import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateExtractFile } from '../../api/Extracts';
import { formatBytes } from '../../common/utils';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { Container } from './Extracts.styles';
import { FileUploaderProps } from './types';

const FileUploader = (props: FileUploaderProps) => {
  const {
    groupId,
    setExtractValidationResponse,
    uploadFileSelected,
    setUploadFileSelected,
    reValidateFlag,
    resetForm,
  } = props;

  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  // Load file to validate and upload
  const onDropAccepted = useCallback(
    async (files: File[]) => {
      if (files && files.length > 0) {
        setUploadFileSelected(files[0]);
      }
    },
    [setUploadFileSelected]
  );

  // For File validation
  useEffect(() => {
    if (uploadFileSelected) {
      resetForm();
      validateExtractFile(groupId, uploadFileSelected)
        .then((data) => {
          if (!data.valid) {
            setMessage.setMessageModel(data.validationErrorMessages, 'error');
          }
          setExtractValidationResponse(data);
        })
        .catch((error) => {
          showApplicationError(error, 'Failed to validate extract.');
        });
    }
  }, [groupId, uploadFileSelected, reValidateFlag, setMessage, showApplicationError, setExtractValidationResponse]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'application/xml, text/xml',
    multiple: false,
    onDropAccepted: onDropAccepted,
  });

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {formatBytes(file.size, 2)}
    </li>
  ));

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.xml files will be accepted)</em>
      </Container>
      <aside>
        <h4>File Added:</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </div>
  );
};

export default FileUploader;
