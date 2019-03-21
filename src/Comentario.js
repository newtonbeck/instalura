import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

enviar = (inputComentarioText, inputComentario, foto, adicionaComentarioCallback) => {
  adicionaComentarioCallback(foto.id, inputComentarioText);

  inputComentario.current.clear();
}

const Comentario = ({ foto, adicionaComentarioCallback }) => {
  const inputComentario = React.createRef();
  let inputComentarioText = 'xablau';
  return (
    <View>
      {
        foto.comentarios.map((comentario) => (
          <View key={comentario.id} style={styles.comentario}>
            <Text style={styles.usuario}>{comentario.login}</Text>
            <Text>{comentario.texto}</Text>
          </View>
        ))
      }
      <View style={styles.comentario}>
        <TextInput
          style={styles.inputComentario}
          placeholder='Digite seu comentário...'
          ref={inputComentario}
          onChangeText={(text) => inputComentarioText = text } />
        <TouchableOpacity onPress={() => enviar(inputComentarioText, inputComentario, foto, adicionaComentarioCallback)}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Comentario;

const styles = StyleSheet.create({
  comentario: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  usuario: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputComentario: {
    flex: 1,
  }
});