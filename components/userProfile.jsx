import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
const UserProfile = () => {
    const {data: session} = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(session?.user?.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation or update the user name in the backend

    // Assuming the save operation is successful, exit editing mode
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="flex bg-gray-300 gap-1 text-black  rounded-lg overflow-hidden ml-2 w-1/3">
      <img src={session?.user?.image} alt="profile Image" className="w-12 rounded-full h-12" />
      {isEditing ? (
        <input type="text" value={userName} onChange={handleChange} className="px-2" />
      ) : (
        <span className="px-2">{userName}</span>
      )}
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit} className='mr-0 ml-20 flex relative'>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
