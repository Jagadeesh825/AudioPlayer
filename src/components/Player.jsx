import React from 'react';

const Player = ({ song }) => {
  return (
    <div className="Player">
      <h2>Player</h2>
      {song && (
        <audio controls>
          <source src={URL.createObjectURL(song)} type={song.type} />
        </audio>
      )}
    </div>
  );
};

export default Player;
