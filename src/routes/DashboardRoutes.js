import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar';
import Inicio from '../pages/Inicio';
import Manual from '../pages/Manual';


export default function DashboardRoutes() {

return (
        <>     
            <SideBar /> 
            <div className="home-section">
                <Switch>
                    <Route exact path="/manual" component={Manual} /> 
                    <Route exact patch="/inicio" component={Inicio} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>  
    )
}
