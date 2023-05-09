import { Add } from "@mui/icons-material";
import { Fab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";
import CardCN from "../../components/Card";
import Modal from "../../components/Modal";
import { useAppSelector } from "../../store/hooks";
import { selectAllContacts } from "../../store/modules/contacts/contactsSlice";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const user = useAppSelector((state) => state.user);
  const contacts = useAppSelector(selectAllContacts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/login");
    }
  }, [user]);

  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Grid container spacing={1}>
        {contacts
          .filter((contact) => contact.createdBy === user.email)
          .map((contact) => (
            <Grid
              item
              key={contact.email}
              xs={12}
              sm={6}
              md={4}
              xl={2}
              marginLeft={2}
              marginTop={2}
            >
              <CardCN
                contact={contact}
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
      />
    </React.Fragment>
  );
};

export default Home;
