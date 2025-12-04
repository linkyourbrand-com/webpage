'use client';
import { useState, MouseEvent } from 'react';
import AuthForm from './AuthForm';
import './authdropdown.css';

type logType = {
    logReg: boolean;
}

export default function AuthDropdown() {
    const [logReg, setLogReg] = useState(true);
    const [open, setOpen] = useState(false);

    const toggleDown = () => setOpen(prev => !prev);

      const stopProp = (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        };

    const log = () =>{
        setLogReg(true);
        console.log("true");
    }
    const reg = () => {
        setLogReg(false);
        console.log("false");
    }

    return(
        <div className='dropdown'>
            <button type='button' className='btn btn-outline-primary' onClick={toggleDown}>Login/Signup</button>

            {open &&(
                <div className='dropdown-content p-3' onClick={stopProp}>
                    <div className='row'>
                        <button type='button' onClick={log} className='col'>Login</button>
                        <button type='button' onClick={reg} className='col'>Register</button>
                    </div>
                    <br></br>
                    
                    <div>
                        <AuthForm logReg={logReg}/>
                    </div>
                </div>
            )}

        </div>
    )
};