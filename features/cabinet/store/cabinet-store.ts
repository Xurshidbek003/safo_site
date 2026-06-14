import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile, SavedAddress, NotificationSettings } from "../model/types";

type CabinetStore = {
  profile: UserProfile;
  addresses: SavedAddress[];
  notifications: NotificationSettings;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateNotifications: (data: Partial<NotificationSettings>) => void;
  clearAllData: () => void;
};

const defaultProfile: UserProfile = {
  name: "",
  phone: "",
  email: "",
  city: "",
  avatarColor: "#0e7490",
  memberSince: new Date().getFullYear().toString(),
};

const defaultNotifications: NotificationSettings = {
  orderStatus: true,
  promotions: true,
  news: false,
};

export const useCabinetStore = create<CabinetStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      addresses: [],
      notifications: defaultNotifications,

      updateProfile: (data) =>
        set((state) => ({ profile: { ...state.profile, ...data } })),

      addAddress: (address) =>
        set((state) => {
          const id = `addr_${Date.now()}`;
          const isFirst = state.addresses.length === 0;
          return {
            addresses: [
              ...state.addresses,
              { ...address, id, isDefault: isFirst || address.isDefault },
            ],
          };
        }),

      removeAddress: (id) =>
        set((state) => {
          const filtered = state.addresses.filter((a) => a.id !== id);
          if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
            filtered[0].isDefault = true;
          }
          return { addresses: filtered };
        }),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      updateNotifications: (data) =>
        set((state) => ({
          notifications: { ...state.notifications, ...data },
        })),

      clearAllData: () =>
        set({
          profile: defaultProfile,
          addresses: [],
          notifications: defaultNotifications,
        }),
    }),
    {
      name: "safo-cabinet",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
