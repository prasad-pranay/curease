import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './voicetotext.css'
import ShinyText from "./ShinyText";
import GradientText from "./GradientText";



const VoiceToText = ({setText,setHideThis}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support voice input.</p>;
  }

  useEffect(() => {
    SpeechRecognition.startListening({continuous:false})
  }, [])
  
  useEffect(() => {
    setText(transcript)
  }, [transcript])

  useEffect(() => {
    if(listening){
        console.log("listeneing")
    }else{
        if(transcript!=""){
            SpeechRecognition.stopListening()
            setHideThis(false)
        }
    }
  }, [listening])
  
  
  return (
    <section className="p-4 text-center text-black fixed top-0 left-0 flex justify-center items-center w-full h-full">
        {/* bg */}
        <div onClick={()=>{SpeechRecognition.stopListening();setHideThis(false)}} className="absolute top-0 left-0 bg-black/40 dark:bg-black/40 backdrop-blur-x w-full h-full"></div>
        {/* card */}
        <article className="px-15 py-10 flex flex-col backdrop-blur-lg bg-gray-300/70 dark:bg-white/5 rounded-sm relative z-[100] min-w-md shadow-xl dark:shadow-white/10 items-center">
            <div onClick={()=>{listening? SpeechRecognition.stopListening():SpeechRecognition.startListening({continuous:false})}} className="active:scale-100 voice-to-text-loader w-max hover:scale-110 cursor-pointer transition-transform duration-300">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <mask id="clipping">
                    <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                    <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                    <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                  </mask>
                </defs>
              </svg>
              <div className="box"></div>
            </div>
            {transcript==""?
                <ShinyText  text="Start speaking..." disabled={false} speed={1} className='mt-10 text-black dark:text-white' />:
                <div className="w-full ">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={3}
                      showBorder={false}
                      className="mt-10 text-lg capitalize"
                    >
                      {transcript}
                    </GradientText>

                </div>
            }
        </article>
    </section>
  );
};

export default VoiceToText;
