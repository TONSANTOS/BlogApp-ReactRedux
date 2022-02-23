import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isSignedIn: false, // Verificar se está conectado
        userData: null, // Como o usuário não está conectado, não teríamos nenhuma resposta ou dados
        searchInput: "tech", // Será exibido noticias de tecnologia assim que logado no app
        blogData: null // Resultado que iremos receber da api
    },
    reducers: {
        setSignedIn: (state, action) => { // Obtendo estado e ação
            state.isSignedIn = action.payload; // O ponto de estado conectado será igual a carga útil do ponto de ação, se acharmos o redutor  -> setSignedIn(true)
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setBlogData: (state, action) => {
            state.blogData = action.payload;
        }
    }
})

export const { // Dará ação de barra do usuário, então as ações são basicamente o reduce, é apenas nome diferente
    setSignedIn,
    setUserData,
    setInput,
    setBlogData
} = userSlice.actions;

export const selectSignedIn = (state) => state.user.isSignedIn; // Estado ponto usuário,ponto conectado, especificando
export const selectUserData = (state) => state.user.userData;
export const selectUserInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;

export default userSlice.reducer;

