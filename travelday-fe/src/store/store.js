// store.js
import create from 'zustand';

const useFlightStore = create((set) => ({
  departure: '',
  arrival: '',
  dates: [],

  setDeparture: (departure) => set({ departure }),
  setArrival: (arrival) => set({ arrival }),
  setDates: (dates) => set({ dates }),
}));

export default useFlightStore;
