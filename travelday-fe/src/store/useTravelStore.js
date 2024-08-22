// src/store/useTravelStore.js
import create from 'zustand';

const useTravelStore = create((set) => ({
  travelRooms: [],  // 초기 상태를 빈 배열로 설정
  setTravelRooms: (rooms) => set({ travelRooms: rooms }),  // 상태 업데이트 함수
}));

export default useTravelStore;
