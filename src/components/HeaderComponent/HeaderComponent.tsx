import {View, Text} from 'react-native';
import React from 'react';
import {HeaderComponentStyles} from './styles';

const HeaderComponent = () => {
  return (
    <View style={HeaderComponentStyles.container}>
      <Text style={HeaderComponentStyles.title}>Famobi Task Project</Text>
    </View>
  );
};

export default HeaderComponent;
