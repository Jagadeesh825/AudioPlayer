import React from 'react';

class NowPlaying extends React.Component {
  componentDidMount() {
    // Add event listener for the 'ended' event on the audio element
    const audioElement = document.getElementById('audioPlayer');
    audioElement.addEventListener('ended', this.props.onNextSong);
  }

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

  componentWillUnmount() {
    // Remove event listener when component unmounts
    const audioElement = document.getElementById('audioPlayer');
    audioElement.removeEventListener('ended', this.props.onNextSong);
  }

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
