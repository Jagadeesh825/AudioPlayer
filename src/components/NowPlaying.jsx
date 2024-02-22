import React from 'react';

class NowPlaying extends React.Component {
  componentDidUpdate(prevProps) {
    const { currentAudioIndex, playlist } = this.props;
    if (currentAudioIndex !== prevProps.currentAudioIndex && currentAudioIndex >= 0 && currentAudioIndex < playlist.length) {
      const audioElement = document.getElementById('audioPlayer');
      if (currentAudioIndex !== -1) {
        audioElement.src = playlist[currentAudioIndex].url;
        audioElement.load();
        if (this.props.isPlaying) {
          audioElement.play().catch(error => {
            console.error('Failed to play audio:', error);
  
          });
        }
      } else {
        audioElement.pause();
      }
    }
  }
  

  togglePlayPause = () => {
    const audioElement = document.getElementById('audioPlayer');
    if (audioElement.paused) {
      audioElement.play().catch(error => {
        console.error('Failed to play audio:', error);
        this.setState({ playbackError: error.message });
      });
      this.setState({ isPlaying: true, playbackError: null }); 
    } else {
      audioElement.pause();
      this.setState({ isPlaying: false });
    }
  };
  

  handleNextSong = () => {
    const { onNextSong } = this.props;
    this.setState({ isPlaying: true, playbackError: null }, onNextSong);
  };

  handlePreviousSong = () => {
    const { onPreviousSong } = this.props;
    this.setState({ isPlaying: true, playbackError: null }, onPreviousSong);
  };

  
  render() {
    const { playlist, currentAudioIndex, isPlaying, onTogglePlayPause, onNextSong, onPreviousSong } = this.props;
    const currentSong = playlist[currentAudioIndex];

    return (
      <div className="now-playing">
        <div className="current-song">
          {currentSong && (
            <div className="song-details">
              <h3>{currentSong.name}</h3>
              <p>{currentSong.artist}</p>
            </div>
          )}
        </div>
        <audio id="audioPlayer" controls autoPlay>
          {currentSong ? <source src={currentSong.url} type="audio/mpeg" /> : <p>Your browser does not support the audio element.</p>}
        </audio>
        <div className="controls">
          <button onClick={onPreviousSong}>Previous</button>
          <button onClick={onTogglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={onNextSong}>Next</button>
        </div>
      </div>
    );
  }
}

export default NowPlaying;