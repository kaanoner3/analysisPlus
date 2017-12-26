import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
    VictoryPie
} from "victory-native";
import { Path, G, LinearGradient, Stop, Defs, Svg } from "react-native-svg";

class StatisticChartScreen extends Component {
    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.renderChart = this.renderChart.bind(this)

        this.state = { ShouldRenderChart: false }
    }

    onNavigatorEvent(event) {
        if (event.id === 'bottomTabSelected') {
            this.setState({ ShouldRenderChart: true })
        }
        if (event.id === 'willDisappear') {
            this.setState({ ShouldRenderChart: false })
        }
    }
    componentDidMount() {
    }

    renderChart() {
        console.log(this.refs.myGradient)
        if (this.state.ShouldRenderChart === true) {
            return (
                <View style={{}}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        style={{
                            color:'white'
                        }}
                    >
                        <Defs>
                            <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id='a'>
                                <Stop stopColor="#59D24E" offset="0%" />
                                <Stop stopColor="#00BCC2" offset="100%" />
                            </LinearGradient>
                        </Defs>
                        <VictoryArea
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 }
                            ]}
                            style={{
                                data: { stroke: 'yellow', fill: 'url(#a)', strokeWidth: 3, strokeLinecap: "round" },
                                //parent: { border: "1px solid #ccc" }
                            }}
                            interpolation='natural'
                            animate={{ duration: 1000 }}
                        />
                    </VictoryChart>
                </View>
            )
        } else {
            return <View style={{ flex: 1 }}></View>
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                {this.renderChart()}
            </View>
        )
    }
}

export default StatisticChartScreen

/*


*/