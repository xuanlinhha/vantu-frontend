import * as React from 'react'
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import {whole, top, bottom} from '../styles/layout.module.css';

export default function Layout(props) {
  return (
    <div className={whole}>
      <div className={top}>
        <Header />
        <NavBar />
        {props.children}
      </div>
      <div className={bottom}>
        <Footer />
      </div>
    </div>
  )
}