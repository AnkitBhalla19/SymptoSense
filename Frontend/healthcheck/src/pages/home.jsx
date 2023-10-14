import Header from "../components/header";
import home1 from "../assets/home1.jpg"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPreviousDisease } from "../services/firebase";
import { useContext } from "react";
import UserContext from "../context/user";
import { Typewriter } from "react-simple-typewriter";
import "react-simple-typewriter/dist";

export default function Home() {
    const [prevDisease, setPrevDisease] = useState();

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchDetails = async () => {
            await getPreviousDisease(user.uid).then((res) => {
                setPrevDisease(res);
            });
        };
        fetchDetails();
    }, []);

    return (
        <div>
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="text-left md:mr-6">
                            <h1 style={{ fontSize: '3rem', paddingTop: '3rem' }}>
                                <Typewriter
                                    words={['Welcome to SymptoSense', 'Your Health Assistant']}
                                    loop={0}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </h1>
                        </div>
                        <div className="md:w-1/2">
                            <img src={home1} alt="Check New Disease" className="mt-2 w-full pb-2 md:pb-0" />
                            <Link to="/check-symptoms">
                                <button className="font-semibold bg-blue-500 text-white px-4 py-4 rounded-md">Check For New Disease</button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col my-16 border-t-4 py-8">
                        <p className="font-bold text-gray-700 text-2xl py-4">Previous Records</p>
                        <div className="grid grid-cols-2">
                            {prevDisease && prevDisease?.map((disease) => (
                                <div className="border-4 px-4 py-4 rounded-md drop-shadow-md">
                                    <p className="flex justify-end text-sm font-semibold">{disease.dateCreated}</p>
                                    <p className="py-4"> <span className="font-semibold text-lg pr-4">Possible Diseases were:</span>
                                        {
                                            Object.entries(disease.possibleDiseases).map((disease) => (
                                                <li>
                                                    <span className="pr-4">{disease[0]}</span><span className="text-xs"> (Probability : {disease[1]})</span>
                                                </li>
                                            ))
                                        }
                                    </p>
                                    <p className="py-4"> <span className="font-semibold text-lg pr-4">Symptoms Faced:</span>
                                        {disease?.symptoms.map((symptom) => (
                                            <li className="capitalize ">{symptom}</li>
                                        ))}
                                    </p>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
