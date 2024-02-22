// Playlist.js
import React from 'react';
import AudioUploader from './AudioUploader'; // Import the AudioUploader component

class Playlist extends React.Component {
  render() {
    const { playlist, onAudioSelect, onDeleteAll, onAudioUpload } = this.props;
    return (
      <div className="playlist">
        <div className="playlist-header">
          <h2>Playlist</h2>
          <button className="delete-all" onClick={onDeleteAll}>Delete All</button>
          {/* Render the AudioUploader component next to the "Delete All" button */}
          <AudioUploader onAudioUpload={onAudioUpload} />
        </div>
        <ul>
          {playlist.map((audio, index) => (
            <li key={index} onClick={() => onAudioSelect(index)}>
              {audio.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Playlist;