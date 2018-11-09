import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, TextInput, AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import styles from './styles';
import { colors } from '../../styles';

export default class New extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    newTweet: '',
  };

  goBack = () => {
    const { navigation } = this.props;

    navigation.pop();
  }

  handleNewTweet = async () => {
    const { newTweet } = this.state;
    const content = newTweet;
    const author = await AsyncStorage.getItem('@GoTwitter:username');

    await api.post('tweets', { content, author });

    this.goBack();
  }

  handleInputChange = (newTweet) => {
    this.setState({ newTweet });
  }

  render() {
    const { newTweet } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color={colors.twitter} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          multiline
          placeholder="O que está acontecendo?"
          value={newTweet}
          onChangeText={this.handleInputChange}
          returnKeyType="send"
          onSubmitEditing={this.handleNewTweet}
        />
      </SafeAreaView>
    );
  }
}
