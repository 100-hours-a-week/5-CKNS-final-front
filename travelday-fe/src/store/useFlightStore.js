import create from 'zustand';

const useFlightStore = create((set) => ({
  departure: '',
  arrival: '',
  dates: [],
  adults: 1, 
  children: 0,

  setDeparture: (departure) => set({ departure }),
  setArrival: (arrival) => set({ arrival }),
  setDates: (dates) => set({ dates }),
  setAdults: (adults) => set({ adults }),
  setChildren: (children) => set({ children }),
}));

export default useFlightStore;
