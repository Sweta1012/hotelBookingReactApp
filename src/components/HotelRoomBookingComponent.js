import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateHotelRoomInfo } from '../actions/hotelRoomBookingAction';

class HotelRoomBookingComponent extends Component {

	 
	render(){
		let previousData;
		const { roomsList, adultFields, childrenFields } = this.props;
		if(sessionStorage.getItem('bookingData')){
		    previousData = JSON.parse(sessionStorage.getItem('bookingData'));
		    sessionStorage.removeItem('bookingData');
		  }
		const currentRoomsData = previousData ? previousData : roomsList;
		return(
			<section className="hotel-rooms-section">
    <h1>Hotel Room Booking</h1>
			<div className="rooms-container">
			  {
			  	currentRoomsData.map((roomItem, key) => {
			  	  return(
			  	  		<div className="roomItem" key={key}>
			  	  			<div className="check-box-container">
			  	  				{ key !==0 && <input type="checkbox" checked={roomItem.selected} onChange={(event) => {
											this.onCheckBoxChange(event, roomItem);
										}}/> }
			  	  					<span>{roomItem.label}</span>
			  	  			
			  	  			</div>	

			  	  			<div className={!roomItem.selected && key !== 0 ? 'disable-item drop-down-container' : 'drop-down-container'}>
				  	  			<div className="adults-conatiner">
				  	  				<span>Adults</span>
				  	  				<span>(18+)</span>
				  	  				{this.selectBox(adultFields, roomItem, 'adult')}
				  	  			</div>

				  	  			<div className="childrens-conatiner">
				  	  				<span>Childrens</span>
				  	  				<span>(0-17)</span>
				  	  				{this.selectBox(childrenFields, roomItem, 'children')}
				  	  			</div>
			  	  			</div>
			  	  		</div>
			  	  	);
			  	 })
			  }
			  
			</div>
			<button onClick={() =>{
			        sessionStorage.setItem('bookingData', JSON.stringify(currentRoomsData))
			     }}>submit</button>
			</section>
		)
	}

	selectBox = (options, currentRoomItem, type) => {
		const selectedVal = type === 'children' ? currentRoomItem.selectedChildValue : currentRoomItem.selectedAdultValue;
		return(
			<select value={selectedVal} onChange={(event) => {
				this.selectBoxChange(event, type, currentRoomItem);
			}}>
				{
					options.map((val, key) =>
						<option key={key} value={val}>{val}</option>
					)
				}
			</select>
			)
	}


	selectBoxChange = (event, type, currentRoomItem) => {
		console.log('====', event.target.value, type, currentRoomItem);
		const { roomsList, onUpdateHotelRoomInfo } = this.props;
		if(type === 'adult') {
			currentRoomItem.selectedAdultValue = event.target.value;
		} else if (type === 'children') {
			currentRoomItem.selectedChildValue = event.target.value;
		}
		onUpdateHotelRoomInfo(roomsList, currentRoomItem, 'updatePeople');
	}

	onCheckBoxChange = (event, currentRoomItem) => {
			console.log('====', event.target.checked);
			const { roomsList, onUpdateHotelRoomInfo } = this.props;
			currentRoomItem.selected = event.target.checked;
			onUpdateHotelRoomInfo(roomsList, currentRoomItem, 'updateRoom');
	}
}

const mapStateToProps = state =>{
const { roomsData } = state;
     return { ...roomsData }
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdateHotelRoomInfo: (roomsList, currentRoomItem, type)=>dispatch(updateHotelRoomInfo(roomsList, currentRoomItem, type))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HotelRoomBookingComponent);