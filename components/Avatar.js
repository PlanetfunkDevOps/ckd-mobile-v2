import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateName, updateAvatar } from '../actions/updateNameAction';
import { AsyncStorage } from 'react-native';

class Avatar extends Component {
  componentDidMount() {
    this.loadState();
  }

  loadState = () => {
    AsyncStorage.getItem('state').then(serializedState => {
      const state = JSON.parse(serializedState);

      if (state) {
        this.props.updateName(state.name);
        this.props.updateAvatar(state.avatar);
      }
    });
  };

  render() {
    return <Image source={{ uri: this.props.avatar }} />;
  }
}

const mapStateToProps = state => ({
  userName: state.userName.userName,
  avatar: state.userName.avatar
});

export default connect(
  mapStateToProps,
  { updateName, updateAvatar }
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
