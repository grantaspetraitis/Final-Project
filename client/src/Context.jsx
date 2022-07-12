import React, { useState } from 'react';

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
    const [login, setLogin] = useState(null);

    const setLoginAndStore = (login) => {
        setLogin(login);
        localStorage.setItem('user', JSON.stringify(login));
    }

    const value = { login, setLoginAndStore }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;