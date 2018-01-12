import { images, strings } from "resources";
import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView
} from "react-native";
import { AnimatedHeader, PremiumButton } from "components";
import styles from "./styles";
import Swiper from "react-native-swiper";

const { height, width } = Dimensions.get("window");

class PremiumServiceScreen extends Component {
  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: "light",
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor() {
    super();

    this.state = { headerX: false };

    this.renderSwiper = this.renderSwiper.bind(this);
  }
  componentWillMount() {
    if (height === 812) {
      this.setState({ headerX: true });
    } else {
      this.setState({ headerX: false });
    }
  }
  renderSwiper() {
    return (
      <View style={styles.swiperContainer}>
        <Swiper
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginTop: 10,
            height: 62
          }}
          horizontal
          autoplay={true}
          dot={<View style={styles.swiperDotView} />}
          activeDot={<View style={styles.swiperActiveDotView} />}
          paginationStyle={{
            top: 60
          }}
          autoplayTimeout={4}
        >
          <View style={styles.swiperTextView}>
            <Text
              style={styles.sliderTextStyle}
              numberOfLines={3}
              ellipsizeMode="clip"
            >
              Manage your company accounts as you wish
            </Text>
          </View>
          <View style={styles.swiperTextView}>
            <Text
              style={styles.sliderTextStyle}
              numberOfLines={3}
              ellipsizeMode="clip"
            >
              Track your followers of your business account
            </Text>
          </View>
          <View style={styles.swiperTextView}>
            <Text
              style={styles.sliderTextStyle}
              numberOfLines={3}
              ellipsizeMode="clip"
            >
              Analyze your business account
            </Text>
          </View>
        </Swiper>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image
            style={
              this.state.headerX === false
                ? styles.logoStyle
                : styles.logoXStyle
            }
            source={images.premiumLogo}
          />
          <Text style={styles.premiumText}>PREMIUM</Text>
          {this.renderSwiper()}
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              
            }}
          >
            <PremiumButton
              activeButton={false}
              premiumCost={"₺ 14,90"}
              premiumDuration="1 Week"
            />
            <PremiumButton
              activeButton={true}
              premiumCost={"₺ 14,90"}
              premiumDuration="1 Week"
              // clickButton={this.clickButton} burda aktif ve baska butona tıklanıyosa bi onceki aktif olan butonun stililini degistir
            />
            <PremiumButton
              activeButton={false}
              premiumCost={"₺ 14,90"}
              premiumDuration="1 Week"
            />
            <TouchableOpacity style={styles.purchaseButton}>
              <Text style={styles.purchaseButtonText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:10}}>
        <ScrollView style={{ height:120, }} horizontal={false}>
            <Text style={styles.subscriptionInfoText} numberOfLines={7}>
              Payment will be chatged to iTunes Account at confirmation of
              purchase. Subscription automatically renews unless auto-renew is
              turnet off at least 24-hours before the end of the current
              period. Account will be charged for renewal within 24-hours
              prior to the end of the current period, and identify the cost of
              the renewal. Subscriptions may be managed by the user and
              auto-renewal may be turned off by going to the user’s Account
              Settings after purchase. Any unused portion of a free trial
              period, if offered, will be forteited when the user purchases a
              subscription to that publication, where applicable. Terms of Use
            </Text>
          
        </ScrollView>
        </View>
      </View>
    );
  }
}

export default PremiumServiceScreen;
