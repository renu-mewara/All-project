import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../config/firebase';


export default function Viewquiz() {
  const [quizdata, setquizdata] = useState([]);
  useEffect(() => {
    const db = getDatabase(app);
    const getquiz = ref(db, 'quizzes/');
    onValue(getquiz, (quiz) => {

      // setquizdata(quiz.val())
      var getdata = quiz.val();

      var finalquiz = [];
      for (var index in getdata) {
        finalquiz = [getdata[index], ...finalquiz];
      }
      setquizdata(finalquiz);

    });

  }, [])
  return (
    <>
      <nav className="flex p-4 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
              <Link to="/" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">view quiz</Link>
            </div>
          </li>

        </ol>
      </nav>

      <nav className="bg-white dark:bg-gray-900 sticky max-w-screen-xl  z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mx-auto mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">view Quiz</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  s.No.
                </th>
                <th scope="col" className="px-6 py-3">
                  question
                </th>
                <th scope="col" className="px-6 py-3">
                  option 1
                </th>
                <th scope="col" className="px-6 py-3">
                  option 2
                </th>
                <th scope="col" className="px-6 py-3">
                  option 3
                </th>
                <th scope="col" className="px-6 py-3">
                  option 4
                </th>
                <th scope="col" className="px-6 py-3">
                  correct_option
                </th>
              </tr>
            </thead>
            <tbody>

              {
                quizdata.length > 0
                  ?
                  quizdata.map((v,i) => {
                     return(
     <tr key={i} className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {i+1}
                        </th>
                        <td className="px-6 py-4">
                          {v.Question}
                        </td>
                        <td className="px-6 py-4">
                          {v.option_1}
                        </td>
                        <td className="px-6 py-4">
                            {v.option_2}
                        </td>
                        <td className="px-6 py-4">
                            {v.option_3}
                        </td>
                        <td className="px-6 py-4">
                            {v.option_4}
                        </td>
                        <td className="px-6 py-4">
                            {v.correct_option}
                        </td>
                      </tr>
  )


                  })
                  :
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      NO RECORD FOUND
                    </th>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </nav>
      

    </>
  )
}
