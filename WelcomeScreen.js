import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const WelcomeScreen = () => {
  const handleStart = () => {
    // Acción al presionar el botón de "Empezar"
  };

  return (
    <View style={styles.container}>
      {/* Preloader */}
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#0134d4" />
      </View>
      {/* Internet Connection Status */}
      <View style={styles.internetConnectionStatus}></View>
      {/* Hero Block Wrapper */}
      <View style={styles.heroBlockWrapper}>
        {/* Styles */}
        <View style={styles.heroBlockStyles}>
          <View style={styles.hbStyles1}></View>
          <View style={styles.hbStyles2}></View>
          <View style={styles.hbStyles3}></View>
        </View>
        <View style={styles.container}>
          {/* Hero Block Content */}
          <View style={styles.heroBlockContent}>
            <Image
              style={styles.logo}
              source={require('./static/img/bg-img/19.png')}
              resizeMode="contain"
            />
            <Text style={styles.title}>Controla a tus mascotas</Text>
            <Text style={styles.subtitle}>Con la nueva versión de CaniPet</Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Empezar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internetConnectionStatus: {
    // Estilos para el estado de conexión a internet
  },
  heroBlockWrapper: {
    backgroundColor: '#0134d4',
  },
  heroBlockStyles: {
    // Estilos para los bloques del héroe
  },
  hbStyles1: {
    // Estilos para hb-styles1
  },
  hbStyles2: {
    // Estilos para hb-styles2
  },
  hbStyles3: {
    // Estilos para hb-styles3
  },
  heroBlockContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
