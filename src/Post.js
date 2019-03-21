import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Comentario from './Comentario';
import Cabecalho from './Cabecalho';
import Like from './Like';

const { width } = Dimensions.get('screen');

const Post = ({ likeCallback, adicionaComentarioCallback, foto, navegaParaAmigoCallback }) => (
  <View style={styles.container}>
    <Cabecalho foto={foto} amigoCallback={navegaParaAmigoCallback} />
    <Image 
      source={{uri: foto.urlFoto}} 
      style={styles.foto}
      accessible={true}
      accessibilityLabel={`Imagem do usuário ${foto.loginUsuario}`} />
    <Like foto={foto} likeCallback={() => likeCallback(foto.id)} />
    <Comentario foto={foto} adicionaComentarioCallback={adicionaComentarioCallback} />
  </View>
);

export default Post;

const styles = StyleSheet.create({
  container: {
  },
  foto: {
    width: width,
    height: width,  
  },
});