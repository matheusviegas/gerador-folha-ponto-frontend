import React, { useState } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState(2020);
  const [message, setMessage] = useState({ show: false, type: 'success', text: '' })
  const currentYear = new Date().getFullYear();
  const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const generateReport = async e => {
    e.preventDefault();

    setMessage({ ...message, show: false });

    const dateReference = `${(mes < 10 ? "0" + mes : mes)}/${ano}`;

    const response = await axios.post("https://e98214fc4i.execute-api.us-east-1.amazonaws.com/default/geraFolhaPontoABSGP", {
      name, email, password, dateReference
    });

    setMessage({ show: true, type: response.data.success ? 'success' : 'danger', text: response.data.message });
  }

  const buildMonthsOptions = () => {
    const options = [];

    for (var x = 0; x < MONTHS.length; x++) {
      options.push(<option key={x + 1} value={x + 1}>{MONTHS[x]}</option>);
    }

    return options;
  }

  const buildYearsOptions = () => {
    const options = [];

    for (var x = currentYear; x >= 2015; x--) {
      options.push(<option key={x} value={x}>{x}</option>);
    }

    return options;
  }

  return (
    <div className="absgp-form-wrapper">
      <Form onSubmit={generateReport}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nome do Colaborador" required />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email do ABSGP" required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha do ABSGP" required />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="cmbMes">
              <Form.Label>Mês</Form.Label>
              <Form.Control value={mes} onChange={e => setMes(e.target.value)} as="select">
                {buildMonthsOptions()}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cmbAno">
              <Form.Label>Ano</Form.Label>
              <Form.Control value={ano} onChange={e => setAno(e.target.value)} as="select">
                {buildYearsOptions()}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Gerar Planilha
        </Button>

        {message.show && (
          <Alert variant={message.type} className="mt-4">
            {message.text}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default App;
