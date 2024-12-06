import { useState, useEffect } from "react";

const Welcome = () => {
    const [name, setName] = useState('');
    useEffect(() => {
const nomeUtente =prompt('Digita il tuo nome!')
if(nomeUtente){
    setName(nomeUtente);
}
    },[]);
return(
    <div>{name&& <h1 style={{textAlign:'center'}}>Benvenuto in EpiMeteo, {name}!</h1>}</div>
)
}

export default Welcome;