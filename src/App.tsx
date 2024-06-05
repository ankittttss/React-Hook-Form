import React from "react";
import "./App.css";
import { useForm,useFieldArray } from "react-hook-form";

// useFieldArray -: Hook help you to deal with dynamic Field. Workd with only Objects Fields
type FormValues = {
  username: string;
  email: string;
  password: string;
  social: {
    // We are using this for
    twitter: string;
    facebook: string;
  };

  phoneNumbers: string[]; // To deal with arrays
  phNumbers:{
    number:string
  }[]

};

// Custom Validation -: We add key value in register Object
// Validate Can be a Object

export default function App() {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      return {
        username: "",
        email: data.email,
        password: "",
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        phNumbers:[{number:""}] // Dynamic Field 
      };
    },
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Form</h1>

      {/* <h2>Watched value: {watchUsername}</h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different Email Address"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            {...register("password", {
              minLength: 6,
              required: {
                value: true,
                message: "Password is Required",
              },
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: " The Field Required",
              },
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}
