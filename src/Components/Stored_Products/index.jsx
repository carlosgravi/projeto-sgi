import React from "react";
import { useEffect, useState } from "react";
import "./style.css";


const StoredProducts = () => {

    const [storedProducts, setStoredProducts] = useState([]);

    useEffect(() => {
        async function handleGetStored() {
        const response = await fetch("http://localhost:3333/produtos");
        const result = await response.json();
        setStoredProducts(result);
        }

        handleGetStored();
    }, []) 

    return (

        <div className="storage-container">
            <div>
                <h1 className="title">Estoque de produtos</h1>
            </div>

            <div className="stored-list">
            {storedProducts.map(stored => (
                <div className="container-items">
                    <img name="imageUrl" className="stored-img" src={stored.imageUrl} alt={stored.productName}/>
                    <span name="productName" className="item-text">{stored.productName}</span>
                    <span name="cost" className="item-text">{"R$" + stored.cost}</span>
                    <span name="description" className="item-text">{"Sobre: " + stored.description}</span>
                </div>
            ))}
            </div>
         
        </div>
    
    )
}

export default StoredProducts;