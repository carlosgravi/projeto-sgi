import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./style.css";

const Products = () => {

    const history = useHistory();

    const [imageUrl, setImageUrl] = useState("");
    const [productName, setProductName] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [provider, setProvider] = useState("");
    const [group, setGroup] = useState("");
    const [providers, setProviders] = useState([]);
    const [groups, setGroups] = useState([]);

    const handleSubmit = async (e) => {

        try {

            e.preDefault();

            if (!imageUrl) {
                alert("Favor inserir o caminho URL da imagem do produto!");
                return;
            }
            if (!productName) {
                alert("Favor inserir o nome do produto!");
                return;
            }
            if (!cost) {
                alert("Favor inserir o valor do produto!");
                return;
            }
            if (!description) {
                alert("Favor inserir a descrição do produto!");
                return;
            }
            if (!provider) {
                alert("Favor selecionar o fornecedor do produto!");
                return;
            }
            if (!group) {
                alert("Favor selecionar o grupo do produto!");
                return;
            }
        
            await fetch('http://localhost:3333/produtos',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "imageUrl": imageUrl,
                  "productName": productName,
                  "cost": cost,
                  "description": description,
                  "provider": provider,
                  "group": group,
                })
            }); 
            alert("Produto cadastrado com sucesso!")
            history.push("/stored");
        }
        catch (error) {
            alert ("Ocorreu um problema ao cadastrar o produto!")
            }
            history.push("/stored");
    }

    useEffect(() => {

        async function getProvider() {
          const result = await fetch("http://localhost:3333//fornecedores");
          const data = await result.json();
          setProviders(data);
        }
    
        getProvider();
    
      }, []);

      useEffect(() => {

        async function getGroup() {
          const result = await fetch("http://localhost:3333//categorias");
          const data = await result.json();
          setGroups(data);
        }
    
        getGroup();
    
      }, []); 

    return (
        
        <form className="container-form-products" onSubmit={handleSubmit}>
            <div className="form-header">
                <h1>Novo produto</h1>
                <div className="form-button">
                    <button className="btn-cancel" onClick={() => history.push('/stored')}>Cancelar</button>
                    <button className="btn-products" type="submit">Salvar</button>
                </div>
            </div>
            
            <hr/>

            <div className="img-container">
                {imageUrl && (<div className="image-url"><img src={imageUrl} style={{width: "10em", height: "10em"}} alt="Imagem do produto"/></div>)}
            </div>

            <div className="product-data">
                <div className="product-url">
                    <label><input className="url-input" name="imageUrl" pattern="https://.*" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>URL da imagem*</label>
                </div>

                <div className="product-info">
                    <label><input className="name-input" name="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)}></input>Nome*</label>
                    <label><input type="number" name="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>Custo unitário*</label>
                </div>

                <div className="product-description">
                    <label><textarea  name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>Descrição*</label>
                </div>
            </div>

            <div className="product-select">
                <label>
                    <select name="provider" value={provider} onChange={(e) => setProvider(e.target.value)}>
                        {providers.map(item => (<option value={item}>{item}</option>))}
                    </select>
                    Fornecedor*
                </label>

                <label>
                    <select name="group" value={group} onChange={(e) => setGroup(e.target.value)}>
                        {groups.map((item) => (<option value={item}>{item}</option>))}
                    </select>
                    Grupo*
                </label>
            </div>

        </form>
        
    )
}

export default Products;