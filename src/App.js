import React, { useRef, useState, useEffect, useCallback } from "react";
import './App.css';

function App() {
  
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollTo = (ref) => {
    window.scroll({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeOutCreated, setTimeoutCreated] = useState(null);
  const handleScroll = useCallback(() => { 
      const position = window.pageYOffset;
      if(timeOutCreated){
        clearTimeout(timeOutCreated)
      }
      if(scrollPosition - position > 0){
        if(position < section3Ref.current.offsetTop  && position > section2Ref.current.offsetTop){
          setTimeoutCreated(setTimeout(()=>{
            window.scroll({
              top: section2Ref.current.offsetTop,
              behavior: "smooth",
            });
          }, 500))  
        }
        else if(position < section2Ref.current.offsetTop  && position > section1Ref.current.offsetTop){
          setTimeoutCreated(setTimeout(()=>{
            window.scroll({
              top: section1Ref.current.offsetTop,
              behavior: "smooth",
            });
          }, 500)) 
        }
      }else{
        if(position > section1Ref.current.offsetTop  && position < section2Ref.current.offsetTop){
          setTimeoutCreated (setTimeout(()=>{
            window.scroll({
              top: section2Ref.current.offsetTop,
              behavior: "smooth",
            });
          }, 500)) 
        }
        else if(position > section2Ref.current.offsetTop  && position < section3Ref.current.offsetTop){
          setTimeoutCreated(setTimeout(()=>{
            window.scroll({
              top: section3Ref.current.offsetTop,
              behavior: "smooth",
            });
          }, 500)) 
        }
      }
      setScrollPosition(position);
  },[scrollPosition, timeOutCreated]);


  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [handleScroll]);

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
      }}
    >
      <div style={{ position: "fixed", top: "16px", left: "16px" }}>
        <button onClick={() => scrollTo(section1Ref)}>Section 1</button>
        <br />
        <button onClick={() => scrollTo(section2Ref)}>Section 2</button>
        <br />
        <button onClick={() => scrollTo(section3Ref)}>Section 3</button>
      </div>
      <h1 ref={section1Ref} style={{ height: "100vh", margin: 0 }}>
        Section 1
      </h1>
      <h1 ref={section2Ref} style={{ height: "100vh", margin: 0 }}>
        Section 2
      </h1>
      <h1 ref={section3Ref} style={{ height: "100vh", margin: 0 }}>
        Section 3
      </h1>
    </div>
  );
}

export default App;
