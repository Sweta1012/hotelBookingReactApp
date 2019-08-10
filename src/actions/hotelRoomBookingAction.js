import types from './types';
export function updateHotelRoomInfo (data, currentItem, type){
    return {
        type: types.HOTEL_ROOM_BOOKING,
        payload: data.map((item) => {
        		let roomItem = item.index === currentItem.index ? currentItem : item;
         		if(item.index !==0 && type !== "updatePeople"){
             roomItem.selected = currentItem.selected ? item.index <= currentItem.index : item.index < currentItem.index;
			  	 
              if(!roomItem.selected) {
                roomItem.selectedAdultValue = "";
                roomItem.selectedChildValue = "";
              }
           }
			  	return roomItem;
			  })
    } 
};