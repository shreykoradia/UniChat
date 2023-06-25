import React, { useContext, useState } from 'react'

export const UserContext = React.createContext(null);

export const UserProvider =({children}) => {

    const [activeUsers , setActiveUsers] = useState([]);
    return <UserContext.Provider value={{activeUsers , setActiveUsers}}>{children}</UserContext.Provider>

}

export const useActiveUser = () => {
    return useContext(UserContext)
}




