import { mountFilm } from "./mount";
import { recipe } from "./recipe";

const root = document.getElementById("app");
if (root) mountFilm(root, recipe);
