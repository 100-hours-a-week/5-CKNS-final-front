import Image1 from '../images/main/list1/1.png';
import Image2 from '../images/main/list1/2.png';
import Image3 from '../images/main/list1/3.png';
import Image4 from '../images/main/list1/4.png';
import Image5 from '../images/main/list1/5.png';
import Image6 from '../images/main/list1/6.png';

export const images = {
  1: Image1,
  2: Image2,
  3: Image3,
  4: Image4,
  5: Image5,
  6: Image6,
};

export const flightData = {
  1: {
    airline: '대한항공',
    segments: [
      {
        departure: {
          iataCode: 'ICN',
          at: '09:00',
        },
        arrival: {
          iataCode: 'HND',
          at: '11:30',
        },
        duration: '2시간 30분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'HND',
          at: '13:00',
        },
        arrival: {
          iataCode: 'ICN',
          at: '15:30',
        },
        duration: '2시간 30분',
      },
    ],
    price: '1,000,000원',
  },
  2: {
    airline: '아시아나항공',
    segments: [
      {
        departure: {
          iataCode: 'ICN',
          at: '11:00',
        },
        arrival: {
          iataCode: 'NRT',
          at: '13:00',
        },
        duration: '2시간 0분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'NRT',
          at: '15:00',
        },
        arrival: {
          iataCode: 'ICN',
          at: '17:00',
        },
        duration: '2시간 0분',
      },
    ],
    price: '900,000원',
  },
  3: {
    airline: '제주항공',
    segments: [
      {
        departure: {
          iataCode: 'ICN',
          at: '13:00',
        },
        arrival: {
          iataCode: 'KIX',
          at: '15:00',
        },
        duration: '2시간 0분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'KIX',
          at: '17:00',
        },
        arrival: {
          iataCode: 'ICN',
          at: '19:00',
        },
        duration: '2시간 0분',
      },
    ],
    price: '150,000원',
  },
  4: {
    airline: '진에어',
    segments: [
      {
        departure: {
          iataCode: 'PUS',
          at: '09:30',
        },
        arrival: {
          iataCode: 'HKG',
          at: '12:30',
        },
        duration: '3시간 0분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'HKG',
          at: '14:00',
        },
        arrival: {
          iataCode: 'PUS',
          at: '17:00',
        },
        duration: '3시간 0분',
      },
    ],
    price: '200,000원',
  },
  5: {
    airline: '에어부산',
    segments: [
      {
        departure: {
          iataCode: 'PUS',
          at: '08:00',
        },
        arrival: {
          iataCode: 'FUK',
          at: '10:00',
        },
        duration: '2시간 0분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'FUK',
          at: '12:00',
        },
        arrival: {
          iataCode: 'PUS',
          at: '14:00',
        },
        duration: '2시간 0분',
      },
    ],
    price: '180,000원',
  },
  6: {
    airline: '티웨이항공',
    segments: [
      {
        departure: {
          iataCode: 'ICN',
          at: '10:00',
        },
        arrival: {
          iataCode: 'DAD',
          at: '13:00',
        },
        duration: '4시간 0분',
      },
    ],
    returnSegments: [
      {
        departure: {
          iataCode: 'DAD',
          at: '15:00',
        },
        arrival: {
          iataCode: 'ICN',
          at: '20:00',
        },
        duration: '5시간 0분',
      },
    ],
    price: '300,000원',
  },
};
