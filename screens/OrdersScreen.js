import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import OrderCard from '../components/OrderCard';

const screenHeight = Dimensions.get('screen').height;

class OrdersScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    /* Disable yellow box warning */
    console.disableYellowBox = true;
  }

  render() {
    const {
      reservations = [],
      proposals = [],
      auth: { uid }
    } = this.props;

    const resWaiting = reservations.filter(
      reservation =>
        reservation.client_id === uid && reservation.status === 'Waiting'
    );

    const resAccepted = reservations.filter(
      reservation =>
        reservation.client_id === uid && reservation.status === 'Accepted'
    );

    return (
      <Container>
        <ScrollView>
          <Cover>
            <Image
              source={require('../assets/dark_bg2.jpeg')}
              resizeMode='cover'
            />
            <HeaderWrapper>
              <Text>Solicitudes Aceptadas</Text>
              <Underline />
              {resAccepted.length != 0 ? null : (
                <EmptyCard>Aun no han aceptado tu solicitud...</EmptyCard>
              )}
            </HeaderWrapper>
            <OrdersContainer>
              {resAccepted.map((resAcp, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.push('OrderDetail', {
                      section: resAcp
                    });
                  }}
                >
                  <OrderCard
                    key={index}
                    preferences={resAcp.preferences}
                    pax={resAcp.pax}
                    dateTime={resAcp.dateTime}
                    address={resAcp.address}
                    burners={resAcp.burners}
                    energy={resAcp.energy}
                    oven={resAcp.oven}
                    obs={resAcp.obs}
                    restrictions={resAcp.restrictions}
                  />
                </TouchableOpacity>
              ))}
            </OrdersContainer>
            <HeaderWrapper>
              <Text>Solicitudes Pendientes</Text>
              <Underline />
            </HeaderWrapper>
            <OrdersContainer>
              {resWaiting.map((resWtg, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.push('OrderDetail', {
                      section: resWtg
                    });
                  }}
                >
                  <OrderCard
                    key={index}
                    preferences={resWtg.preferences}
                    pax={resWtg.pax}
                    dateTime={resWtg.dateTime}
                    address={resWtg.address}
                    burners={resWtg.burners}
                    energy={resWtg.energy}
                    oven={resWtg.oven}
                    obs={resWtg.obs}
                    restrictions={resWtg.restrictions}
                  />
                </TouchableOpacity>
              ))}
            </OrdersContainer>
          </Cover>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  ordered: state.firestore,
  reservations: state.firestore.ordered.reservations,
  proposals: state.firestore.ordered.proposals
});

export default compose(
  firebaseConnect(),
  firestoreConnect([
    { collection: 'reservations' },
    { collection: 'proposals' }
  ]),
  connect(mapStateToProps)
)(OrdersScreen);

const Container = styled.View`
  flex: 1;
  background: #000;
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

const EmptyCard = styled.Text`
  background: rgba(255, 255, 255, 0.8);
  padding: 15px 30px;
  margin-top: 45px;
  border-radius: 8px;
`;

const OrdersContainer = styled.View`
  padding-left: 10px;
  padding-top: 20px;
`;
