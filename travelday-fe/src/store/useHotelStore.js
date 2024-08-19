// store/useHotelStore.js
import create from 'zustand';

const useHotelStore = create((set) => ({
  location: '',
  dates: [],
  adults: 1, 
  children: 0, // 기본 값 설정
  setLocation: (location) => set({ location }),
  setDates: (dates) => set({ dates }),
  setAdults: (adults) => set({ adults }),
  setChildren: (children) => set({ children }),
}));

export default useHotelStore;
