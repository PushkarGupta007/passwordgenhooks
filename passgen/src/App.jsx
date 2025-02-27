import { useState, useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  // useRef  hook
   const passwordRef = useRef(null)
  
   const copyPasswordtoClipboard = useCallback (() => {
     window.navigator.clipboard.writeText(password)

   }, [password])

  const passGenerator = useCallback(() => {

     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
     if(numberAllowed) str += "0123456789"
     if(charAllowed) str += "!@#$%^&*+-/_=[]{}~"

     for(let i=1;i<=length;i++){
      let char  = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(char)
     }
     setPassword(pass) 

  }, [length,numberAllowed,charAllowed,setPassword])



  useEffect(() => {
    passGenerator()
  }, [length,numberAllowed,charAllowed,passGenerator])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <div>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3 bg-white '
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        
        <button onClick = {copyPasswordtoClipboard}className=' flex outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0 float-right '>copy</button>
      </div>
      <br />
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
           <input 
           type="range"
           min = {6}
           max = {100}
           value={length}
           className='curser-pointer'
           onChange={(e) => {setLength(e.target.value)}}
           />
           <label>Length : {length}</label>
        </div>
        <div className='flex item-centre gap-x-1'>
           <input 
           type="checkbox" 
           defaultChecked = {numberAllowed}
           id="numberInput"
           onChange={() => {
                 setNumberAllowed((prev) => !prev);
           }}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex item-centre gap-x-1'>
           <input 
           type="checkbox" 
           defaultChecked = {charAllowed}
           id="charInput"
           onChange={() => {
                 setCharAllowed((prev) => !prev);
           }}
           />
           <label htmlFor="charInput">Characters</label>
        </div>

      </div>
      </div>
    </>
  )
}

export default App
