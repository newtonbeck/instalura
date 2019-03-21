import React, { Component } from 'react';
import { FlatList, StyleSheet, AsyncStorage } from 'react-native';
import Post from './Post';
import { get, post } from './API';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    };
  }

  mostraErro = () => {
    alert('Erro de comunicação');
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const usuario = navigation.getParam('usuario');
    if (usuario) {
      const json = await get(`/api/public/fotos/${usuario}`, this.mostraErro);
      this.setState({fotos: json});
    } else {
    const json = await get('/api/fotos', this.mostraErro);
    this.setState({fotos: json});
    }
  }

  buscaFoto = (idFoto) => {
    const { fotos } = this.state;
    return fotos.find(foto => foto.id === idFoto);
  }

  atualizaFotoNaLista = (novaFoto) => {
    const { fotos } = this.state;
    const novaListaDeFotos = fotos.map(foto => foto.id === novaFoto.id ? novaFoto : foto);

    this.setState({ fotos: novaListaDeFotos });
  }

  like = async (idFoto) => {
    const foto = this.buscaFoto(idFoto);

    const usuario = await AsyncStorage.getItem('usuario');

    let novaListaDeLikers = [];
    if (!foto.likeada) {
      novaListaDeLikers = [
        ...foto.likers,
        { login: usuario }
      ]
    } else {
      novaListaDeLikers = foto.likers.filter((liker) => liker.login !== usuario);
    }

    const novaFoto = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaListaDeLikers
    };

    this.atualizaFotoNaLista(novaFoto);

    post(`/api/fotos/${foto.id}/like`, {}, this.mostraErro);
  }

  adicionaComentario = async (idFoto, textoComentario) => {
    const foto = this.buscaFoto(idFoto);

    if (textoComentario === '') {
      return;
    }

    const novoComentario = await post(`/api/fotos/${foto.id}/comment`, {
      texto: textoComentario
    }, this.mostraErro);

    const novaListaDeComentarios = [
      ...foto.comentarios,
      novoComentario
    ];

    const novaFoto = {
      ...foto,
      comentarios: novaListaDeComentarios
    }

    this.atualizaFotoNaLista(novaFoto);
  }

  navegaParaAmigoCallback = (usuarioAmigo) => {
    this.props.navigation.navigate('FriendFeed', { usuario: usuarioAmigo });
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Post foto={item}
            likeCallback={this.like}
            adicionaComentarioCallback={this.adicionaComentario}
            navegaParaAmigoCallback={this.navegaParaAmigoCallback} />
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
