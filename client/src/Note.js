import { useState, useEffect } from 'react';
const Note = ({ n, deleteNote, confirmEdit, editNote }) =>{

    const [editingNote, setEditingNote] = useState({title:'', text:'', state:false})
    useEffect(() => {
        setEditingNote(p => ({...p, text:n.text, title:n.title}))
    }, [n])

    return(
        <div className='note'>

        <input 
        className={`${editingNote.state ? 'input-note-on' : 'input-note-off'}`}
        onChange={e => setEditingNote(p => ({...p, title:e.target.value}))} 
        value={editingNote.title} type='text' placeholder='Titulo'
        disabled={!editingNote.state}
        ></input>

        <input 
        className={`${editingNote.state ? 'input-note-on' : 'input-note-off'}`}
        onChange={e => setEditingNote(p => ({...p, text:e.target.value}))} 
        value={editingNote.text} type='text' placeholder='Texto'
        disabled={!editingNote.state}
        ></input>
        <div >
          <button onClick={_ => deleteNote(n._id)}
                    >Eliminar Nota</button>
          <button  
          onClick={_ => setEditingNote(p => ({...p, state:true})) }
          style={{display:editingNote.state ? 'none' : ''}}>Editar Nota</button>
          <button onClick={_ => confirmEdit(n._id, { title:editingNote.title, text:editingNote.text }, setEditingNote)} 
            style={{display:editingNote.state ? '' : 'none'}} >Confirmar</button>
          <button onClick={_ => setEditingNote(p => ({...p, state:false})) } 
            style={{display:editingNote.state ? '' : 'none'}} >Cancelar</button>
        </div>
        
    </div>
    )
}

export default Note;