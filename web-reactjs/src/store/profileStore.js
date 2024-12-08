import { create } from "zustand";
import profile_image from "../assets/Image/logo/longhav.png";
import { persist, createJSONStorage } from "zustand/middleware";

// export const profileStore = create((set) => ({
//   //   profile: {
//   //     id: null,
//   //     name: "Sok",
//   //     email: "laylonghav@gmail.com",
//   //     image: profile_image,
//   //     address: "",
//   //     role: "Admin",
//   //     permission: null,
//   //   },
//   profile: null,
//   access_token: null,
//   setAccessToken: (params) => set({ access_token: params }),

//   setProfile: (params) =>
//     set((pre) => ({ profile: { ...pre.profile, ...params } })),
//   logout: (params) => set((pre) => ({ profile: { profile: null } })),
// }));

export const profileStore = create(
  persist(
    (set, get) => ({
      profile: null,
      access_token: null,
      setAccessToken: (params) => set({ access_token: params }),

      setProfile: (params) =>
        set((pre) => ({ profile: { ...pre.profile, ...params } })),
      logout: (params) => set((pre) => ({ profile: null })),
    }),
    {
      name: "profile", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
