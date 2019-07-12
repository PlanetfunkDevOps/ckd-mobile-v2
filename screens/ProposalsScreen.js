import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import ProposalCard from '../components/ProposalCard';
import * as Icon from '@expo/vector-icons';

const screenHeight = Dimensions.get('screen').height;

class ProposalsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  onAccept = id => {
    const { firestore } = this.props;
    const { section } = this.props.navigation.state.params;

    const { proposals = [] } = this.props;

    const dataFilter =
      proposals.filter(proposal => proposal.id === id)[0] || {};

    const proposalStatus = {
      status: 'Accepted',
      chef: dataFilter.chef
    };

    const reservationStatus = {
      status: 'Accepted'
    };

    firestore.update(
      { collection: 'proposals', doc: dataFilter.id },
      proposalStatus
    );

    firestore.update(
      { collection: 'reservations', doc: section.id },
      reservationStatus
    );

    this.props.navigation.goBack();
  };

  onReject = id => {
    const { firestore } = this.props;

    const updDiscard = {
      status: 'Rejected'
    };

    firestore
      .update({ collection: 'proposals', doc: id }, updDiscard)
      .catch(err => alert('Unable to reject proposal', 'error'));
  };

  render() {
    const { section } = this.props.navigation.state.params;

    const { proposals } = this.props;

    const propWaiting = proposals.filter(
      proposal =>
        proposal.reservation_id === section.id && proposal.status === 'Waiting'
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
              <Text>Propuestas</Text>
              <Underline />
            </HeaderWrapper>
            {propWaiting.map((pwt, index) => (
              <ProposalCard
                onAccept={this.onAccept}
                onReject={this.onReject}
                key={index}
                id={pwt.id}
                chef={pwt.chef.name}
                phone={pwt.chef.phone}
                entry={pwt.entry}
                starter={pwt.starter}
                main={pwt.main}
                dessert={pwt.dessert}
              />
            ))}
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: 'absolute', top: 35, right: 20 }}
          >
            <CloseView>
              <Icon.Ionicons
                name='ios-close'
                size={44}
                color='#fff'
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  proposals: state.firestore.ordered.proposals
});

export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: 'proposals' }]),
  connect(mapStateToProps)
)(ProposalsScreen);

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

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
