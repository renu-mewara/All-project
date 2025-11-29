import React from 'react'
import Productcard from './Productcard'

export default function Homeproduct({title, description, products }) {
    return (
        <>
            {/* <!-- title --> */}
            <div className="text-center p-10">
                <h1 className="font-bold text-4xl mb-4">{title}</h1>
                <h4 className="text-1xl">{description}</h4>
            </div>

            {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
            <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {
             products.map((v, i) => {
                                  return (
                                    <Productcard key={i} data={v} />
                                  )
                                })
                              }



            </section>


        </>
    )
}
