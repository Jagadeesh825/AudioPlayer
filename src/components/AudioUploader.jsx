// AudioUploader.js
import React from 'react';

class AudioUploader extends React.Component {
  handleAudioUpload = (event) => {
    const files = event.target.files;
    const uploadedAudios = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const audioUrl = URL.createObjectURL(file);
      uploadedAudios.push({
        name: file.name,
        url: audioUrl
      });
    }
    this.props.onAudioUpload(uploadedAudios);
  };

  render() {
    return (
      <div>
        <label htmlFor="audioInput" style={styles.label}>Upload Songs</label>
        <input 
          id="audioInput"
          type="file" 
          accept=".mp3" 
          multiple 
          onChange={this.handleAudioUpload} 
          style={styles.input}
        />
      </div>
    );
  }
}

const styles = {
  input: {
    display: 'none'
  },
  label: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default AudioUploader;