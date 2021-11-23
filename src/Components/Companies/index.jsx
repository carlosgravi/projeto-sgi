import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";


const Companies = () => {

    const history = useHistory();

    const [reason, setReason] = useState("");
    const [fantasyName, setFantasyName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [mail, setMail] = useState("");

    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [complement, setComplement] = useState("");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    const handleSubmit = async (event) => {
        
        try {
            event.preventDefault();

            if(!reason) {
                toast.error("Razão social é obrigatória", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            } else if (!fantasyName) {
                toast.error("Nome fantasia é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!cnpj) {
                toast.error("CNPJ é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!mail) {
                toast.error("E-mail é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!cep) {
                toast.error("CEP é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!address) {
                toast.error("Endereço é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!number) {
                toast.error("Número é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!neighborhood) {
                toast.error("Bairro é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!city) {
                toast.error("city é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!latitude) {
                toast.error("Latitude é obrigatória", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!longitude) {
                toast.error("Longitude é obrigatória", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }

            await fetch("http://localhost:3333/empresas",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "reason": reason,
                    "fantasyName": fantasyName,
                    "cnpj": cnpj,
                    "mail": mail,
                    "cep": cep,
                    "address": address,
                    "number": number,
                    "neighborhood": neighborhood,
                    "city": city,
                    "complement": complement,
                    "latitude": latitude,
                    "longitude": longitude,
                })
              }
            );

            toast.success("Empresa cadastrada com sucesso", {
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            });

            history.push("/map");
            
        } catch (error) {
            toast.error("Houve um problema no cadastro de novo produto. Estamos tentando resolver!", {
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            });

            history.push("/map");
        }
    }

    return (
        
        <form className="container-form-companies" onSubmit={handleSubmit}>

            <div className="form-header">
                <h1>Nova empresa</h1>
                <div className="form-buttons">
                    <button className="btn-cancel" onClick={() => history.push('/map')} type="button">Cancelar</button>
                    <button className="btn-companies" type="submit">Salvar</button>
                </div>    
            </div>

            <hr/>

            <div className="company-data">
                <div className="company-contact">
                    <label><input name="reason" type="text" value={reason} onChange={(event) => setReason(event.target.value)}></input>Razão Social*</label>
                    <label><input name="fantasyName" type="text" value={fantasyName} onChange={(event) => setFantasyName(event.target.value)}></input>Nome Fantasia*</label>
                </div>
                <div className="company-contact">
                    <label><input name="cnpj" type="text" value={cnpj} onChange={(event) => setCnpj(event.target.value)}></input>CNPJ*</label>
                    <label><input name="email" type="email" value={mail} onChange={(event) => setMail(event.target.value)}></input>E-mail*</label>
                </div>
            </div>
                
            <hr/>

            <div className="company-adress">
                <div className="adress-group-1">
                    <label><input name="cep" type="text" value={cep} onChange={(event) => setCep(event.target.value)}></input>CEP*</label>
                    <label><input name="address" type="text" value={address} onChange={(event) => setAddress(event.target.value)}></input>Endereço*</label>
                </div>
                <div className="adress-group-2">
                    <label><input name="number" type="number" value={number} onChange={(event) => setNumber(event.target.value)}></input>Número*</label>
                    <label><input name="neighborhood" type="text" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)}></input>Bairro*</label>
                    <label><input name="city" type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>Cidade*</label>
                </div>
                <div className="adress-group-3">
                <label><input name="complement" type="text" value={complement} onChange={(event) => setComplement(event.target.value)}></input>Complemento</label>
                </div>
            </div>

            <hr/>

            <div className="company-map">
                <div className="company-position">
                    <label><input name="latitude" className="position-input" type="number" value={latitude} onChange={(event) => setLatitude(event.target.value)}></input>Latitude*</label>
                    <label><input name="longitude" className="position-input" type="number" value={longitude} onChange={(event) => setLongitude(event.target.value)}></input>Longitude*</label>
                </div>
            </div>   
        </form> 
    )
}

export default Companies;