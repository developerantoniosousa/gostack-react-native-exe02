import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, TouchableHighlight, Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const IssueItem = ({ issue }) => (
  <TouchableHighlight
    style={styles.container}
    onPress={() => Linking.openURL(issue.html_url)}
    underlayColor="transparent"
  >
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.infoName} numberOfLines={1} ellipsizeMode="tail">
            {issue.title}
          </Text>
          <Text style={styles.infoLogin}>{issue.user.login}</Text>
        </View>
      </View>
      <Icon name="angle-right" size={20} color="#999" />
    </View>
  </TouchableHighlight>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    html_url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
  }).isRequired,
};

export default IssueItem;
