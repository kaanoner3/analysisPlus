import React, { Component } from "react"
import { View, Text, Dimensions, ScrollView, Animated } from "react-native"
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
import { chartStatisticRequest, gainedChartStatisticRequest } from "ducks/chart"
import { AnimatedHeader } from "components"

const testData = [34, 54, 7, 72]
const testDataReverse = [86, 72, 67, 54]
const screenWidth = Dimensions.get("window").width

class StatisticChartScreen extends Component {
   constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      this.renderFollowerChart = this.renderFollowerChart.bind(this)
      this.renderGainedFollowersChart = this.renderGainedFollowersChart.bind(this)
      this.serviceType = "weekly"
      this.state = { ShouldrenderFollowerChart: false, gainedChartCount: 0, followersChartCount: 0 }
   }

   onNavigatorEvent(event) {
      if (event.id === "bottomTabSelected") {
         this.setState({ ShouldrenderFollowerChart: true })
      }
      if (event.id === "willDisappear") {
         this.setState({ ShouldrenderFollowerChart: false })
      }
   }
   componentDidMount() {
      this.props.chartStatisticRequest(this.props.token, "monthly")
      this.props.gainedChartStatisticRequest(this.props.token, "weekly")
      if (this.props.gainedData.length === 0) {
         this.setState({
            gainedChartCount: "Click The Chart",
            followersChartCount: "Click The Chart"
         })
      } else {
         this.setState({
            gainedChartCount: this.props.gainedData.gainedChartData[this.props.gainedData.day.length - 1].y,
            followersChartCount: this.props.chartData.followersChartData[this.props.chartData.day.length - 1]
               .y
         })
      }
   }
   renderGainedFollowersChart() {
      if (this.state.ShouldrenderFollowerChart === true && this.props.isFetching === false) {
         return (
            <View style={{ flex: 1, paddingLeft: 20, marginTop: 20, backgroundColor: "#192A4F" }}>
               <View style={{ flexDirection: "column", marginTop: 20 }}>
                  <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "Circular" }}>
                     GAINED FOLLOWERS
                  </Text>
                  <Text style={{ fontSize: 28, color: "white", fontFamily: "Circular" }}>
                     {this.state.gainedChartCount}
                  </Text>
               </View>
               <VictoryChart
                  domain={{
                     x: [
                        this.props.gainedData.day[0],
                        this.props.gainedData.day[this.props.gainedData.day.length - 1]
                     ],
                     y: [this.props.gainedData.domainY.minValue, this.props.gainedData.domainY.maxValue]
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
                     tickValues={this.props.gainedData.day}
                     tickFormat={x => {
                        return x + " Feb"
                     }}
                  />
               </VictoryChart>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }
   renderFollowerChart() {
      if (this.state.ShouldrenderFollowerChart === true && this.props.isFetching === false) {
         return (
            <View style={{ flex: 1, paddingLeft: 20, backgroundColor: "#192A4F" }}>
               <View style={{ flexDirection: "column", marginTop: 20 }}>
                  <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "Circular" }}>
                     TOTAL FOLLOWERS
                  </Text>
                  <Text style={{ fontSize: 28, color: "white", fontFamily: "Circular" }}>
                     {this.state.followersChartCount}
                  </Text>
               </View>
               <View style={{}}>
                  <VictoryChart
                     domain={{
                        x: [
                           this.props.chartData.followersChartData[0].x,
                           this.props.chartData.followersChartData[this.props.chartData.day.length - 1].x
                        ],
                        y: [this.props.chartData.domainY.minValue, this.props.chartData.domainY.maxValue]
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
                        animate={{
                           duration: 1000
                        }}
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
                        />
                        <VictoryScatter style={{ data: { fill: "#00FF72" } }} size={5} name="scatter" />
                     </VictoryGroup>
                     <VictoryAxis
                        dependentAxis
                        standalone={false}
                        tickValues={this.props.chartData.followersChartData.y}
                        tickFormat={t => {
                           console.log(t)
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
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: "#152341" }}>
            <AnimatedHeader ref="animated_Header" title="Graphics" />

            <ScrollView
               style={{ flex: 1, paddingTop: 20 }}
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
      gainedData: state.chart.gainedData
   }
}

export default connect(mapStateToProps, { chartStatisticRequest, gainedChartStatisticRequest })(
   StatisticChartScreen
)
