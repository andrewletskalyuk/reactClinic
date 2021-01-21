import React, { Component } from 'react';
import bcgImage from './images/bcgImage.jpg';
import '../home/Home.css';

export default class Home extends Component {

    render() {
        return (
            <div>
                <div className="container mt-2">
                    <img alt='' className='float-left pt-2' src={bcgImage} style={{ maxWidth: "100px" }} />
                    <div className='opacity-1 pt-2 pl-2'>
                        <p className='pzParag'>Aliquip nostrud id consequat c
                        ulpa magna eu incididunt. Labore cillum aute ipsum fugiat esse.
                         Officia Lorem sint qui qui irure aute enim minim dolor.
                         Ex deserunt tempor est cupidatat Lorem sunt. Incididunt deserunt dolore aliqua ullamco quis Lorem exercitation adipisicing consectetur. Ea aliquip duis consequat non do ullamco esse nulla elit quis excepteur veniam veniam ex. Irure ad enim mollit tempor cillum est magna dolore aliqua elit sint esse.
                         </p> 
                        <p className="text-align-center">Some simple text so you can see how awesome i am.</p>
                    </div>
                </div>
            </div>
        )
    }
}
