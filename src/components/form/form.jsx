import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './form.css';

const Form = ({ 
    data,
    name = 'username', 
    type = 'login',
    errorMessage = '',
    handleChange = () => {},
    handleSubmit = () => {},
  }) => {
    
    return(
      <form action="" className="signup form">
        <TextField
          id={name}
          value={data.username}
          label="Username"
          type="search"
          className={`${name}field`}
          margin="normal"
          error={data.hasUsernameError}
          onChange={handleChange}
        />
        <TextField
          id={`${name}-password`}
          label={`Enter password`}
          value={data.password}          
          type="password"
          className={`${name}PasswordField`}
          margin="normal"
          error={data.hasPasswordError}          
          onChange={handleChange}        
        />
        { 
          type === 'signup' && 
          <TextField
            label={`Confirm Password`}
            id={`${name}-confirmPassword`}            
            type="password"
            className={`confirmPasswordField`}
            margin="normal"
            error={data.hasPasswordError}          
            onChange={handleChange}        
          />
        }
        {
          errorMessage !== '' &&
          <Typography className="common-error" gutterBottom>
            {errorMessage}
          </Typography>
        }
        <Button 
          variant="contained"
          color="secondary"
          className="participate-btn"
          onClick={(e) => {
            handleSubmit(type);
          }}
        >
          Participate
        </Button>
      </form>
    );
}

export default Form;