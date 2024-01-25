"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { getCookie, deleteCookie } from "cookies-next";

export default function NavBar() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [menudata, setMenudata] = useState([]);
  const [unqiMenu, setUnqimenu] = useState([]);
  const [roleId, setRoleId] = useState();
  const [isLogin, setLogin] = useState();

  async function fetchDataMenu() {
    //Fetching roleId from token
    try {
      const res = await fetch("/api/meToken");
      const data = await res.json();
      setRoleId(data.roleId);
      setLogin(data.isLogin);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchDataMenu();
  }, []);

  useEffect(() => {
    //Fetching Menu Id's based on role Id
    async function fetchData() {
      if (roleId) {
        const response = await fetch(
          `https://localhost:7063/api/RoleMenuMaps/${roleId}`
        );
        const data = await response.json();

        setData(data);
      }
    }
    fetchData();
  }, [roleId]);

  useEffect(() => {
    //fetching menu's based on menu Id
    if (data.length > 0) {
      data.map((i) => {
        fetch(`https://localhost:7063/api/Menus/${i.menuId}`)
          .then((res) => res.json())
          .then((data) =>
            setMenudata((prv) => {
              return [...prv, data];
            })
          );
      });
    }
  }, [data]);

  useEffect(() => {
    //push all menu into one array
    const menu = [];
    menudata.map((i) => menu.push(i.menuName));
    const unqiMenu = [...new Set(menu)];
    setUnqimenu(unqiMenu.sort());
  }, [menudata]);
  //After clicking signOut button remove the token and push to the login page
  async function signOuthandler(e) {
    try {
      const response = await fetch("/api/signout");
      router.push("/pages/login");
      window.location.reload();
      deleteCookie("isLogin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className=" w-full">
      {isLogin && (
        <nav className=" bg-slate-600 text-white  w-full">
          <div className=" grid grid-flow-col grid-cols-1">
            <ul className=" flex-row sm:flex">
              <li className=" m-4 p-2  hover:bg-blue-600 active:bg-red-700">
                <Link href="/">Home</Link>
              </li>
              {unqiMenu.map((m) => (
                <li
                  key={Math.random()}
                  className=" m-4 p-2 hover:bg-blue-600 active:bg-red-700"
                >
                  <Link href={`/pages/${m}`}>{m}</Link>
                </li>
              ))}
            </ul>
            <ul>
              <li className=" my-4 mx-5 p-2   hover:bg-blue-600 active:bg-red-700">
                <button onClick={signOuthandler}>SignOut</button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
