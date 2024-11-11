import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getUserProfile, getProfile, pesquisarUsers, addAchievement, editDesc } from "../controllers/userController.js";
import { postComentario, getComentarios } from "../controllers/comentarioController.js";

const router = express.Router();

router.post('/login', loginUser);      
router.post('/signup', registerUser);    
router.get('/perfil', getUserProfile);
router.get('/perfil/:id', getProfile);
router.get('/search', pesquisarUsers);
router.post('/comentario', postComentario);
router.get('/comentario', getComentarios);
router.post('/achievement', addAchievement);
router.post('/desc', editDesc);

export default router;
