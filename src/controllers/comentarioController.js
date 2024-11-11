import Comentario from "../models/Comentario.js";

export const postComentario = async (req, res) => {
    const { autor, userId, text } = req.body;
    try {
        const novoComentario = await Comentario.create({ autor, userId, text });
        console.log("Comentario criado com sucesso!")
        res.status(201).json({ message: "Comentario criado com sucesso!", comentario: novoComentario });
    } catch (erro) {
        console.log("Erro ao postar comentario?!", erro);
        res.status(500).json({ message: "Erro ao postar comentário!" });
    }
};

export const getComentarios = async (req,res) => {
    try {
        const comentarios = await Comentario.find({});
        res.status(200).json(comentarios);
    } catch (erro) {
        console.error("Erro ao molestar comentários:", erro);
        res.status(500).json({ message: "Erro ao buscar comentários." });
    }

}