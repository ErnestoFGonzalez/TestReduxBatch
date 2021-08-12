// @flow

import axios from 'axios';
import {batch} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';
import {createSelector, ParametricSelector, Selector} from 'reselect';

import {State} from './index';

const getRepos: Selector = (state: State): {[id: string]: Repo} =>
  state.repos.byId;

const getRepoId: ParametricSelector = (state: State, props: {repoId: string}) =>
  props.repoId;

export const getReposIds: Selector = (state: State): Array<string> =>
  Object.keys(state.repos.byId);

export const makeGetRepo = () => {
  return createSelector([getRepos, getRepoId], (repos, id) => {
    return repos[id];
  });
};

export function getUserReposThunk(username: string) {
  return function (dispatch) {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        batch(() => {
          response.data.map(repo => {
            dispatch(addRepo(repo));
          });
        });
      })
      .catch(error => {});
  };
}

type Repo = {
  id: number,
  node_id: string,
  name: string,
  full_name: string,
  owner: {
    login: string,
    id: string,
    node_id: string,
    avatar_url: string,
    url: string,
  },
  html_url: string,
  description: string,
  url: string,
};

export type ReposState = {
  byId: {[id: string]: Repo},
};

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    byId: {},
  },
  reducers: {
    addRepo: (state: ReposState, action) => {
      if (!state.byId.hasOwnProperty(action.payload.id)) {
        // If repo entry is non-existent, add entry
        state.byId[action.payload.id] = {};
      }
      // Populate/Update repo entry
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        ...action.payload,
      };
    },
  },
});

export const {addRepo} = reposSlice.actions;

export default reposSlice.reducer;
