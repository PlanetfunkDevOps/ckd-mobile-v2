import React, { Component } from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { Icon } from "expo";

const screenHeight = Dimensions.get("screen").height;

class SectionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={section.image} resizeMode="cover" />
          <Wrapper>
            <Icon.Ionicons
              name="ios-arrow-dropleft-circle"
              size={24}
              color="#fff"
            />
            <Subtitle>{section.speciality}</Subtitle>
          </Wrapper>
          <Title>{section.dish}</Title>
          <Caption>{section.chef}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ position: "absolute", top: 35, right: 20 }}
        >
          <CloseView>
            <Icon.Ionicons
              name="ios-close"
              size={44}
              color="#fff"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: ${screenHeight};
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
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

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 40px;
  left: 20px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  text-transform: uppercase;
`;
