import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const manager = () => {
  const [showPass, setshowPass] = useState(false);
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
    id: "",
  });
  const emptyForm = { site: "", username: "", password: "", id: "" };
  const [data, setdata] = useState([]);

  useEffect(() => {
    const datas = localStorage.getItem("saves");
    if (datas) {
      setdata(JSON.parse(datas));
    }
  }, []);

  const savePassword = (GetData) => {
    localStorage.setItem("saves", JSON.stringify(GetData));
    setform(emptyForm);
  };

  const addBtn = () => {
    if (form.site.length < 3 || form.password.length < 3) {
      toast.error("Password can't be saved", {
        autoClose: 500,
      });
      return;
    }
    const id = uuidv4();
    const setData = [...data, { ...form, id }];
    setdata(setData);
    setform({ ...form, id });
    savePassword(setData);
    toast.success("Password saved!", {
      autoClose: 1500,
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    //   console.log(form)
  };

  const copyText = (text) => {
    toast("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  const editBtn = (id) => {
    const item = data.find((item) => item.id === id);
    if (!item) return;

    setform({
      site: item.site,
      username: item.username,
      password: item.password,
      id: item.id,
    });

    setdata((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteBtn = (id) => {
    let confirmation = confirm("Are you sure you want to delete?");
    if (!confirmation) return;
    let datas = data.filter((item) => item.id != id);
    savePassword(datas);
    setdata(datas);
    toast.success("Password removed from vault", {
      autoClose: 2000,
    });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="flex justify-center overflow-hidden min-h-[calc(100vh-7.02rem)]">
        <div className="flex flex-col gap-4 pt-4 md:pt-13 w-screen md:w-3/4 pb-2">
          <div className="header-content">
            <div className="title pb-4.5">
              <div className="logo text-center font-bold text-4xl">
                <span className="text-green-500">&lt;</span>Pass
                <span className="text-green-500">OG&#47;&gt;</span>
              </div>
              <p className="text-center text-zinc-500 font-medium text-xl">
                Your own Password Manager
              </p>
            </div>
            <div className="inputs-btns px-5 md:px-0 flex gap-6 flex-col">
              <input
                value={form && form.site}
                onChange={handleChange}
                name="site"
                className="rounded-full bg-white p-4 py-1 border border-green-500"
                placeholder="Enter website URL"
                type="text"
              />
              <div className="more-input flex flex-col md:flex-row gap-6 md:gap-7">
                <input
                  value={form && form.username}
                  onChange={handleChange}
                  name="username"
                  className="rounded-full bg-white p-4 py-1 flex-1 border border-green-500"
                  placeholder="Enter Username"
                  type="text"
                />
                <div className="relative">
                  <input
                    value={form && form.password}
                    onChange={handleChange}
                    name="password"
                    className="rounded-full w-full md:w-fit bg-white p-4 py-1 border border-green-500"
                    placeholder="Enter Password"
                    type={showPass ? "text" : "password"}
                  />
                  <span
                    onClick={() => {
                      setshowPass(!showPass);
                    }}
                    className="material-symbols-outlined absolute right-2 bottom-1 cursor-pointer"
                  >
                    {showPass ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>
              <div className="save-btn flex justify-center">
                <button
                  onClick={addBtn}
                  className="flex items-center gap-2 border border-green-800 p-4 py-2 md:p-8 md:py-3 leading-none rounded-full bg-green-400 hover:bg-green-300 cursor-pointer overflow-hidden"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover"
                    style={{ width: 26, height: 26, display: "block" }}
                  ></lord-icon>{" "}
                  <span className="font-medium">Save</span>{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="passwords pb-5">
            <h2 className="font-bold text-xl px-3 md:px-0 py-2.5">
              Your Passwords
            </h2>
            {data.length === 0 ? (
              <div className="text-zinc-700 px-3 md:px-0">
                No Passwords to Show
              </div>
            ) : (
              <table className="table-auto w-full md:overflow-hidden md:rounded-sm ">
                <thead className="py-2 bg-green-800 text-white">
                  <tr>
                    <th className="py-1.5 text-[0.9rem] md:text-base">Site</th>
                    <th className="py-1.5 text-[0.9rem] md:text-base">
                      Username
                    </th>
                    <th className="py-1.5 text-[0.9rem] md:text-base">
                      Password
                    </th>
                    <th className="py-1.5 text-[0.9rem] md:text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {data.map((item, index) => {
                    return (
                      <tr key={item.id} className="border-b border-green-200">
                        <td className="text-center py-2">
                          <div className="flex justify-center items-center gap-1">
                            <a
                              href={`https://${item.site}`}
                              target="_blank"
                              className="text-blue-300 max-w-[4ch] sm:max-w-none truncate text-[0.9rem] md:text-base"
                            >
                              {item.site}
                            </a>
                            <div
                              onClick={() => {
                                copyText(item.site);
                              }}
                              className="lordIconCopy"
                            >
                              <lord-icon
                                className=" cursor-pointer py-1"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2">
                          <div className="flex justify-center  text-[0.9rem] md:text-base items-center gap-1">
                            <span className="max-w-[4ch] sm:max-w-none truncate">
                              {item.username}
                            </span>
                            <div
                              onClick={() => {
                                copyText(item.username);
                              }}
                              className="lordIconCopy"
                            >
                              <lord-icon
                                className=" cursor-pointer py-1"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2">
                          <div className="flex text-[0.9rem] md:text-base justify-center items-center gap-1">
                            <span className="max-w-[4ch] sm:max-w-none truncate">
                               {"*".repeat(item.password.length)}
                            </span>
                            <div
                              onClick={() => {
                                copyText(item.password);
                              }}
                              className="lordIconCopy"
                            >
                              <lord-icon
                                className=" cursor-pointer py-1"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2  ">
                          <div>
                            <span
                              onClick={() => {
                                editBtn(item.id);
                              }}
                            >
                              <lord-icon
                                className=" cursor-pointer py-1"
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              ></lord-icon>
                            </span>
                            <span
                              onClick={() => {
                                deleteBtn(item.id);
                              }}
                            >
                              <lord-icon
                                className=" cursor-pointer py-1"
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginLeft: "6px",
                                }}
                              ></lord-icon>
                            </span>
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
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
        pauseOnHover
        draggable
      />
    </>
  );
};

export default manager;
