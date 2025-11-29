import React, { useState } from 'react'
import Question from './question'
import faqs from './faqdata'    

export default function Accordian() {
    const [currentindex, setCurrentindex] = useState(null);

    return (
        <div className="main">
            {faqs.map((faq, i) => (
                <Question  key={i} data={faq} index={i} currentindex={currentindex} setCurrentindex={setCurrentindex}/>
            ))}
        </div>
    );
}
