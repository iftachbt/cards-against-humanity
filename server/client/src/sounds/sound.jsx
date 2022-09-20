import React from "react";


function BackgroundSound(props){
    
    if(!props.isMute){
        return (
        <div>
            <audio
                autoPlay={true} 
                hidden={true}
                controls loop 
                >
                <source type="audio/mp3" src={props.url} />
            </audio> 
        </div>)
    }
    else return 
        
    

}


export default BackgroundSound;
// const [playing,setplaying]=useState(true)
// const [audio,setAudio]=useState(playSound(backgroundSound(props.url)))

// function handleClick(){
//     if(playing) playSound(audio)
//     else pauseSound(audio)
//     setplaying(!playing)
// }
// return <button onClick={handleClick}>pause</button>