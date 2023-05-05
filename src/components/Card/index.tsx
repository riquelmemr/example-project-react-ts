import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Contact, Context } from "../../types";
import Modal from "../Modal";

interface CardCNProps {
  contact: Contact;
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const CardCN: React.FC<CardCNProps> = ({ contact, contacts, setContacts }) => {
  const [openModal, setOpenModal] = useState(false);
  const [context, setContext] = useState<Context>("create");

  const handleFavorite = (phone: string) => {
    setContacts((prevState) =>
      prevState.map((item) => {
        if (item.phone === phone) {
          return { ...item, favorite: !item.favorite };
        }

        return item;
      })
    );
  };

  const handleAction = (context: Context) => {
    setContext(context);
    setOpenModal(true);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={contact.name} subheader={contact.createdAt} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Email: {contact.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contato: {contact.phone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="toggle favorite"
            onClick={() => handleFavorite(contact.phone)}
          >
            {contact.favorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton
            aria-label="delete data"
            onClick={() => handleAction("delete")}
          >
            <Delete />
          </IconButton>
          <IconButton
            aria-label="edit data"
            onClick={() => handleAction("delete")}
          >
            <Edit />
          </IconButton>
        </CardActions>
      </Card>

      <Modal
        context={context}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        setContacts={setContacts}
        contact={contact}
      />
    </>
  );
};

export default CardCN;
