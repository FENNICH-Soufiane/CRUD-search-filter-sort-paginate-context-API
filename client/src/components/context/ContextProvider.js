import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

const ContextProvider = ({ children }) => {
  const [userAdd, setUserAdd] = useState("");
  const [userUpdate, setUserUpdate] = useState("");
  const [userDelete, setUserDelete] = useState("");
  return (
    <>
      <addData.Provider value={{ userAdd, setUserAdd }}>
        <updateData.Provider value={{ userUpdate, setUserUpdate }}>
          <deleteData.Provider value={{ userDelete, setUserDelete }}>
            {children}
          </deleteData.Provider>
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
