export interface folderData {
  id: string;
  length?: number;
  name?: string;
  isfolder?: boolean;
  children: folderData[];
}

export type genericFn = (...args: any[])=>any

