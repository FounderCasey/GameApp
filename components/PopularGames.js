import React, {Component} from 'react';
import axios from 'axios';
import {
  AppRegistry,
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

export default class PopularGames extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#333',
          marginTop: 10,
          marginBottom: 10,
        }}
      />
    );
  };

  componentDidMount() {
    return axios({
      url: `https://api-v3.igdb.com/games`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'user-key': '0e2dc2d39160d121e6c4357637248612',
      },
      data:
        'fields name, total_rating, cover, genres; sort total_rating desc; where total_rating > 75 & total_rating < 100 & total_rating_count > 100; limit 50;',
    })
      .then(response => {
        let games = [];

        response.data.map(game => {
          games.push(game);
        });

        const getCovers = games.map(game => {
          if (game.cover) {
            return axios
              .get(`https://api-v3.igdb.com/covers/${game.cover}?fields=url`, {
                headers: {
                  'user-key': '0e2dc2d39160d121e6c4357637248612',
                  Accept: 'application/json',
                },
              })
              .then(
                response =>
                  (game.cover = `https:${response.data[0].url.replace(
                    'thumb',
                    '720p',
                  )}`),
              )
              .catch(err =>
                res.send(JSON.parse(circularJson.stringify(err.response))),
              );
          }
        });

        console.log(games);

        Promise.all(getCovers).then(() => {
          this.setState(
            {
              isLoading: false,
              dataSource: games,
            },
            function() {},
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#252627',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Text
          style={[
            styles.header,
            styles.colorWhite,
            {paddingBottom: 10, paddingTop: 10},
          ]}>
          Popular
        </Text>
        <FlatList
          style={styles.item}
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={{width: 100, height: 141, borderRadius: 2}}
                source={{url: item.cover}}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-evenly',
                  paddingLeft: 10,
                }}>
                <Text style={[styles.text, styles.colorWhite]}>
                  {item.name}
                </Text>
                <Text style={styles.colorWhite}>
                  ⭐ {Math.round(item.total_rating * 10) / 10}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={({id}, index) => id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    fontSize: 18,
    fontWeight: '900',
  },
  colorWhite: {
    color: '#FFF9FB',
  },
});

AppRegistry.registerComponent('GameDB', () => PopularGames);
