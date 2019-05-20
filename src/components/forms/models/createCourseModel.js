import { FieldHelper } from "../../../utils/formHelper";

export const createFields = [
  new FieldHelper({ label: "nazwa", name: "name", type: "text" }),
  new FieldHelper({ label: "adres zdjęcia url", name: "image", type: "text" }),
  new FieldHelper({
    label: "krótki opis",
    name: "shortDescription",
    type: "text"
  }),
  new FieldHelper({ label: "opis", name: "description", type: "text" }),
  new FieldHelper({ label: "cena", name: "price", type: "text" }),
  new FieldHelper({
    label: "dostępność",
    name: "isAvaiable",
    type: "select",
    values: [
      { label: "dostępny", value: "true" },
      { label: "nie dostępne", value: "false" }
    ]
  }),
  new FieldHelper({ label: "trailer url", name: "trailer", type: "text" })
];
