import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); 
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <Layout>
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">firstName</th>
            <th className="px-4 py-2">LastName</th>
            <th className="px-4 py-2">phone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">username</th>
            
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              {/* Display additional user data in table cells */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
}

export default Users;
