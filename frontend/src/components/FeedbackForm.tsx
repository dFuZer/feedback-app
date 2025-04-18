import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCategories } from "../data/api";
import { API_URL } from "../utils/env";

const FeedbackForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!message || category === "" || !title) {
            return alert("Veuillez entrer un titre, un message et séléctionner une catégorie avant de soumettre.");
        }
        
        try {
            const feedbackData = {
                title: title,
                content: message,
                categoryId: Number(category),
            };
            const response = await fetch(`${API_URL}/feedback/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(feedbackData),
            });
            if (!response.ok) {
                throw new Error("Une erreur s'est produite lors de l'envoi du feedback. Veuillez réessayer plus tard.");
            } else {
                alert("Votre feedback a été soumis !");
                setMessage("");
                setCategory("");
                setTitle("");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du feedback :", error);
            alert("Une erreur s'est produite lors de l'envoi du feedback. Veuillez réessayer plus tard.");
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
