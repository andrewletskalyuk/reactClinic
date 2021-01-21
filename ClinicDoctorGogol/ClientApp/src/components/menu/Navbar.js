import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
//import './ButtonDemo.css';
import '../menu/Navbar.css';
import logoIcon from './images/logo.jpg';

import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
//import { InputText } from 'primereact/inputtext';

export class MenuNavbar extends Component {

    constructor(props) {
        super(props);

        this.items = [
            {
                label: 'На головну',
                icon: 'fas fa-home',
                command: (event) => {
                    this.props.dispatch(push('/'));

                }
            },
            {
                label: 'Запис на прийом',
                icon: 'fas fa-calendar-check',
                items: [
                    {
                        label: 'Гоголь Л.В.',
                        icon: 'fas fa-user-md',
                        command: (event) => {
                            this.props.dispatch(push('/appointments'));
                            console.log('-------------', this.props);
                        }
                    },
                    {
                        label: 'Інший лікар',
                        icon: 'fas fa-briefcase-medical'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Відмінити прийом',
                        icon: 'fas fa-directions'
                    }
                ]
            },
            {
                label: 'Що ми можемо?',
                icon: 'fas fa-book-medical',
                items: [
                    {
                        label: 'Лікування',
                        icon: 'fas fa-hand-holding-medical'
                    },
                    {
                        label: 'Обстеження',
                        icon: 'fas fa-diagnoses'
                    },
                    {
                        label: 'Здача аналізів',
                        icon: 'fas fa-vials'
                    },
                    {
                        label: 'Інсуліно-залежним',
                        icon: 'pi pi-fw pi-align-justify'
                    },

                ]
            },

            {
                label: 'Хто ми?',
                icon: 'fas fa-user-md',
                items: [
                    {
                        label: 'Про клініку',
                        icon: 'fas fa-clinic-medical',
                        // items: [
                        //     {
                        //         label: 'Save',
                        //         icon: 'pi pi-fw pi-calendar-plus'
                        //     },
                        //     {
                        //         label: 'Delete',
                        //         icon: 'pi pi-fw pi-calendar-minus'
                        //     }
                        // ]
                    },
                    {
                        label: 'Де ми знаходимось?',
                        icon: 'fas fa-map-marker-alt',
                        command: (event) =>{
                            this.props.dispatch(push('/location'));
                        }
                        // items: [
                        //     {
                        //         label: 'Remove',
                        //         icon: 'pi pi-fw pi-calendar-minus'
                        //     }
                        // ]
                    }
                ]
            },

            {
                label: 'Користувачі',
                icon: 'fas fa-users',
                items: [
                    {
                        label: 'Реєстрація',
                        icon: 'pi pi-fw pi-user-plus',
                        command: (event) => {
                            //console.log("---------------",this.props);
                            this.props.dispatch(push('/register'));
                            //потужна єрєсь - треба знати
                        }
                    },
                    {
                        label: 'Вхід',
                        icon: 'pi pi-fw pi-users',
                        command: (event) => {
                            this.props.dispatch(push('/login'));
                        }
                    }
                ]
            }
        ];
        
    }

    render() {

        const start = <img alt="logo" src={logoIcon} height="40" className="p-mr-2 rounded-circle pr-3"></img>;

        const userIcon = <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-text" />;
        // <Button icon="pi pi-bookmark" className="p-button-rounded p-button-secondary p-button-outlined" />,
        // <Button icon="pi pi-search" className="p-button-rounded p-button-success p-button-outlined" />,
        // <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-outlined" />,
        // <Button icon="pi pi-bell" className="p-button-rounded p-button-warning p-button-outlined" />,
        // <Button icon="pi pi-heart" className="p-button-rounded p-button-help p-button-outlined" />,
        // <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />,

        return (
            <>
                <div className="card">
                    <Menubar className="bgc" model={this.items} start={start} end={userIcon} />
                </div>
            </>
        );
    }
}

//nav bar connect 
// const mapState = (stateRedux) => {
//     return {
//         isAuth: stateRedux.login.isAuthentificated
//     }
// }


export default connect(null,null)(MenuNavbar); 
