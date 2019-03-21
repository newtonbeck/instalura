import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

exibeIcone = (likeada) => {
  return likeada ? require('../assets/s2-filled.png') : require('../assets/s2.png');
}

mostraTexto = (likers) => {
  return likers.length > 1 ? `${likers.length} curtiram` : `${likers.length} curtiu`;
}

const Like = ({ foto, likeCallback }) => (
  <View style={styles.rodape}>
    <TouchableOpacity onPress={likeCallback}>
    <Image source={exibeIcone(foto.likeada)} style={styles.fotoLike} />
    </TouchableOpacity>
    <Text>{ mostraTexto(foto.likers) }</Text>
  </View>
);

export default Like;

const styles = StyleSheet.create({
  fotoLike: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});