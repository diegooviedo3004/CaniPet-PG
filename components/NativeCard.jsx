import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const NativeCard = ({title}) => (
  <Card style={{marginVertical: 5}} mode="elevated">
    <Card.Title title={title} subtitle="Card Subtitle" left={LeftContent} />
  </Card>
)


export default NativeCard;