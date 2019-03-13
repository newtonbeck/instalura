import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      usuario: '',
      senha: ''
    }
  }

  logIn = () => {
    const { usuario, senha } = this.state;

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: usuario,
        senha
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
      .then(resposta => {
        if (resposta.ok) {
          return resposta.text();
        }
        throw new Error('Não foi possível efetuar o login');
      })
      .then(token => {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('usuario', usuario);

        this.props.navigation.navigate('Feed');
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.titulo}>Instalura</Text>
        </View>
        <TextInput
          autoCapitalize='none'
          underlineColorAndroid='transparent'
          style={styles.input}
          placeholder='Usuário...'
          onChangeText={(text) => this.setState({ usuario: text })} />
        <TextInput
          autoCapitalize='none'
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={styles.input}
          placeholder='Senha...'
          onChangeText={(text) => this.setState({ senha: text })} />
        <Button title='Entrar' onPress={this.logIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
  }
});
