import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import { tapMenu } from '../actions/toggleMenuAction';
import { updateName } from '../actions/updateNameAction';
import { updateAvatar } from '../actions/updateNameAction';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

var cardWidth = screenWidth;
if (screenWidth > 500) {
  cardWidth = 500;
}

class Menu extends Component {
  state = {
    top: new Animated.Value(screenHeight)
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.openMenu == true) {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }

    if (this.props.openMenu == false) {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  handlePress = () => {
    this.props.tapMenu();
  };

  handleMenu = index => {
    if (index === 3) {
      this.props.tapMenu();
      this.props.updateName('Usuario Invitado');
      this.props.updateAvatar(
        'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-518740717.jpg'
      );
      AsyncStorage.clear();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../assets/food_bgh02.jpeg')} />
          <Title>{this.props.userName}</Title>
          <Subtitle>Desarrollador at CodiGo</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.handlePress}
          style={{
            position: 'absolute',
            top: 120,
            left: '50%',
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <CloseView>
            <Icon.Ionicons name='ios-close' size={44} color='#546bfb' />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => ({
  openMenu: state.openMenu.openMenu,
  userName: state.userName.userName
});

export default connect(
  mapStateToProps,
  { tapMenu, updateName, updateAvatar }
)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth};
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const items = [
  {
    icon: 'ios-settings',
    title: 'Perfil',
    text: 'Settings'
  },
  {
    icon: 'ios-card',
    title: 'Pagos',
    text: 'payments'
  },
  {
    icon: 'ios-compass',
    title: 'Cupones',
    text: 'start course'
  },
  {
    icon: 'ios-exit',
    title: 'Log Out',
    text: 'see you soon!'
  }
];
