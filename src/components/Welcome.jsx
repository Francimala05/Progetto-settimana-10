import { useState, useEffect } from "react"; //semplice Welcome che chiede nome e poi lo visualizza a schermo

const Welcome = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (!name) {
      const nomeUtente = prompt("Digita il tuo nome!");
      if (nomeUtente) {
        setName(nomeUtente);
      }
    }
  }, []);
  return (
    <div>
      {name && (
        <h1 style={{ textAlign: "center" }}>Benvenuto in EpiMeteo, {name}!</h1>
      )}
    </div>
  );
};

export default Welcome; //Esportazione in App
