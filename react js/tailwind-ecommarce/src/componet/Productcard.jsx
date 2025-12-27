import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../ReduxToolkit/cartslice'   // path apne project ke hisab se

export default function Productcard({ data }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();   // <a> tag ka default roke
    dispatch(addToCart(data));
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img src={data.image} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            Brand: {data.brand_name ? data.brand_name : 'N/A'}
          </span>
          <span className="text-gray-400 mr-3 uppercase text-xs">
            category: {data.category_name}
          </span>

          <div className="flex items-center">
            <p className="text-lg font-semibold text-black my-3">{data.name}</p>

            <div className="ml-auto cursor-pointer" onClick={handleAddToCart}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                <path
                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1z" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
