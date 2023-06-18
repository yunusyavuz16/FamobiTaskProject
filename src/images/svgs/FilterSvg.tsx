import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

const FilterSvg = () => {
  return (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 3H5a2 2 0 00-2 2v1.172a2 2 0 00.586 1.414l5.828 5.828A2 2 0 0110 14.828V20.286a.71.71 0 001.212.502L12 20l1.414-1.414A2 2 0 0014 17.172v-2.344a2 2 0 01.586-1.414l5.828-5.828A2 2 0 0021 6.172V5a2 2 0 00-2-2z"
        stroke={'rgb(85,124,230)'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FilterSvg;
