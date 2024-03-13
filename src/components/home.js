import "../App.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Required"),
    lastName: yup.string().required("Last Name Required"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!loading) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8000/api/users",
          data
        );
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          reset();
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="userform">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          placeholder="  First Name..."
          {...register("firstName")}
        />
        <p>{errors.firstName?.message}</p>
        <input
          className="input"
          type="text"
          placeholder="  Last Name..."
          {...register("lastName")}
        />
        <p>{errors.lastName?.message}</p>
        <input
          className="input"
          type="text"
          placeholder="  Phone Number..."
          {...register("phone")}
        />
        <p>{errors.phone?.message}</p>

        {loading && <div>Loading...</div>}
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
