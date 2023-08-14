import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "../Redux/addProducts";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"

const AddProduct = () => {
  
  const dispatch = useDispatch();

  
  const [state, setState] = useState({
    title: "",
    price: "",
    rating: "",
    link: "",
  });
  console.log(`state of product`, state);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // const createProduct = () => {
  //   try {
  //     dispatch(addProducts(state));
  //     toast.success(`Product added successfully`);
  //     setState({
  //       title: "",
  //       price: "",
  //       rating: "",
  //       link: "",
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };

  // return (
  //   <>
  //     <div className="bg-secondary">
  //     <form className="text-center ">
  //     <h2 className=' text-white h2'>Create Product</h2>
  //     <h5 className="text-warning">Create Now!</h5>
  //     <label className='text-white h5 m-1'>Title :</label>
  //     <input type="text" name="title" value={state.title} onChange={handleChange}/>
  //     <br/><br/>
  //     <label className='text-white h5 m-1'>Price :</label>
  //     <input type="number" name="price" value={state.price} onChange={handleChange}/>
  //     <br/><br/>
  //     <label className='text-white h5 m-1'>Rating :</label>
  //     <input type="number" name="rating" value={state.rating} onChange={handleChange}/>
  //     <br/><br/>
  //     <label className='text-white h5 m-1'>Link :</label>
  //     <input type="" name="link" value={state.link} onChange={handleChange}/>
  //     <br/>
  //     <button type="button" className="btn btn-lg bg-success text-white h2" onClick={createProduct}>Add</button>
      
  //    </form>
  //     </div>

  //   </>
  // );
};
export default AddProduct;
