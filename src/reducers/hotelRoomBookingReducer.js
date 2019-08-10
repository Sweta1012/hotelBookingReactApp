const INITIAL_STATE_DATA = require('../assets/roomsData.json');
  
  
  export const hotelRoomBookingReducer = (state = INITIAL_STATE_DATA, action) => {
    switch (action.type) {
      case 'HOTEL_ROOM_BOOKING': {
        return {
          ...state,
          roomsData: [...action.payload]
        }
      }
  
      default: return state;
    }
  }
  
  export default hotelRoomBookingReducer;