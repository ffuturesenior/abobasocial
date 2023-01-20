import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes/routes';
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { rehost } from './servFunctions/functions';
import { AdminContext } from '.';
import Admin from './pages/admin';
import Footer from './components/footer';
import css from './index.css'


function App() {
  const isAuth=useSelector(state=>state.user.isAuth)
 
  const dispatch=useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('userID')!=null){
      dispatch(rehost())
    }
  },[])

  return (
    <div>
          <BrowserRouter>
          <Switch>
          <div className='screen'>
            <div style={{display:'inline-block'}} className='header'>
              <Header/>
            </div>
              <div className='main'>
                <div className='content'>

                  {isAuth?
                    <>
                        {userRoutes.map(p=>
                          <Route path={p.path} component={p.Component} key={p.path} exact/>  
                        )}
                      
                    </>
                    :
                    <>
                      
                        {publicRoutes.map(p=>
                          <Route path={p.path} component={p.Component} key={p.path} exact/>  
                        )}
                    </>
                  }
                </div>
              </div>
              <div className='footer'>
                <Footer/>
              </div>
          </div>
          </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;
