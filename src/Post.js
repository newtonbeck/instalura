import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const { width } = Dimensions.get('screen');

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: props.foto,
    }
  }

  exibeLegenda = () => {
    const { foto } = this.state;

    if (foto.comentario === '') {
      return null;
    }

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  render() {
    const { foto, likeCallback, adicionaComentarioCallback } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{uri: foto.urlFoto}} style={styles.foto} />
        <Likes foto={foto} likeCallback={likeCallback} />
        { this.exibeLegenda() }
        { foto.comentarios.map((comentario) => (
          <View style={styles.comentario}>
            <Text style={styles.tituloComentario}>{ comentario.login }</Text>
            <Text>{ comentario.texto }</Text>
          </View>
        )) }
        <InputComentario
          foto={foto}
          adicionaComentarioCallback={adicionaComentarioCallback} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
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
  comentario: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  }
});
