import React from "react";
import './App.css';
import './Mobile.css';
import './css/skill.css';
import './css/contact.css';
import './css/project.css';
function App() {
  const frontendSkillArray = [
    ['HTML','Experienced'],
    ['JavaScript','Experienced'],
    ['CSS','Experienced'],
    ['Tailwind','Intermediate'],
    ['React','Intermediate'],
    ['Bootstrap','Experienced'],
  ]
  const backendSkillArray = [
    ['Node.js','Basic'],
    ['Express.js','Basic'],
    ['MongoDB','Basic'],
    ['MySQL','Intermediate'],
    ['Django','Intermediate'],
    ['Firebase','Basic'],
  ]

  const myProjects =[
    ['project-img/acrossdevice.png','Across Device','https://github.com/AcrossDevice/AcrossDevice.github.io.git','https://acrossdevice.github.io/'],
    ['project-img/socialpot.png','Socialpot','https://socialpot.pythonanywhere.com/','https://github.com/anuragkumart16/Socialpot.git'],
    ['project-img/Third.png','Across Device','https://github.com/anuragkumart16/Socialpot.git','https://acrossdevice.github.io/']
  ]

  return (
    <>
      <section className="section">
      <header>
        <nav>
          <div className="nav-div poppins-regular nav-title" >Anurag Kumar Tiwari</div>
          <ul className="nav-ul">
            <li className="poppins-regular">
              <a href="#">About</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Projects</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Skills</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="hero-div-holder">
          <div className="hero-img-holder">
            <img src="me.png" className="my-img"/>
          </div>
          <div className="hero-text">
            <p className="poppins-semibold">Hello I'm</p>
            <p className="poppins-bold">Anurag Kumar <br/> Tiwari</p>
            <p className="poppins-hehe">Full Stack Web Developer</p>
            <div className="btn-holder">
              <button className="btn">Download CV</button>
              <button className="btn-active">Contact Info</button>
            </div>
            <div className="icon-holder">
              <img src="github-icon.png" className="icon" />
              <img src="linkedin-icon.png" className="icon" />
            </div>
          </div>
      </div>
      </section>
      <section className="section centreSection">
        <p className="poppins-semibold">To know more</p>
        <p className="poppins-bold" style={{fontSize: "48px"}}>About</p>
        
      </section>
      <section className="section centreSection">
        <p className="poppins-semibold">Explore my</p>
        <p className="poppins-bold" style={{fontSize: "48px"}}>Skills</p>
        <div className="skills-holder-holder">
          <div className="skills-holder">
            <p className="poppins-hehe" style={{fontSize: "28px"}}>Frontend Development</p>
            <div className="skill-grid">
            {
                frontendSkillArray.map((skill) => {
                  return (
                    <div className="skill">
                      <img src="tick-icon.png" className="icon"/>
                      <div><p className="poppins-regular-noncard">{skill[0]}</p>
                      <p className="poppins-semibold">{skill[1]}</p></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="skills-holder">
          <p className="poppins-hehe" style={{fontSize: "28px"}}>Backend Development</p>
          <div className="skill-grid">
          {
                backendSkillArray.map((skill) => {
                  return (
                    <div className="skill">
                      <img src="tick-icon.png" className="icon"/>
                      <div><p className="poppins-regular-noncard">{skill[0]}</p>
                      <p className="poppins-semibold">{skill[1]}</p></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </section>

      <section className="section centreSection">
        <p className="poppins-semibold">Browse my recent</p>
        <p className="poppins-bold" style={{fontSize: "48px"}}>Projects</p>
        <div className="project-holder-holder">
          {
            myProjects.map((project) => {
              return (
                <div className="project-holder">
                  <img src={project[0]} className="project-img"/>
                  <p className="poppins-bold">{project[1]}</p>
                  <div className="project-btn-holder">
                  <button className="btn" onClick={()=>{
                    window.open(project[2])
                  }}>Github</button>
                  <button className="btn" onClick={()=>{
                    window.open(project[3])
                  }}>Live Demo</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>


      <section className="section centreSection">
        <p className="poppins-semibold">Get in touch</p>
        <p className="poppins-bold" style={{fontSize: "48px"}}>Contact me</p>
        <div className="contact-holder-holder">
          <div className="contact-holder">
            <div className="contact-card">
              <img src="mail-icon.png" className="icon" style={{height: "36px",width: "36px"}}/>
              <p className="poppins-regular">anuragkumartiwari1604@gmail.com</p>
            </div>
            <div className="contact-card">
              <img src="linkedin-icon.png" className="icon"/>
              <p className="poppins-regular">Linkedin</p>
            </div>
          </div>
        </div>
          <ul className="nav-ul">
            <li className="poppins-regular">
              <a href="#">About</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Projects</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Skills</a>
            </li>
            <li className="poppins-regular">
              <a href="#">Contact</a>
            </li>
          </ul>
          <p className="poppins-semibold" style={{margin:"2rem",fontWeight: "400"}}>CopyRight © 2023 Anurag Kumar Tiwari. All Rights Reserved</p>
      </section>
    </>
  );
}

export default App;
