import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes/routes';
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { rehost } from './servFunctions/functions';
import { AdminContext } from '.';
import Admin from './pages/admin';
import Footer from './components/footer';

function App() {
  const isAuth=useSelector(state=>state.user.isAuth)
 
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(rehost())
  },[])

  return (
    <div className="App">
          <BrowserRouter>
            <header className='header'>
              <Header/>
            </header>
              <main className='main'>
                <div className='content'>
                  {isAuth?
                    <>
                      <Switch>
                        {userRoutes.map(p=>
                          <Route path={p.path} component={p.Component} key={p.path} exact/>  
                        )}
                      </Switch>
                    </>
                    :
                    <>
                      <Switch>
                        {publicRoutes.map(p=>
                          <Route path={p.path} component={p.Component} key={p.path} exact/>  
                        )}
                      </Switch>
                    </>
                  }
                </div>
              </main>
              <footer className='footer'>
                <Footer/>
              </footer>
          </BrowserRouter>
    </div>
  );
}

export default App;
