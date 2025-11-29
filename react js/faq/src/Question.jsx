import React from 'react'

export default function Question({ index, currentindex, setCurrentindex, data }) {
    const showanswer = (i) => {
        if (i === currentindex) {
            setCurrentindex(null);
        } else {
            setCurrentindex(i);
        }
    };

    return (
        <div className="question">
            <div className="question_series" onClick={() => showanswer(index)}>
                {data.question}
                <span>{index === currentindex ? '-' : '+'}</span>
            </div>
            <div className={index === currentindex ? 'answer' : 'answer display'}>
                {data.answer}
            </div>
        </div>
    );
}
