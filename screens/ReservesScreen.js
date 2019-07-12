import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';

const screenHeight = Dimensions.get('screen').height;

class ReservesScreen extends Component {
  state = {
    current: 0,
    confirmDirty: false,
    client_id: null,
    address: '',
    pax: '',
    preferences: '',
    energy: '',
    burners: '',
    oven: '',
    dateTime: '',
    restrictions: '',
    obs: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    role: 'client',
    status: 'Waiting'
  };

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    /* Disable yellow box warning */
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <Cover>
            <Image
              source={require('../assets/dark_bg2.jpeg')}
              resizeMode='cover'
            />
            <HeaderWrapper>
              <Text>Nueva Solicitud</Text>
              <Underline />
            </HeaderWrapper>
            <TextInput
              name='address'
              onChangeText={address => this.setState({ address })}
              placeholder='Direccion'
            />
            <PickerContainer>
              <Picker
                selectedValue={this.state.pax}
                onValueChange={(pax, itemIndex) =>
                  this.setState({ pax: itemValue })
                }
              >
                <Picker.Item label='Java' value='java' />
                <Picker.Item label='JavaScript' value='js' />
              </Picker>
            </PickerContainer>
            <TextInput
              name='preferences'
              onChangeText={email => this.setState({ email })}
              placeholder='Preferencia'
            />
            <TextInput
              name='address'
              onChangeText={email => this.setState({ email })}
              placeholder='Email'
            />
            <TextInput
              name='energy'
              onChangeText={energy => this.setState({ energy })}
              placeholder='Cocina'
            />
            <TextInput
              name='burners'
              onChangeText={burners => this.setState({ burners })}
              placeholder='Hornillas'
            />
            <TextInput
              name='oven'
              onChangeText={oven => this.setState({ oven })}
              placeholder='Horno'
            />
            <TextInput
              name='dateTime'
              onChangeText={dateTime => this.setState({ dateTime })}
              placeholder='Fecha'
            />
            <TextInput
              name='restrictions'
              onChangeText={restrictions => this.setState({ restrictions })}
              placeholder='Restricciones'
            />
            <TextInput
              name='obs'
              onChangeText={obs => this.setState({ obs })}
              placeholder='Observaciones'
            />
            <PickerContainer>
              <Picker
                selectedValue={this.state.pax}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ pax: pax })
                }
              >
                <Picker.Item label='Java' value='java' />
                <Picker.Item label='JavaScript' value='js' />
              </Picker>
            </PickerContainer>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Proposals', {
                  section: section
                });
              }}
            >
              <NextView>
                <Text>Ver Propuestas</Text>
              </NextView>
            </TouchableOpacity>
          </Cover>
        </ScrollView>
      </Container>
    );
  }
}

export default ReservesScreen;

const Container = styled.View`
  flex: 1;
  background: #000;
`;

const PickerContainer = styled.View`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 12%;
  padding-left: 44px;
`;

const Picker = styled.Picker`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #fff;
`;

const Cover = styled.View``;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: ${screenHeight};
  opacity: 0.5;
`;

const HeaderWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Underline = styled.View`
  width: 100px;
  height: 3px;
  background: #fff;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #fff;
  margin-top: 20px;
  margin-left: 12%;
  padding-left: 44px;
`;

const NextView = styled.View`
  width: 150px;
  height: 50px;
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 33%;
  background: green;
  align-items: center;
  justify-content: center;
`;
