import { InsertComponentsByConfig, CreateCompilationInfo } from "./helper-master";
import Welcome from "../Components/welcome";

let configReact = {
  Welcome: {
    Component: Welcome,
    data: {
      name: "Developer",
    },
    IdDom: "welcome",
    Author: "Adrián lopez de la cruz",
  }

};
InsertComponentsByConfig(configReact);
