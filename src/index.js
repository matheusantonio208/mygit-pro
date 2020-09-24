import React from 'react';
import '../config/Reactotron';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
