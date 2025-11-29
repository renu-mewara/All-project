import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddSubCategory() {
  const [imageURL, setImageUrl] = useState('');
  useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imageURL}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imageURL]);
  const [categories, setcategories] = useState([])
  const parms = useParams();
  const [updatedid, setUpdatedid] = useState('');
  const navigate = useNavigate();
  const [subcategoriesdetails, setsubcategoriesdetails] = useState('');
  const [parentcategories, setparentcategories] = useState('');

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUB_CATEGORIES_URL}/view-categories/`,{
      id: parentcategories
    },)

      .then((result) => {
        if (result.data._status == true) {
          setcategories(result.data._data)
        } else {
          setcategories([]);
        }
      })
      .catch(() => {
        toast.error('Something went wrong !!');
      })
  }, [parentcategories]);
  useEffect(() => {
    if (parms.id && parms.id !== 'undefined') {
      setUpdatedid(parms.id);
      axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUB_CATEGORIES_URL}/detail/${parms.id}`)
        .then((result) => {
          if (result.data._status === true) {
            setsubcategoriesdetails(result.data._data);
            if (result.data._status == true) {
              setImageUrl(`${result.data._image_url}${result.data._data.image}`)
            }
          } else {
            setsubcategoriesdetails('');
          }
        })
        .catch(() => toast.error('Something went wrong !!'));
    }
  }, [parms]);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!updatedid) {
      axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUB_CATEGORIES_URL}/create`, formData)
        .then((result) => {
          if (result.data._status === true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/subcategory/view')
          } else {
            toast.error(result.data._message);
          }
        })
        .catch((error) => {
          toast.error('Error adding categories:');
        });

    } else {
      axios.put(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUB_CATEGORIES_URL}/update/${parms.id}`, formData)
        .then((result) => {
          if (result.data._status === true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/subcategory/view')
          } else {
            toast.error(result.data._message);
          }
        })
        .catch((error) => {
          console.log("error response")
          toast.error('Error adding categories:');
        });
    }
  }
  return (
    <section className="w-full">
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updatedid ? "Update Sub Category" : "Add Sub Category"}
          </h3>
          <form onSubmit={formSubmitHandler} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  className="dropify"
                  data-height="230"
                />
              </div>
              <div className="w-2/3">
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block  text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    name="parent_categories_id"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      categories.map((v, i) => {
                        return (
                          <option value={v._id} selected="selected"> {v.name}</option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="name"
                    defaultValue={subcategoriesdetails.name}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="text"
                    id="order"
                    name="order"
                    defaultValue={subcategoriesdetails.order}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Order"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updatedid ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
