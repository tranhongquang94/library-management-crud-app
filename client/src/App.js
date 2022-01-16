import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Input, Button, Table, Td } from "./style-components";

function App() {
  //State to store list of books
  const [bookList, setBookList] = useState([]);
  //State to store form value
  const [bookData, setBookData] = useState({
    id: "",
    name: "",
    author: "",
    status: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("/api/list")
      .then((res) => setBookList(res.data))
      .catch((err) => console.log(err));
  }, [isRefresh]);

  //Run when click on post/edit books
  const handleSubmit = (e, isEdit, bookData) => {
    e.preventDefault();
    const { id, name, author, status } = bookData;
    if (name === "") {
      alert("Please insert book's name");
      return;
    } else if (author === "") {
      alert("Please insert book's author");
      return;
    } else if (status === "") {
      alert("Please state book's status");
      return;
    }

    if (isEdit) {
      axios
        .post("api/edit", { id, name, author, status })
        .then((res) => {
          if (res.status === 200) {
            setBookData({
              id: "",
              name: "",
              author: "",
              status: "",
            });
            setIsEdit(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("api/add", { name, author, status })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
    setIsRefresh((prevState) => !prevState);
  };

  //Run when clicked on Edit Button
  const editBook = (id, name, author, status) => {
    setIsEdit(true);
    setBookData({ id, name, author, status });
  };

  //Run when clicked on Delete Button
  const deleteBook = (id) => {
    axios.post("api/delete", {id})
    .then(res => {
      if (res.status === 200) {
        setIsRefresh((prevState) => !prevState);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <h1>Library Management CRUD App</h1>
      <h2>{isEdit ? "Edit" : "Add"} Books</h2>
      <Form method="POST">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={bookData.name}
          onChange={(e) =>
            setBookData((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <Input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={(e) =>
            setBookData((prevState) => ({
              ...prevState,
              author: e.target.value,
            }))
          }
        />
        <Input
          as="select"
          name="status"
          defaultValue=""
          value={bookData.status}
          onChange={(e) =>
            setBookData((prevState) => ({
              ...prevState,
              status: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            Status
          </option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </Input>
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, isEdit, bookData)}
        >
          {isEdit ? "Edit" : "Post"} Book
        </Button>
      </Form>

      <h2>List of Books</h2>
      <Table>
        <thead>
          <tr>
            <Td as="th">id</Td>
            <Td as="th">Name</Td>
            <Td as="th">Author</Td>
            <Td as="th">Status</Td>
            <Td as="th">Action</Td>
          </tr>
        </thead>

        <tbody>
          {bookList?.map((book) => {
            const { id, name, author, status } = book;
            return (
              <tr key={id}>
                <Td>{id}</Td>
                <Td>{name}</Td>
                <Td>{author}</Td>
                <Td>{status}</Td>
                <Td className="action-btn-container">
                  <Button
                    edit
                    onClick={() => editBook(id, name, author, status)}
                  >
                    Edit
                  </Button>
                  <Button delete onClick={() => deleteBook(id)}>
                    Delete
                  </Button>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
