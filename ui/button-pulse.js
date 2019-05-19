import React from 'react';
import { Text, Button, View, TouchableOpacity, Animated, Easing } from 'react-native';


export default class ButtonPulse extends React.Component {

    static defaultProps = {
        title: 'Click',
        onPress: () => {},
    }

    state = {
        isPulsing: false,
    }

    render (){
        const { title, onPress } = this.props;
        const { isPulsing } = this.state;

        return (
            <Button title={title} onPress={onPress}/>
        );
    }
}