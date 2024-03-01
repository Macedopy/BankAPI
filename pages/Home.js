import React, { useState } from 'react';
import styles from './Home.module.css';
import './Home.module.css';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
const AxiosInstance = axios.create({ baseURL: 'http://localhost:5170/api' })
export default function Home() {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState(0);
    const [age, setAge] = useState(0);
    const [option, setOption] = useState("Enter");
    const [disabled , setDisabled] = useState(false);
    const navigate = useNavigate();

    var firstInputPlaceholder = "Número da conta";
    var secondInputPlaceholder = "Sua senha";

    if (option === 'Enter') {
        var converted = parseInt(firstInput,10);
        var converted2 = parseInt(secondInput, 10);
        var convertedAge = parseInt(age, 10);
        var UserMethod = () => {
            AxiosInstance.get('/Account/pass/'+converted2 ,
                { params: { password: converted2, number: converted } })
                .then(response => { console.log(response.data); const userInformation = sessionStorage.setItem("User", JSON.stringify(response.data)); if (response) { navigate("/User") } })
                .catch(function (error) { console.log(error); });
        }
    } if(option === "Register") {
        firstInputPlaceholder = "Nome completo";
        secondInputPlaceholder = "Nova Senha";}

        async function RegisterMethod(){const user = await AxiosInstance.post('/User', {name: firstInput, password: secondInput, age: age},
        {headers:{ "Content-Type": "application/json" }}).then(response => {if(response.data){console.log(response.data);}})
        .catch(error => console.log(error)) ;

        AxiosInstance.post('/Account', {
            value: 0
        },
        {
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {if(response.data){
            var accountReturn = JSON.stringify(response.data);
            var json = JSON.parse(accountReturn);
            var number = (json.number);
            var value = (json.value);
            var name = (json.user.name);
            var AccountAge = (json.user.age);
            var AccountPass = (json.user.password);
        
            var finalaccountReturn = `Número da conta : ${number} \nValor na conta: ${value}\nNome Cadastrado: ${name}\nIdade: ${AccountAge}\nSenha: ${AccountPass} `;};    
                            console.log(response.data);})
        .catch(error => console.log(error))}
    return (
        <div className={styles['container']}>
            <div className={styles['container1']}>
                <span className={styles['text']}>Bancaxi</span>
            </div>
            <div className={styles['container2']}>
                <div className={styles['container3']}>
                    <select 
                    value={option}
                    onChange={e => {setOption(e.target.value);}}
                    className={styles['select']}>
                        <option value="Enter">Entrar</option>
                        <option value="Register">Registrar</option>
                    </select>
                    <input
                        type="text"
                        placeholder={firstInputPlaceholder}
                        onChange={e => {setFirstInput(e.target.value);}}
                        className={` ${styles['input']} ${styles['textinput']} `}
                    />
                    <input
                        type="text"
                        onChange={e => {setSecondInput(e.target.value);}}
                        placeholder={secondInputPlaceholder}
                        className={` ${styles['input']} ${styles['input']} `}
                    />
                    <input
                        onChange={e => {setAge(e.target.value);}}
                        type="text"
                        placeholder="Idade"
                        className={option === "Enter"? styles['Hide']: ` ${styles['input']} ${styles['idade']} `}
                    />
                    <button
                        type="button"
                        className={` ${styles['button']} ${styles['entrar']} `}
                    >
                        <span>
                            <span onClick={()=> {UserMethod();}} 
                            className={styles['text2']}>Entrar</span>
                            <br></br>
                        </span>
                    </button>
                    <button
                        onClick={() => {RegisterMethod(); setDisabled(true);}}
                        disabled={disabled}
                        type="button"
                        className={option === "Register"?` ${styles['button']} ${styles['entrar1']} `: styles['Hide']}
                    >
                        <span>
                            <span
                            className={option ==="Register"? styles['text5']: styles['Hide']}>Registrar</span>
                            <br></br>
                        </span>
                    </button>
                </div>
            </div>
            <span className={styles['usuario-registrado']}>Text</span>
        </div>
    )
    }
