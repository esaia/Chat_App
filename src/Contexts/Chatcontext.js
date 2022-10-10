import { createContext, useContext, useReducer } from "react";
import { Authentcontext } from "./Authcontext";

export const chatusers = createContext();

export const Chatcontext = ({ children }) => {
  const currentuser = useContext(Authentcontext);

  const INITIAL_STATE = {
    uid: null,
    userinfo: {
      displayName: "user",
      photoURL:
        "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
    },
    lastmessage: "",
  };

  const usereduserfunction = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          uid:
            currentuser?.uid > action.payload.userinfo?.uid
              ? currentuser?.uid + action.payload.userinfo?.uid
              : action.payload.userinfo?.uid + currentuser?.uid,
          userinfo: action.payload.userinfo,
          lastmessage: action.payload.lastmessage,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(usereduserfunction, INITIAL_STATE);

  const combinedid =
    currentuser?.uid > state.userinfo?.uid
      ? currentuser?.uid + state.userinfo?.uid
      : state.userinfo?.uid + currentuser?.uid;

  return (
    <chatusers.Provider value={{ state, dispatch, combinedid }}>
      {children}
    </chatusers.Provider>
  );
};
