import React, { Component } from 'react';
import styled from 'styled-components';
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import * as Icon from '@expo/vector-icons';

const screenHeight = Dimensions.get('screen').height;

class OrderDetailScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam('section');

    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image
            source={require('../assets/food_bgv08.jpg')}
            resizeMode='cover'
          />
          <Wrapper>
            <Main>Cook On Demand</Main>
            <Title>{section.address}</Title>
            <Subtitle>Cocina {section.preferences}</Subtitle>
            <Text>{section.pax} Invitados</Text>
            <Text>{section.dateTime}</Text>
            <Text>{section.restrictions}</Text>
          </Wrapper>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ position: 'absolute', top: 35, left: 20 }}
        >
          <CloseView>
            <Icon.Ionicons
              name='ios-close'
              size={44}
              color='#000'
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        {section.status === 'Accepted' ? (
          <EmptyCard>Solicitud Aceptada</EmptyCard>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Proposals', {
                section: section
              });
            }}
            style={{ position: 'absolute', bottom: 35, left: 20 }}
          >
            <NextView>
              <Action>Ver Propuestas</Action>
            </NextView>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

export default OrderDetailScreen;

const Container = styled.View`
  flex: 1;
  background: #000;
`;

const Cover = styled.View`
  height: ${screenHeight};
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  position: absolute;
  top: 140px;
  left: 20px;
`;

const Main = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 150px;
  margin-left: 10px;
  text-transform: uppercase;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  margin-bottom: 50px;
`;

const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  margin-bottom: 25px;
  font-style: italic;
`;

const Text = styled.Text`
  font-size: 15px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  margin-bottom: 15px;
  font-style: italic;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const NextView = styled.View`
  width: 150px;
  height: 50px;
  background: white;
  border-radius: 10px;
`;

const Action = styled.Text`
  padding-top: 15px;
  font-weight: 500;
  text-align: center;
  color: #000;
`;

const EmptyCard = styled.Text`
  background: green;
  padding: 15px 30px;
  margin-top: 45px;
  border-radius: 8px;
`;
