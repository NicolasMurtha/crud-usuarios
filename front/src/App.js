import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import {useState, useEffect} from "react";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;



function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    } catch (e) {
      toast.error(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8800/${id}`)
      toast.info("usuário excluido com sucesso");
      getUsers();
    } catch (e) {
      toast.error(e);
    }
  };

  

/*   const updateUser = async (id, values) => {
    try {
      const res = await axios.put(`http://localhost:8800/${id}`, values);

    } catch {

    }
  } */
  
  

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
    <Container>
    <Title> USUÁRIOS </Title>
    <Form users = {users} onEdit={onEdit} getUsers={getUsers} setOnEdit={setOnEdit}/>
    <Grid users = {users} deleteUser = {deleteUser} setOnEdit={setOnEdit}/>
    </Container>
    <ToastContainer autoclose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
    <GlobalStyle />
    </>
  );
}

export default App;
