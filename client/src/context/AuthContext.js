import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userRole: "guest",
    userName: "guest",
    userAvatar: "",
    login: noop,
    logout: noop,
    isAuthenticated: false
})