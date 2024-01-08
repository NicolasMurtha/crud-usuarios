import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 140px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px
`;

const Label = styled.label``;


const Form = ({onEdit, getUsers, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        } else {
            const user = ref.current;
        }
        
    },[onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = ref.current;
        
        if(onEdit) {

            await axios.put(`http://localhost:8800/${onEdit.id}`, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value, 
                }).then((res) => toast.info(res.data))
            .catch((res) => toast.error(res.data));

            } else {
            
            await axios.post("http://localhost:8800", {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value, 
                }).then((res) => toast.info(res.data))
            .catch((res) => toast.error(res.data));
        }

        user.nome.value = null;
        user.email.value = null;
        user.fone.value = null;
        user.data_nascimento.value = null;

        setOnEdit(null);
        getUsers();
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone"/>
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date"/>
            </InputArea>

            <Button type="submit" >SALVAR</Button>
        </FormContainer>
    );
};

export default Form;

