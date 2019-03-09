import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Post extends Component {
  render() {
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{uri: this.props.post.urlPerfil}} style={styles.fotoDePerfil} />
          <Text>{this.props.post.loginUsuario}</Text>
        </View>
        <Image source={{uri: this.props.post.urlFoto}} style={styles.foto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  foto: {
    width: width,
    height: width    
  }
});