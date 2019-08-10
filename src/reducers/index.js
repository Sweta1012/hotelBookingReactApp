import { combineReducers } from 'redux';
import hotelRoomBookingReducer from './hotelRoomBookingReducer';

const rootReducer = combineReducers({
    roomsData: hotelRoomBookingReducer
  });

export default rootReducer;
