import React, { Component } from 'react';
import styled from 'styled-components';
import { Dimensions, TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

function getOrderWidth(screenWidth) {
  var cardWidth = screenWidth - 40;

  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }

  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }

  return cardWidth;
}

class ProposalCard extends Component {
  state = {
    cardWidth: getOrderWidth(screenWidth)
  };

  handleAccept = id => {
    this.props.onAccept(id);
  };

  handleReject = id => {
    this.props.onReject(id);
  };

  render() {
    const { cardWidth } = this.state;

    const { id, chef, phone, entry, starter, main, dessert } = this.props;

    return (
      <Container style={{ width: cardWidth }}>
        <Cover>
          <Image source={require('../assets/food_bgv03.jpeg')} />
          <Logo
            source={require('../assets/food_bgv03.jpeg')}
            resizeMode='contain'
          />
          <Subtitle>Telf: {phone}</Subtitle>
          <Title>Chef {chef}</Title>
        </Cover>
        <Content>
          <Avatar source={require('../assets/food_bgv03.jpeg')} />
          <Caption>Menu: </Caption>
          <Text>Abreboca: {entry}</Text>
          <Text>Entrada: {starter}</Text>
          <Text>Plato de fondo: {main}</Text>
          <Text>Postre: {dessert}</Text>
        </Content>
        <TouchableOpacity
          onPress={() => this.handleAccept(id)}
          style={{ position: 'absolute', bottom: 25, left: '60%' }}
        >
          <Aceptar>Aceptar</Aceptar>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleReject(id)}
          style={{ position: 'absolute', bottom: 25, left: '20%' }}
        >
          <Rechazar>Rechazar</Rechazar>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default ProposalCard;

const Container = styled.View`
  width: 335px;
  height: 450px;
  background: white;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 120px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`;

const Text = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;

const Aceptar = styled.Text`
  background: green;
  padding: 10px 20px;
  font-weight: 500;
  color: #fff;
  border-radius: 8px;
`;

const Rechazar = styled.Text`
  background: red;
  padding: 10px 20px;
  font-weight: 500;
  color: #fff;
  border-radius: 8px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: green;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
