import React from 'react';
import { useSelector } from 'react-redux';

const Users = ()=> {
  const users = useSelector(state => state.users);
  const userId = useSelector(state => state.userId);
  return (
    <div>
      <h2><a href='#'>Users ({ users.length })</a></h2>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id } className={ user.id === userId ? 'selected': ''}>
                <a href={`#${user.id}`}>
                { user.name }
                </a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Users;
