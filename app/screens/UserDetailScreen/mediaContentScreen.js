import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ListView
} from "react-native";
import styles from "./styles";
import axios from "axios";
import moment from "moment";
import Video from "react-native-video";
import { Dimensions } from "react-native";
import { images } from "resources";
const {width,height} = Dimensions.get('window')
class MediaContentScreen extends Component {
  constructor(props) {
    super(props);
    this.renderPhotos = this.renderPhotos.bind(this);
    this.showPhoto = this.showPhoto.bind(this);
    this.renderDate = this.renderDate.bind(this);

    this.convertedDate;
  }
  componentWillMount() {}
  showPhoto() {
    /*
        axios
            .get("https://api.instagram.com/v1/media/" + id + "?access_token=" + this.props.token)
            .then(response => {
                let user_has_liked = response.data.data.user_has_liked
                let token = this.props.token
                let likeCount = response.data.data.likes.count
                this.props.navigator.showModal(
                    {
                        screen: "PhotoModal", // unique ID registered with Navigation.registerScreen
                        title: "Modal", // title of the screen as appears in the nav bar (optional)
                        passProps: { id, image, user_has_liked, token, likeCount }, // simple serializable object that will pass as props to the modal (optional)
                        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        animationType: 'slide-up',
                        backButtonHidden: false, // hide the back button altogether (optional)

                    });
            })
            .catch(error => {
                console.log(error)
            })
            */
  }
  renderDate() {
    /*
        if (this.props.mediadata !== null) {
            var time = new Date(this.props.mediadata[0].created_time * 1000)
            var temp = moment(time, "YYYYMMDD").fromNow();
            return (
                <View style={{ paddingLeft: 20, marginVertical: 5 }}>
                    <Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 14 }}>Last Activity {temp}</Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
        */
  }
  renderPhotos() {
    return (
      <TouchableOpacity style={{}} onPress={() => this.showPhoto()}>
        <View style={mediaStyles.container}>
          <Image style={mediaStyles.imageStyle} source={{uri: "https://scontent-frx5-1.cdninstagram.com/t51.2885-15/e35/25038373_317331842096007_5339085132831653888_n.jpg"}} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#152341",marginTop:1 }}>
        <FlatList
          data={this.props.mediadata}
          renderItem={this.renderPhotos}
          numColumns={3}
        />
      </View>
    );
  }
}

export default MediaContentScreen;

const mediaStyles = {
    container: {
      flex: 1,
      backgroundColor: "#152341",
      justifyContent: "flex-start",
      margin: 2
    },
    imageStyle: {
          height: width / 3,
          width: width / 3,
    }
  };
  