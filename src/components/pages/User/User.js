import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [userYear, setUserYear] = useState("");
  const [userphone, setUserPhone] = useState("");

  const [branch, setUserbranch] = useState("");
  const userCollection = collection(db, "users");
  const [show, setShow] = useState(false);
  const [rollno, setRollNO] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  //creating data
  const handleClick = async () => {
    await addDoc(userCollection, {
      email: userEmail,
      name: userName,
      rollno: rollno,
      branch: branch,
      year: userYear,
      phone: userphone,
    });
    alert("Data Added Successfully");
  };
  //get data

  useEffect(() => {
    const getUserList = async () => {
      const data = await getDocs(userCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    };
    getUserList();
  }, []);

  //handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const deleteVal = doc(db, "users", id);
      await deleteDoc(deleteVal);
      alert("Data Deleted Successfully");
    }
  };

  //handle update
  const handleUpdate = async () => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this user?"
    );
    if (confirmUpdate) {
      const updateDatabase = doc(db, "users", editUserId);
      await updateDoc(updateDatabase, {
        email: userEmail,
        name: userName,
        rollno: rollno,
        branch: branch,
        year: userYear,
        phone: userphone,
      });
      setShow(false);
      alert("Data Updated");
    }
  };

  //handle edit

  const handleEdit = async (id, rollno, name, phone, email, branch, year) => {
    setRollNO(rollno);
    setEditUserId(id);
    setUserName(name);
    setUserEmail(email);
    setUserbranch(branch);
    setUserYear(year);
    setUserPhone(phone);

    setShow(true);
  };

  return (
    <div>
      <h1 className="text-3xl mt-2 mb-3">Users</h1>

      <div className="text-lg flex justify-between rounded-md p-2 bg-[#4f46e5]  text-white">
        <li className="">Roll No</li>
        <li className="">Name</li>
        <li className="">Phone</li>
        <li className="">Email</li>
        <li className="">Branch</li>
        <li className="">Year</li>
        <li className="">
          <>EDIT</>
        </li>
      </div>

      <div className="mt-4 flex justify-between px-2 text-lg h-10 flex-wrap">
        <div className="w-screen text-center">
          <input
            value={rollno}
            onChange={(e) => setRollNO(e.target.value)}
            placeholder="roll no"
            className="m-2 border-4"
          ></input>

          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="name"
            className="m-2 border-4"
          ></input>
          <input
            value={userphone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="phone"
            className="m-2 border-4"
          ></input>
        </div>

        <div className="w-screen text-center">
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="email"
            className="m-2 border-4"
          ></input>
          <input
            value={branch}
            onChange={(e) => setUserbranch(e.target.value)}
            placeholder="branch"
            className="m-2 border-4"
          ></input>
          <input
            value={userYear}
            onChange={(e) => setUserYear(e.target.value)}
            placeholder="year"
            className="m-2 border-4"
          ></input>
        </div>

        <div className="w-screen text-center">
          {!show ? (
            <button onClick={handleClick} className="">
              Create
            </button>
          ) : (
            <button onClick={handleUpdate} className="">
              Update
            </button>
          )}
        </div>
      </div>

      <div className="mt-24 ">
        {userList.map((prop) => {
          return (
            <div
              className=" flex mt-2 justify-between border-2 rounded-md p-2 "
              key={prop.id}
            >
              <li className="">{prop.rollno}</li>
              <li className="">{prop.name}</li>
              <li className="">{prop.phone}</li>
              <li className="">{prop.email}</li>
              <li className="">{prop.branch}</li>
              <li className="">{prop.year}</li>
              <li className="flex">
                <FaEdit
                  className="mr-2"
                  onClick={() =>
                    handleEdit(
                      prop.id,
                      prop.rollno,
                      prop.name,
                      prop.phone,
                      prop.email,
                      prop.branch,
                      prop.year
                    )
                  }
                />{" "}
                <MdDelete onClick={() => handleDelete(prop.id)} />
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
