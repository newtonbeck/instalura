import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: props.post
    }
  }

  render() {
    const { post } = this.state;
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{uri: post.urlPerfil}} style={styles.fotoDePerfil} />
          <Text>{post.loginUsuario}</Text>
        </View>
        <Image source={{uri: post.urlFoto}} style={styles.foto} />
        <View style={styles.rodape}>
          <TouchableOpacity onPress={() => console.warn('Liking...')}>
            <Image style={styles.botaoDeLike}
              source={post.likeada ? require('../assets/heart_filled.png') : require('../assets/heart_not_filled.png')} />
          </TouchableOpacity>
        </View>
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
  },
  rodape: {
    margin: 10,
  },
  botaoDeLike: {

  }
});