import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [city, setCity] = useState("");

  const rendirizzo = useNavigate(); //hook per la navigazione
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city !== " ") {
      rendirizzo(`/city/${city}`);
    }
  };

  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <h1 style={{ marginBottom: "30px" }}>Cerca una città!</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Indica una località..."
            style={{
              fontSize: "1.2rem",
              paddingBottom: "5px",
              paddingTop: "13px",
            }}
          />
          <Button
            type="submit"
            variant="outline-primary"
            style={{ fontSize: "2.0rem", paddingBottom: "2px" }}
          >
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default HomePage; //Esportazione in App
