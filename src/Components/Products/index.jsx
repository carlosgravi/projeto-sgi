import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./style.css";
import { toast } from "react-toastify";


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

    const handleSubmit = async (event) => {

        try {
            event.preventDefault();

            if(!imageUrl) {
                toast.error("Url é obrigatória", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            } else if (!productName) {
                toast.error("Nome do produto é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!cost) {
                toast.error("Custo unitário é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!description) {
                toast.error("Descrição é obrigatória", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!providers) {
                toast.error("Fornecedor é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }else if (!groups) {
                toast.error("Grupo é obrigatório", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "dark"
                });
                return
            }
        
            await fetch("http://localhost:3333/produtos",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                  "imageUrl": imageUrl,
                  "productName": productName,
                  "cost": cost,
                  "description": description,
                  "provider": provider,
                  "group": group,
                })
              }
            );

            toast.success("Produto cadastrado com sucesso", {
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            });

            history.push("/stored");
            
        } catch (error) {
            toast.error("Houve um problema no cadastro de novo produto. Estamos tentando resolver!", {
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            });
            history.push("/stored");
        }
    }

    useEffect(() => {

        async function getProvider() {
          const result = await fetch("http://localhost:3333/fornecedores");
          const data = await result.json();
          setProviders(data);
        }
    
        getProvider();
    
      }, []);

      useEffect(() => {

        async function getGroup() {
          const result = await fetch("http://localhost:3333/categorias");
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
                    <label><input className="url-input" name="imageUrl" pattern="https://.*" type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></input>URL da imagem*</label>
                </div>

                <div className="product-info">
                    <label><input className="name-input" name="productName" type="text" value={productName} onChange={(event) => setProductName(event.target.value)}></input>Nome*</label>
                    <label><input type="number" name="cost" value={cost} onChange={(event) => setCost(event.target.value)}></input>Custo unitário*</label>
                </div>

                <div className="product-description">
                    <label><textarea  name="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>Descrição*</label>
                </div>
            </div>

            <div className="product-select">
                <label>
                    <select name="provider" value={provider} onChange={(event) => setProvider(event.target.value)}>
                        {providers.map(item => (<option value={item}>{item}</option>))}
                    </select>
                    Fornecedor*
                </label>

                <label>
                    <select name="group" value={group} onChange={(event) => setGroup(event.target.value)}>
                        {groups.map((item) => (<option value={item}>{item}</option>))}
                    </select>
                    Grupo*
                </label>
            </div>

        </form>
        
    )
}

export default Products;