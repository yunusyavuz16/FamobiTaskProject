import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

const CheckSvg = ({height, width, color}: any) => {
  return (
    <Svg
      width={height ?? 30}
      height={width ?? 30}
      viewBox="0 0 24 24"
      fill="none">
      <G>
        <Path
          d="M20 7L10 17l-5-5"
          stroke={color ?? 'rgb(90,193,102)'}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default CheckSvg;
