import {View, Text, Image} from 'react-native';
import React from 'react';
import {FlatlistGameCardModel} from '../models';
import {GameScreenStyles} from '../styles';

const GameCard: React.FC<FlatlistGameCardModel> = props => {
  const {item} = props;

  return (
    <View style={GameScreenStyles.gameCardContainer}>
      <View style={GameScreenStyles.gameCardHeader}>
        <Text style={GameScreenStyles.gameCardTitle}>{item.title}</Text>
      </View>
      <Text>Developer: {item.developer}</Text>
      <Text>Publisher: {item.publisher}</Text>
      <Text>Platform: {item.platform}</Text>
      <Text>Category: {item.genre}</Text>
      <Text style={GameScreenStyles.description}>{item.short_description}</Text>
      <Text>{new Date(item.release_date).toString().slice(0, 15)}</Text>
    </View>
  );
};

export default GameCard;
