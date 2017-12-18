// React.
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CustomTabBar component.
import { CustomTabBar } from 'components'

export default function (GivenComponent) {
    return class extends GivenComponent {
        renderCustomTabBar({ index }) {
            if (this.props.withoutTabBar) {
                return
            }

            return <CustomTabBar
                activeTabIndex={index}
                navigator={this.props.navigator}
            />
        }
    }
}
