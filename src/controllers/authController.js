import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const saltRounds = 10;
const jwtKey = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { username, email, senha } = req.body;
    try {
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "Email já está em uso." });
        }
        const hashedSenha = await bcrypt.hash(senha, saltRounds);

        const novoUser = new User({
            username,
            email,
            senha: hashedSenha,
        });

        await novoUser.save();
        const token = jwt.sign({ id: novoUser._id }, jwtKey, { expiresIn: "1h" });
        res.status(201).json({ message: "Cadastro feito com sucesso.", token});
    } catch (erro) {
        console.error("Erro ao cadastrar.:", erro);
        res.status(500).json({ message: "Erro ao cadastrar." });
    }
};

export const loginUser = async (req, res) => {
    const { username, senha } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        const engual = await bcrypt.compare(senha, user.senha);
        if (!engual) {
            return res.status(400).json({ message: "Senha incorreta." });
        }
        const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: "1h" });
        res.status(200).json({ message: "Login feito com sucesso.", token});
    } catch (erro) {
        console.error("Erro ao alongar:", erro);
        res.status(500).json({ message: "Erro durante login." });
    }
};

