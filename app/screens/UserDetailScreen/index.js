import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { StaticHeader } from "components";
import styles from "./styles";
import { images } from "resources";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import MediaContentScreen from "./mediaContentScreen";
import LikeContentScreen from "./likeContentScreen";
import { connect } from "react-redux";

const height = Dimensions.get("window").height;

class UserDetailScreen extends Component {
  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: "light",
    drawUnderTabBar: true,
    tabBarHidden: true,
    navBarTranslucent: true,
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttonText: null,
      relationshipStyle: null,
      headerX: false,
      buttonIndicator: false
    };

    this.backPress = this.backPress.bind(this);
    this.renderProfileDetail = this.renderProfileDetail.bind(this);
    this.renderRelationArrow = this.renderRelationArrow.bind(this);
    this.renderFollowButton = this.renderFollowButton.bind(this);

    this.userDetail = ["2"];
    this.mediaData = ["12", "123", "3", "213"];
    this.likeData = ["12", "123", "3", "213"];
  }
  backPress() {
    this.props.navigator.pop({
      animated: true,
      animationType: "fade"
    });
  }
  componentDidMount() {
    this.setState({});
  }
  componentWillMount() {
    if (height === 812) {
      this.setState({ headerX: true });
    } else {
      this.setState({ headerX: false });
    }
  }
  handlePress() {}
  renderFollowButton() {
    if (this.relationship.outgoing_status === "follows") {
      if (this.state.buttonIndicator === false) {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View
              style={[
                styles.followButtonViewStyle,
                { backgroundColor: "#F44336" }
              ]}
            >
              <Text style={styles.followButtonTextStyle}>Follow</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View
              style={[
                styles.followButtonViewStyle,
                { backgroundColor: "#F44336" }
              ]}
            >
              <ActivityIndicator
                style={{ alignSelf: "center", marginVertical: 8 }}
                color="white"
                size="small"
              />
            </View>
          </TouchableOpacity>
        );
      }
    } else if (this.relationship.outgoing_status === "requested") {
      if (this.state.buttonIndicator === false) {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View style={styles.followButtonViewStyle}>
              <Text style={styles.followButtonTextStyle}>
                {this.state.buttonText}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View style={styles.followButtonViewStyle}>
              <ActivityIndicator
                style={{ alignSelf: "center", marginVertical: 8 }}
                color="white"
                size="small"
              />
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      if (this.state.buttonIndicator === false) {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View style={styles.followButtonViewStyle}>
              <Text style={styles.followButtonTextStyle}>
                {this.state.buttonText}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => this.handlePress(this.relationship)}
            style={{ marginTop: 20, marginRight: 20 }}
          >
            <View style={styles.followButtonViewStyle}>
              <ActivityIndicator
                style={{ alignSelf: "center", marginVertical: 8 }}
                color="white"
                size="small"
              />
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
  renderRelationArrow() {
    if (this.relationship !== undefined) {
      if (
        this.relationship.outgoing_status === "follows" &&
        this.relationship.incoming_status === "followed_by"
      ) {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: "contain",
                marginTop: 5
              }}
              source={images.karsılıklı}
            />
            <Text style={styles.statusText}> Following Each Other</Text>
          </View>
        );
      } else if (
        (this.relationship.outgoing_status === "requested" ||
          this.relationship.outgoing_status === "none") &&
        this.relationship.incoming_status === "followed_by"
      ) {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: "contain",
                marginTop: 5
              }}
              source={images.takipEdiyor}
            />
            <Text style={styles.statusText}>Following You</Text>
          </View>
        );
      } else {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: "contain",
                marginTop: 5
              }}
              source={images.takipEtmiyor}
            />
            <Text style={styles.statusText}>You Following</Text>
          </View>
        );
      }
    }
  }

  renderProfileDetail() {
    if (this.userDetail !== null) {
      return (
        <View style={{ marginTop: 20 }}>
          <View style={styles.profileDetailView}>
            <Image style={styles.profile_picture} source={images.avatar} />
            <View style={{ flexDirection: "column", marginLeft: 20, flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20
                }}
              >
                <View style={styles.countsView}>
                  <Text style={styles.countsTextStyle}>123 </Text>
                  <Text style={styles.countStaticStyle}>POSTS</Text>
                </View>
                <View style={styles.countsView}>
                  <Text style={styles.countsTextStyle}>2423</Text>
                  <Text style={styles.countStaticStyle}>FOLLOWERS</Text>
                </View>
                <View style={styles.countsView}>
                  <Text style={styles.countsTextStyle}>23</Text>
                  <Text style={styles.countStaticStyle}>FOLLOWS</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.handlePress()}
                style={{ marginTop: 20, marginRight: 20 }}
              >
                <View
                  style={[
                    styles.followButtonViewStyle,
                    { backgroundColor: "#059ED9" }
                  ]}
                >
                  <Text style={styles.followButtonTextStyle}>Follow</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingLeft: 20, marginTop: 20 }}>
            <Text style={styles.usernameText}>Barbara Porter</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.relationshipContainer}>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: "#059ED9",
                    flexDirection: "row"
                  }}
                >
                  <Image
                    style={{ alignSelf: "center" }}
                    source={images.youFollowOk}
                  />
                  <Text style={styles.youFollow}>Follows You</Text>
                </View>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: "#5AD24E",
                    marginLeft: 10,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    style={{ alignSelf: "center" }}
                    source={images.followsYouOk}
                  />
                  <Text style={styles.followsYou}>You Follow</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else return null;
  }
  render() {
    if (this.userDetail !== null) {
      return (
        <View style={styles.container}>
          <StaticHeader title="Barbara Porter" />
          {this.renderProfileDetail()}
          <ScrollableTabView
            activeTab={1}
            tabBarTextStyle={{ fontFamily: "Circular", marginTop: 10 }}
            style={{ marginTop: 20 }}
            renderTabBar={() => (
              <DefaultTabBar
                backgroundColor="#192A4F"
                activeTextColor="#059ED9"
                inactiveTextColor="white"
                underlineStyle={{ backgroundColor: "transparent" }}
              />
            )}
          >
            <MediaContentScreen
              navigator={this.props.navigator}
              tabLabel="MEDIA"
              //token={this.token}
              mediadata={this.mediaData}
            />
            <LikeContentScreen
              navigator={this.props.navigator}
              tabLabel="LIKES"
              //token={this.token}
              likedata={this.likeData}
            />
          </ScrollableTabView>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, backgroundColor: "#152341", alignItems: "center" }}
        >
          <ActivityIndicator
              style={{ top: Dimensions.get("window").height / 2 }}
            color="white"
            size="large"
          />
        </View>
      );
    }
  }
}

const mapStateToProps = ({}) => {
  return {};
};
export default connect(mapStateToProps, {})(UserDetailScreen);
