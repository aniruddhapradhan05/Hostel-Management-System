import {AnimatePresence, motion} from "framer-motion"
import {FaBars, FaHome} from "react-icons/fa"
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BiMessageSquareDetail, BiSearch } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { FaCashRegister } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import {NavLink} from "react-router-dom"
import { useState } from "react";
const routes = [
    {
        path:"/",
        name:"Home",
        icon: <FaHome/>,
    },
    {
        path:"/student-detail",
        name:"Student Detail",
        icon: <BiMessageSquareDetail />,
    },
    {
        path:"/add-student",
        name:"Add Student",
        icon: <IoAdd />,
    },
    {
        path:"/delete-student",
        name:"Delete Student",
        icon: <MdDelete />,
    },
    {
        path:"/sign-in",
        name:"Sign In",
        icon: <CiLogin />,
    },
    {
        path:"/sign-up",
        name:"Sign Up",
        icon: <FaCashRegister />,
    },
    {
        path:"/setting",
        name: "Setting",
        icon : <IoSettingsOutline />
    }
]

export default function({children}){

    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen)
    }

    const inputAnimation = {
        hidden:{
            width:0,
            padding:0,
            opacity:0,
            transition:{
                duration:0.2,
            }
        },
        show:{
            width: "140px",
            padding: "5px 15px",
            opacity:1,
            transition:{
                duration: 0.2,
            }
        }
    }
    const showAnimation = {
        hidden:{
            width:0,
            padding:0,
            transition:{
                duration:0.5,
            }
        },
        show:{
            opacity:1,
            transition:{
                duration: 0.2,
            }
        }
    }

    return (
        <div className="main-container ">
            <motion.div animate={{width: isOpen?"220px":"45px"}}
            className=" bg-gray-700 ">

<div className="flex align-center justify-between">
        {isOpen && <h1 className=" whitespace-nowrap text-white font-bold p-1.5">H M S</h1>}
        
        <div className=" text-white p-1.5 text-2xl hover:cursor-pointer">
            <FaBars onClick={toggle}/>
        </div>
</div>
<div className="flex align-center mt-2 items-center ">
    <div className="text-white text-2xl px-2 py-5 font-bold hover:bg-slate-600 hover:cursor-pointer">
        <BiSearch/>
    </div>
    <AnimatePresence>
    {isOpen && (
        <motion.input className=" h-8 border-black border-2"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={inputAnimation} 
            placeholder="search ..."
        />
    )}
    </AnimatePresence>
</div>

        <section>
            {routes.map((route)=>(
                <NavLink className="flex text-white gap-3 px-2 py-3
                 hover:border hover:bg-slate-600"

                to={route.path} key= {route.name} >
                    <div className=" text-3xl">
                        {route.icon}
                    </div>
                    <AnimatePresence>
                        {isOpen && <motion.div className="text-1xl whitespace-nowrap"
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden">
                            
                            {route.name}
                            </motion.div>}
                    </AnimatePresence>
                </NavLink>
            ))}
        </section>
            
            <main>
                {children}
            </main>

            </motion.div>
        </div>
    )
}