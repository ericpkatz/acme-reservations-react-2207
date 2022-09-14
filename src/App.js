import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, fetchUsers, fetchRestaurants } from './store';
import Users from './Users';
import Restaurants from './Restaurants';

const App = ()=> {
  const reservations = useSelector(state => state.reservations);
  const dispatch = useDispatch();
  useEffect(()=> {
    const load = async()=> {
      try {
        await dispatch(fetchReservations());
        await dispatch(fetchUsers());
        await dispatch(fetchRestaurants());
      }
      catch(ex){
        console.log(ex);
      }
    };
    window.addEventListener('hashchange', ()=> {
      dispatch({ type: 'SET_USER_ID', userId: window.location.hash.slice(1)});
    });
    load();
  }, []);
  return (
    <div>
      <h1>Acme Reservations ({ reservations.length })</h1>
      <Users />
      <Restaurants />
    </div>
  );
};

export default App;
