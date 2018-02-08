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
   VictoryLabel
} from "victory-native"
import { Path, G, LinearGradient, Stop, Defs, Svg } from "react-native-svg"
import { connect } from "react-redux"
import { chartStatisticRequest } from "ducks/chart"

const screenWidth = Dimensions.get("window").width
class StatisticChartScreen extends Component {
   constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      this.renderChart = this.renderChart.bind(this)

      this.state = { ShouldRenderChart: false }
   }

   onNavigatorEvent(event) {
      if (event.id === "bottomTabSelected") {
         this.setState({ ShouldRenderChart: true })
      }
      if (event.id === "willDisappear") {
         this.setState({ ShouldRenderChart: false })
      }
   }
   componentWillMount() {
      this.props.chartStatisticRequest(this.props.token, "weekly")
   }

   renderChart() {
      if (this.state.ShouldRenderChart === true) {
         return (
            <View style={{ flex: 1 }}>
               <Svg
                  viewBox={"170 -30 20 350"}
                  style={{
                     backgroundColor: "#ccdee8",
                     padding: 0,
                     width: screenWidth,
                     height: '40%'
                  }}
               >
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                        <Stop stopColor="#00FF72" offset="100%" stopOpacity="0.5" />
                        <Stop stopColor="#00FF72" offset="0%" stopOpacity="0" />
                     </LinearGradient>
                  </Defs>

                  <G>
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
                        animate={{ duration: 1000 }}
                     />
                     <VictoryAxis
                        dependentAxis
                        standalone={false}
                        domain={{
                           x: [2, 6],
                           y: [1678, 5919]
                        }}
                        tickValues={this.props.chartData.followersChartData}
                        tickFormat={t => {
                           console.log(t.y)
                           return t.y
                        }}
                        style={{
                           ticks: { size: 10 },
                           grid: { stroke: "black" }
                        }}
                     />
                     <VictoryAxis
                        //scale="time"
                        standalone={false}
                        domain={{
                           x: [2, 6],
                           y: [1678, 5919]
                        }}
                        style={{
                           grid: {
                              stroke: "transparent"
                           },
                           axis: { stroke: "black", strokeWidth: 1 },
                           ticks: {
                              size: 0
                           },
                           tickLabels: {
                              fill: "purple",
                              fontFamily: "Circular",
                              fontSize: 12
                           }
                        }}
                        tickValues={this.props.chartData.day}
                        tickFormat={x => {
                           return x + " Feb"
                        }}
                        orian
                     />
                  </G>
               </Svg>
            </View>
         )
      } else {
         return <View style={{ flex: 1 }} />
      }
   }
   render() {
      return <View style={{ flex: 1 }}>{this.renderChart()}</View>
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      chartData: state.chart.chartData
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
