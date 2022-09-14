import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const users = (state = [], action)=> {
  if(action.type === 'SET_USERS'){
    return action.users;
  }
  return state;
};

const reservations = (state = [], action)=> {
  if(action.type === 'SET_RESERVATIONS'){
    return action.reservations;
  }
  if(action.type === 'CREATE_RESERVATION'){
    return [...state, action.reservation];
  }
  return state;
};

const restaurants = (state = [], action)=> {
  if(action.type === 'SET_RESTAURANTS'){
    return action.restaurants;
  }
  return state;
};

const userId = (state = window.location.hash.slice(1), action)=> {
  if(action.type === 'SET_USER_ID'){
    return action.userId;
  }
  return state;
};

export const fetchReservations = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/reservations');
    dispatch({ type: 'SET_RESERVATIONS', reservations: response.data});
  };
};

export const fetchUsers = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data});
  };
};

export const fetchRestaurants = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/restaurants');
    dispatch({ type: 'SET_RESTAURANTS', restaurants: response.data});
  };
};

export const createReservation = (reservation)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/reservations', reservation);
    dispatch({ type: 'CREATE_RESERVATION', reservation: response.data});
  };
};

const reducer = combineReducers({
  users,
  reservations,
  restaurants,
  userId
});


const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
