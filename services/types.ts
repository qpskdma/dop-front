export interface Config {
  id: string;
  name: string;
  enabled: boolean;
  address: string;
  publicKey: string;
  createdAt: number;
  updatedAt: string;
  downloadableConfig: boolean;
  persistentKeepalive: string;
  latestHandshakeAt: null | number;
  transferRx: number;
  transferTx: number;
}

export interface Data {
  configs: Config[];
}

export interface GetClientsResponse {
  status: string;
  message: string;
  data: Data;
}

export enum Region {
  GER = "ger",
  SWE = "swe",
}

export interface Server {
  id: number;
  name: string;
  ip: string;
  port: number;
  region: Region;
}
