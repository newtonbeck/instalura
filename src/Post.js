import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: props.foto,
      textoComentario: ''
    }
  }

  carregaIcone = (likeada) => {
    return likeada ? require('../assets/heart_filled.png') : require('../assets/heart_not_filled.png');
  }

  like = () => {
    const { foto } = this.state;

    let novosLikers = [];
    // Adiciona/remove meu usuário da lista de likers
    if (!foto.likeada) {
      novosLikers = [
        ...foto.likers,
        { login: 'meuUsuario' }
      ];
    } else {
      novosLikers = foto.likers.filter(({ login }) => login !== 'meuUsuario');
    }

    this.setState({
      foto: {
        ...foto,
        likeada: !foto.likeada,
        likers: novosLikers
      }
    });
  }

  exibeLikers = () => {
    const { foto: { likers } } = this.state;

    return (
      <Text>{ likers.length } { likers.length > 1 ? 'curtiram' : 'curtiu' }</Text>
    );
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

  adicionaComentario = () => {
    const { foto, textoComentario } = this.state;

    if (textoComentario === '') {
      return;
    }

    const novoComentario = {
      login: 'meuUsuario',
      texto: textoComentario
    };

    this.setState({
      foto: {
        ...foto,
        comentarios: [
          ...foto.comentarios,
          novoComentario
        ]
      },
      textoComentario: ''
    });

    this.inputComentario.clear();
  }

  render() {
    const { foto } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{uri: foto.urlFoto}} style={styles.foto} />
        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
          </TouchableOpacity>
          { this.exibeLikers() }
        </View>
        { this.exibeLegenda() }
        { foto.comentarios.map((comentario) => (
          <View style={styles.comentario}>
            <Text style={styles.tituloComentario}>{ comentario.login }</Text>
            <Text>{ comentario.texto }</Text>
          </View>
        )) }
        <View style={styles.novoComentario}>
          <TextInput 
            ref={input => this.inputComentario = input}
            placeholder='Digite seu comentário...' 
            style={styles.campoComentario}
            onChangeText={(text) => this.setState({textoComentario: text})} />
          <TouchableOpacity onPress={this.adicionaComentario}>
            <Text>Publicar</Text>
          </TouchableOpacity>
        </View>
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
  comentario: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  novoComentario: {
    flexDirection: 'row',
  },
  campoComentario: {
    flex: 1,
  }
});
