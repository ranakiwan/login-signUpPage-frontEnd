import {useEffect, useState} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import LoginAuth from "../Services/Authentication"
import { CreateUserAuth } from "../Services/Authentication"
import Cookies from "js-cookie"

export function useLogin() {
    const navigate = useNavigate()
    async function login(userData){
        try{
            const response = await LoginAuth(userData)
            const {status, data} = response;

            if(status === 200){
                navigate("/home");
                Cookies.set("FirstName", data.FirstName)
                Cookies.set("token", data.token);
                Cookies.set("FirstTime", data.FirstTime)
                Cookies.set("token", data.token);
                
            }
        }
        catch(error){
            if(error.response && error.response.status === 401){
                alert("Invalid email or password")
            }
            console.error("Something went wrong: ", error);
        }
    }
    return { login };
}

export function useCreate(){
    const navigate= useNavigate();
    async function signUp(userData){

        try{
            const response = await CreateUserAuth(userData);
            const {status, data} = response;

            if(status === 201){
                navigate("/home")
                Cookies.set("FirstName", data.FirstName)
                Cookies.set("FirstTime", data.FirstTime)
                Cookies.set("token", data.token); // Store token
               
            }

        } catch(error){
   
            if(error.response && error.response === 400){
                alert("Could not create a user")
            }
            console.error("Something went wrong: ", error)
   

        }
    }
    return { signUp };
}