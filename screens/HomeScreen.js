import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    console.log("props", this.props);
    console.log("state", this.state);

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
            <ScrollView style={{ height: "100%" }}>
              <CoverImage source={require("../assets/dark_bg2.jpeg")} />
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome Back!</Title>
                <Name>{this.props.name}</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
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
                      this.props.navigation.push("Section", {
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
              <Subtitle>Popular Courses</Subtitle>
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
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
    image: require("../assets/how-ingredients-1.png"),
    text: "Desayuno"
  },
  {
    image: require("../assets/how-home-2.png"),
    text: "Almuerzo"
  },
  {
    image: require("../assets/how-menu-3.png"),
    text: "Cena"
  },
  {
    image: require("../assets/how-clean-4.png"),
    text: "#Copa America"
  }
];

const card = [
  {
    dish: "Lomo Saltado",
    image: require("../assets/food_bgv03.jpeg"),
    speciality: "Cocina Criolla",
    chef: "Jaim del Mar",
    logo: require("../assets/logo-react.png")
  },
  {
    dish: "Sanshiku",
    image: require("../assets/food_bgv01.jpeg"),
    speciality: "Cocina Nikkei",
    chef: "Luis Sandoval",
    logo: require("../assets/logo-react.png")
  },
  {
    dish: "Calabacin Relleno",
    image: require("../assets/food_bgv07.jpeg"),
    speciality: "Cocina Vegetariana",
    chef: "Maria Martinez",
    logo: require("../assets/logo-react.png")
  },
  {
    dish: "Chocolate Cake",
    image: require("../assets/food_bgv05.jpeg"),
    speciality: "Patissier",
    chef: "Virgilio Martinez",
    logo: require("../assets/logo-react.png")
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Planetfunk",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype"
  },
  {
    title: "React for Designes",
    subtitle: "12 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Planetfunk",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Planetfunk",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create pwerful design and code for your app"
  },
  {
    title: "Design Sysyem in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Planetfunk",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
