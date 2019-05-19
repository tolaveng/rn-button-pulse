import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonPulse from './ui/button-pulse';


export default class App extends React.Component {
  
  state = {
    isPulsing : false,
  }

  buttonPressHandler = () =>{
    console.log('Button clicked');
    this.setState({isPulsing:!this.state.isPulsing});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Click the button. pulsing is {this.state.isPulsing? 'on' : 'off'}</Text>
        <ButtonPulse onPress={this.buttonPressHandler} isPulsing={this.state.isPulsing} count={2} duraction={2000}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
