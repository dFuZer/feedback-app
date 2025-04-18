import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { getCategories, getFeedbacks } from "../../data/api";
import BentoGrid from "../BentoGrid";
import FeedbackForm from "../FeedbackForm";
import SearchBar from "../Searchbar";

const Main: React.FC = () => {
    const feedbackQuery = useQuery({
        queryKey: ["feedbacks"],
        queryFn: getFeedbacks,
    });
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const feedbacks = useMemo(() => feedbackQuery.data ?? [], [feedbackQuery.data]);
    type Feedback = (typeof feedbacks)[number];
    const [filteredSlides, setFilteredSlides] = useState<Feedback[]>([]);

    useEffect(() => {
        if (feedbackQuery.status === "success" && !initialLoaded) {
            setFilteredSlides(feedbackQuery.data!);
            setInitialLoaded(true);
        }
    }, [feedbackQuery.status]);

    useEffect(() => {
        console.log({ feedbacks, filteredSlides });
    }, [feedbacks, filteredSlides]);

    const onSearchButtonClick = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const filtered = feedbacks.filter(
            (slide) =>
                slide.title.toLowerCase().includes(lowerQuery) || slide.content.toLowerCase().includes(lowerQuery)
        );
        setFilteredSlides(filtered);
    };

    const handleCategoryClick = (categoryId: string | null) => {
        if (categoryId === null) {
            console.log(feedbacks);
            setFilteredSlides(feedbacks);
        } else {
            const filtered = feedbacks.filter((feedback) => feedback.category_id === categoryId);
            setFilteredSlides(filtered);
        }
    };

    return (
        <div className="pageWrapper">
            <FeedbackForm />
            <SearchBar onSearch={onSearchButtonClick} query={searchQuery} setQuery={setSearchQuery} />
            <div className="blocButton">
                <button className="buttonFilter" onClick={() => handleCategoryClick(null)}>
                    Toutes les catégories
                </button>
                {categoriesQuery.data?.map((category) => (
                    <button className="buttonFilter" onClick={() => handleCategoryClick(category.id)}>
                        {category.name}
                    </button>
                ))}
            </div>
            <BentoGrid slides={filteredSlides} />
        </div>
    );
};

export default Main;
