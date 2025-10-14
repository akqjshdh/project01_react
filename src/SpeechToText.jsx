import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleStart = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('웹 음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition(); // SpeechRecognition 객체 생성
    recognition.lang = 'ko-KR'; // 한국어로 설정
    recognition.interimResults = true; // 결과를 실시간으로 받을 수 있게 설정
    recognition.continuous = true; // 지속적으로 음성을 인식할 수 있게 설정

    recognition.onstart = () => {
      setIsListening(true); // 음성 인식 시작 시 상태 업데이트
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript); // 실시간으로 텍스트 업데이트
    };

    recognition.onend = () => {
      setIsListening(false); // 음성 인식 종료 시 상태 업데이트
    };

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error); // 오류 로그 출력
      if (event.error === 'not-allowed') {
        alert('마이크 권한이 거부되었습니다. 브라우저에서 마이크 권한을 허용해주세요.');
      } else {
        alert(`음성 인식 오류: ${event.error}`);
      }
    };

    recognition.start(); // 음성 인식 시작
  };

  const handleStop = () => {
    setIsListening(false);
    window.webkitSpeechRecognition.stop(); // 음성 인식 중지
    
  };

  return (
    <div>
      <h1>음성 인식 - 한국어</h1>
      <button onClick={handleStart} disabled={isListening}>
        {isListening ? '듣는 중...' : '음성 인식 시작'}
      </button>
      <button onClick={handleStop} disabled={!isListening}>
        음성 인식 종료
      </button>
      <h2>변환된 텍스트:</h2>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
