import React, { useState } from 'react';

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!message || category == '' || !title ) {
            alert('Veuillez entrer un titre, un message et séléctionner une catégorie avant de soumettre.');
        } else {   
            alert('Votre feedback a été soumis !');
            setShowForm(false)
            setMessage(''); 
            setCategory('');
            setTitle('');
        }
    };

    const handleChange = (event:any) => {
        setMessage(event.target.value);
    };

    const handleCategory = (event:any) => {
        setCategory(event.target.value);
    };

    const handleTitle = (event:any) => {
        setTitle(event.target.value);
    };

    return (
        <div>
            {!showForm && (
                <div className='blocFirstButton'>
                    <button className='firstButton' onClick={() => setShowForm(true)}>Afficher le formulaire</button>
                </div>
            )}

            {showForm && (
                <>
            <div className='main'>
            <h2>Envoyer votre feedback</h2>
            <form onSubmit={handleSubmit}>

                <input type="text" value={title} onChange={handleTitle} placeholder='Titre :' />
                <label htmlFor="category">Choisir une catégorie :</label>
                <select id="category" value={category} onChange={handleCategory}>
                    <option value=""></option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>

                <textarea value={message} onChange={handleChange} placeholder="Écrivez votre message ici" rows={10} />
                <br />
                <button className='secondButton' type="submit">Envoyer</button>
            </form>
            </div>
            </>
            )}
        </div>
    );
};

export default Main;
