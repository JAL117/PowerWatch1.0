import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Promocional = () => {
    return (
        <div>
            <div className="rounded" style={{padding:"100px"}}>
                <h1 className="text-center mb-4 mt-5" style={{fontSize:"clamp(1rem , 5vw , 5rem)" , color:"orange"}}>¡Descubre "PowerWatch v1"!</h1>
                <p className="text-center mb-5 mt-5" style={{fontSize:"clamp(1rem , 5vw , 2.5rem)"}} >
                    ¡Lleva el control total de tu energía con PowerWatch v1! Nuestro software de monitoreo y alerta temprana, diseñado especialmente para la industria, te brinda todas las herramientas que necesitas para mantener tu operación sin interrupciones y optimizar tu consumo energético.
                </p>
                <h2 className="mb-3 mt-5" style={{fontSize:"clamp(1rem, 5vw , 3rem)" , color:"orange"}}>Funciones Destacadas:</h2>
                <ul className="list-group mb-4">
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Detección Inteligente de Eventos Energéticos:</strong> Identifica al instante eventos críticos como “Desconexión del suministro” y “Picos energéticos”.
                    </li>
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Alertas Inmediatas:</strong> Mantente siempre informado con notificaciones instantáneas vía correo electrónico ante cualquier anomalía.
                    </li>
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Control y Verificación de Consumo:</strong> Compara tu consumo energético con el reportado por tu proveedor para asegurar la precisión de tus gastos.
                    </li>
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Visualización en Tiempo Real:</strong> Accede a gráficas dinámicas y detalladas que muestran el consumo eléctrico al momento.
                    </li>
                </ul>
                <h2 className="mb-3 mt-5" style={{fontSize:"clamp(1rem, 5vw , 3rem)" , color:"orange"}}>¿Por qué elegir PowerWatch v1?</h2>
                <ul className="list-group mb-4">
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Plataforma Web Intuitiva:</strong> Gestiona todo desde una interfaz fácil de usar.
                    </li>
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Módulo de Datos Avanzado:</strong> Potente herramienta para la lectura y manejo de datos energéticos.
                    </li>
                    <li className="list-group-item" style={{fontSize:"clamp(1rem, 5vw , 2rem)"}}>
                        <strong>Enfoque en la Precisión:</strong> Nos centramos en la medición de la corriente para detectar desconexiones, asegurando datos precisos y confiables.
                    </li>
                </ul>
         
            </div>
        </div>
    );
}

export default Promocional;
