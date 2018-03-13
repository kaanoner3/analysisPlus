import React, { Component } from "react"
import { View, Text, Dimensions, ScrollView, Animated, TouchableOpacity } from "react-native"
import {
   VictoryBar,
   VictoryChart,
   VictoryAnimation,
   VictoryArea,
   VictoryAxis,
   VictoryLabel,
   VictoryTooltip,
   VictorySharedEvents,
   VictoryScatter,
   VictoryGroup,
   Bar,
   Area
} from "victory-native"
import { Path, G, LinearGradient, Stop, Defs, Svg } from "react-native-svg"
import { connect } from "react-redux"
import { chartStatisticRequest, gainedChartStatisticRequest, lostedChartStatisticRequest } from "ducks/chart"
import { AnimatedHeader } from "components"
import styles from "./styles"
import { images, languages } from "resources"

const screenWidth = Dimensions.get("window").width

class StatisticChartScreen extends Component {
   constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      this.renderFollowerChart = this.renderFollowerChart.bind(this)
      this.renderGainedFollowersChart = this.renderGainedFollowersChart.bind(this)
      this.renderLostedFollowersChart = this.renderLostedFollowersChart.bind(this)

      this.serviceType = "weekly"
      this.state = {
         ShouldrenderFollowerChart: false,
         gainedChartCount: 0,
         followersChartCount: 0,
         lostedChartCount: 0,
         gainedActiveChart: 1,
         lostedActiveChart: 1,
         followersActiveChart: 1
      }
   }

   onNavigatorEvent(event) {
      if (event.id === "bottomTabSelected") {
         this.props.chartStatisticRequest("monthly")
         this.props.gainedChartStatisticRequest("monthly")
         this.props.lostedChartStatisticRequest("monthly")
         this.setState({ ShouldrenderFollowerChart: true })
      }
      if (event.id === "willDisappear") {
         this.setState({ ShouldrenderFollowerChart: false })
      }
   }
   componentDidMount() {
      if (this.props.gainedData.length === 0) {
         this.setState({
            gainedChartCount: "Click The Chart"
         })
      } else {
         this.setState({
            gainedChartCount: this.props.gainedData.gainedChartData[this.props.gainedData.day.length - 1].y
         })
      }
      if (this.props.chartData.length === 0) {
         this.setState({
            followersChartCount: "Click The Chart"
         })
      } else {
         this.setState({
            followersChartCount: this.props.chartData.followersChartData[this.props.chartData.day.length - 1]
               .y
         })
      }
      if (this.props.lostedData.length === 0) {
         this.setState({
            lostedChartCount: "Click The Chart"
         })
      } else {
         this.setState({
            lostedChartCount: this.props.lostedData.lostedChartData[this.props.lostedData.day.length - 1].y
         })
      }
   }
   renderLostedFollowersChart() {
      if (
         this.state.ShouldrenderFollowerChart === true &&
         this.props.lostedFetching === false &&
         this.props.lostedErrorFlag === false
      ) {
         return (
            <View style={styles.chartContainer}>
               <View style={styles.infoView}>
                  <Text style={styles.infoText}>{languages.t("graphic_lostedFollowers")}</Text>
                  <Text style={styles.infoValue}>{this.state.lostedChartCount}</Text>
               </View>
               <VictoryChart
                  domain={{
                     x: [
                        this.props.lostedData.lostedChartData[0].x,
                        this.props.lostedData.lostedChartData[this.props.lostedData.day.length - 1].x
                     ],
                     y: [0, this.props.lostedData.domainY.maxValue]
                  }}
                  domainPadding={{ x: [15, 10], y: [25, 20] }}
               >
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="myGradient">
                        <Stop stopColor="#059ED9" offset="100%" stopOpacity="1" />
                        <Stop stopColor="#5D4ED3" offset="0%" stopOpacity="1" />
                     </LinearGradient>
                  </Defs>
                  <VictoryBar
                     data={this.props.lostedData.lostedChartData}
                     name="bar"
                     style={{
                        data: {
                           stroke: "transparent",
                           fill: "url(#myGradient)",
                           strokeWidth: 0,
                           strokeLinecap: "round"
                        }
                     }}
                     animate={{ duration: 1000 }}
                     events={[
                        {
                           target: "data",
                           eventHandlers: {
                              onPressIn: () => {
                                 return {
                                    target: "data",
                                    mutation: props => {
                                       this.setState({ lostedChartCount: props.datum.y })
                                       return null
                                    }
                                 }
                              }
                           }
                        }
                     ]}
                  />
                  <VictoryAxis
                     dependentAxis
                     standalone={false}
                     tickValues={this.props.lostedData.lostedChartData.y}
                     tickFormat={t => {
                        return t
                     }}
                     style={{
                        ticks: { size: 7 },
                        grid: { stroke: "rgba(255,255,255,0.05)" },
                        axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                        tickLabels: {
                           fill: "rgba(255,255,255,0.4)",
                           fontFamily: "Circular",
                           fontSize: 13
                        }
                     }}
                  />
                  <VictoryAxis
                     standalone={false}
                     style={{
                        grid: {
                           stroke: "transparent"
                        },
                        axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                        ticks: {
                           size: 0
                        },
                        tickLabels: {
                           fill: "rgba(255,255,255,0.4)",
                           fontFamily: "Circular",
                           fontSize: 13
                        }
                     }}
                     tickValues={this.props.lostedData.lostedChartData.x}
                     tickFormat={x => {
                        if (Number.isInteger(x)) {
                           const month = this.props.lostedData.month[x - 1]
                           const day = this.props.lostedData.day[x - 1]
                           switch (month) {
                              case 1: {
                                 return day + " Jan"
                              }
                              case 2: {
                                 return day + " Feb"
                              }
                              case 3: {
                                 return day + " Mar"
                              }
                              case 4: {
                                 return day + " Apr"
                              }
                              case 5: {
                                 return day + " May"
                              }
                              case 6: {
                                 return day + " June"
                              }
                              case 7: {
                                 return day + " July"
                              }
                              case 8: {
                                 return day + " Aug"
                              }
                              case 9: {
                                 return day + " Sep"
                              }
                              case 10: {
                                 return day + " Oct"
                              }
                              case 11: {
                                 return day + "Nov"
                              }
                              case 12: {
                                 return day + "Dec"
                              }
                              default:
                                 return ""
                           }
                        }
                     }}
                  />
               </VictoryChart>
               <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", marginTop: 10, alignSelf: "center", flex: 1 }}>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ lostedActiveChart: 0 })
                           this.props.lostedChartStatisticRequest("weekly")
                        }}
                        style={
                           this.state.lostedActiveChart !== 0 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.lostedActiveChart !== 0
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_weekly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ lostedActiveChart: 1 })
                           this.props.lostedChartStatisticRequest("monthly")
                        }}
                        style={
                           this.state.lostedActiveChart !== 1 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.lostedActiveChart !== 1
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_monthly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
         onPress={() => {
            this.setState({ lostedActiveChart: 2 })
            this.props.lostedChartStatisticRequest("yearly")
         }}
style={
                           this.state.lostedActiveChart !== 2 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.lostedActiveChart !== 2
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_yearly")}
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }
   renderGainedFollowersChart() {
      if (
         this.state.ShouldrenderFollowerChart === true &&
         this.props.gainedFetching === false &&
         this.props.gainedErrorFlag === false
      ) {
         return (
            <View style={styles.chartContainer}>
               <View style={styles.infoView}>
                  <Text style={styles.infoText}>{languages.t("graphic_gainedFollowers")}</Text>
                  <Text style={styles.infoValue}>{this.state.gainedChartCount}</Text>
               </View>
               <VictoryChart
                  domain={{
                     x: [
                        this.props.gainedData.gainedChartData[0].x,
                        this.props.gainedData.gainedChartData[this.props.gainedData.day.length - 1].x
                     ],
                     y: [0, this.props.gainedData.domainY.maxValue]
                  }}
                  domainPadding={{ x: [15, 10], y: [25, 20] }}
               >
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="myGradient">
                        <Stop stopColor="#059ED9" offset="100%" stopOpacity="1" />
                        <Stop stopColor="#5D4ED3" offset="0%" stopOpacity="1" />
                     </LinearGradient>
                  </Defs>
                  <VictoryBar
                     data={this.props.gainedData.gainedChartData}
                     name="bar"
                     style={{
                        data: {
                           stroke: "transparent",
                           fill: "url(#myGradient)",
                           strokeWidth: 0,
                           strokeLinecap: "round"
                        }
                     }}
                     animate={{ duration: 1000 }}
                     events={[
                        {
                           target: "data",
                           eventHandlers: {
                              onPressIn: () => {
                                 return {
                                    target: "data",
                                    mutation: props => {
                                       this.setState({ gainedChartCount: props.datum.y })
                                       return null
                                    }
                                 }
                              }
                           }
                        }
                     ]}
                  />
                  <VictoryAxis
                     dependentAxis
                     standalone={false}
                     tickValues={this.props.gainedData.gainedChartData.y}
                     tickFormat={t => {
                        return t
                     }}
                     style={{
                        ticks: { size: 5 },
                        grid: { stroke: "rgba(255,255,255,0.05)" },
                        axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                        tickLabels: {
                           fill: "rgba(255,255,255,0.4)",
                           fontFamily: "Circular",
                           fontSize: 13
                        }
                     }}
                  />
                  <VictoryAxis
                     standalone={false}
                     style={{
                        grid: {
                           stroke: "transparent"
                        },
                        axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                        ticks: {
                           size: 0
                        },
                        tickLabels: {
                           fill: "rgba(255,255,255,0.4)",
                           fontFamily: "Circular",
                           fontSize: 13
                        }
                     }}
                     tickValues={this.props.gainedData.gainedChartData.x}
                     tickFormat={x => {
                        if (Number.isInteger(x)) {
                           const month = this.props.chartData.month[x - 1]
                           const day = this.props.chartData.day[x - 1]
                           switch (month) {
                              case 1: {
                                 return day + " Jan"
                              }
                              case 2: {
                                 return day + " Feb"
                              }
                              case 3: {
                                 return day + " Mar"
                              }
                              case 4: {
                                 return day + " Apr"
                              }
                              case 5: {
                                 return day + " May"
                              }
                              case 6: {
                                 return day + " June"
                              }
                              case 7: {
                                 return day + " July"
                              }
                              case 8: {
                                 return day + " Aug"
                              }
                              case 9: {
                                 return day + " Sep"
                              }
                              case 10: {
                                 return day + " Oct"
                              }
                              case 11: {
                                 return day + "Nov"
                              }
                              case 12: {
                                 return day + "Dec"
                              }
                              default:
                                 return ""
                           }
                        }
                     }}
                  />
               </VictoryChart>
               <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", marginTop: 10, alignSelf: "center", flex: 1 }}>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ gainedActiveChart: 0 })
                           this.props.gainedChartStatisticRequest("weekly")
                        }}
                        style={
                           this.state.gainedActiveChart !== 0 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.gainedActiveChart !== 0
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_weekly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ gainedActiveChart: 1 })
                           this.props.gainedChartStatisticRequest("monthly")
                        }}
                        style={
                           this.state.gainedActiveChart !== 1 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.gainedActiveChart !== 1
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_monthly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ gainedActiveChart: 2 })
                           this.props.gainedChartStatisticRequest("yearly")
                        }}
                        style={
                           this.state.gainedActiveChart !== 2 ? styles.buttonStyle : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.gainedActiveChart !== 2
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_yearly")}
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }
   renderFollowerChart() {
      if (
         this.state.ShouldrenderFollowerChart === true &&
         this.props.followersFetching === false &&
         this.props.followersErrorFlag === false
      ) {
         return (
            <View style={styles.chartContainer}>
               <View style={styles.infoView}>
                  <Text style={styles.infoText}>{languages.t("graphic_totalFollowers")}</Text>
                  <Text style={styles.infoValue}>{this.state.followersChartCount}</Text>
               </View>
               <View style={{}}>
                  <VictoryChart
                     domain={{
                        x: [
                           this.props.chartData.followersChartData[0].x,
                           this.props.chartData.followersChartData[this.props.chartData.day.length - 1].x
                        ],
                        y: [0, this.props.chartData.domainY.maxValue]
                     }}
                     domainPadding={{ x: [0, 10], y: [10, 20] }}
                  >
                     <Defs>
                        <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="myGradient">
                           <Stop stopColor="#00FF72" offset="100%" stopOpacity="0.5" />
                           <Stop stopColor="#00FF72" offset="0%" stopOpacity="0" />
                        </LinearGradient>
                     </Defs>
                     <VictoryGroup
                        data={this.props.chartData.followersChartData}
                        events={[
                           {
                              childName: "scatter",
                              target: "data",
                              eventHandlers: {
                                 onPressIn: () => {
                                    return [
                                       {
                                          childName: "scatter",
                                          target: "data",
                                          mutation: props => {
                                             this.setState({ followersChartCount: props.datum.y })
                                          }
                                       }
                                    ]
                                 }
                              }
                           }
                        ]}
                     >
                        <VictoryArea
                           name="area"
                           style={{
                              data: {
                                 stroke: "#00FF72",
                                 fill: "url(#myGradient)",
                                 strokeWidth: 2,
                                 strokeLinecap: "round"
                              }
                           }}
                           animate={{
                              duration: 1000
                           }}
                        />
                        <VictoryScatter style={{ data: { fill: "#00FF72" } }} size={7} name="scatter" />
                     </VictoryGroup>
                     <VictoryAxis
                        dependentAxis
                        standalone={false}
                        tickValues={this.props.chartData.followersChartData.y}
                        tickFormat={t => {
                           return t
                        }}
                        style={{
                           ticks: { size: 5 },
                           grid: { stroke: "rgba(255,255,255,0.05)" },
                           axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                           tickLabels: {
                              fill: "rgba(255,255,255,0.4)",
                              fontFamily: "Circular",
                              fontSize: 13
                           }
                        }}
                     />
                     <VictoryAxis
                        standalone={false}
                        style={{
                           grid: {
                              stroke: "transparent"
                           },
                           axis: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 },
                           ticks: {
                              size: 0
                           },

                           tickLabels: {
                              fill: "rgba(255,255,255,0.4)",
                              fontFamily: "Circular",
                              fontSize: 13
                           }
                        }}
                        tickValues={this.props.chartData.followersChartData.x}
                        tickFormat={x => {
                           if (Number.isInteger(x)) {
                              const month = this.props.chartData.month[x - 1]
                              const day = this.props.chartData.day[x - 1]
                              switch (month) {
                                 case 1: {
                                    return day + " Jan"
                                 }
                                 case 2: {
                                    return day + " Feb"
                                 }
                                 case 3: {
                                    return day + " Mar"
                                 }
                                 case 4: {
                                    return day + " Apr"
                                 }
                                 case 5: {
                                    return day + " May"
                                 }
                                 case 6: {
                                    return day + " June"
                                 }
                                 case 7: {
                                    return day + " July"
                                 }
                                 case 8: {
                                    return day + " Aug"
                                 }
                                 case 9: {
                                    return day + " Sep"
                                 }
                                 case 10: {
                                    return day + " Oct"
                                 }
                                 case 11: {
                                    return day + "Nov"
                                 }
                                 case 12: {
                                    return day + "Dec"
                                 }
                                 default:
                                    return ""
                              }
                           }
                        }}
                     />
                  </VictoryChart>
               </View>
               <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", marginTop: 10, alignSelf: "center", flex: 1 }}>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ followersActiveChart: 0 })
                           this.props.chartStatisticRequest("weekly")
                        }}
                        style={
                           this.state.followersActiveChart !== 0
                              ? styles.buttonStyle
                              : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.followersActiveChart !== 0
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_weekly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ followersActiveChart: 1 })
                           this.props.chartStatisticRequest("monthly")
                        }}
                        style={
                           this.state.followersActiveChart !== 1
                              ? styles.buttonStyle
                              : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.followersActiveChart !== 1
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_monthly")}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => {
                           this.setState({ followersActiveChart: 2 })
                           this.props.chartStatisticRequest("yearly")
                        }}
                        style={
                           this.state.followersActiveChart !== 2
                              ? styles.buttonStyle
                              : styles.activeButtonStyle
                        }
                     >
                        <Text
                           style={
                              this.state.followersActiveChart !== 2
                                 ? styles.typeButtonText
                                 : styles.activeTextStyle
                           }
                        >
                           {languages.t("graphic_yearly")}
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: "#152341" }}>
            <AnimatedHeader ref="animated_Header" title={languages.t("tab_graphic")} />

            <ScrollView
               style={{ flex: 1 }}
               scrollEventThrottle={1}
               onScroll={Animated.event([
                  {
                     nativeEvent: {
                        contentOffset: {
                           y:
                              this.refs.animated_Header === undefined
                                 ? 0
                                 : this.refs.animated_Header.state.scrollY
                        }
                     }
                  }
               ])}
            >
               {this.renderFollowerChart()}
               {this.renderGainedFollowersChart()}
               {this.renderLostedFollowersChart()}
            </ScrollView>
         </View>
      )
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      isFetching: state.chart.isFetching,
      token: state.user.token,

      chartData: state.chart.chartData,
      gainedData: state.chart.gainedData,
      lostedData: state.chart.lostedData,

      lostedFetching: state.chart.lostedFetching,
      gainedFetching: state.chart.gainedFetching,
      followersFetching: state.chart.followersFetching,

      lostedErrorFlag: state.chart.lostedFlag,
      gainedErrorFlag: state.chart.gainedFlag,
      followersErrorFlag: state.chart.followersFlag
   }
}

export default connect(mapStateToProps, {
   chartStatisticRequest,
   gainedChartStatisticRequest,
   lostedChartStatisticRequest
})(StatisticChartScreen)
