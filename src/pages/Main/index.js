import React from 'react';

import { Container } from './styles';
import CurrentPosition from '../CurrentPosition';

export default function Main() {
  return (
    <Container>
      <CurrentPosition />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'MyGeoApp',
};
