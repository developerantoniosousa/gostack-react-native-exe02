import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const RepositoryItem = ({ navigation, repository }) => (
  <TouchableHighlight
    style={styles.container}
    onPress={() => navigation.navigate('issues', repository)}
    underlayColor="transparent"
  >
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.infoName}>{repository.name}</Text>
          <Text style={styles.infoLogin}>{repository.login}</Text>
        </View>
      </View>
      <Icon name="angle-right" size={20} color="#999" />
    </View>
  </TouchableHighlight>
);

RepositoryItem.propTypes = {
  navigation: PropTypes.shape({
    navigation: PropTypes.func,
  }).isRequired,
  repository: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
};

export default withNavigation(RepositoryItem);
