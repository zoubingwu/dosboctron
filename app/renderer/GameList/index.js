import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import camelCase from 'lodash/camelCase';

class GameList extends Component {
  onKeywordChange = e => {
    this.props.onSearch(e.target.value);
  }

  onItemClick = game => {
    this.props.onSelect(game);
  }

  onItemDoubleClick = game => {
    const { executable, name } = game;
    this.props.onStart({
      executable,
      filename: `${camelCase(name.en)}.zip`
    });
  }

  render() {
    const { gameList, selected } = this.props;

    return (
      <div className="game-list">
        <ul className="list-group">
          <li className="list-group-header">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={this.onKeywordChange}
            />
          </li>

          {gameList.map(item => (
            <li
              key={item.identifier}
              className={cx(
                'list-group-item',
                item.identifier === selected.identifier && 'selected'
              )}
              onDoubleClick={this.onItemDoubleClick.bind(null, item)}
              onClick={this.onItemClick.bind(null, item)}
            >
              <img
                className="cover"
                src={require(`./img/${item.identifier}/${item.coverFilename}`)}
                alt="cover"
              />
              {`${item.identifier} - ${item.releaseYear}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

GameList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  gameList: PropTypes.array.isRequired,
  selected: PropTypes.object
};

export default GameList;
