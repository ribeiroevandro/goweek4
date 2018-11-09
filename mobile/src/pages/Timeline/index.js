import React, { Component } from 'react';
import {
  View, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from 'socket.io-client';
import Tweet from '../../components/Tweet';

import api from '../../services/api';

import styles from './styles';
import { colors } from '../../styles';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Timeline',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          name="add-circle-outline"
          size={24}
          color={colors.twitter}
          style={styles.addNew}
        />
      </TouchableOpacity>
    ),
  });

  state = {
    tweets: [],
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');
    const { tweets } = this.state;

    io.on('tweet', (data) => {
      this.setState({ tweets: [data, ...tweets] });
    });
    io.on('like', (data) => {
      this.setState({
        tweets: tweets.map(
          tweet => (tweet._id === data._id ? data : tweet),
        ),
      });
    });
  }

  render() {
    const { tweets } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}
