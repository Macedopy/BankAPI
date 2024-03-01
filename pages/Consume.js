import React, { useState } from 'react';
import axios from 'axios';
import styles from './Action.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
const AxiosInstance = axios.create({ baseURL: 'http://localhost:5170/api' })
function Consume() {
    const [valueUpdated, setValueUpdated] = useState(0);
    const [value, setValue] = useState(0);
    const [display, setDisplay] = useState(0);
    
    useEffect(() => {

        const fetchData = async () => {
            AxiosInstance.get(`Account/pass/${password}`,
                { params: { password: password, number: number } })
                .then(response => { console.log(response.data); localStorage.setItem("Value", JSON.stringify(response.data)); })
                .catch(function (error) { console.log(error); });

            var dataUpdate = localStorage.getItem("Value");
            var jsonValue = JSON.parse(dataUpdate);
            var password = (jsonValue.user.password),
                number = (jsonValue.number)
            var valueUpdatedGet = (jsonValue.value);
            setValueUpdated(valueUpdatedGet);
            

        }
        fetchData()

    }, []);

    const navigate = useNavigate();

    async function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        await delay(250)
        window.location.reload();
    }


    const withdrawValue = () => { AxiosInstance.put('/Account/consume', {number: numberParse, value: result})
    .then(response => {if(response.data){setDisplay(1)};    
                        console.log(response.data);})
    .catch(error => console.log(error)) }

    var data = sessionStorage.getItem("User");
    var json = JSON.parse(data);
    var number = (json.number);
    const numberParse = parseInt(number, 10);
    var result = valueUpdated-value;
    

    return (
        <div className={styles['container']}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="//use.fontawesome.com/releases/v6.2.0/css/all.css"/>
            <span className={styles['numero']}>
            <i class="fa-regular fa-address-card"></i>{number}</span>  
            <span className={styles['bancaxi']}>
                <span>Bancaxi</span>
                <br></br>
            </span>
            <span className={styles['saldo']}>R&#36;{result}</span>
            <span className={styles['text2']}>Seção Saque</span>
            <span className={styles['username']}>Coloque o valor a ser sacado</span>
            <input
                onChange={(event) => { setValue(event.target.value); }}
                type="text"
                className={` ${styles['valor']} ${['input']} `}
            />
            <div className={styles['actions']}>
                <span className={display ===1? styles['comunicado']: styles['comunicadodisplay']}>Valor creditado da conta!</span>
                <div className={styles['grp-retornar']}>
                    <span onClick={() => {changeLocation("/User");}} className={styles['sacar']}>
                        <i class="fa fa-angle-double-left"></i>
                        <span>Retornar</span>
                        <br></br>
                    </span>
                    <span onClick={() => {setDisplay(1); withdrawValue();}}
                        className={` ${styles['retornar']} ${['button']} `}
                    >
                        <span>Sacar</span>
                        <i class="fa-solid fa-chart-simple"></i>
                        <br></br>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Consume;
