import audio from '../src/assets/audio.mp3';
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AudioPlayer = ({visible ,audioSrc }) => {
    const audioRef = useRef(null);
    
    useEffect(() => {
    //   audioRef.current.play();
    }, [visible]);
  
    return (
      <audio ref={audioRef} src={audioSrc} controls />
    );
  };

function Audiobook(){
  const location=useLocation();
    return (
        <>
            <AudioPlayer audioSrc={location.state.book} />
        </>
    );

}
export default Audiobook;