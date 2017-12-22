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
    VictoryScatter
} from "victory-native";

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

    renderChart() {
        if (this.state.ShouldRenderChart === true) {
            return (
                <VictoryChart
                    theme={VictoryTheme.material}
                    color='white'
                    animate={{ duration: 2000 }}
                >
                    <VictoryGroup
                        data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 },
                            { x: 4, y: 4 },
                            { x: 5, y: 7 }
                        ]}
                        color="red"

                    >
                        <VictoryScatter
                            size={10}
                            symbol="diamond"
                            animate={true}

                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "yellow", strokeWidth: 4, strokeLinecap: "round" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            interpolation='natural'

                        />

                    </VictoryGroup>
                </VictoryChart>
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