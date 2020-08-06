import React from 'react'

function Input(props) {
    return(
        <React.Fragment>
            <div className="selecoes ">
                <input type="radio" id="coluna" value={props.name} name="coluna" onChange={props.handleChange}></input>
                <label for="coluna">{props.name}</label>
            </div>
        </React.Fragment>
    )
}

export default Input