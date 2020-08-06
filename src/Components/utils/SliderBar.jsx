import React from 'react'

function SliderBar(props) {
    return(
        <React.Fragment>
            <div>
                <input type="range" min="1" max="100" value="50" id="myRange"></input>
            </div>
        </React.Fragment>
    )
}

export default SliderBar