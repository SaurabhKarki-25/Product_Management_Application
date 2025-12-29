import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../API/config";
import { authHeader } from "../API/authheader";

export default function EditProduct() {
  const { id } = useParams();        // product id from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    Brand_Name: "",
    Item_name: "",
    stock: 0,
    status: "available",
    price: 0
  });

  // Fetch existing product data
  useEffect(() => {
    fetch(`${BASE_URL}/products`, {
      headers: authHeader()
    })
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p._id === id);
        if (product) {
          setForm({
            Brand_Name: product.Brand_Name,
            Item_name: product.Item_name,
            stock: product.stock,
            status: product.status,
            price: product.price
          });
        }
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //  Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    navigate("/dashboard/products");
  };

  if (loading) return <p className="p-8">Loading product...</p>;

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">


        <label>BRAND NAME:</label>
        <br/>
        <input
          name="Brand_Name" 
          placeholder="Brand Name"
          value={form.Brand_Name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />


        <label>ITEM NAME:</label>
        <br/>
        <input
          name="Item_name"
          placeholder="Item Name"
          value={form.Item_name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <label>No of Stocks (QUANTIY) :</label>
        <br/>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          min="0"
          required
        />
        
        
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          min="0"
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/products")}
            className="bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
