export interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
}

export interface NotificationsResponse {
  data: Notification[];
}
