import React, { Component } from 'react';
import SpeechToText from './SpeechToText'; // SpeechToText 컴포넌트 경로에 맞게 수정

class App extends Component {
  render() {
    return (
      <div>
      <h1>React Speech-to-Text Example</h1>
      <SpeechToText /> {/* 여기에 SpeechToText 컴포넌트를 추가 */}
      </div>
    );
  }
}

export default App;