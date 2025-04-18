import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCategories } from "../data/api";

interface FeedbackFormProps {
    onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
    const [message, setMessage] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!message || category === "" || !title) {
            alert("Veuillez entrer un titre, un message et séléctionner une catégorie avant de soumettre.");
        } else {
            alert("Votre feedback a été soumis !");
            setMessage("");
            setCategory("");
            setTitle("");
            onClose();
        }
    };

    return (
        <div className="main">
            <h2>Faire un feedback</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre :" />

                <label htmlFor="category">Choisir une catégorie :</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=""></option>
                    {categories.data?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message ici"
                    rows={10}
                />
                <br />
                <button className="secondButton" type="submit">
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
