import React, { Component } from "react"
import { View, Text, Dimensions } from "react-native"
import {
   VictoryBar,
   VictoryChart,
   VictoryLine,
   VictoryTheme,
   VictoryClipContainer,
   VictoryBrushContainer,
   VictoryContainer,
   VictoryCursorContainer,
   VictorySelectionContainer,
   VictoryVoroniContainer,
   VictoryGroup,
   VictoryScatter,
   VictoryAnimation,
   VictoryVoronoiContainer,
   VictoryArea,
   VictoryPie,
   VictoryAxis,
   VictoryLabel,
   VictoryTooltip
} from "victory-native"
import { Path, G, LinearGradient, Stop, Defs, Svg } from "react-native-svg"
import { connect } from "react-redux"
import { chartStatisticRequest } from "ducks/chart"

const testData = [34, 54, 7, 72]
const testDataReverse = [86, 72, 67, 54]
const screenWidth = Dimensions.get("window").width
class StatisticChartScreen extends Component {
   constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      this.renderFollowerChart = this.renderFollowerChart.bind(this)

      this.state = { ShouldrenderFollowerChart: false }
   }

   onNavigatorEvent(event) {
      if (event.id === "bottomTabSelected") {
         this.setState({ ShouldrenderFollowerChart: true })
      }
      if (event.id === "willDisappear") {
         this.setState({ ShouldrenderFollowerChart: false })
      }
   }
   componentWillMount() {
      this.props.chartStatisticRequest(this.props.token, "weekly")
   }
   renderGainedFollowersChart() {
      if (this.state.ShouldrenderFollowerChart === true) {
         return (
            <View style={{ flex: 1 }}>
               <Svg
                  viewBox={"170 -30 20 350"}
                  style={{
                     backgroundColor: "#192A4F",
                     padding: 0,
                     width: screenWidth,
                     height: "45%"
                  }}
               >
                  <VictoryChart
                     domain={{
                        x: [
                           this.props.gainedData.day[0],
                           this.props.gainedData.day[this.props.gainedData.day.length - 1]
                        ],
                        y: [this.props.gainedData.domainY.minValue, this.props.gainedData.domainY.maxValue]
                     }}
                     domainPadding={{ x: [0, 10], y: [0, 10] }}
                  >
                     <VictoryBar
                        data={this.props.gainedData.gainedChartData}
                        name="bar"
                        style={{
                           data: {
                              stroke: "#00FF72",
                              fill: "url(#myGradient)",
                              strokeWidth: 3,
                              strokeLinecap: "round"
                           }
                        }}
                        animate={{ duration: 1000 }}
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
                        tickValues={this.props.gainedData.day}
                        tickFormat={x => {
                           return x + " Feb"
                        }}
                     />
                  </VictoryChart>
               </Svg>
            </View>
         )
      }
   }
   renderFollowerChart() {
      if (this.state.ShouldrenderFollowerChart === true) {
         return (
            <View style={{ flex: 1 }}>
               <Svg
                  viewBox={"170 -30 20 350"}
                  style={{
                     backgroundColor: "#192A4F",
                     padding: 0,
                     width: screenWidth,
                     height: "45%"
                  }}
               >
                  <VictoryChart
                     domain={{
                        x: [
                           this.props.chartData.day[0],
                           this.props.chartData.day[this.props.chartData.day.length - 1]
                        ],
                        y: [this.props.chartData.domainY.minValue, this.props.chartData.domainY.maxValue]
                     }}
                     domainPadding={{ x: [0, 10], y: [0, 10] }}
                  >
                     <VictoryLabel
                        dx={20}
                        dy={30}
                        name="myCountLabel"
                        style={{ fontSize: 28, fontFamily: "Circular", fill: "white" }}
                        text={245}
                        data={this.props.chartData.followersChartData.y}
                     />
                     <Defs>
                        <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="myGradient">
                           <Stop stopColor="#00FF72" offset="100%" stopOpacity="0.5" />
                           <Stop stopColor="#00FF72" offset="0%" stopOpacity="0" />
                        </LinearGradient>
                     </Defs>

                     <VictoryArea
                        data={this.props.chartData.followersChartData}
                        name="area"
                        style={{
                           data: {
                              stroke: "#00FF72",
                              fill: "url(#myGradient)",
                              strokeWidth: 3,
                              strokeLinecap: "round"
                           }
                        }}
                        animate={{ duration: 1000 }}
                     />
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
                        tickValues={this.props.chartData.day}
                        tickFormat={x => {
                           return x + " Feb"
                        }}
                     />
                  </VictoryChart>
               </Svg>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }
   render() {
      return <View style={{ flex: 1 }}>{this.renderFollowerChart()}</View>
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      chartData: state.chart.chartData,
      gainedData: state.chart.gainedData
   }
}

export default connect(mapStateToProps, { chartStatisticRequest })(StatisticChartScreen)

/*
                  <VictoryAxis
                   tickValues={this.props.chartData.day} //tarih arrayi
                   tickFormat={t => {
                      t + " Feb"
                   }} 
                     style={{
                        axis: { stroke: "#756f6a" },
                        axisLabel: { fontSize: 20, padding: 30 },
                        grid: { stroke: t => (t > 4 ? "red" : "grey") },
                        ticks: { stroke: "grey", size: 5 },
                        tickLabels: { fontSize: 15, padding: 5 }
                     }}
                    
                  />
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                        <Stop stopColor="#00FF72" offset="100%" stopOpacity="0.5" />
                        <Stop stopColor="#00FF72" offset="0%" stopOpacity="0" />
                     </LinearGradient>
                  </Defs>
    
                                    <VictoryArea
                     data={this.props.chartData.followersChartData}
                     style={{
                        data: {
                           stroke: "#00FF72",
                           fill: "url(#a)",
                           strokeWidth: 3,
                           strokeLinecap: "round"
                        }
                     }}
                     //interpolation="natural"
                     animate={{ duration: 1000 }}
                  />




*/
