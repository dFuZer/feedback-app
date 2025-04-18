import getDb from "./db";

const sampleData = [
    {
        category_id: 1, // Enseignement & Encadrement
        title: "Professeur très disponible",
        content:
            "Le professeur est toujours disponible pour répondre à nos questions, que ce soit en cours ou par email. Il prend le temps d'expliquer les concepts difficiles et nous encourage à participer activement.",
    },
    {
        category_id: 1, // Enseignement & Encadrement
        title: "Méthode d'enseignement claire",
        content:
            "Les explications sont très claires et structurées. Le professeur utilise des exemples concrets qui nous aident à mieux comprendre les concepts théoriques.",
    },
    {
        category_id: 2, // Contenu pédagogique
        title: "Cours bien structuré",
        content:
            "Le contenu du cours est bien organisé et progressif. Les supports de cours sont complets et les ressources complémentaires sont très utiles pour approfondir les sujets.",
    },
    {
        category_id: 2, // Contenu pédagogique
        title: "Matériel pédagogique obsolète",
        content:
            "Certains supports de cours semblent datés et ne reflètent pas les dernières avancées dans le domaine. Il serait bénéfique de mettre à jour le matériel pédagogique.",
    },
    {
        category_id: 3, // Évaluations & Devoirs
        title: "Devoirs pertinents",
        content:
            "Les devoirs sont bien conçus et nous permettent d'appliquer les concepts vus en cours. Les délais sont raisonnables et les consignes sont claires.",
    },
    {
        category_id: 3, // Évaluations & Devoirs
        title: "Retour sur les examens",
        content:
            "Les corrections des examens sont détaillées et constructives. Le professeur prend le temps d'expliquer les erreurs communes et comment les éviter.",
    },
    {
        category_id: 4, // Organisation & Planning
        title: "Planning bien géré",
        content:
            "Le planning du cours est bien organisé avec des objectifs clairs pour chaque séance. Les changements de planning sont communiqués à l'avance.",
    },
    {
        category_id: 4, // Organisation & Planning
        title: "Problème de salle",
        content:
            "La salle attribuée est parfois trop petite pour le nombre d'étudiants. Il serait préférable d'avoir une salle plus adaptée pour le confort de tous.",
    },
    {
        category_id: 5, // Administration
        title: "Problème d'inscription",
        content:
            "J'ai rencontré des difficultés pour m'inscrire au cours via la plateforme administrative. Le support technique a mis plusieurs jours à répondre.",
    },
    {
        category_id: 5, // Administration
        title: "Documents administratifs",
        content:
            "Les documents administratifs sont facilement accessibles sur la plateforme en ligne. Les procédures sont clairement expliquées.",
    },
    {
        category_id: 6, // Autre
        title: "Suggestion d'amélioration",
        content:
            "Il serait intéressant d'organiser des sessions de révision en groupe avant les examens, animées par des étudiants plus avancés.",
    },
];

export async function addSampleDataToInitializedDatabase() {
    const db = getDb();

    for (const feedback of sampleData) {
        await db.run("INSERT INTO feedback (category_id, title, content) VALUES (?, ?, ?)", [
            feedback.category_id,
            feedback.title,
            feedback.content,
        ]);
    }
}
