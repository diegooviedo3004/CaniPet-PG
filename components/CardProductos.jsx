import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardProductos = ({title, mode, subtitle, where, handlerPress, imgUrl}) => (
  <Card mode={mode} style={{marginTop: 5}}>
    {where == "Home" ? (
      <>
    <Card.Title title={title} subtitle={subtitle} left={LeftContent} />

       <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions></>
    ): (
      <> 
      {imgUrl ? (
        <>
    <Card.Title title={title} subtitle={subtitle} left={() => <Avatar.Image size={50} source={imgUrl} />} />
        </>
      ): (
        <>
    <Card.Title title={title} subtitle={subtitle} left={LeftContent} />
        </>
      )}

    <Card.Actions>
      <Button onPress={handlerPress}>Descargar registros de {title}</Button>
    </Card.Actions></>
    )}
   
  </Card>
);

export default CardProductos;