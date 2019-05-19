import React from 'react';
import { Text,  View, TouchableOpacity, Animated, Easing } from 'react-native';



const styles = {
    buttonContainer: {
        justifyContent: 'center',
		alignItems: 'center',
    },

    buttonStyled: {
        justifyContent: 'center',
		alignItems: 'center',
    },

    textStyled: {
        alignSelf: 'center',
        fontWeight: 'bold',
    },
};

export default class ButtonPulse extends React.Component {

    static defaultProps = {
        title: 'Click',
        size: 100,
        textColor: '#ffffff',
        fontSize: 22,
        backgroundColor: '#00AA00',
        borderColor: '#009900',
        borderWidth: 8,
        onPress: () => {},
        count: 3,
        duration: 1000,
        isPulsing: true,
    }
    
    renderCircles = () => {
        let circles = [];
        const { count, duration } = this.props;
        for (let i=0; i<count; i++) {
            circles.push(
                <PulseCircle key={i} {...this.props} duration={ duration * (i+1)}/>
            );
        }
        return circles;
    }

    render (){
        const { title, size, textColor, fontSize, backgroundColor, borderColor, onPress } = this.props;
       
        return (
            <View style={[styles.buttonContainer,{
                width: size * 2.5,
                height: size * 2.5,
            }]}>
                {this.renderCircles()}
                <TouchableOpacity onPress={onPress} style={{...styles.buttonStyled,
                    width: size,
                    height: size,
                    backgroundColor,
                    borderColor,
                    borderWidth: 8,
                    borderRadius: size,
                }}>
                    <Text style={{...styles.textStyled, fontSize, color: textColor}}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class PulseCircle extends React.Component {
    
    static defaultProps = {
        duration: 1000,
    };
    
    animatedValue = new Animated.Value(0);

    startAnimate = () => {
        const duration = this.props.duration;

        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
			toValue: 1,
			duration,
            easing: Easing.linear,
            // useNativeDriver: false,
		})
        .start(() => {
            if (this.props.isPulsing) {
                this.startAnimate();
            }
        });
    }

    componentWillReceiveProps(newProps){
        if (newProps.isPulsing) {
            this.startAnimate();
        }
    }

    render (){
        const { size, backgroundColor, borderColor, borderWidth } = this.props;
        const circleSize = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [size, size * 2.5]
        });
        return(
            <Animated.View style={{
                backgroundColor,
                borderColor,
                borderWidth,
                position: 'absolute',
                borderRadius: circleSize,
                width: circleSize, 
                height: circleSize,
                opacity: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                }),
            }}/>
        );
    }
}