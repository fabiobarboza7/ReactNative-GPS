import React from 'react';
import { StatusBar } from 'react-native';
// import { Container } from './styles';
import Routes from './routes';
import Main from './pages/Main';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="purple" />
      <Routes />
    </>
  );
}
