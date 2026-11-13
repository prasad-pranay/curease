import React from 'react'
import {motion} from 'framer-motion'

const Footer = ({darkMode}) => {
  return (
     <motion.p initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} className={`${darkMode?"text-gray-400":"text-gray-500"} pb-3 text-xs`}>By messaging us, you agree to our <a href="#" className="underline">Terms of
        Use</a> and confirm you've read our <a href="#" className="underline">Privacy Policy</a>.</motion.p>
  )
}

export default Footer
