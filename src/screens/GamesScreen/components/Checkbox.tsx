import {Text, TouchableOpacity, View} from 'react-native';
import {CheckBoxComponentModel} from '../models';
import CheckSvg from '../../../images/svgs/CheckSvg';
import {GameScreenStyles} from '../styles';

const Checkbox: React.FC<CheckBoxComponentModel> = props => {
  const {setCheckBox, checkBox, text} = props;
  return (
    <TouchableOpacity
      style={GameScreenStyles.checkBoxContainer}
      onPress={() => setCheckBox(!checkBox)}>
      <View style={GameScreenStyles.checkBox}>
        {checkBox && <CheckSvg height={16} width={16} />}
      </View>
      <Text style={GameScreenStyles.labelCheckbox}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
