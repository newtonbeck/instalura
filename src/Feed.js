import React, { Component } from 'react';
import { FlatList, StyleSheet, AsyncStorage } from 'react-native';
import Post from './Post';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(token => new Headers({
        'X-AUTH-TOKEN': token
      }))
      .then(headers => fetch('https://instalura-api.herokuapp.com/api/fotos', { headers }))
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}));
  }

  like = (idFoto) => {
    const { fotos } = this.state;
    const foto = fotos.find((foto) => foto.id === idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuario => {
        let novosLikers = [];
        // Adiciona/remove meu usuário da lista de likers
        if (!foto.likeada) {
          novosLikers = [
            ...foto.likers,
            { login: usuario }
          ];
        } else {
          novosLikers = foto.likers.filter(({ login }) => login !== usuario);
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
      });
    
    AsyncStorage.getItem('token')
      .then(token => fetch(`https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`, {
          method: 'POST',
          headers: new Headers({
            'X-AUTH-TOKEN': token
          })
        }));
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
