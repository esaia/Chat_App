import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Authcontext } from "./Contexts/Authcontext";
import { Searchingcontext } from "./Contexts/Searchingcontext";
import { Chatcontext } from "./Contexts/Chatcontext";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Authcontext>
        <Searchingcontext>
          <Chatcontext>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Chatcontext>
        </Searchingcontext>
      </Authcontext>
    </ChakraProvider>
  </BrowserRouter>
);
