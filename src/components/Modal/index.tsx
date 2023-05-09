import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addOne, deleteOne, updateOne } from "../../store/modules/contacts/contactsSlice";
import { Contact } from "../../types/contact";

interface ModalProps {
  context: "create" | "update" | "delete";
  open: boolean;
  handleClose: () => void;
  contact?: Contact;
}

const Modal: React.FC<ModalProps> = ({
  context,
  open,
  handleClose,
  contact,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (context == "update" && contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
    }
  }, [contact, context]);

  const handleSave = () => {
    switch (context) {
      case "create":
        const newContact: Contact = {
          name,
          phone,
          email,
          favorite: false,
          createdAt: new Date().toLocaleDateString("pt-BR", {
            dateStyle: "long",
          }),
          createdBy: user.email
        };

        dispatch(addOne(newContact));
        break;

      case "delete":
        contact && dispatch(deleteOne(contact.email));
        break;

      case "update":
        contact && dispatch(updateOne({ id: contact.email, changes: { name, phone, email } }));
        break;
      
      default:
        break;
    }

    handleClose();
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {context == "create" && "Criar contato"}
        {context == "update" && "Editar contato"}
        {context == "delete" && "Excluir contato"}
      </DialogTitle>
      <DialogContent>
        {context == "delete" && (
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir esse contato?
          </DialogContentText>
        )}
        {context != "delete" && (
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Contato"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                name="phone"
                label="Telefone"
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="E-mail"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          autoFocus
          color="success"
          variant="contained"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
