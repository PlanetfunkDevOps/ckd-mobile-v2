import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "react-native";

class OrdersScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text>Orders Screen</Text>
      </Container>
    );
  }
}

export default OrdersScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
