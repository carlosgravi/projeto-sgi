import React, { useState, useEffect } from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "./style.css";

const Map = () => {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await fetch("http://localhost:3333/empresas");
        const data = await response.json();
       
        setCompanies(data);

      } catch (error) {
        alert('Houve um erro ao tentar listar os mercados. Entre em contato com suporte.')
      }
    }
    getCompanies();
  }, []);

  return (
    <div className="map-container">

      <h1>Empresas cadastradas</h1>

      <MapContainer center={[-27.5969, -48.5495]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {
          companies.map(item => (
            <Marker position={[item.latitude, item.longitude]}>
              <Popup>
                <p>Razão Social: {item.reason}</p>
                <p>Nome Fantasia: {item.fantasyName}</p>
                <p>CNPJ: {item.cnpj}</p>
                <p>E-mail: {item.mail}</p>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>

    </div>
  )
}

export default Map;