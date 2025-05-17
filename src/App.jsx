import React, { useRef } from "react";
import "./App.css";
import "./css/skill.css";
import "./css/contact.css";
import "./css/project.css";
import "./css/about.css";
// import { motion } from "motion/react";
import { motion } from "framer-motion";


function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const frontendSkillArray = [
    ["HTML", "Experienced"],
    ["JavaScript", "Experienced"],
    ["CSS", "Experienced"],
    ["Tailwind", "Intermediate"],
    ["React", "Intermediate"],
    ["Bootstrap", "Experienced"],
  ];
  const backendSkillArray = [
    ["Node.js", "Basic"],
    ["Express.js", "Basic"],
    ["MongoDB", "Basic"],
    ["MySQL", "Intermediate"],
    ["Django", "Intermediate"],
    ["Firebase", "Basic"],
  ];

  const myProjects = [
    [
      "project-img/acrossdevice.png",
      "Across Device",
      "https://github.com/AcrossDevice/AcrossDevice.github.io.git",
      "https://acrossdevice.github.io/",
      'A place where you can store all your files, informations and links in one place.'
    ],
    [
      "project-img/socialpot.png",
      "Socialpot",
      "https://github.com/anuragkumart16/Socialpot.git",
      "https://socialpot.pythonanywhere.com/",
      'A unified backend for handling authentication and database for multiple projects.'
    ],
    [
      "project-img/Third.png",
      "Bhoolekh",
      "https://github.com/anuragkumart16/Bhoolekh.git",
      "https://bhoolekh.vercel.app/",
      'Machine Learning Project for Estimation of the Price of a House in Bengaluru.'
    ],
  ];

  const aboutRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  function scrollInView(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <motion.section className="section"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
        <header >
          <nav>
            <div className="nav-div poppins-regular nav-title">
              Anurag Kumar Tiwari
            </div>
            {
              !isMobile &&(<ul className="nav-ul">
                <li className="poppins-regular">
                  <a onClick={() => scrollInView(aboutRef)}>About</a>
                </li>
                <li className="poppins-regular">
                  <a onClick={() => scrollInView(projectsRef)}>Projects</a>
                </li>
                <li className="poppins-regular">
                  <a onClick={() => scrollInView(skillsRef)}>Skills</a>
                </li>
                <li className="poppins-regular">
                  <a onClick={() => scrollInView(contactRef)}>Contact</a>
                </li>
              </ul>)
            }
            {
              isMobile && (isMenuOpen?<img src="close-icon.png" className="icon menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{userSelect: "none"}}/>:<img src="menu-icon.png" className="icon menu-icon" style={{userSelect: "none"}} onClick={() => setIsMenuOpen(!isMenuOpen)}/>)
            }
          </nav>
          {
            isMobile &&(isMenuOpen &&(<motion.ul className="mobile-nav-ul" initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1 }}>
              <li className="poppins-regular">
                <a onClick={() => {
                  setIsMenuOpen(false)
                  scrollInView(aboutRef)}}>About</a>
              </li>
              <li className="poppins-regular">
                <a onClick={() => {
                  setIsMenuOpen(false)
                  scrollInView(projectsRef)}}>Projects</a>
              </li>
              <li className="poppins-regular">
                <a onClick={() => {
                  setIsMenuOpen(false)
                  scrollInView(skillsRef)}}>Skills</a>
              </li>
              <li className="poppins-regular">
                <a onClick={() => {
                  setIsMenuOpen(false)
                  scrollInView(contactRef)}}>Contact</a>
              </li>
            </motion.ul>))
          }
        </header>
        <div className="hero-div-holder">
          <div className="hero-img-holder">
            <img src="me.png" className="my-img" />
          </div>
          <div className="hero-text">
            <p className="poppins-semibold">Hello I'm</p>
            <p className="poppins-bold">
              Anurag Kumar <br /> Tiwari
            </p>
            <p className="poppins-hehe">Full Stack Web And ML Developer</p>
            <div className="btn-holder">
              <button
                className="btn"
                // onClick={() => {
                //   const link = document.createElement("a");
                //   link.href = "/Resume-Anurag Kumar Tiwari.pdf"; // File path inside the public folder
                //   link.download = "Anurag_Resume.pdf"; // Optional: Rename file on download
                //   document.body.appendChild(link);
                //   link.click();
                //   document.body.removeChild(link);
                // }}
                onClick={() => {
                  window.open("https://my.newtonschool.co/template/user/anuragkt16/resume/", "_blank");
                }}
              >
                Download CV
              </button>
              <button
                className="btn-active"
                onClick={() => scrollInView(contactRef)}
              >
                Contact Info
              </button>
            </div>
            <div className="icon-holder">
              <img
                src="github-icon.png"
                className="icon"
                onClick={() => {
                  window.open("https://github.com/anuragkumart16", "_blank");
                }}
              />
              <img
                src="linkedin-icon.png"
                className="icon"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/anurag-kumar-tiwari-915096262/",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section 
        className="section centreSection" 
        ref={aboutRef}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="poppins-semibold">To know more</p>
        <p className="poppins-bold" style={{ fontSize: "48px" }}>
          About
        </p>
        <div className="about-holder-holder">
          <img src="me2.png" className="about-img" />
          <div className="about-holder" style={{ flexDirection: "column" }}>
            <div className="about-card-holder">
              <div className="about-card">
                <img
                  src="https://tangerine-hummingbird-1479b6.netlify.app/assets/experience.png"
                  className="icon"
                />
                <p
                  className="poppins-regular-noncard"
                  style={{ textAlign: "center" }}
                >
                  GSOC Contributer
                </p>
                <p style={{ textAlign: "center" }}>
                  Raised <br /> 2 Pull Requests
                </p>
              </div>
              <div className="about-card">
                <img
                  src="https://tangerine-hummingbird-1479b6.netlify.app/assets/experience.png"
                  className="icon"
                />
                <p className="poppins-regular-noncard">Education</p>
                <p style={{ textAlign: "center" }}>
                  Pursuing <br />
                  B-Tech in CS And DS
                </p>
              </div>
            </div>
            <div>
              <p className="about-desc">
                I am a MERN Developer skilled in Django and UI/UX design,
                building user-friendly web and mobile applications. I have created multiple FullStack web apps and currently Learning Machine Learning. With a strong
                problem-solving mindset, I actively refine my DSA skills and
                explore edge cases.
                <br /> Beyond coding, I am a passionate singer, performing at
                university events. I strive to blend technology, design, and
                entrepreneurship to create impactful digital solutions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section 
        className="section centreSection" 
        ref={skillsRef}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="poppins-semibold">Explore my</p>
        <p className="poppins-bold" style={{ fontSize: "48px" }}>
          Skills
        </p>
        <div className="skills-holder-holder">
          <div className="skills-holder">
            <p className="poppins-hehe" style={{ fontSize: "28px" }}>
              Frontend Development
            </p>
            <div className="skill-grid">
              {frontendSkillArray.map((skill,index) => {
                return (
                  <div className="skill" key={index}>
                    <img src="tick-icon.png" className="icon" />
                    <div>
                      <p className="poppins-regular-noncard">{skill[0]}</p>
                      <p className="poppins-semibold">{skill[1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="skills-holder">
            <p className="poppins-hehe" style={{ fontSize: "28px" }}>
              Backend Development
            </p>
            <div className="skill-grid">
              {backendSkillArray.map((skill,index) => {
                return (
                  <div className="skill" key={index}>
                    <img src="tick-icon.png" className="icon" />
                    <div>
                      <p className="poppins-regular-noncard">{skill[0]}</p>
                      <p className="poppins-semibold">{skill[1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="section centreSection" 
        ref={projectsRef}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{marginBottom: "2rem"}}
      >
        <p className="poppins-semibold">Browse my recent</p>
        <p className="poppins-bold" style={{ fontSize: "48px" }}>
          Projects
        </p>
        <div className="project-holder-holder">
          {myProjects.map((project, index) => {
            return (
              <div className="project-holder" key={index}>
                <img src={project[0]} className="project-img" />
                <p className="poppins-bold">{project[1]}</p>
                <p className="poppins-regular-noncard" style={{ textAlign: "center" , fontWeight: "300"}}>{project[4]}</p>
                <div className="project-btn-holder">
                  <button
                    className="btn"
                    onClick={() => {
                      window.open(project[2]);
                    }}
                  >
                    Github
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      window.open(project[3]);
                    }}
                  >
                    Live Demo
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section 
        className="centreSection" 
        ref={contactRef}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="poppins-semibold">Get in touch</p>
        <p className="poppins-bold" style={{ fontSize: "48px" }}>
          Contact me
        </p>
        <div className="contact-holder-holder">
          <div className="contact-holder">
            <div className="contact-card">
              <img
                src="mail-icon.png"
                className="icon"
                style={{ height: "36px", width: "36px" }}
              />
              <p className="poppins-regular">
                <a className="poppins-regular  mobile-anchor" style={{ textDecoration: "none" }} href="https://mail.google.com/mail/?view=cm&to=anuragkumartiwari1604@gmail.com" target="_blank">
                {isMobile ? "Email" : "anuragkumartiwari1604@gmail.com"}
                </a>
              </p>
            </div>
            <div className="contact-card">
              <img src="linkedin-icon.png" className="icon" />
              <p
                className="poppins-regular"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/anurag-kumar-tiwari-915096262/",
                    "_blank"
                  );
                }}
              >
                Linkedin
              </p>
            </div>
          </div>
        </div>
        <ul className="nav-ul contact-footer" >
          <li className="poppins-regular">
            <a onClick={() => scrollInView(aboutRef)}>About</a>
          </li>
          <li className="poppins-regular">
            <a onClick={() => scrollInView(projectsRef)}>Projects</a>
          </li>
          <li className="poppins-regular">
            <a onClick={() => scrollInView(skillsRef)}>Skills</a>
          </li>
          <li className="poppins-regular">
            <a onClick={() => scrollInView(contactRef)}>Contact</a>
          </li>
        </ul>
        <p
          className="poppins-semibold"
          style={{ margin: "2rem", fontWeight: "400" }}
        >
          CopyRight © 2023 Anurag Kumar Tiwari. All Rights Reserved
        </p>
      </motion.section>
    </>
  );
}

export default App;
