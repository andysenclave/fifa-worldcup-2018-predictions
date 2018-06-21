import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { checkLocalUser, loginUser, signupUser } from '../../store/actions/user';
import Form from '../../components/form/form';
import './login.css';

const mapStateToProps = (state) => ({
  errorMsg: state.user.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  checkLocalUser: () => dispatch(checkLocalUser()),
  loginUser: (loginData) => dispatch(loginUser(loginData)),
  signupUser: (signupData) => dispatch(signupUser(signupData))  
});


class Login extends Component {
  constructor(props) {
    super(props);
    const formInfo = {
      username: '', password: '', hasUsernameError: false, hasPasswordError: false
    };
    this.userRegex = /^[0-9a-zA-Z]+$/;
    this.state = { value: 0, login: {...formInfo}, signup: {...formInfo}, errorMsg: '' };    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillMount() {
    const userLoggedIn = this.props.checkLocalUser();
    if(userLoggedIn) this.props.history.push('/ok');
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      errorMsg: newProps.errorMsg
    });
  }
  handleChange(event, value){
    this.setState({ value });
  }
  handleChangeIndex(index){
    this.setState({ value: index });
  }
  validateInputs(e) {
    const el = e.target;
    const elName = el.id.split('-')[0];
    const elType = el.id.split('-')[1];
    
    if(elName !== undefined){
      const formInfo = this.state[elName];
      if(elType === undefined) {
        formInfo.username = el.value;
        formInfo.hasUsernameError = !this.userRegex.test(el.value) || el.value.length === 0;
      }
      if(elType === 'password') {
        formInfo.password = el.value;
        formInfo.hasPasswordError = el.value.length === 0;
      }
      if(elType === 'confirmPassword')  formInfo.hasPasswordError = el.value !== formInfo.password;
      this.setState({
        [elName]: formInfo
      });
      return formInfo;
    }
  }
  async submitForm(formType) {
    const formData = this.state[formType];
    if(formData.username.length > 0 && formData.password.length > 0 && !formData.hasUsernameError && !formData.hasPasswordError) {
      let successLogin = false;
      if(formType === 'login') {
        successLogin = await this.props.loginUser({
          username: formData.username,
          password: formData.password
        });
      } else {
        successLogin = await this.props.signupUser({
          username: formData.username,
          password: formData.password
        });
      }
      if(successLogin) this.props.history.push('/ok');
    } else {
      if(formData.username.length === 0) formData.hasUsernameError = true;
      if(formData.password.length === 0) formData.hasPasswordError = true;
      this.setState({
        [formType]: formData
      });
    }
  }
  render() {
    return (
        <section className="login-component">
          <div className="loading-logo"></div>
          <section className="morph-btn-form">
            <div className="forms-container">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Login" />
                <Tab label="Signup" />
              </Tabs>
              <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <section>
                  <Form 
                    name='login'
                    data={this.state.login}
                    handleChange={this.validateInputs}
                    handleSubmit={this.submitForm}
                    errorMessage={this.state.errorMsg}                    
                  />
                </section>
                <section>
                  <Form 
                    name='signup' 
                    type='signup'
                    data={this.state.signup}
                    handleChange={this.validateInputs}
                    handleSubmit={this.submitForm}
                    errorMessage={this.state.errorMsg}
                  />                  
                </section>
              </SwipeableViews>
            </div>
          </section>
        </section>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);