import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default class MonthPickerRange extends React.Component {
    state = {
        mode: ['month', 'month'],
        value: [],
    };

    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
        });
        this.props.onChange && this.props.onChange(value);
    };

    handleChange = value => {
        this.setState({ value });
    };

    render() {
        const { value, mode } = this.state;
        return (
            <RangePicker
                format="YYYY-MM"
                value={value}
                mode={mode}
                onChange={this.handleChange}
                onPanelChange={this.handlePanelChange}
            />
        );
    }
}