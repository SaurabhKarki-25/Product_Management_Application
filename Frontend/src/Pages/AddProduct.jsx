import { useState } from "react";
import { BASE_URL } from "../API/config";
import { authHeader } from "../API/authheader";
import {Input} from "../Pages/Input"

export default function AddProduct() {
  const [form, setForm] = useState({
    Brand_Name: "",
    Item_name: "",
    stock: 0,
    status: "available",
    price: 0
  });

  const [success, setSuccess] = useState(false);
  const [addedItem, setAddedItem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "stock" && Number(value) < 5) {
        updated.status = "unavailable";
      }
      if (name === "stock" && Number(value) >= 5) {
        updated.status = "available";
      }

      return updated;
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setSuccess(true);
      setAddedItem(form.Item_name);

      // Reset form
      setForm({
        Brand_Name: "",
        Item_name: "",
        stock: 0,
        status: "available",
        price: 0
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

     =
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>

        <form onSubmit={submit} className="space-y-4">

          <Input label="Brand Name" name="Brand_Name" value={form.Brand_Name} onChange={handleChange} />
          <Input label="Item Name" name="Item_name" value={form.Item_name} onChange={handleChange} />

          <Input
            label="Stock Quantity"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              disabled={form.stock < 5}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                form.stock < 5 ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <Input
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Product Details
          </button>
        </form>
      </div>

      {/* RIGHT: SUCCESS PANEL */}
      <div className="flex items-center justify-center">
        {success && (
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow text-center animate-fade-in">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-green-700">
              Product Added Successfully
            </h3>
            <p className="text-gray-600 mt-2">
              Item: <span className="font-semibold">{addedItem}</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}



