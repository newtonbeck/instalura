import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Likes extends Component {

  carregaIcone = (likeada) => {
    return likeada ? require('../assets/heart_filled.png') : require('../assets/heart_not_filled.png');
  }

  exibeLikers = (likers) => {
    return (
      <Text>{ likers.length } { likers.length > 1 ? 'curtiram' : 'curtiu' }</Text>
    );
  }

  render() {
    const { foto } = this.props;
    return (
      <View style={styles.rodape}>
        <TouchableOpacity onPress={() => this.props.likeCallback(foto.id)}>
          <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
        </TouchableOpacity>
        { this.exibeLikers(foto.likers) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rodape: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  botaoDeLike: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});