// @flow

import React, {memo} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';

import RepoCell from './RepoCell';
import {getReposIds} from '../../ducks/reposSlice';

const RepoList = ({reposIds}) => {
  console.log('Render: RepoList');
  const renderItem = ({index, item}) => {
    return <RepoCell id={item} />;
  };

  const keyExtractor = item => item;

  return (
    <FlatList
      data={reposIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{paddingHorizontal: 10}}
    />
  );
};

const mapStateToProps = state => ({
  reposIds: getReposIds(state),
});

export default connect(mapStateToProps)(memo(RepoList));
