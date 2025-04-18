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
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className="main">
                <h2>Envoyer un feedback</h2>
                <form className="feedbackForm" onSubmit={handleSubmit}>
                    <label className="formLabel" htmlFor="title">
                        Titre :
                    </label>
                    <input
                        id="title"
                        className="formInput"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Saisissez un titre"
                    />

                    <label className="formLabel" htmlFor="category">
                        Catégorie :
                    </label>
                    <select
                        className="formSelect"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Choisir une catégorie</option>
                        {categories.data?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <label className="formLabel" htmlFor="message">
                        Message :
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Saisissez votre message"
                        rows={10}
                    />
                    <button className="secondButton" type="submit">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
