import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const jwtKey = process.env.JWT_SECRET;

export const getUserProfile = async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token ausente." });

    try {
        const tokenD = jwt.verify(token, jwtKey);
        const user = await User.findById(tokenD.id).select("-senha");
        
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
        res.status(200).json(user);
    } catch (erro) {
        console.error("Token inválido!", erro);
        res.status(400).json({ message: "Token inválido!" });
    }
};

export const getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-senha");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(user);
    } catch (erro) {
        console.error("Erro ao buscar perfil:", erro);
        res.status(500).json({ message: "Erro ao buscar perfil." });
    }
};

export const pesquisarUsers = async (req, res) => {
    const { term } = req.query;
    try {
        const users = await User.find({ 
            username: { $regex: term, $options: 'i' } 
        }).select('username _id');

        res.status(200).json(users);
    } catch (erro) {
        console.error("Erro pesquisando users:", erro);
        res.status(500).json({ message: "Erro pesquisando users" });
    }
};

export const addAchievement = async (req, res) => {
    const { achievement } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!achievement) {
        return res.status(400).json({ message: "cual o athivement?????" });
    }

    try {
        const tokenD = jwt.verify(token, jwtKey);
        const user = await User.findById(tokenD.id);
        
        if (!user) {
            return res.status(404).json({ message: "User não encontrado" });
        }

        if (!user.achievements.includes(achievement)) {
            user.achievements.push(achievement);
        }

        await user.save();

        res.status(200).json({ message: "Achievement adicionado com suseso", achievements: user.achievements });
    } catch (erro) {
        console.error("Erro ao adicionar o achievement:", erro);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

export const editDesc = async (req,res) => {
    const { desc } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!desc) {
        return res.status(400).json({ message: "cual o descrición?????" });
    }

    try {
        const tokenD = jwt.verify(token, jwtKey);
        const user = await User.findById(tokenD.id);
        
        if (!user) {
            return res.status(404).json({ message: "User não encontrado" });
        }

        user.desc = desc;
        await user.save();

        res.status(200).json({ message: "Descrição atualizada com suseso", desc: user.desc });
    } catch (erro) {
        console.error("Erro ao atualizar a descrição:", erro);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}
