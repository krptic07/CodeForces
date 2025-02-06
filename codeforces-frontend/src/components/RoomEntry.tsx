import React, { useState, useEffect } from "react";
import socket from "../socket";
import Button from "./Button";
import styles from "../styles/RoomEntry.module.css";
import FormInput from "./FormInput";

interface IRoomEntry {
  createNewRoom: (userName: string, roomId: string) => void;
  joinRoom: (userName: string, roomId: string) => void;
}

const RoomEntry: React.FC<IRoomEntry> = ({ createNewRoom, joinRoom }) => {
  const [userNameError, setUserNameError] = useState<string>("");
  const [roomIdError, setRoomIdError] = useState<string>("");
  const [userNameValue, setUserNameValue] = useState<string>("");
  const [roomIdValue, setRoomIdValue] = useState<string>("");

  useEffect(() => {
    socket.on("errorMessage", (errorData: { code: string; msg: string }) => {
      if (errorData && errorData.code === "CRE-RE") {
        setRoomIdError(errorData.msg);
        return;
      }
      if (errorData && errorData.code === "JR-EUR") {
        setRoomIdError(errorData.msg);
        return;
      }
      if (errorData && errorData.code === "JR-RNF") {
        setRoomIdError(errorData.msg);
        return;
      }
      if (errorData && errorData.code === "JR-UAT") {
        setUserNameError(errorData.msg);
      }
    });

    return () => {
      socket.off("errorMessage");
    };
  }, []);

  const createRoom = (): void => {
    setUserNameError("");
    setRoomIdError("");
    if (!userNameValue || !roomIdValue) {
      if (!userNameValue) {
        setUserNameError("Please Enter Username");
      }
      if (!roomIdValue) {
        setRoomIdError("Please Enter Room ID");
      }
      return;
    } else {
      createNewRoom(userNameValue, roomIdValue);
      return;
    }
  };

  const joinAnotherRoom = (): void => {
    setUserNameError("");
    setRoomIdError("");
    if (!userNameValue || !roomIdValue) {
      if (!userNameValue) {
        setUserNameError("Please Enter Username");
      }
      if (!roomIdValue) {
        setRoomIdError("Please Enter Room ID");
      }
      return;
    } else {
      joinRoom(userNameValue, roomIdValue);
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "50%",
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "	#F4E4C1",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className={styles.TextOutline}>CODEFORCES</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          gap: "20px",
        }}
      >
        <form
          style={{
            width: "80%",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <FormInput
              label={"USER NAME"}
              name={"userName"}
              value={userNameValue}
              error={userNameError}
              placeholder={"Enter Your User Name"}
              type={"text"}
              handleChange={setUserNameValue}
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <FormInput
              label={"ROOM ID"}
              name={"roomId"}
              value={roomIdValue}
              error={roomIdError}
              placeholder={"Enter Room ID"}
              type={"text"}
              handleChange={setRoomIdValue}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button handleFomSubmit={createRoom} text={"CREATE ROOM"} />
            <Button handleFomSubmit={joinAnotherRoom} text={"JOIN ROOM"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomEntry;
