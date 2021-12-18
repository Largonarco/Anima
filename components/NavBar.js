import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FilmIcon } from '@heroicons/react/outline'

import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg" sticky="top" className={styles.nav}>
      <Link href="/" passHref>
        <Navbar.Brand className="text-white"><FilmIcon className={styles.filmIcon}/>  Anivue</Navbar.Brand>
      </Link>
    </Navbar>
  );
};

export default NavBar;
