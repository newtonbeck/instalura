import React, { Component } from 'react';
import { FlatList, View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Feed extends Component {
  render() {
    const fotos = [
      {id: 1, usuario: 'rafael.rollo'},
      {id: 2, usuario: 'alberto.souza'},
      {id: 3, usuario: 'vitor'}
    ];
    return (
      <FlatList
        style={styles.container}
        data={fotos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.usuario}</Text>
            <Image source={require('../assets/photo.jpg')} style={{width: width, height: width}} />
          </View>
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
