import { useEffect, useState } from "react";
import { BASE_URL } from "../API/config";
import { authHeader } from "../API/authheader";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`, {
      headers: authHeader()
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(fetchProducts, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: authHeader()
    });

    fetchProducts();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
  <tr>
    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
      Brand
    </th>
    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
      Item
    </th>
    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
      Price
    </th>
    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-40">
      Actions
    </th>
  </tr>
</thead>

        <tbody>
         {products.map((p) => (
  <tr
    key={p._id}
    className="border-b  hover:bg-gray-50 transition-colors"
  >
    <td className="px-4 py-3 font-medium text-gray-800">
      {p.Brand_Name}
    </td>

    <td className="px-4 py-3 text-gray-600">
      {p.Item_name}
    </td>

    <td className="px-4 py-3 font-semibold text-gray-900">
      ₹{p.price}
    </td>

    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <Link
          to={`/dashboard/products/edit/${p._id}`}
          className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-200 transition"
        >
           Edit
        </Link>

        <button
          onClick={() => deleteProduct(p._id)}
          className="inline-flex items-center rounded-md bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-200 transition"
        >
           Delete
        </button>
      </div>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </>
  );
}
