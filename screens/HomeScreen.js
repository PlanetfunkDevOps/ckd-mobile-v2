import React, { Component } from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import styled from 'styled-components';
import Card from '../components/Card';
import { NotificationIcon } from '../components/Icons';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import { connect } from 'react-redux';
import Avatar from '../components/Avatar';
import { tapMenu } from '../actions/toggleMenuAction';
import ModalLogin from '../components/ModalLogin';
import { openLogin } from '../actions/loginAction';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.openMenu == true) {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      /* StatusBar.setBarStyle('light-content', true); */
    }

    if (this.props.openMenu == false) {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      /* StatusBar.setBarStyle('dark-content', true); */
    }
  };

  handlePress = () => {
    if (this.props.userName !== 'Usuario Invitado') {
      this.props.tapMenu();
    } else {
      this.props.openLogin();
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: '100%' }}>
              <CoverImage source={require('../assets/dark_bg2.jpeg')} />
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handlePress}
                  style={{ position: 'absolute', top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Bienvenido</Title>
                <Name>{this.props.userName}</Name>
                <NotificationIcon
                  style={{ position: 'absolute', right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: 'row',
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>especialidades del Chef</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {card.map((card, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.push('Section', {
                        section: card
                      });
                    }}
                    key={index}
                  >
                    <Card
                      title={card.dish}
                      image={card.image}
                      caption={card.chef}
                      logo={card.logo.url}
                      subtitle={card.speciality}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>Servicios Especiales</Subtitle>
              <CoursesContainer>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    image={course.image}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption}
                  />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

const mapStateToProps = state => ({
  openMenu: state.openMenu.openMenu,
  userName: state.userName.userName,
  loginModal: state.loginModal.loginModal
});

export default connect(
  mapStateToProps,
  { tapMenu, openLogin }
)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const CoverImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const Container = styled.View`
  flex: 1;
  height: 100%;
  background-color: #000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const logos = [
  {
    image: require('../assets/how-ingredients-1.png'),
    text: 'Desayuno'
  },
  {
    image: require('../assets/how-home-2.png'),
    text: 'Almuerzo'
  },
  {
    image: require('../assets/how-menu-3.png'),
    text: 'Cena'
  },
  {
    image: require('../assets/how-clean-4.png'),
    text: '#Copa America'
  }
];

const card = [
  {
    dish: 'Lomo Saltado',
    image: require('../assets/food_bgv03.jpeg'),
    speciality: 'Cocina Criolla',
    chef: 'Jaim del Mar',
    logo: require('../assets/logo-react.png')
  },
  {
    dish: 'Sanshiku',
    image: require('../assets/food_bgv01.jpeg'),
    speciality: 'Cocina Nikkei',
    chef: 'Luis Sandoval',
    logo: require('../assets/logo-react.png')
  },
  {
    dish: 'Calabacin Relleno',
    image: require('../assets/food_bgv07.jpeg'),
    speciality: 'Cocina Vegetariana',
    chef: 'Maria Martinez',
    logo: require('../assets/logo-react.png')
  },
  {
    dish: 'Chocolate Cake',
    image: require('../assets/food_bgv05.jpeg'),
    speciality: 'Patissier',
    chef: 'Virgilio Martinez',
    logo: require('../assets/logo-react.png')
  }
];

const courses = [
  {
    title: 'Chef en Casa',
    subtitle: '10 sections',
    image: require('../assets/service-home-1.jpg'),
    logo: require('../assets/how-ingredients-1.png'),
    author: 'Cook On Demand',
    avatar: require('../assets/avatar-default.jpg'),
    caption: 'Para esas ocaciones especiales'
  },
  {
    title: 'Chef para Vacaciones',
    subtitle: '12 sections',
    image: require('../assets/service-vacation-2.jpg'),
    logo: require('../assets/how-home-2.png'),
    author: 'Cook On Demand',
    avatar: require('../assets/avatar-default.jpg'),
    caption: 'Despreocupate por cocinar en vacaciones'
  },
  {
    title: 'Chef Permanente',
    subtitle: '10 sections',
    image: require('../assets/service-permanent-3.jpg'),
    logo: require('../assets/how-menu-3.png'),
    author: 'Cook On Demand',
    avatar: require('../assets/avatar-default.jpg'),
    caption: 'Encuentra ese chef especial'
  },
  {
    title: 'Publicidad y Marketing',
    subtitle: '10 sections',
    image: require('../assets/service-marketing-5.jpg'),
    logo: require('../assets/how-clean-4.png'),
    author: 'Cook On Demand',
    avatar: require('../assets/avatar-default.jpg'),
    caption: 'Contactanos y promociona tu negocio'
  }
];
