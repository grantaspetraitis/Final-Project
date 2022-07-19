import React, { useState } from 'react';

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
    const storageItem = localStorage.getItem('user')
    const [login, setLogin] = useState(storageItem ? JSON.parse(storageItem) : null);

    const setLoginAndStore = (login) => {
        setLogin(login);
        localStorage.setItem('user', JSON.stringify(login));
    }

    const value = { login, setLogin: setLoginAndStore }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;