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
   VictoryAxis
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
            <View>
               <VictoryChart theme={VictoryTheme.material}>
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                        <Stop stopColor="#59D24E" offset="0%" />
                        <Stop stopColor="#00BCC2" offset="100%" />
                     </LinearGradient>
                  </Defs>
                  <VictoryArea
                     data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 7 }]}
                     style={{
                        data: {
                           stroke: "yellow",
                           fill: "url(#a)",
                           strokeWidth: 3,
                           strokeLinecap: "round"
                        }
                     }}
                     interpolation="natural"
                     animate={{ duration: 1000 }}
                  />
                  <VictoryAxis
               /*      tickValues={[2,4,5,7,8,8]} //tarih arrayi
                     tickFormat={t => {
                        console.log(t)
                        t
                     }} // gun yıl ay gelicek aya gore Nov yazdır gun kalsın*/
                  />
               </VictoryChart>
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


*/
