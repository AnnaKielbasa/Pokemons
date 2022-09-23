import * as yup from "yup";

export const pokemonSchema = yup.object().shape({
  name: yup.string(),
  heigth: yup
    .number("Podaj liczbę")
    .positive("Podaj liczbę większą od 0")
    .integer("Podaj liczbę całkowitą"),
  weight: yup
    .number("Podaj liczbę")
    .positive("Podaj liczbę większą od 0")
    .integer("Podaj liczbę całkowitą"),
  experience: yup
    .number("Podaj liczbę")
    .positive("Podaj liczbę większą od 0")
    .integer("Podaj liczbę całkowitą"),
  abilities: yup.array().of(yup.string()),
});
