import React from 'react'

export default function Add_materal() {
  return (
    <>
       <div className="w-full">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Add Material
          {/* {updateIdState ? "Update Color" : "Add Colors"} */}
        </h3>

        <form
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
        //   onSubmit={handleSubmit(onSubmit)}
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Category Name</label>
            <input
              type="text"
            //   {...register("colorName", { required: "Color Name is required" })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
            />
            {/* {errors.colorName && <p className="text-red-500 text-sm">{errors.colorName.message}</p>} */}
          </div>

         
          {/* Color Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number"
            //   {...register("colorOrder", {
            //     required: "Order is required",
            //     min: { value: 1, message: "Order must be at least 1" },
            //   })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
            {/* {errors.colorOrder && <p className="text-red-500 text-sm">{errors.colorOrder.message}</p>} */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >Add Material
            {/* {updateIdState ? "Update Color" : "Add Color"} */}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
