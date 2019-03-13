import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from './Post';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(resposta => resposta.json())
    .then(json => this.setState({fotos: json}));
  }

  like = (idFoto) => {
    const { fotos } = this.state;
    const foto = fotos.find((foto) => foto.id === idFoto);

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

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novosLikers
    };

    const fotosAtualizadas = fotos.map((foto) => foto.id === idFoto ? fotoAtualizada : foto);

    this.setState({
      fotos: fotosAtualizadas
    });
  }

  adicionaComentario = (idFoto, textoComentario, inputComentario) => {
    const { fotos } = this.state;
    const foto = fotos.find((foto) => foto.id === idFoto);

    if (textoComentario === '') {
      return;
    }

    const novoComentario = {
      login: 'meuUsuario',
      texto: textoComentario
    };

    const fotoAtualizada = {
      ...foto,
      comentarios: [
        ...foto.comentarios,
        novoComentario
      ]
    };

    const fotosAtualizadas = fotos.map((foto) => foto.id === idFoto ? fotoAtualizada : foto);

    this.setState({
      fotos: fotosAtualizadas
    });

    inputComentario.clear();
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Post adicionaComentarioCallback={this.adicionaComentario} likeCallback={this.like} foto={item} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
