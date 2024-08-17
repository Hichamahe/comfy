"use client";
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [successfully, setSuccessfully] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleSuccess = () => {
    setSuccessfully(!successfully);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const openAlert = (props) => {
    setAlertProps(props);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    setAlertProps({});
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
        setIsOpen,
        isAccountOpen,
        toggleSuccess,
        successfully,
        setIsAccountOpen,
        toggleAccount,
        Loading,
        setLoading,
        isAlertOpen,
        setIsAlertOpen,
        toggleAlert,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        alertProps,
        openAlert,
        closeAlert,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
