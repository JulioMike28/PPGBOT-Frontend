import React, { useContext} from 'react'
import { Route, Redirect} from 'react-router-dom'
import StoreContext from '../../Store/Context'

const RouterPrivate = ({ component: Component, ...rest}) => {
    const { token } = useContext(StoreContext)

    return(
        <Route
            {...rest}
            render={()=>token?<Component {...rest}/>: <Redirect to="/login"/>}
        >
            
        </Route>
    )
}

export default RouterPrivate;