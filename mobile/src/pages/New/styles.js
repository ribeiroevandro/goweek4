import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.twitter,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: colors.derker,
  },
});

export default styles;
