// @flow

import React, {memo} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Image, Text} from 'react-native';

import {makeGetRepo} from '../../ducks/reposSlice';

const RepoCell = ({id, name, owner}) => {
  console.log('Render: RepoCell');
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: owner.avatar_url}} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const makeMapStateToProps = () => {
  const getRepo = makeGetRepo();
  return (mapStateToProps = (state, ownProps) => {
    let repo = getRepo(state, {repoId: ownProps.id});
    return {
      name: repo.name,
      owner: repo.owner,
    };
  });
};

export default connect(makeMapStateToProps)(memo(RepoCell));
