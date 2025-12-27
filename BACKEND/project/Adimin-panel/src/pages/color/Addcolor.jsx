import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddColor() {
  const [color, setColor] = useState('#ffffff');
  const { id } = useParams();              // 👈 direct id
  const [updatedid, setUpdatedid] = useState('');
  const navigate = useNavigate();
  const [colordetails, setcolordetails] = useState({});

  // 🔹 Fetch color detail only if id exists (Update case)
  useEffect(() => {
    if (id) {
      setUpdatedid(id);

      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COLOR_URL}/detail/${id}`
        )
        .then((result) => {
          if (result.data._status === true) {
            setcolordetails(result.data._data);
            setColor(result.data._data.code); // 👈 fix
          } else {
            setcolordetails({});
          }
        })
        .catch(() => {
          toast.error('Something went wrong !!');
        });
    }
  }, [id]);

  // 🔹 Form submit
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formdata = {
      name: event.target.name.value,
      code: color,
      order: event.target.order.value,
    };

    // ➕ Add Color
    if (!updatedid) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COLOR_URL}/create`,
          formdata
        )
        .then((result) => {
          if (result.data._status === true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/color/viewcolor');
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Error adding color');
        });
    }
    // ✏️ Update Color
    else {
      axios
        .put(
          `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COLOR_URL}/update/${updatedid}`,
          formdata
        )
        .then((result) => {
          if (result.data._status === true) {
            toast.success(result.data._message);
            event.target.reset();
            navigate('/color/viewcolor');
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Error updating color');
        });
    }
  };

  return (
    <div className="w-full px-10">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-4 rounded-t-md border border-slate-400">
          {updatedid ? 'Update Color' : 'Add Color'}
        </h3>

        <form
          autoComplete="off"
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={formSubmitHandler}
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Color Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={colordetails.name || ''}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
              required
            />
          </div>

          {/* Color Picker */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Color Picker
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <div
                className="w-10 h-10 border border-gray-400 rounded-md"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          </div>

          {/* Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Order
            </label>
            <input
              type="number"
              name="order"
              defaultValue={colordetails.order || ''}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg block w-full py-2.5 px-3"
              placeholder="Enter Order"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {updatedid ? 'Update Color' : 'Add Color'}
          </button>
        </form>
      </div>
    </div>
  );
}
