import useFetchSingle from "../../FetchData/useFetchSingle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { pokemonSchema } from "../../Validations/PokemonValidation";
import styled from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import { v1 } from "uuid";

const EditForm = ({ name, url }) => {
  const API_URL = "http://localhost:3500/pokemonstats";
  const { isError, error, isLoading, data } = useFetchSingle({ name, url });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  let submitAction;
  const handleCreateNew = async (values) => {
    try {
      const response = await axios.post(API_URL, {
        id: v1(),
        name: values.name,
        height: values.height,
        weight: values.weight,
        experience: values.base_experience,
        abilities: values.abilities,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.post(API_URL, {
        id: values.id,
        name: values.name,
        height: values.height,
        weight: values.weight,
        experience: values.base_experience,
        abilities: values.abilities,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: data.name,
          height: data.height,
          weight: data.weight,
          experience: data.base_experience,
          abilities: data.abilities.map((data) => data.ability.name),
        }}
        validationSchema={pokemonSchema}
        onSubmit={(values) => {
          if (submitAction === "edit") {
            handleEdit(values);
          } else {
            handleCreateNew(values);
          }
        }}
      >
        <S.Form>
          <label htmlFor="name">Nazwa pokemona</label>
          <S.Field type="text" name="name" />
          <ErrorMessage name="name" />
          <label htmlFor="height">Wysokość</label>
          <S.Field type="text" name="height" />
          <ErrorMessage name="heigth" />
          <label htmlFor="weight">Waga</label>
          <S.Field type="text" name="weight" />
          <ErrorMessage name="weight" />
          <label htmlFor="experience">Doświadczenie</label>
          <S.Field type="text" name="experience" />
          <ErrorMessage name="experience" />
          <label htmlFor="abilities">Umiejętności</label>
          <S.Field type="text" name="abilities" />
          <ErrorMessage name="abilities" />
          <S.Button
            type="submit"
            name="edit"
            onClick={() => {
              submitAction = "edit";
            }}
          >
            Edytuj pokemona
          </S.Button>
          <S.Button
            type="submit"
            name="createNew"
            onClick={() => {
              submitAction = "createNew";
            }}
          >
            Zapisz jako nowy
          </S.Button>
        </S.Form>
      </Formik>
    </div>
  );
};

export default EditForm;

const S = {
  Form: styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  `,
  Field: styled(Field)`
    max-width: 300px;
    font-size: 1.5rem;
  `,
  Button: styled(Button)`
    max-width: 300px;
  `,
};