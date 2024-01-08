import {db} from "../db.js";

export const getUsers = (req , res) => {
    const q = "SELECT * FROM usuarios";


    db.query(q, (e, date) => {
    if (e) return res.json(e);

    return res.status(200).json(date);
    })
};

export const addUser = (req, res) => {

    console.log('chjegou', req.body);

    const q = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q, [values], (e) => {
        if (e) return res.json(e);

        return res.status(200).json("Usuário criado com sucesso.");
    });
};

export const updateUser = (req, res) => {

    const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q, [...values, req.params.id], (e) => {
        if (e) return res.json(e);

        return res.status(200).json("Usuário atualizado com sucesso.");
    });
};

export const deleteUser = (req, res) => {

    const q = "DELETE FROM usuarios WHERE `id` = ?";

    db.query(q, [req.params.id], (e) =>{
        if (e) return res.json(e);

        return res.status(200).json("Usuário excluido com sucesso.");
    });
};