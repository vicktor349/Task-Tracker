import React from 'react'
import Button from './Button'

const Header = ({ onAdd,showAdd }) => {
    const title = 'Task Tracker';
    return (
        <div className='header'>
            <h1 style={{color:'green'}} >{title}</h1>
            <Button text={showAdd ? 'Close' : 'Add'} color='green' onClick={onAdd}/>
        </div>
    )
}

export default Header
