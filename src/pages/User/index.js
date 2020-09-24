import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    const {navigation} = this.props;

    this.setState({loading: true});

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?per_page=10`);

    this.setState({stars: response.data, loading: false});
  }

  handleLoadMore = async () => {
    const {navigation} = this.props;
    const {stars, page} = this.state;

    const user = navigation.getParam('user');

    const response = await api.get(
      `/users/${user.login}/starred?page=${page + 1}&per_page=10`,
    );

    this.setState({stars: [...stars, ...response.data], page: page + 1});
  };

  handleRefresh = async () => {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    this.setState({page: 1});

    const response = await api.get(`/users/${user.login}/starred?per_page=10`);

    this.setState({stars: response.data});
  };

  handleOpenStar = async (star_url) => {
    const {navigation} = this.props;

    navigation.navigate('WebView', {star_url});
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading, refreshing} = this.state;

    const user = navigation.getParam('user');

    return (
      <Container loading={loading}>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.handleLoadMore}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.handleOpenStar(item.html_url)}>
                <Starred>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            )}
          />
        )}
      </Container>
    );
  }
}
