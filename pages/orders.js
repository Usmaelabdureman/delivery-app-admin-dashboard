import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, [])
  function fetchOrders() {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }
  function deleteOrder(order){
    Swal.fire({
      title: 'Are you sure you want delete it? ',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result) {
        const {_id} = order;
        await axios.delete('/api/orders?='+_id);
        fetchOrders();
        Swal.fire(
         
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })}
  
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <h1 className="text-3xl">Currently there is no order</h1>
      </div>
    );
  }

  // const deleteOrder=(order)=>{
  //   Swal.fire({
  //     title: 'Are you sure you want delete it? ',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then( async (result) => {
  //     if (result) {
  //       const {_id} = order;
  //       await axios.delete('/api/orders?_id='+_id);
  //       fetchOrders();
  //       Swal.fire(
         
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })}

 
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {orders?.length > 0 && orders.map(order => (
          <tr key={order._id}>
            <td>{(new Date(order.createdAt)).toLocaleString()}
            </td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'YES' : 'NO'}
            </td>
            <td>
              {order.name} {order.email}<br />
              {order.city} {order.postalCode} {order.country}<br />
              {order.streetAddress}
            </td>
            <td>
              {order.line_items.map(l => (
                <>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br />
                </>
              ))}
            </td>
            <td>
            <button
                  onClick={() => deleteOrder(order)}
                  className="btn-red">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  );
}
