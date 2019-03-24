import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, View, ActivityIndicator, FlatList, Text,
} from 'react-native';
import Header from '~/components/header';
import styles from './styles';
import api from '~/services/api';
import IssueItem from './issueItem';

class Issues extends Component {
  state = {
    issues: [],
    loading: true,
    refreshing: false,
    issueState: 'all'
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const { full_name: repository } = navigation.state.params;
    const { issueState } = this.state;

    this.setState({ refreshing: true });

    try {
      const { data: issues } = await api.get(`/repos/${repository}/issues?state=${issueState}`);
      this.setState({ issues, loading: false, refreshing: false });
    } catch (err) {}
  };

  changeIssueState = issueState => this.setState({ issueState }, () => this.loadIssues());

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;

    return (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        refreshing={refreshing}
        onRefresh={this.loadIssues}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const { loading, issueState } = this.state;

    return (
      <View style={styles.container}>
        <Header title={navigation.state.params.name} hasBack />
        <View style={styles.filterArea}>
          <TouchableOpacity onPress={() => this.changeIssueState('all')}>
            <Text style={[styles.filterText, { color: issueState === 'all' ? '#333' : '#999' }]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeIssueState('open')}>
            <Text style={[styles.filterText, { color: issueState === 'open' ? '#333' : '#999' }]}>Abertas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeIssueState('closed')}>
            <Text style={[styles.filterText, { color: issueState === 'closed' ? '#333' : '#999' }]}>Fechadas</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#333" style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Issues.propTypes = {
  navigation: PropTypes.shape({
    navigation: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        full_name: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Issues;
