import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './styles';
import { colors } from '../../styles';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username');

    if (username) {
      this.navigateToTimeline();
    }
  }

  handleLogin = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem('@GoTwitter:username', username);

    this.navigateToTimeline();
  };

  navigateToTimeline = async () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Timeline' })],
    });

    navigation.dispatch(resetAction);
  };

  handleInputChange = (username) => {
    this.setState({ username });
  };

  render() {
    const { username } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color={colors.twitter} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome do usuário"
            value={username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
