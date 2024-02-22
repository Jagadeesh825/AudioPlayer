// App.js
import React from 'react';
import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      currentAudioIndex: -1,
      isPlaying: false,
    };
  }

  componentDidMount() {
    const storedAudio = JSON.parse(localStorage.getItem('playlist')) || [];
    const storedIndex = localStorage.getItem('currentAudioIndex') || -1;
  
    // Validate each song's URL before setting the state
    const validAudio = storedAudio.filter(song => song && song.url && song.url.trim() !== '');
  
    if (validAudio.length > 0) {
      this.setState({ playlist: validAudio, currentAudioIndex: storedIndex });
    } else {
      this.setState({ playlist: [], currentAudioIndex: -1 });
    }
  }
  

  handleAudioUpload = (audios) => {
    const updatedPlaylist = [...this.state.playlist, ...audios];
    this.setState({ playlist: updatedPlaylist }, () => {
      localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    });
  };

  handleAudioSelect = (index) => {
    this.setState({ currentAudioIndex: index, isPlaying: true });
    localStorage.setItem('currentAudioIndex', index);
  };

  handleDeleteAll = () => {
    this.setState({ playlist: [], currentAudioIndex: -1, isPlaying: false }, () => {
      localStorage.removeItem('playlist');
      localStorage.removeItem('currentAudioIndex');
    });
  };

  handleNextSong = () => {
    const { playlist, currentAudioIndex } = this.state;
    if (currentAudioIndex < playlist.length - 1) {
      this.setState({ currentAudioIndex: currentAudioIndex + 1, isPlaying: true }, () => {
        localStorage.setItem('currentAudioIndex', currentAudioIndex + 1);
      });
    }
  };

  handlePreviousSong = () => {
    const { currentAudioIndex } = this.state;
    if (currentAudioIndex > 0) {
      this.setState({ currentAudioIndex: currentAudioIndex - 1, isPlaying: true }, () => {
        localStorage.setItem('currentAudioIndex', currentAudioIndex - 1);
      });
    }
  };

  handleTogglePlayPause = () => {
    const audioElement = document.getElementById('audioPlayer');
    if (audioElement.paused) {
      audioElement.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
      this.setState({ isPlaying: true });
    } else {
      audioElement.pause();
      this.setState({ isPlaying: false });
    }
  };

  render() {
    const { playlist, currentAudioIndex, isPlaying } = this.state;
    return (
      <div>
        <div className='navbar'>
          <h1>Audio Player</h1>
        </div>
        <Playlist
          playlist={playlist}
          currentAudioIndex={currentAudioIndex}
          onAudioSelect={this.handleAudioSelect}
          onDeleteAll={this.handleDeleteAll}
          onAudioUpload={this.handleAudioUpload}
        />
        <NowPlaying
          playlist={playlist}
          currentAudioIndex={currentAudioIndex}
          isPlaying={isPlaying}
          onTogglePlayPause={this.handleTogglePlayPause}
          onNextSong={this.handleNextSong}
          onPreviousSong={this.handlePreviousSong}
        />
      </div>
    );
  }
}

export default App;
