import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { images } from 'resources';

class InstagramUser extends Component {
   constructor(props) {
      super(props);
      this.getStatusForButtonStyle = this.getStatusForButtonStyle.bind(this)
      this.renderRelationship = this.renderRelationship.bind(this)
   }
   componentWillMount() {
      // this.getStatusForButtonStyle()
   }
   getStatusForButtonStyle() {
      axios
         .get("https://api.instagram.com/v1/users/" + this.props.userId + "/relationship?access_token=" + this.props.main_token)
         .then(response => {
            this.relationship = response.data.data
            this.private = response.data.data.target_user_is_private
            if (this.relationship.outgoing_status === 'follows' && this.relationship.incoming_status === 'followed_by') {
               this.setState({ styleIndex: 0 })
            } else if (this.relationship.outgoing_status === 'none' && this.relationship.incoming_status === 'followed_by') {
               this.setState({ styleIndex: 1 })
            } else if (this.relationship.outgoing_status === 'follows' && this.relationship.incoming_status === 'none') {
               this.setState({ styleIndex: 2 })
            } else if (this.relationship.outgoing_status === 'requested' && this.relationship.incoming_status === 'followed_by') {
               this.setState({ styleIndex: 3 })
            } else if (this.relationship.outgoing_status === 'follows' && this.relationship.incoming_status === 'requested') {
               this.setState({ styleIndex: 4 })
            } else if (this.relationship.outgoing_status === 'none' && this.relationship.incoming_status === 'followed_by') {
               this.setState({ styleIndex: 5 })
            } else if (this.relationship.outgoing_status === 'requested' && this.relationship.incoming_status === 'none') {
               this.setState({ styleIndex: 6 })
            } else if (this.relationship.outgoing_status === 'none' && this.relationship.incoming_status === 'requested') {
               this.setState({ styleIndex: 7 })
            }
         })
         .catch(error => {
            console.log(error.message);
         });
   }
   renderRelationship() {

      if (this.props.relationshipStyle === undefined) {
         if (this.state.styleIndex !== null) {
            if (this.props.postIndex === 1 || this.props.postIndex === 4 || this.props.postIndex === 5) {
               if (this.state.styleIndex === 0) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 1) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 2) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 3) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>Requested</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 4) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Requested You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 5) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               }
            } else if (this.props.postIndex === 0) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else if (this.props.postIndex === 2) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                        <Text style={styles.followsYou}>Follows You</Text>
                     </View>
                  </View>
               )
            }
         } else return <View></View>
      } else {
         if (this.props.userId === this.props.redux_id) {
            if (this.props.postIndex === 1 || this.props.postIndex === 4 || this.props.postIndex === 5) {
               if (this.props.relationshipStyle === 0) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.props.relationshipStyle === 1) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.props.relationshipStyle === 2) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                     </View>
                  )
               } else if (this.props.relationshipStyle === 3) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>Requested</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.props.relationshipStyle === 4) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Requested You</Text>
                        </View>
                     </View>
                  )
               } else if (this.props.relationshipStyle === 5) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               }
            } else if (this.props.postIndex === 0) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else if (this.props.postIndex === 2) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                        <Text style={styles.followsYou}>Follows You</Text>
                     </View>
                  </View>
               )
            }
         } else {
            if (this.props.postIndex === 1 || this.props.postIndex === 4 || this.props.postIndex === 5) {
               if (this.state.styleIndex === 0) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 1) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 2) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 3) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>Requested</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 4) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Requested You</Text>
                        </View>
                     </View>
                  )
               } else if (this.state.styleIndex === 5) {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                           <Text style={styles.followsYou}>Follows You</Text>
                        </View>
                     </View>
                  )
               }
            } else if (this.props.postIndex === 0) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else if (this.props.postIndex === 2) {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#4CAF50' }}>
                        <Text style={styles.youFollow}>You Follow</Text>
                     </View>
                  </View>
               )
            } else {
               return (
                  <View style={styles.relationshipContainer}>
                     <View style={{ borderRadius: 100, borderColor: '#00B4FF', marginTop: 5 }}>
                        <Text style={styles.followsYou}>Follows You</Text>
                     </View>
                  </View>
               )
            }
         }
      }

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