import React, { useState, useEffect } from "react";
import axios from "axios";
import { showSnackbar } from "../../utils/snackbarService";
import { Button } from "@mui/material";
import ViewCard from "../card/viewCard/viewCard";
import MainCard from "../card/mainCard/mainCard";


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
            let storedPreferencesString = localStorage.getItem('kshit');
            console.log(storedPreferencesString, 'kshit-without parse')
            const dataConvertar = JSON.parse(storedPreferencesString);
            console.log(dataConvertar, 'dataConvertar')
            setNewCard(dataConvertar)

        }

    }, [localState])

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

        const oldData = JSON.parse(localStorage.getItem('kshit')) || [];

        const updatedData = [...oldData, newEntry];

        localStorage.setItem('kshit', JSON.stringify(updatedData));

        setNewCard(updatedData.reverse());

        setSelectedValue({
            mood: '',
            activity: '',
            desc: '',
            date: ''
        });
        getDate()
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
        <div className='main_div bg-blue-200 h-screen'>
            <h1 className='main_titile text-5xl font-bold text-center pt-12 '>Welcome to MindSpace 🌱</h1>
            <p className='text-center mt-10 font-semibold text-xl text-gray-600'>Your Safe Space to Reflect & Grow.</p>
            <div className=''>
                <div className='btn text-center mt-10 w-2/2'>
                    <button className='rounded-full px-6 mr-6  py-2 bg-white text-blue-600 font-bold hover:shadow-xl duration-300'><a href="/#details">Start Journaling</a></button>
                    <button className='rounded-full px-6 py-2 bg-blue-600 text-white font-bold hover:shadow-xl duration-300'><a href="/#entry">View My Entries</a></button>
                </div>
            </div>


            <div className='box mt-30 w-2/2 '>
                <div className='shadow-xl bg-white h-36 text-center py-6 rounded-xl flex flex-col justify-between'>
                    <p className='font-semibold text-xl text-gray-600 '> <i>{quote}</i></p>
                    <p onClick={fetchQuoteHandle} className='text-blue-500  hover:underline cursor-pointer font-medium '>New Quote</p>
                </div>
            </div>

            <div className='box mt-10 w-2/2 justify-center flex-col items-center '>
                <form onSubmit={handleSubmit} >
                    <div id='details' className='shadow-xl bg-white  py-6 rounded-xl grid grid-cols-1 gap-4'>
                        <h1 className='text-3xl font-bold text-center'>How are you feeling today?</h1>
                        <div className='choose_type grid grid-cols-1 md:grid-cols-2 gap-4 px-10'>
                            <div className='w-full '>
                                <p className='text-start mb-1 font-semibold'>Your Mood</p>

                                <select
                                    name="mood"
                                    className="border-2 w-full p-2 rounded-xl"
                                    value={selectedValue.mood}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Mood</option>

                                    {moodOption.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className=''>
                                <p className='mb-1 font-semibold'>Title</p>
                                <input value={selectedValue.activity}

                                    name='activity'
                                    maxLength={40}
                                    onChange={handleChange} required className='border-2 w-full p-2 rounded-xl' type="text" placeholder="e.g. A peaceful morning walk (max 40 characters)" />
                                 
                            </div>
                        </div>
                        <div className='thought px-10 mt-3'>

                            <label className='mb-1 font-semibold'>
                                Your Thought
                                <textarea
                                    value={selectedValue.desc}
                                    required
                                    name='desc'
                                    onChange={handleChange}
                                    placeholder='Write about your day, feelings, or anything your mind'
                                    rows={6} className='w-full border-2 rounded-2xl p-2' />
                            </label>
                        </div>
                        <div id='entry' className='text-center'>
                            <button type='submit' className=' rounded-full px-6 py-2 bg-gradient-to-r  text-white font-semibold from-indigo-500 via-purple-500 to-pink-500 w-42 hover:shadow-xl/20 duration-150'>Save Entry</button>
                        </div>
                    </div>
                </form>
                <h1 className='text-3xl mt-10 font-bold text-center mb-4'>
                    My Journal 📔
                </h1>
                {newCard?.length === 0 && (
                    <div className='box  w-2/2 pb-10 journal  transition-all duration-500 ease-in-out'>


                        <div className='bg-white text-center py-6 rounded-xl'>
                            <p className='font-semibold text-gray-600'>
                                "No entries yet. Start by writing your first journal entry!"
                            </p>
                        </div>
                    </div>
                )}


            </div>
            <div className='grid grid-cols-4 gap-5 !pb-5'>
                {
                    newCard?.map(card => (
                        <MainCard key={card.id} selectv={card.value} deleteCardData={handleDelete} id={card.id} />
                    ))
                }
            </div>  
        </div>

    )
}

export default Home
