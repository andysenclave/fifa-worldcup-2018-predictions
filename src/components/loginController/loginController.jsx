import React from 'react';
import { connect } from 'react-redux';
import { checkLocalUser } from '../../store/actions/user';

const mapDispatchToProps = (dispatch) => ({
  checkLocalUser: () => dispatch(checkLocalUser())
});

const LoginController = ({ location, history, checkLocalUser }) => {
  const { pathname } = location;
  const userLoggedIn = checkLocalUser();
  
  if(pathname !== '/' && !userLoggedIn) history.push('/');
  if(pathname === '/' && userLoggedIn) history.push('/overall');

  return (
    <div></div>
  );
}

export default connect(null, mapDispatchToProps)(LoginController);