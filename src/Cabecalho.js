import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Cabecalho = ({ foto, amigoCallback }) => (
    <TouchableOpacity 
      style={styles.cabecalho} 
      onPress={() => amigoCallback(foto.loginUsuario)}
      accessible={true}
      accessibilityLabel={`Usuário ${foto.loginUsuario}`}
      accessibilityHint={`Clique duas vezes para ir para o perfil do ${foto.loginUsuario}`}>
      <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
      <Text>{foto.loginUsuario}</Text>
    </TouchableOpacity>
  );

export default Cabecalho;

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});