import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import includes from 'lodash/includes';

import GameList from './GameList';

import list from './games';

const initialState = {
  gameList: list,
  selectedGame: list[0],
}

// export default class App extends Component {
//   render() {
//     return (
//       <div>hello</div>
//     )
//   }
// }

export default class App extends Component {
  state = initialState;

  onSelect = selectedGame => {
    this.setState({ selectedGame });
  };

  onSearch = keyword => {
    if (!keyword) {
      this.setState(initialState);
      return;
    }

    this.setState(_ => {
      const result = list.filter(item => {
        return (
          includes(item.identifier, keyword) ||
          includes(item.releaseYear + '', keyword)
        );
      });

      return {
        gameList: result,
        selectedGame: result[0],
      }
    });
  };

  onStart = args => {
    console.log('on start')
    ipcRenderer.send('select-game', args);
  };

  render() {
    const { gameList, selectedGame } = this.state;

    return (
      <div className="app-container">
        <GameList
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          onStart={this.onStart}
          gameList={gameList}
          selected={selectedGame}
        />
      </div>
    );
  }
}
