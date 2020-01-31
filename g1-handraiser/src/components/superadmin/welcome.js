import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default function Welcome(props){
    let history = useHistory();
    const {keys} = props
    localStorage.setItem('key', keys)
    const [key, setKey] = useState()

    const submit = () => {
        // console.log(localStorage.getItem('key'), key.key)
        if(localStorage.getItem('key') === key.key){
            history.push('/admin')
        }else{
            alert('Wrong key, Admin!')
            window.location.reload(true)
        }
    }

    const handlechange = (e) => {
        let prevdata = Object.assign({}, key);
        prevdata[e.target.name] = e.target.value;
        setKey(prevdata);
    }
    return(
        <React.Fragment>
            <h1 style={{margin: 'auto 0px'}}>Welcome Admin! Insert the Admin key here</h1>
            <TextField name='key' onChange={handlechange}></TextField>
            <Button onClick={submit}>Proceed to Admin</Button>
        </React.Fragment>
    )
}