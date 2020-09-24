import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const {navigation} = this.props;
    const uri = navigation.getParam('star_url');

    return <WebView source={{uri}} style={{flex: 1}} />;
  }
}
