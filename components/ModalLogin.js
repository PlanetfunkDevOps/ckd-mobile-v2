import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { BlurView } from 'expo-blur';

import Success from './Success';
import Loading from './Loading';
import { openLogin } from '../actions/loginAction';
import { updateName } from '../actions/updateNameAction';
import { updateAvatar } from '../actions/updateNameAction';
import { saveState } from './AsyncStorage';

const screenHeight = Dimensions.get('screen').height;

class ModalLogin extends Component {
  state = {
    email: '',
    password: '',
    iconEmail: require('../assets/icon-email.png'),
    iconPassword: require('../assets/icon-password.png'),
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidMount() {
    /* Disable yellow box warning */
    console.disableYellowBox = true;

    this.retrieveName();
  }

  componentDidUpdate() {
    if (this.props.loginModal == true) {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0
      }).start();

      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }

    if (this.props.loginModal == false) {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();

        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500);

      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }

  storeName = async name => {
    try {
      await AsyncStorage.setItem('name', name);
    } catch (err) {
      /*  */
    }
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      if (name !== null) {
        this.props.updateName(name);
      }
    } catch (err) {
      /*  */
    }
  };

  handleLogin = () => {
    this.setState({ isLoading: true });

    const { email, password } = this.state;
    const { firebase } = this.props;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => Alert.alert('Error', err.message))
      .then(res => {
        this.setState({ isLoading: false });

        if (res) {
          this.setState({ isSuccessful: true });
          Keyboard.dismiss();

          Alert.alert('Congrats', "You've logged successfully!");

          /* this.storeName(res.user.email); */
          this.fetchUser();
          this.props.updateName(res.user.email);

          setTimeout(() => {
            this.props.openLogin();
            this.setState({ isSuccessful: false });
          }, 1000);
        }
      });
  };

  fetchUser = () => {
    fetch('https://uifaces.co/api?limit=1&random', {
      headers: new Headers({
        'X-API-KEY': 'df874d11b8c2ee7ff6765d71dd350d'
      })
    })
      .then(res => res.json())
      .then(res => {
        const name = res[0].name;
        const avatar = res[0].photo;
        saveState({ name, avatar });
        this.props.updateName(name);
        this.props.updateAvatar(avatar);
      });
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require('../assets/icon-email-animated.gif'),
      iconPassword: require('../assets/icon-password.png')
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require('../assets/icon-email.png'),
      iconPassword: require('../assets/icon-password-animated.gif')
    });
  };
  tapBackground = () => {
    Keyboard.dismiss();
    this.props.openLogin();
  };

  /*  handleChange = e => this.setState({ [e.target.name]: e.target.value }); */

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint='dark'
            intensity={100}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          stlye={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require('../assets/logo-dc.png')} />
          <Text>Chefs a tu servicio</Text>
          <TextInput
            name='email'
            onChangeText={email => this.setState({ email })}
            placeholder='Email'
            keyboardType='email-address'
            onFocus={this.focusEmail}
          />
          <TextInput
            name='password'
            onChangeText={password => this.setState({ password })}
            placeholder='Password'
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>Acceder</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => ({
  loginModal: state.loginModal.loginModal
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { openLogin, updateName, updateAvatar }
  )
)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
