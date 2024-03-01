import styles from './Action.module.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const AxiosInstance = axios.create({ baseURL: 'http://localhost:5170/api' })
function Code() {

    const [valueUpdated, setValueUpdated] = useState(0);
    const [options, setOptions] = useState('payCode');
    const [display, setDisplay] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);
    const [code, setCode] = useState("");

    let resultSplit = code.split(":");
    var resultValue = parseInt(resultSplit[1]);


    const navigate = useNavigate();

    async function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        await delay(250)
        window.location.reload();
    }

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

    var data = sessionStorage.getItem("User");
    var json = JSON.parse(data);
    var number = (json.number);
    const numberParse = parseInt(number, 10);
    if(resultValue > 0){var result = valueUpdated-resultValue;}else{result = valueUpdated}

    if (options === 'payCode') {
        var CodeMethod = () => { AxiosInstance.put('/Account/PayPayment', {accountId: numberParse, code: code})
        .then(response => {if(response.data){setDisplay(1)};    
                            console.log(response.data);})
        .catch(error => console.log(error)) };
        var placeholder = "Numero do código";
        var action = "Coloque o número do código a ser pago";
        var warning = "Código Pago com sucesso!";
        var sessionAction = "Pagar Código";
        var icon = <i class="fa-solid fa-barcode"></i>;
    } else {
        var codeInt = parseInt(code, 10);
        CodeMethod = () =>{ AxiosInstance.post('/Account/GeneratePayment', {
            number: numberParse ,
            value: codeInt
        },
        {
            headers: { "Content-Type": "application/json" } // config
        })
        .then(response => {if(response.data){setDisplay(1)};    
                            console.log(response.data);})
        .catch(error => console.log(error)) };
        placeholder = "Valor";
        action = "Coloque o valor a ser cobrado";
        warning = "Código criado!, copie e mande para seu contato";
        sessionAction = "Gerar Código";
        icon = <i class="fa-solid fa-key"></i>;
    }

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
            <span className={styles['text2']}>Seção Código</span>
            <span className={styles['username']}>
                {action}
            </span>
            <select
            value={options}
            onChange={e => {setOptions(e.target.value); setDisplay(0);}}
            className={styles['select']}>
                <option value="payCode">Pagar Código</option>
                <option value="generateCode">Gerar Código</option>
            </select>
            <div className={styles['container1']}>
                <div className={styles['container2']}>
                    <input
                        onChange={e => {setCode(e.target.value);}}
                        type="text"
                        placeholder={placeholder}
                        className={` ${styles['valor']} ${['input']} `}
                    />
                    <span className={options ==="payCode"? styles['code-value']: styles['code-valuedisplay']}>R&#36;{resultValue}</span>
                </div>
            </div>
            <div className={styles['actions']}>
                <span className={display ===1? styles['comunicado']: styles['comunicadodisplay']}>{warning}</span>
            </div>
            <div className={styles['grp-retornar']}>
                <span 
                onClick={() => {changeLocation("/User");}}
                className={styles['sacar']}>
                    <i class="fa fa-angle-double-left"></i>
                    <span>Retornar</span>
                    <br></br>
                </span>
                <span onClick={() => {setDisplay(1); CodeMethod();}} className={` ${styles['retornar']} ${['button']} `}>
                    <span>{sessionAction}</span>
                {icon}
                    <br></br>
                </span>
            </div>
        </div>
    )
}



export default Code;