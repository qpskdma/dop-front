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

export interface TokenInfo {
  id: number;
  user: string;
  email: string;
  admin: boolean;
  exp: number;
}
