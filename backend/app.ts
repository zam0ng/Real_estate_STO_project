import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import session from "express-session";

import path from "path";
import { sequelize } from "./models";

import adminRouter from "./routers/admin";
import marketRouter from "./routers/market";
import orderRouter from "./routers/order";
import mainRouter from "./routers/main";
import subscriptionRouter from "./routers/subscription";
import mypageRouter from "./routers/mypage";
import voteRouter from "./routers/vote";

// import { logLatestBlockEvents } from "./middleware/blockLog";

import http from "http";

const app: Express = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*", // 클라이언트의 주소
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  // console.log("클라이언트가 연결됨",socket.id);

  socket.on("open", (data: any) => {
    // console.log('유저가 특정 페이지에 접근했습니다.', data);

    io.emit("good", "good2");
  });

  socket.on("purchase_completed", () => {
    // console.log("매수 요청 소켓")
    io.emit("usequery_refetch");
  });

  socket.on("sale_completed", () => {
    // console.log("매도 요청 소켓")
    io.emit("usequery_refetch");
  });

  socket.on("cancel_completed", () => {
    // console.log("취소 요청 소켓");
    io.emit("usequery_refetch");
  });

  socket.on("disconnect", () => {
    // console.log("클라이언트 연결해제됨");
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://bouncesto.site", "https://bs.admin.bouncesto.site"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "sto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    // console.log("database connect");
  })
  .catch((err) => {
    // console.log("err", err);
  });

//htt localhost:8080/estate_img/ACB01-min_1701256146291
app.use("/estate_img", express.static(path.join(__dirname, "/imgs/estate")));

app.use("/admin", adminRouter);
app.use("/market", marketRouter);
app.use("/order", orderRouter);
app.use("/main", mainRouter);
app.use("/subscription", subscriptionRouter);
app.use("/mypage", mypageRouter);
app.use("/vote", voteRouter);

import { logLatestBlockEvents } from "./middleware/blockLog";
setInterval(logLatestBlockEvents, 4500);

server.listen(8080, () => {
  console.log("server on");
});

export { server };
