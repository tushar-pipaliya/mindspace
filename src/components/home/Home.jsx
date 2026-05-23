import React, { useState, useEffect } from "react";
import axios from "axios";
import { showSnackbar } from "../../utils/snackbarService";
import { Button } from "@mui/material";
import ViewCard from "../card/viewCard/viewCard";
import MainCard from "../card/mainCard/MainCard";


let localData;

function Home() {

    const [selectedValue, setSelectedValue] = useState({
        'mood': '',
        'activity': '',
        'desc': '',
        'date': ''
    });
    const [newCard, setNewCard] = useState([]);
    const [quote, setQuote] = useState("");
    const [localState, setLocalState] = useState(false);

    // Fetch quote when component mounts
    useEffect(() => {
        fetchQuoteHandle();
        getDate()
        setLocalState(true)
    }, []);

    useEffect(() => {
    if (localState) {
        const storedPreferencesString =
            localStorage.getItem('kshit');

        const dataConvertar =
            JSON.parse(storedPreferencesString) || [];

        setNewCard([...dataConvertar].reverse());
    }
}, [localState]);

    console.log(localData, 'localData')

    const getDate = () => {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months 0-based
        const year = today.getFullYear();
        const finalFormat = `${day}-${month}-${year}`;
        console.log(finalFormat, 'finalFormat');
        setSelectedValue(prev => ({
            ...prev,
            date: finalFormat
        }));
    };



    //FECTH DATA USING AXIOS FOR QUOTE
   const fetchQuoteHandle = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/quotes");
        const data = response.data;
        
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        
        const randomQuote = data.quotes[randomIndex];
        
        setQuote(`"${randomQuote.quote}" — ${randomQuote.author}`);
        
    } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Failed to fetch quote. Try again!");
    }
};
    // ===========================||Select box value select || ======================
    const moodOption = [
        { label: "😊Happy", value: "😊" },
        { label: "😃Neutral", value: "😃" },
        { label: "😒Sad", value: "😒" },
        { label: "😡Angry", value: "😡" },
        { label: "😩Tired", value: "😩" },
    ]
    const handleChange = (event) => {
        const { name, value } = event.target;

        setSelectedValue(prev => ({
            ...prev,
            [name]: value,

        }));
    };


    const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
        id: Date.now(),
        value: selectedValue
    };

    const oldData =
        JSON.parse(localStorage.getItem('kshit')) || [];

    const updatedData = [...oldData, newEntry];

    localStorage.setItem(
        'kshit',
        JSON.stringify(updatedData)
    );

    setNewCard([...updatedData].reverse());

    setSelectedValue({
        mood: '',
        activity: '',
        desc: '',
        date: ''
    });

    getDate();
};


    // =========================|| DELETE CARD ||=======================
    const handleDelete = (id) => {
        setNewCard(prevCards =>
            prevCards.filter(card => card.id !== id)
        );

        const storedData = JSON.parse(localStorage.getItem("kshit")) || [];
        const updatedData = storedData.filter(card => card.id !== id);
        localStorage.setItem("kshit", JSON.stringify(updatedData));
    };

    console.log(selectedValue, 'kshit------newcard parent')
   return (
<div className="main_div bg-blue-200 min-h-screen py-10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-44">
        {/* HERO SECTION */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Welcome to MindSpace 🌱
        </h1>

        <p className="text-center mt-5 font-semibold text-base sm:text-lg md:text-xl text-gray-600 px-3">
            Your Safe Space to Reflect & Grow.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <button className="rounded-full px-6 py-3 bg-white text-blue-600 font-bold hover:shadow-xl duration-300 w-full sm:w-auto">
                <a href="/#details">Start Journaling</a>
            </button>

            <button className="rounded-full px-6 py-3 bg-blue-600 text-white font-bold hover:shadow-xl duration-300 w-full sm:w-auto">
                <a href="/#entry">View My Entries</a>
            </button>
        </div>

        {/* QUOTE BOX */}
        <div className="max-w-5xl mx-auto mt-12">
            <div className="shadow-xl bg-white min-h-[150px] text-center py-6 px-5 rounded-xl flex flex-col justify-between">
                <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-600 break-words">
                    <i>{quote}</i>
                </p>

                <p
                    onClick={fetchQuoteHandle}
                    className="text-blue-500 hover:underline cursor-pointer font-medium mt-4"
                >
                    New Quote
                </p>
            </div>
        </div>

        {/* FORM */}
        <div className="max-w-5xl mx-auto mt-10 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full">
                <div
                    id="details"
                    className="shadow-xl bg-white py-6 rounded-xl w-full"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-center px-4">
                        How are you feeling today?
                    </h1>

                    {/* INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 sm:px-10 mt-6">
                        {/* Mood */}
                        <div className="w-full">
                            <p className="text-start mb-2 font-semibold">
                                Your Mood
                            </p>

                            <select
                                name="mood"
                                className="border-2 w-full p-3 rounded-xl outline-none"
                                value={selectedValue.mood}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Mood
                                </option>

                                {moodOption.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <div className="w-full">
                            <p className="mb-2 font-semibold">
                                Title
                            </p>

                            <input
                                value={selectedValue.activity}
                                name="activity"
                                maxLength={40}
                                onChange={handleChange}
                                required
                                className="border-2 w-full p-3 rounded-xl outline-none"
                                type="text"
                                placeholder="e.g. A peaceful morning walk (max 40 characters)"
                            />
                        </div>
                    </div>

                    {/* THOUGHT */}
                    <div className="px-5 sm:px-10 mt-5">
                        <label className=" block">
                            Your Thought

                            <textarea
                                value={selectedValue.desc}
                                required
                                name="desc"
                                onChange={handleChange}
                                placeholder="Write about your day, feelings, or anything your mind"
                                rows={6}
                                className="w-full border-2 rounded-2xl p-4 mt-2 resize-none outline-none"
                            />
                        </label>
                    </div>

                    {/* BUTTON */}
                    <div
                        id="entry"
                        className="flex justify-center mt-6 px-5"
                    >
                        <button
                            type="submit"
                            className="rounded-full px-8 py-3 bg-gradient-to-r text-white font-semibold from-indigo-500 via-purple-500 to-pink-500 hover:shadow-xl duration-200 w-full sm:w-auto"
                        >
                            Save Entry
                        </button>
                    </div>
                </div>
            </form>

            {/* JOURNAL TITLE */}
            <h1 className="text-2xl sm:text-3xl mt-10 font-bold text-center mb-4">
                My Journal 📔
            </h1>

            {/* EMPTY STATE */}
            {newCard?.length === 0 && (
                <div className="w-full max-w-5xl pb-10 transition-all duration-500 ease-in-out">
                    <div className="bg-white text-center py-6 px-5 rounded-xl shadow-lg">
                        <p className="font-semibold text-gray-600 text-sm sm:text-base">
                            "No entries yet. Start by writing your first journal entry!"
                        </p>
                    </div>
                </div>
            )}
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-5 mt-5">
            {newCard?.map(card => (
                <MainCard
                    key={card.id}
                    selectv={card.value}
                    deleteCardData={handleDelete}
                    id={card.id}
                />
            ))}
        </div>
    </div>
);
}

export default Home
