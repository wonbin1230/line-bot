import type { Connection } from "mongoose";
import type { IMongooseModel } from "../models/mongodb/initialModels";

import { createConnection } from "mongoose";
import { initialModels } from "../models/mongodb/initialModels";
import { mongodbConnectinURI } from "../env";

const mongoConnected: Connection = createConnection(mongodbConnectinURI);

mongoConnected.on("open", () => console.log("Connected to MongoDB"));

mongoConnected.on("err", (err: Error) => console.log(`Connect Failed: ${err.message || err}`));

export const mongoModel: IMongooseModel = initialModels(mongoConnected);
