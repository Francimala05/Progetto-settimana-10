import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const [city,setCity] = useState('')
    const rendirizzo= useNavigate(); //hook per la navigazione
    const handleInputChange= (e) => {
        setCity(e.target.value);
    }
        const handleSubmit = (e) => {
            e.preventDefault();
            if(city !== ' '){
                rendirizzo( `/city/${city}`)
            }
        }
   
return(
    <div  style={{textAlign:'center'}}>{<h1 style={{textAlign:'center', marginTop:'200px'}}>Cerca una città!</h1>}
    <form>
        <input type="text" value={city} onChange={handleInputChange} placeholder="indica la località su cui vuoi informazioni"/> 
        <button onClick={handleSubmit} type="submit">Cerca</button>
    </form>
    </div>

);
};

export default HomePage;