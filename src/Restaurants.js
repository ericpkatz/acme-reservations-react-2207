import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReservation } from './store';

const Restaurants = ()=> {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurants);
  const reservations = useSelector(state => state.reservations);
  const userId = useSelector(state => state.userId);
  const _createReservation = async(restaurant)=> {
    try {
      await dispatch(createReservation({ userId, restaurantId: restaurant.id }));
    }
    catch(ex){
      console.log(ex);
    }
  };
  return (
    <div>
      <h2>Restaurants ({ restaurants.length })</h2>
      <ul>
        {
          restaurants.map( restaurant => {
            const _reservations = reservations.filter(( reservation) => {
              return reservation.userId === userId && restaurant.id === reservation.restaurantId 
            }); 

            return (
              <li key={ restaurant.id } onClick={ ()=> _createReservation(restaurant)}>
                { restaurant.name } ({ _reservations.length})
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Restaurants;
