import { createContext, useState } from "react";

const LoginContext = createContext([false, ()=>{}]);
export default LoginContext;