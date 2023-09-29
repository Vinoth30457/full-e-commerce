import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import "./signUp.css";
import img from "./pro.webp";

import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { auth, fireDB, storage } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
// import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  // const currentUser = useAuth();
  const [photo, setPhoto] = useState("");
  // let photo = "";
  // function handleClick() {
  //   upload(photo, currentUser);
  // }
  const [imageUpload, setImageUpload] = useState(
    `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fprofile-icon-png&psig=AOvVaw2m4leayCODN04tOF7_sjxt&ust=1695980556676000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMiO6IaCzYEDFQAAAAAdAAAAABAK`
  );

  const uploadFile = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhoto(url);
        console.log(url);
        setLoading(false);
      });
    });
  };

  console.log(photo);

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "" || photo === "") {
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      console.log(users);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        photo: photo,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);

      toast.success("Signup Succesfully");
      setName("");
      setEmail("");
      setPassword("");

      setLoading(false);
    } catch (error) {
      console.log(error.message);

      if (error == `auth/email-already-in-use`) {
        toast.error("email id already used");
      }
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div className="profile-container">
          <img src={photo ? photo : img} alt="" className="profile-photo" />
          <div className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none flex items-center ">
            <label htmlFor="file">Profile Photo</label>
            <input
              type="file"
              id="file"
              // value={photo}
              // onChange={(event) => {
              //   setImageUpload(event.target.files[0]);
              // }}
              onChange={(e) => {
                // setImageUpload(e.target.files[0]);
                setLoading(true);

                // if (!imageUpload) return;

                const imageRef = ref(
                  storage,
                  `product/${e.target.files[0].name}`
                );
                uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    setPhoto(url);
                    console.log(url);
                    setLoading(false);
                  });
                });
              }}
              // onChange={(e) => {
              //   if (e.target.files[0]) {
              //     setPhoto(e.target.files[0]);
              //   }
              // }}
              placeholder="Profile photo"
              title="Profile Photo"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>

        <div className=" flex justify-center mb-3">
          <button
            disabled={loading || !photo}
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
            onClick={() => {
              signup();
            }}
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
