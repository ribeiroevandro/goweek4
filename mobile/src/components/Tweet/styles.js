import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.light,
  },

  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.primary,
    marginVertical: 10,
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  likeText: {
    color: colors.like,
    marginLeft: 5,
  },
});

export default styles;
