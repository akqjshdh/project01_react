// import React, { Component } from 'react';
// import SpeechToText from './SpeechToText'; // SpeechToText 컴포넌트 경로에 맞게 수정
// import TextSend from './TextSend';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h2>테스트 화면 입니다.</h2>
//         <TextSend/>
//       </div>
//     );
//   }
// }

// export default App;

// src/App.jsx
// src/App.jsx
import React from "react";
import Chat from "./components/Chat/Chat";

export default function App() {
  console.log("✅ App 렌더링됨"); // 디버깅용
  return (
    <div>
      <Chat />
    </div>
  );
}
