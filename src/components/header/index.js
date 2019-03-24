import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const Header = ({ navigation, title, hasBack }) => (
  <View style={styles.container}>
    <View style={styles.left}>
      {hasBack && (
        <TouchableOpacity onPress={() => navigation.navigate('repositories')}>
          <Icon name="angle-left" size={26} color="#000" />
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View />
  </View>
);

Header.defaultProps = {
  hasBack: false,
};

Header.propTypes = {
  navigation: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  hasBack: PropTypes.bool,
};

export default withNavigation(Header);
