export interface Registered {
  name: string;
  appLabel: string;
  appUrl: string;
  models: [];
}

export interface RegisteredList {
  appList: Registered[];
}
