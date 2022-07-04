// AllLookupsTable

export interface AllLookupsTableProps {
  lookupsTableStateProp: number;
}
export interface LookupsDataProps {
  id: string;
  payload: LookupsPayloadProps;
}

interface LookupsPayloadProps {
  name: string;
  type: string;
  tag: string;
}

export interface LookupTableRowsProps {
  id: string;
  name: string;
  type: string;
}

// ManageLookupDialog
interface UpdateProps {
  update: boolean;
  updateLookupId: string | null;
}

export interface ManageLookupDialogProps {
  dialogCallback(dialogOpen: boolean): void;
  dialogOpen: boolean;
  updateProps?: UpdateProps | null;
  hasChangedCallback(): void;
}

export interface FromDataProps {
  name: string;
  type: string;
  tag: string;
}

export interface FeedbackDataProps {
  payload: FromDataProps;
  name?: string;
  type?: string;
  tag?: string;
}
