import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setName] = useState(null);
    const [userAvatar, setUserAvatar] = useState("");
    const [role, setRole] = useState("guest")

    const login = useCallback((jwtToken, id, role, userName, userAvatar)=>{
        setToken(jwtToken);
        setUserId(id);
        setRole(role);
        setName(userName)
        setUserAvatar(userAvatar)
        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, userRole: role, userName: userName,
        userAvatar: userAvatar}));
    },[])
    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        setRole("guest");
        setName("guest");
        setUserAvatar("");
        localStorage.removeItem(storageName);
    },[])

    useEffect( ()=>{
        const data = JSON.parse(localStorage.getItem(storageName));
        
        if(data && data.token) {
            login(data.token, data.userId, data.userRole, data.userName, data.userAvatar);
        }
        setReady(true);
    },[login]);

    return { login, logout, token, userId, role, userName, userAvatar, ready} 
}