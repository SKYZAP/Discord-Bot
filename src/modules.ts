import "reflect-metadata";
require("dotenv").config();
import { createConnection } from "typeorm";
import { options } from "../utils";
import { Test } from "./modules/test/test";

createConnection(options)
  .then(async (connection) => {
    // let photo = new Test();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;
    // let photoRepository = connection.getRepository(Test);
    // await photoRepository.save(photo);
    // console.log("Photo has been saved");
    // let savedPhotos = await photoRepository.find();
    // console.log("All photos from the db: ", savedPhotos);
  })
  .catch((error) => console.log(error));
