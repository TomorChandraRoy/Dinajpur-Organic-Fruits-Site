import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { BeatLoader } from "react-spinners";

export default function AddProductForm({ handleAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [isUploading, setIsUploading] = useState(false);

  // আপনার ImgBB API Key এখানে দিন (https://api.imgbb.com/ থেকে ফ্রিতে খুলে নিতে পারবেন)
  const image_hosting_key = "80953c9ba7633597fe550e40b1a466bb";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      let imageUrls = [];
      const imageFiles = data.image;

      // ৫টির বেশি ছবি চেক করা হচ্ছে
      if (imageFiles && imageFiles.length > 5) {
        swal("Error!", "You can only upload a maximum of 5 images.", "error");
        setIsUploading(false);
        return;
      }

      // লুপ চালিয়ে সবগুলো ছবি ImgBB তে আপলোড করা
      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          const formData = new FormData();
          formData.append("image", imageFiles[i]);

          const imgRes = await fetch(image_hosting_api, {
            method: "POST",
            body: formData,
          });
          const imgData = await imgRes.json();
          if (imgData.success) {
            imageUrls.push(imgData.data.display_url);
          }
        }
      }

      const productData = {
        ...data,
        price: Number(data.price),
        orig: Number(data.orig || 0),
        stock: Number(data.stock),
        weight: Number(data.weight || 0),
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        image: imageUrls, // ImgBB থেকে পাওয়া URL-এর অ্যারে ডাটাবেজে পাঠানো হচ্ছে
      };
      console.log(productData, "productDataf");

      // ডেটাবেজে সেভ করার জন্য API Call
      const res = await axiosPublic.post("/create-product", productData);
      swal("Success!", "Product added successfully to database!", "success");
      reset();

      // লোকাল স্টেট আপডেট করে সাথে সাথে ড্যাশবোর্ডে দেখানোর জন্য
      if (handleAddProduct) {
        handleAddProduct(res.data?.product || productData);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      swal("Error!", "Failed to add product", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">
            Add Product
          </h3>
        </div>
        <p className="text-xs font-medium text-gray-400">Home / Add Product</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <h4 className="text-sm font-black text-gray-700 mb-5">
            Products Description
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Product Name
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
              />
              {errors.name && (
                <span className="text-xs text-red-500">Name is required</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Category
              </label>
              <select
                {...register("cat", { required: true })}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none text-gray-600"
              >
                <option value="">Select Category</option>
                <option value="Lychee">Lychee</option>
                <option value="Banana">Banana</option>
                <option value="Mango">Mango</option>
                <option value="Papaya">Papaya</option>
                <option value="Jujube">Jujube</option>
                <option value="Shidol">Shidol</option>
                <option value="Beaten Rice">Beaten Rice</option>
                <option value="Papad">Papad</option>
                <option value="Sugondhi Rice">Sugondhi Rice</option>
              </select>
              {errors.cat && (
                <span className="text-xs text-red-500">
                  Category is required
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Badge
              </label>
              <select
                {...register("badge")}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none text-gray-600"
              >
                <option value="">No Badge</option>
                <option value="hot">Hot</option>
                <option value="sale">Sale</option>
                <option value="new">New</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Tags (Comma separated)
              </label>
              <input
                {...register("tags")}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                placeholder="Organic, Fresh, Sweet"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Description
              </label>
              <textarea
                {...register("desc", { required: true })}
                className="min-h-35 w-full resize-none rounded-md border border-gray-300 px-4
                 py-3 outline-none"
                placeholder="Product description..."
              />
              {errors.desc && (
                <span className="text-xs text-red-500">
                  Description is required
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <h4 className="text-sm font-black text-gray-700 mb-5">
            Pricing, Stock & Dimensions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Original Price (orig)
              </label>
              <input
                type="number"
                {...register("orig")}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Sale Price
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                placeholder="0"
              />
              {errors.price && (
                <span className="text-xs text-red-500">Price is required</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Stock
              </label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                placeholder="1"
              />
              {errors.stock && (
                <span className="text-xs text-red-500">Stock is required</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Availability Status
              </label>
              <select
                {...register("availability")}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none text-gray-600"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("weight")}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <h4 className="text-sm font-black text-gray-700 mb-5">
            Products Images
          </h4>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Upload Image
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("image", { required: true })}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">
              You can select up to 5 images.
            </p>
            {errors.image && (
              <span className="text-xs text-red-500">Image is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold
             text-gray-500 hover:bg-gray-50 transition-all"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-all disabled:bg-gray-400 flex items-center justify-center min-w-35"
          >
            {isUploading ? (
              <BeatLoader color="#fff" size={8} />
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
