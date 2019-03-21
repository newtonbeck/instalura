import React, { Component } from 'react';
import { AsyncStorage, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      usuario: 'rafael',
      senha: '123456'
    }
  }

  login = async () => {
    const params = {
      method: 'POST',
      body: JSON.stringify({ login: this.state.usuario, senha: this.state.senha }),
      headers: new Headers({'Content-type': 'application/json'})
    };
    const response = await fetch('https://instalura-api.herokuapp.com/api/public/login', params)
    
    if (response.ok) {
      const token = await response.text();
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('usuario', this.state.usuario);
      const { navigation } = this.props;
      navigation.navigate('FeedScreen');
    } else {
      alert('Usuário ou senha inválidos');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
        <TextInput 
          placeholder='Usuário...'
          autoCapitalize='none'
          value={this.state.usuario}
          onChangeText={(text) => this.setState({ usuario: text })} />
        <TextInput 
          placeholder='Senha...'
          autoCapitalize='none'
          value={this.state.senha}
          onChangeText={(text) => this.setState({ senha: text })} />
        <TouchableOpacity style={styles.botao} onPress={this.login}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#cccccc',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 5,
  }
});