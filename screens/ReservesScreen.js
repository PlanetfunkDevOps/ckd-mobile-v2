import React, { Component } from "react";
import styled from "styled-components";

class ReservesScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text>Reserves Screen</Text>
      </Container>
    );
  }
}

export default ReservesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
