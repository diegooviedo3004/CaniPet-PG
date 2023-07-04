import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Base from './components/Base';
import { TextInput, Text, Button } from 'react-native-paper';
import useStore from './store';
import { useEffect } from 'react';
import api from './utils/api';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import localStorage from './utils/localStorage';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export default function Main() {
  const { code, login } = useStore();
  const [text, setText] = React.useState("");

  const handleLogin = () => {
    api.loginServer({ "code": text })
    .then((res) => {
      login(text);
    })
    .catch((error) => {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert('Error en la solicitud:', error.message);
      }
    })
  }

  useEffect(() => {
    // Obtener el valor guardado cuando se carga el componente
    localStorage.getData().then((value) => {
      if (value) {
        login(value);
      }
    });
  }, []); 
  
  return (
    <PaperProvider>
       <QueryClientProvider client={queryClient}>
      {code ? (
        <Base />
      ) :
        (
          <View style={styles.container}>
            <Text variant="titleLarge">Ingresa tu codigo: </Text>
            <TextInput
              label="Email"
              value={text}
              style={{ width: '80%', fontSize: 20 }} // Ajusta el ancho y tamaño de fuente según tus necesidades
              onChangeText={text => setText(text)}
            />
            <Button mode="contained" onPress={handleLogin}>Iniciar</Button>
          </View>
        )
      }
      </QueryClientProvider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})