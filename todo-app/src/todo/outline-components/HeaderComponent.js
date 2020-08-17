import React, { Component } from 'react';
import '../todos.css';
import {Link} from 'react-router-dom';
import AuthenticationService from '../AuthenticationService';


class HeaderComponent extends Component {

    constructor(){
        super();

        this.state = {
            displayBurgerBtnMenu:'none'
        }
    }

    onBurgerButtonClickDisplayMenu = () =>{        

        if(this.state.displayBurgerBtnMenu === 'none'){
            this.setState({displayBurgerBtnMenu:'block'})
        }
        else{
            this.setState({displayBurgerBtnMenu:'none'})
        }        

        console.log('clicking burger button...',this.state)
    }

    render() {

        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        console.log('isUserLoggedIn=',isUserLoggedIn)

        return (
            <div>

               {/**<nav>
                   <ul className='todo-burger-nav'>
                        <li>
                            <MenuIcon className='todo-burger-btn'></MenuIcon>
                            <button icon='MenuIcon' onClick={this.onBurgerButtonClickDisplayMenu}>display burger menu</button>
                        </li>
                   </ul>                   
               </nav>
               <div style={{display: `${display}`}}>
                   <ul className='todo-burger-menu'>                        
                        <li>                        
                            <Link className='router-link' to='/welcome/user/'>Home</Link>                        
                        </li>
                        <li>                        
                            <Link className='router-link' to='/todos'>To-dos</Link>                            
                        </li>                    
                        
                        <li className='todo-navbar-li-last'>                        
                            <Link className='router-link' to='/logout'>Logout</Link>                            
                        </li>
                    </ul>     
               </div>*/}
               <nav>
                <ul className="todo-navbar-hamburger">
                        <li>
                            <div className="hamburger-menu">
                                <input id="menu__toggle" type="checkbox" />
                                <label className="menu__btn" htmlFor="menu__toggle">
                                <span></span>
                                </label>

                                <ul className="menu__box">
                                        <li>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" fill="#fff"/>
                                            </svg><span>     </span>
                                            <Link className='router-link' to='/welcome/user/'>Home</Link>
                                        </li>
                                        <li>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z" fill="#fff"/>
                                            </svg><span>     </span>
                                            <Link className='router-link' to='/todos/user/'>To-dos</Link>
                                        </li>
                                        <li>
                                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                                <path d="M20 23h2v1h-20v-1h2v-23h16v23zm-1-22h-14v22h14l-10-1.954v-18.015l10-2.031zm-7 11h-2v1h2v-1z" fill="#fff"/>
                                            </svg><span>     </span>
                                            <Link className='router-link' to='/logout'>Logout</Link>
                                        </li>
                                </ul>
                            </div>
                        </li>
                    </ul>           
                </nav>
               <nav>
               

                    <ul className="todo-navbar">                        
                        <li>                        
                            <Link className='router-link' to='/welcome/user/'>Home</Link>                        
                        </li>
                        <li>                        
                            <Link className='router-link' to='/todos/user/'>To-dos</Link>                            
                        </li>   
                        {/*<li className='todo-navbar-li-last'>                        
                            <Link className='router-link' to='/login'>Login</Link>                           
                        </li>*/}
                        <li className='todo-navbar-li-last'>                        
                            <Link className='router-link' to='/logout'>Logout</Link>                            
                        </li>
                    </ul>                                    
               </nav>
              
            </div>
        );
    }
}
export default HeaderComponent;