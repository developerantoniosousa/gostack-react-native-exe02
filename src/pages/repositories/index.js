import React, { Component } from 'react';

import {
  View,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Header from '~/components/header';
import RepositoryItem from './RepositoryItem';

import api from '~/services/api';

class Repositories extends Component {
  state = {
    repositories: [],
    loading: false,
    refreshing: false,
    repoInput: '',
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    try {
      const repositories = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories'));
      if (repositories !== null) {
        this.setState({ repositories });
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  handleNewRepository = async () => {
    const { repoInput, repositories } = this.state;

    if (!repoInput) return;

    try {
      const { data: repository } = await api.get(`/repos/${repoInput}`);

      const newRepository = {
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        avatar_url: repository.owner.avatar_url,
        login: repository.owner.login,
      };

      this.setState({ repoInput: '', repositories: [...repositories, newRepository] }, async () => {
        let repositoriesAsync = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories'));

        if (repositoriesAsync === null) {
          repositoriesAsync = [];
        }

        repositoriesAsync.push(newRepository);
        AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify(repositoriesAsync));
      });
    } catch (error) {
      console.tron.log(error);
    }
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { repositories, refreshing } = this.state;

    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        refreshing={refreshing}
        onRefresh={this.loadRepositories}
      />
    );
  };

  render() {
    const { loading, repoInput } = this.state;

    return (
      <View style={styles.container}>
        <Header title="GitIssues" />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={repoInput}
            underlineColorANdroid="transparent"
            placeholder="Adicionar novo repositório"
            placeholderTextColor="#999"
            onChangeText={repoInput => this.setState({ repoInput })}
          />
          <TouchableOpacity onPress={this.handleNewRepository}>
            <Icon name="plus" size={20} color="#333" style={styles.icon} />
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

export default Repositories;
