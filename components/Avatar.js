import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: 'UPDATE_NAME',
        name: name
      })
  };
}

class Avatar extends Component {
  state = {
    photo:
      'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-518740717.jpg'
  };

  componentDidMount() {
    fetch('https://uifaces.co/api?limit=1&random', {
      headers: new Headers({
        'X-API-KEY': 'df874d11b8c2ee7ff6765d71dd350d'
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          photo: res[0].photo
        });

        this.props.updateName(res[0].name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
