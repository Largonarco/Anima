import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FilmIcon } from "@heroicons/react/outline";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className={styles.nav}>
      <Link href="/" passHref>
        <Navbar.Brand className="text-white">
          <FilmIcon className={styles.filmIcon} /> Anima
        </Navbar.Brand>
      </Link>
      <Form className="d-flex ms-auto">
        <Form.Control
          type="search"
          name="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant="outline-success"
          onClick={() => router.push(`/animeSearch/${search}`)}
        >
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default NavBar;
