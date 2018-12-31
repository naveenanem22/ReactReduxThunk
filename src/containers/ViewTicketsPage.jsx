import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import ViewTicketsForm from './ViewTicketsForm';
import { RingLoader, ScaleLoader } from 'react-spinners';

export default class ViewTicketsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

   
    render(){
        return (
            <div class = 'new-ticket-page'>
                <div class = 'new-ticket-header'>
                <HeaderNavBar></HeaderNavBar>
                </div>
                <div class = 'new-ticket-side-nav'>
                <SideNavBar></SideNavBar>
                </div >
                {true && <div class = 'view-ticket-form'>
                <ViewTicketsForm ></ViewTicketsForm>
                </div>}
                {false && <div className='sweet-loading'>
                <ScaleLoader
                color={'#123abc'} 
                loading = 'true' 
                />
                </div>
                }
                
            </div>
        
        );
    }
}