import React from 'react'
import { getAllNotesByUser } from '../services/note-service';

const HomeScreen = () => {

    getAllNotesByUser().then( resp => {
        console.log( resp );
    } )

    

    return (
        <div>
            <h2>Hola mundo</h2>



        </div>
    )
}

export default HomeScreen;
