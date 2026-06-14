export type UserProfile = {
  name: string;
  phone: string;
  email: string;
  city: string;
  avatarColor: string;
  memberSince: string;
};

export type SavedAddress = {
  id: string;
  label: string;
  full: string;
  isDefault: boolean;
};

export type NotificationSettings = {
  orderStatus: boolean;
  promotions: boolean;
  news: boolean;
};

export type CabinetTab = "profile" | "orders" | "addresses" | "settings";
