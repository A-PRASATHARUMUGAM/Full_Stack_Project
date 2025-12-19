import { useState } from 'react';
import './App.css';

function App() {

 const [count,setCount]= useState(20)

 function handleClick(){
     
 setCount(count+1) 

 }


function handleClicks(){
     
 for(i=0; i<5 ; i++){
  console.log(i); 
  
 }


 }

  return (
    
    <>
    <div>
        {count}

        <button onClick={handleClick} className='border p-2'> +</button>
         <button onClick={handleClicks} className='border p-2'>-</button>
    </div>

    </>
    
  )
}

export default App
