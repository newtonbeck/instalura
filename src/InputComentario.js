import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class InputComentario extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textoComentario: ''
    }
  }

  adicionaComentario = () => {
    const { adicionaComentarioCallback, foto } = this.props;
    const { textoComentario } = this.state;

    adicionaComentarioCallback(foto.id, textoComentario, this.inputComentario)

    this.setState({
      textoComentario: ''
    });
  }

  render() {
    return (
      <View style={styles.novoComentario}>
        <TextInput 
          ref={input => this.inputComentario = input}
          placeholder='Digite seu comentário...' 
          style={styles.campoComentario}
          onChangeText={(text) => this.setState({textoComentario: text})} />
        <TouchableOpacity
          onPress={this.adicionaComentario}>
          <Text>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  novoComentario: {
    flexDirection: 'row',
  },
  campoComentario: {
    flex: 1,
  }
});
