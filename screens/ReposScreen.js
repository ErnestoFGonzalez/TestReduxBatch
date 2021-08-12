// @flow

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

import RepoList from '../components/Repos/RepoList';
import {getUserReposThunk} from '../ducks/reposSlice';

const ReposScreen = ({getUserReposThunk}) => {
  useEffect(() => {
    getUserReposThunk('ErnestoFGonzalez');
  }, []);

  return (
    <View style={styles.container}>
      <RepoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const mapDistpatchToProps = {
  getUserReposThunk,
};

export default connect(null, mapDistpatchToProps)(ReposScreen);
