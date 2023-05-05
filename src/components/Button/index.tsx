import { Button, styled } from "@mui/material";

interface ButtonProps {
  children: string | React.ReactNode;
}

const ButtonMUI = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.main
}));

const ButtonFC: React.FC<ButtonProps> = ({ children }) => {
  return (
    <ButtonMUI sx={{ border: "2px solid black", padding: "10px", marginTop: "60px"}}>{children}</ButtonMUI>
  )
}

export default ButtonFC;