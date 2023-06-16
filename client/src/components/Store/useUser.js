import {create} from 'zustand';

export const useUser = create((set) => ({
    activeUsers: [],
    addActiveUsers: (data) => set(() => ({ activeUsers : [...data]})),

}))