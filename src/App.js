import './App.css'
import axios from 'axios'
import aditi from '../src/assets/Aditi.png'
import gemini from '../src/assets/gemini.webp'
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useState } from 'react';
import loader from '../src/assets/loader.gif';
const API = process.env.REACT_APP_API_BASE_URL
function App() {
  const [question,setQuestion]=useState('');
  const[ans,setAns] = useState('');
  const[loading,setLoading]=useState(false)
  const[speaking,setSpeaking]=useState(false)
  const submitHandler = (e)=>{
      e.preventDefault();
      setLoading(true)
      axios.post(`${API}/getResponse`,{
        question:question
      })
      .then(result=>{
        console.log(result)
       setAns(result.data.response)
       setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
      
  }
  const stopSpeakHandler = () => {
    window.speechSynthesis.cancel();
  }

  const speakHandler = ()=>{
      setSpeaking(true);
      const a = new SpeechSynthesisUtterance(ans)
      window.speechSynthesis.speak(a)
  }
  return (
    <>
    <h1 className='heading'><DiamondIcon className='icon'/>Hii I am your AI Assistant<DiamondIcon className='icon'/></h1>
    <div className="App">
       
      <div className="box">
        <div className='profile-pic'>
            <img className="pic" src={aditi} alt="profile-pic"/>
        </div>
        <p className='label'>Question</p>
        <textarea onChange={(e)=>{setQuestion(e.target.value)}} placeholder='Type your Question Here...'></textarea>
        <button className="btn" onClick={submitHandler}>Send  <SendIcon/></button>
      </div>
      {loading &&
      <div className='loader'>
        <img src={loader}/>
      </div>
}
      <div className="box">
        <div className='profile-pic'>
          
            <img className="pic" src={gemini} alt="profile-pic"/>
        </div>
        <p className='label'>Response</p>
        <textarea value={ans} className='response' placeholder='Response from Gemini...'></textarea>
        <div className='response-btn'>
        <button className='btn res-btn'  onClick={speakHandler}>Speak<MicIcon/></button>
        {speaking &&<button className='btn res-btn' onClick={stopSpeakHandler}><MicOffIcon/>Stop</button>}
        </div>
      </div>
    </div>
</>
  );
}

export default App;
