import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser } from "../../store/modules/user/userSlice";

const Login: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setUser({
        email: e.currentTarget.email.value,
      })
    );

    navigate("/");
  };

  useEffect(() => {
    if (user.isLogged) {
      navigate("/");
    }
  }, [user])

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component="section" display="flex" flexDirection="column" alignItems={"center"}>
        <Typography variant="h4" component="h1" margin={3} color={"primary"} textAlign={"center"}>
          Bem vindo. Realize seu login!
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={handleSubmit}
          width={'100%'}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <Button
            type="submit"
            startIcon={<ArrowForwardIos />}
            variant="contained"
            fullWidth
            sx={{ padding: "15px", borderRadius: "8px", marginTop: "10px" }}
          >
            Acessar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
