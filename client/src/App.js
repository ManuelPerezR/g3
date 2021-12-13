import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note'
function App() {
  const [newNote, setNewNote] = useState({title:'', text:''})
  const [editingNote, setEditingNote] = useState({title:'', text:'', state:false})
  const [notes, setNotes] = useState([])
    useEffect(() => {
      axios.get('/api/notes')
      .then(res => setNotes(res.data))
    }, [])

  const createNote = e =>{
    e.preventDefault()
    axios.post('/api/notes', { title:newNote.title, text:newNote.text })
    .then(res => setNotes(p => [res.data, ...p]))
    setNewNote(p => ({title:'', text:''}))
  }

  const editNote = (title, text) =>{
    setEditingNote(p =>( {...p, title:title, text:text, state:true}))
  }
  const confirmEdit = ( id, newNote, setter ) =>{
    axios.put(`/api/notes/${id}`, newNote)
    setNotes(notes.map(n =>(n._id === id ? newNote : n)))
    setter(p => ({...p, state:false}))
  }
  const deleteNote = id =>{
    const newList = []
    notes.forEach(n => n._id !== id ? newList.push(n) : null)
    axios.delete(`/api/notes/${id}`)
    .then(res => setNotes(newList))
  }
  const [formOn, setFormOn] = useState(false)
  return (
    <div className='main'>
      
      <button onClick={_ => setFormOn(p => !p)} className='main-btn'>
      {formOn ? 'Cancelar' : 'Crear Nota'}
      </button>

      <form className={`${formOn ? 'noteFormOn' : 'noteFormOff'}`} onSubmit={createNote}>
        <input onChange={e => setNewNote(p => ({...p, title:e.target.value}))} value={newNote.title} type='text' placeholder='Titulo'></input>
        <input onChange={e => setNewNote(p => ({...p, text:e.target.value}))} value={newNote.text} type='text' placeholder='Texto'></input>
        <button type='submit'>Crear Nota</button>
      </form>

      <div className='notesSection'>
      {notes.map(n =>(
          <Note n={n} editNote={editNote} confirmEdit={confirmEdit} deleteNote={deleteNote} />
      ))}
      </div>
    </div>
  );
}

export default App;
