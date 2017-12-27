import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { images } from 'resources';

class InstagramUser extends Component {
   constructor(props) {
      super(props);
   }


   render() {
      return (
         <View style={styles.containerView}>
            <View style={styles.dataView}>
               <TouchableOpacity
                  style={{
                     flex: 1,
                     flexDirection: 'row',
                     alignItems: 'center',

                  }}
               // onPress={this.props.detailPress}
               >
                  <View style={{ flex: 1 }} >
                     <View style={{ flexDirection: 'row' }} >
                        <Image style={styles.imageStyle} source={images.avatar} />
                        <View style={styles.textView}>
                           <Text style={styles.nameText}>Barbara Porter</Text>
                           <Text style={styles.usernameText}>@barbaraporter</Text>
                           <View style={styles.relationshipContainer}>
                              <View style={{ borderRadius: 100, borderColor: '#059ED9',flexDirection: 'row' }}>
                                 <Image style={{alignSelf: 'center'}} source={images.youFollowOk} />
                                 <Text style={styles.youFollow}>Follows You</Text>
                              </View>
                              <View style={{ borderRadius: 100, borderColor: '#5AD24E', marginLeft: 10,flexDirection: 'row' }}>
                                 <Image style={{alignSelf: 'center'}} source={images.followsYouOk} />
                                 <Text style={styles.followsYou}>You Follow</Text>
                              </View>
                           </View>
                        </View>
                     </View>

                  </View>
               </TouchableOpacity>

            </View>
         </View >
      );
   }
}

export default InstagramUser