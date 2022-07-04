export interface FileUploaderProps {
  groupId: string;
  uploadFileSelected: File | null;
  reValidateFlag: boolean;
  setUploadFileSelected: React.Dispatch<React.SetStateAction<File | null>>;
  setExtractValidationResponse: React.Dispatch<React.SetStateAction<{ extractInfo: any; valid: boolean }>>;
  resetForm: () => void;
}
