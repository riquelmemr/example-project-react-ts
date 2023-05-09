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
import { useAppDispatch } from "../../store/hooks";
import { updateOne } from "../../store/modules/contacts/contactsSlice";
import { Contact, Context } from "../../types/contact";
import Modal from "../Modal";

interface CardCNProps {
  contact: Contact;
}

const CardCN: React.FC<CardCNProps> = ({ contact }) => {
  const [openModal, setOpenModal] = useState(false);
  const [context, setContext] = useState<Context>("create");
  const dispatch = useAppDispatch();

  const handleFavorite = () => {
    dispatch(
      updateOne({ id: contact.email, changes: { favorite: !contact.favorite } })
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
            onClick={() => handleFavorite()}
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
        contact={contact}
      />
    </>
  );
};

export default CardCN;
