import React from 'react';
import { TouchableNativeFeedback, View, Platform, TouchableWithoutFeedback } from 'react-native';

export default function CustomTabBarButton(props) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple('transparent', false)}
      >
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          {props.children}
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
}
