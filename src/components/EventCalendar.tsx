"use client"

import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id:1,
        title:"Parents’ Open Day",
        time:"8:00 AM - 4:00 PM",
        description:"An opportunity for parents to interact with teachers, view student work, and discuss academic progress.",
    },
    {
        id:2,
        title:" Annual Sports Day",
        time:"9:00 AM - 1:00 PM",
        description:"A day filled with athletic competitions, team games, and individual challenges, promoting teamwork and sportsmanship.",

    },
    {
        id:3,
        title:"Quiz Bowl Challenge",
        time:" 2:00 PM - 4:00 PM",
        description:"A thrilling quiz competition testing students' knowledge across various subjects and general trivia.",

    },
    
];


const EventCalendar = () => {
const [value, onChange] = useState<Value>(new Date());
    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar onChange={onChange} value={value} />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Event</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20}/>
            </div>
            <div className="flex flex-col gap-4">
                {events.map (event => (
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-tomSky even:border-t-tomPurple" key={event.id}>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300 text-sx">{event.time}</span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventCalendar;
