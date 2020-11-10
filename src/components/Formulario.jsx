import React, {useState} from 'react'
import Error from './Error'
import shortid from 'shortid'
import PropTypes from 'prop-types'

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false)

    const Nombre = (e) => {
        guardarNombre (e.target.value);
    }
    
    const Cantidad = (e) => {
        guardarCantidad(parseInt(e.target.value));
    }

    const agregarGasto = (e) => {
        e.preventDefault();
        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true)
            return;
        }
        guardarError(false);
        //construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        //pasar gasto a campo
        guardarGasto(gasto);
        guardarCrearGasto(true);
        //resetear el form
        guardarCantidad(0);
        guardarNombre('');
    }
    return ( 
        <form
        onSubmit = {agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>
            {error ? <Error mensaje = "ambos campos son obligatorios" /> : null }
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                type="text"
                className="u-full-width"
                placeholder="Ej: Transporte"
                value = {nombre}
                onChange = {Nombre}
                />
            </div>
            <div className="campo">
                <label>Cantidad gasto</label>
                <input 
                type="number"
                className="u-full-width"
                placeholder="Ej: 100"
                value = {cantidad}
                onChange = {Cantidad}
                />
            </div>
            <input 
            type="submit"
            className="button-primary u-full-width"
            value="Agregar gasto"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;