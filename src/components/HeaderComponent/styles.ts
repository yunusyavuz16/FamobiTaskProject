import {StyleSheet} from 'react-native';

export const HeaderComponentStyles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderColor: 'white',
    borderBottomColor: 'rgb(200,200,200)',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
