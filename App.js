import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, FlatList, Image, View, StyleSheet, ActivityIndicator } from 'react-native';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    const requestMovies = async () => {
      setLoading(true);
      
      const req = await fetch("https://api.b7web.com.br/cinema/"); // requisição tipo get
      const json = await req.json();

      if(json) {
        setMovies(json);
      }

      setLoading(false);
    }

    requestMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filmes hoje no Cinema</Text>

      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
      
      {!loading &&
        <>
          <Text style={styles.totalMoviesText}>{movies.length} Filmes em cartaz</Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({item})=>(
              <View style={styles.movieItem}>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#333'
  },
  title:{
    color: '#FFF',
    backgroundColor: '#111',
    fontSize: 22,
    textAlign: 'center',
    paddingTop:10,
    paddingBottom:10,
    
  },
  loadingArea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText:{
    color: '#FFF'
  },
  totalMoviesText:{
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  list:{
    flex: 1
  },
  movieItem:{
    marginBottom: 30
  },
  movieImage:{
    height: 400
  },
  movieTitle:{
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5
  }
});

export default App;