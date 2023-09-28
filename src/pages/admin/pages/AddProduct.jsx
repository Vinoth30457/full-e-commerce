import { useContext, useState } from "react";
import myContext from "../../../context/data/myContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/FirebaseConfig";
import Loader from "../../../components/loader/Loader";

function AddProduct() {
  const context = useContext(myContext);
  const { products, setProducts, addProduct, loading, setLoading } = context;
  // const [photo, setPhoto] = useState("");
  const [imageUpload, setImageUpload] = useState("");

  // const uploadFile = () => {
  //   if (!imageUpload) return;

  //   const imageRef = ref(storage, `images/${imageUpload.name}`);

  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setProducts({ ...products, imageUrl: url });
  //       console.log(url);
  //       setLoading(false);
  //     });
  //   });
  // };
  return (
    <div>
      {loading && <Loader />}
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={products.title}
              onChange={(e) =>
                setProducts({ ...products, title: e.target.value })
              }
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none "
              placeholder="Product price"
            />
          </div>
          <div className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none flex items-center">
            <label htmlFor="file">Product image : </label>
            <input
              type="file"
              name="imageurl"
              // value={products.imageUrl}
              // onChange={(e) =>
              //   setProducts({ ...products, imageUrl: e.target.value })
              // }
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
                    setProducts({ ...products, imageUrl: url });
                    console.log(url);
                    setLoading(false);
                  });
                });
              }}
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              value={products.category}
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="10"
              name="title"
              value={products.description}
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
              onClick={() => {
                addProduct();
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
