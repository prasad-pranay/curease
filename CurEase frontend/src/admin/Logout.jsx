import React from 'react'

const Logout = () => {

    async function logOut(){
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/logout`, {
        method: "POST",
        credentials: "include", // sends cookie
        headers: {
          "Content-Type": "application/json",
        },
    })

    setTimeout(() => {
        window.location.href="/"
    }, 500);
}


  return (
    <div className="flex flex-col items-center bg-white dark:bg-blue-900/10 dark:border-transparent shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-gray-900 dark:text-gray-200 font-semibold mt-4 text-xl ">Are you sure?</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                Do you really want to continue? You will be<br />logged out.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button onClick={logOut} type="button" className="cursor-pointer w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition">
                    Confirm
                </button>
            </div>
        </div>
  )
}

export default Logout
