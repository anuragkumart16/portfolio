import './Components-CSS/navbar.css'
const Navbar = () => {
  return (
    <>
    <header>
        <nav>
            <div className="logo-holder">Anurag Kumar Tiwari</div>
            <ul className="nav-ul">
                <li className='montserrat-alternates-regular'>Home</li>
                <li className='montserrat-alternates-regular'>About</li>
                <li className='montserrat-alternates-regular'>Contact</li>
                <li className='montserrat-alternates-regular'>Projects</li>
                <li className='montserrat-alternates-regular'>Socials</li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Navbar
