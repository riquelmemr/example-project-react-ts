import { Add } from "@mui/icons-material";
import { Fab, Grid } from "@mui/material";
import React, { useState } from "react";
import ResponsiveAppBar from "../../components/AppBar";
import CardCN from "../../components/Card";
import Modal from "../../components/Modal";
import { Contact } from "../../types";

const dataMock: Contact[] = [
  {
    name: "John Doe",
    email: "j@j.com",
    phone: "12121212",
    favorite: true,
    createdAt: new Date().toLocaleDateString("pt-BR", {
      dateStyle: "long",
    }),
  },
  {
    name: "Jane Doe",
    email: "j@j.com",
    phone: "13131313",
    favorite: false,
    createdAt: new Date().toLocaleDateString("pt-BR", {
      dateStyle: "long",
    }),
  },
  {
    name: "John Doe",
    email: "j@j.com",
    phone: "14141414",
    favorite: false,
    createdAt: new Date().toLocaleDateString("pt-BR", {
      dateStyle: "long",
    }),
  },
  {
    name: "John Doe",
    email: "j@j.com",
    phone: "15151515",
    favorite: false,
    createdAt: new Date().toLocaleDateString("pt-BR", {
      dateStyle: "long",
    }),
  },
];

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(dataMock);
  const [openModal, setOpenModal] = useState(false);

  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Grid container spacing={2} marginTop={2} marginLeft={2}>
        {contacts.map((item) => (
          <Grid item key={item.email} xs={12} sm={6} md={4} xl={3}>
            <CardCN
              contact={item}
              contacts={contacts}
              setContacts={setContacts}
            />
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => setOpenModal(true)}
      >
        <Add />
      </Fab>

      <Modal
        open={openModal}
        context="create"
        handleClose={() => setOpenModal(false)}
        setContacts={setContacts}
      />
    </React.Fragment>
  );
};

export default Home;
