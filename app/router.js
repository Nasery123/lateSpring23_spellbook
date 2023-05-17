import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";

export const router = [
  {
    path: '',
    controller: HomeController
  },
  {
    path: '#/about',
    controller: AboutController
  }
]