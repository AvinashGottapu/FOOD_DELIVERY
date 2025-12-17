import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  }; // NAME AND VALUE ARE GIVEN BY THE FUNCTION CALLER...

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    // Axios is used to send data from your frontend to your backend using a POST request.
    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setimage(false);
      toast.success(response.data.message) 
      // for showing toast notifications.  => EITHER SUCCESS OR ERROR..
    } else { 
       toast.error(response.error.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p> Upload Image </p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
             required />
            {/* URL.createObjectURL(file) is used for Image Preview Before Upload */}
            {/* URL.createObjectURL(image) Creates a temporary URL pointing to that file in browser memory */}
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p> Product Name </p>
          <input
            type="text"
            onChange={onchangehandler}
            value={data.name}
            name="name"
            placeholder="Type Here"
          required />
        </div>
        <div className="add-product-description flex-col">
          <p> Product Description </p>
          <textarea
            onChange={onchangehandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content Here"
            required
          >
            {" "}
          </textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p> Product Category </p>
            <select
              name="category"
              onChange={onchangehandler}
              value={data.category}
           required >
              <option value="Salad">Salad</option>
              <option value="Rolls"> Rolls </option>
              <option value="Desert"> Desert </option>
              <option value="Sandwich"> Sandwich </option>
              <option value="Cake"> Cake </option>
              <option value="Pure Veg"> Pure Veg </option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles"> Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p> Product Price </p>
            <input
              onChange={onchangehandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
