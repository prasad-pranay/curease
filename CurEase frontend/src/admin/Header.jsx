import React from 'react'
import BubbleMenu from '../component/BubbleMenu'

const Header = ({title,setCurrentPage}) => {

  return (

<BubbleMenu
  logo={<span className='uppercase font-bold text-black'>{title}</span>}
  setCurrentPage={setCurrentPage}
  menuAriaLabel="Toggle navigation"
  menuBg="#ffffff"
  menuContentColor="#111111"
  useFixedPosition={true}
  animationEase="back.out(1.5)"
  animationDuration={0.5}
  staggerDelay={0.12}
/>
  )
}

export default Header
