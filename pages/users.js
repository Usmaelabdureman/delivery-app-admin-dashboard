'use client'
import React, { useState } from "react";
import mockData from "@/mockData.json";
import Layout from "@/components/Layout";

export default function Users() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = mockData
    .filter((val) => {
      if (search === "") {
        return val;
      } else if (
        val.first_name.toLowerCase().includes(search.toLowerCase()) ||
        val.last_name.toLowerCase().includes(search.toLowerCase()) ||
        val.email.toLowerCase().includes(search.toLowerCase()) ||
        val.phone.toLowerCase().includes(search.toLowerCase())
      ) {
        return val;
      }
    })
    .slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    mockData.filter((val) => {
      if (search === "") {
        return val;
      } else if (
        val.first_name.toLowerCase().includes(search.toLowerCase()) ||
        val.last_name.toLowerCase().includes(search.toLowerCase()) ||
        val.email.toLowerCase().includes(search.toLowerCase()) ||
        val.phone.toLowerCase().includes(search.toLowerCase())
      ) {
        return val;
      }
    }).length / rowsPerPage
  );

  // Change the current page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
    
        {/* search functionality */}
        <div className="grid grid-rows-1 grid-flow-col gap-4 ml-6 ">
        <div className="">
          <input
            type="text"
            placeholder="Search by email,phone,firstname,lastname"
            className="border border-slate-500  m-5 rounded-sm justify-center items-center"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          
        </div>
        <div className="justify-center flex m-4"><button className="btn-primary">Manage User</button></div>
        
        </div>
        <div className="flex justify-center">
          {/* table */}
          <table className="border table-auto border-slate-500 mb-3 justify-center border-b-2">
            <thead>
              <tr className="bg-gray-200 text-gray-600  text-sm leading-normal">
                <th className="border border-slate-600">No</th>
                <th className="border border-slate-600">FirstName</th>
                <th className="border border-slate-600">LastName</th>
                <th className="border border-slate-600">Email</th>
                <th className="border border-slate-600">Phone</th>
                <th className="border border-slate-600">Gender</th>
                <th className="border border-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="text-black  text-md  font-light">
              {/* display current page rows */}
              {currentRows.map((val, key) => {
                return (
                  <tr key={key} className="border-b border-gray-700 hover:bg-gray-100">
                    <td className="border border-collapse px-3">{val.id}</td>
                    <td className="px-6 border">{val.first_name}</td>
                    <td className="px-6 border">{val.last_name}</td>
                    <td className="px-6 border">{val.email}</td>
                    <td className="px-6 border">{val.phone}</td>
                    <td className="px-6 border">null</td>
                    <td className="text-green-800 font-serif px-6 border">Active</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center mt-5">
          {Array.from(Array(totalPages), (e, i) => {
            return (
              <button
                key={i}
                className={`${
                  i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                } py-1 px-3 mx-1 rounded`}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      
    </Layout>
  );
}