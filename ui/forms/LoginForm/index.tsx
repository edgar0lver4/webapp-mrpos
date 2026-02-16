"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { TextField, Button, CircularProgress, Box } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { SessionService } from "@ui/services/Session";

export default function LoginForm() {
  const { push, refresh } = useRouter();
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es requerido"),

    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es requerida"),
  });

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: typeof INITIAL_VALUES) => {
    try {
      setLoading(true);
      const sessionService = new SessionService();
      const status = await sessionService.login(values.email, values.password);
      if (status === 200) {
        push("/");
        refresh();
      }
    } catch (e) {
      console.log("Error al iniciar sesión");
    }
    setLoading(false);
  };

  return (
    <div className="w-1/2 flex flex-col items-center justify-center gap-6">
      <p className="description-body-bold text-xl">Iniciar sesión</p>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <TextField
              fullWidth
              label="Correo"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                paddingY: "12px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              {loading ? <CircularProgress size={22} /> : "Entrar"}
            </Button>
          </Box>
        )}
      </Formik>
    </div>
  );
}
