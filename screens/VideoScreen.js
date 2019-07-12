import React from 'react';
import styled from 'styled-components';
import { Video } from 'expo-av';
import * as Icon from '@expo/vector-icons';
import { TouchableOpacity, Dimensions } from 'react-native';

let screenWidth = Dimensions.get('screen').width;
let screenHeight = Dimensions.get('screen').height;

class VideoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Video
          source={{
            uri:
              'https://www.videvo.net/videvo_files/converted/2016_02/preview/Chicken_Beef_Kabab_Free_Clip.mp468023.webm'
          }}
          shouldPlay
          useNativeControls={true}
          resizeMode='cover'
          style={{ width: screenWidth, height: 210 }}
        />
        <CloseView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ padding: 20 }}
          >
            <Icon.Ionicons name='ios-close' size={44} color='white' />
          </TouchableOpacity>
        </CloseView>
      </Container>
    );
  }
}

export default VideoScreen;

const Container = styled.View`
  flex: 1;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
