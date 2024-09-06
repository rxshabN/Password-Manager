import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    if (ref.current.src.includes("view-off-slash-stroke-rounded.svg")) {
      ref.current.src = "view-stroke-rounded.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "view-off-slash-stroke-rounded.svg";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4 }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    toast.info("Password saved!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    let c = confirm("Confirm password deletion?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.info("Password deleted!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast.info("Password edited!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const copyText = (text) => {
    toast.info("Copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose="3000"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <div className="mycontainer">
        <h1 className="text-4xl text-blue-500 text-center font-bold cursor-default">
          Hi there!
        </h1>
        <p className="text-white text-center cursor-default">
          A personal, efficient and effective password manager.
        </p>
        <div className="text-black flex flex-col p-4 gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-blue-400 w-full px-4 py-1"
            type="text"
            placeholder="Enter website URL"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-blue-400 w-full px-4 py-1"
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-blue-400 w-full px-4 py-1"
                type="password"
                placeholder="Enter Password"
                name="password"
                ref={passwordRef}
                id="password"
              />
              <span className="absolute right-0">
                <img
                  src="view-stroke-rounded.svg"
                  alt="eye"
                  className="show"
                  onClick={showPassword}
                  ref={ref}
                />
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={savePassword}
              className="text-white flex justify-center items-center gap-2 bg-blue-800 px-5 py-2 w-fit rounded-3xl"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                colors="primary:#ffffff"
              ></lord-icon>
              <span className="hover-underline-animation">Save Password</span>
            </button>
          </div>
        </div>
        <div className="passwords text-white">
          <h1 className="text-lg font-bold cursor-default hover-underline-animation">
            Your passwords
          </h1>
          {passwordArray.length === 0 && <div>No passwords to show.</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full my-3 rounded-md overflow-hidden">
              <thead className="bg-blue-900">
                <tr>
                  <th className="py-2 cursor-default">Website</th>
                  <th className="py-2 cursor-default">Username</th>
                  <th className="py-2 cursor-default">Password</th>
                  <th className="py-2 cursor-default">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-950">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 px-4 border-y-2 border-white text-center min-w-32">
                        <div className="flex justify-center items-center gap-4">
                          <a
                            href="{item.site}"
                            target="_blank"
                            className="truncate"
                          >
                            {item.site}
                          </a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#ffffff"
                            fill="none"
                            className="ml-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <path
                              d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y-2 border-white text-center min-w-32">
                        <div className="flex justify-center items-center gap-4">
                          {item.username}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#ffffff"
                            fill="none"
                            className="ml-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <path
                              d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y-2 border-white text-center min-w-32">
                        <div className="flex justify-center items-center gap-4">
                          {item.password.replace(/./g, "•")}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#ffffff"
                            fill="none"
                            className="ml-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <path
                              d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y-2 border-white text-center min-w-32">
                        <div className="flex justify-center items-center gap-4">
                          <div
                            className="flex justify-center items-center gap-4 cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <span>Delete</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              color="#ffffff"
                              fill="none"
                              className="cursor-pointer"
                            >
                              <path
                                d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M20 15L13 21.9995M20 22L13 15.0005"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>
                          </div>
                          /{" "}
                          <div
                            className="flex justify-center items-center gap-4 cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <span>Edit</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              color="#ffffff"
                              fill="none"
                              className="cursor-pointer"
                            >
                              <path
                                d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M13 4L20 11"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M14 22L22 22"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
