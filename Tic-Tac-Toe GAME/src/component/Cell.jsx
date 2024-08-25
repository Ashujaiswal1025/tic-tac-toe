import React from 'react'

function Cell({ index, value, onClick, isWinningCell }){
    const className = `square ${isWinningCell ? 'winning-cell' : ''}`;
    const id = `card-${index}`;

    return (
      <button className={className} id={id} onClick={onClick}>
        {value}
      </button>
    );
}

export default Cell
