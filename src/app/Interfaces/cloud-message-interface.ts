export interface CloudMessageInterface {
  type: string;
  message: string;
  machineId?: string;
  datetime?: Date;
}
