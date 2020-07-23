import React, {Component} from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import './todos.css';

const ExampleModal = () => {
    
        const [open, setOpen] = React.useState(false)

        return (
            <div>
                <button className="button" onClick={() => setOpen(true)}>
                    Open modal1
                </button>
                
                <Modal open={open} onClose={() => setOpen(false)}>
                    <h2>Try tabbing/shift-tabbing thru elements</h2>
                    <form action="">
                    <p>
                        <label htmlFor="firstName">
                        First name
                        <input type="text" />
                        </label>
                    </p>
                    <p>
                        <label htmlFor="lastName">
                        Last name
                        <input type="text" />
                        </label>
                    </p>
                    <button>Cancel</button>
                    <input type="submit" value="Submit" />
                    </form>
                </Modal>
            </div>    
        );
    
}


export default ExampleModal;