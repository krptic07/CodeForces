import React, { useEffect, useState } from "react";
import Board from "../../components/Board";
import socket from "../../socket";
import Game from "./Game";
import RoomEntry from "../../components/RoomEntry";
import useScreenSize, { ScreenSize } from "../../hooks/useScreenSize";

const HomePage: React.FC = () => {
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);
  console.log(usersInRoom);
  const [roomID, setRoomId] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  let currentGameInstance = Game.instance;
  let startGameData = currentGameInstance.getGameData;
  console.log(startGameData);
  const screenSize: ScreenSize | undefined = useScreenSize();
  console.log(screenSize);
  const [currentGameState, updateCurrentGameState] =
    useState<any>(startGameData);
  let agents = {
    redAgentsNumber: currentGameState.redAgentsNumber,
    blueAgentsNumber: currentGameState.blueAgentsNumber,
    bystandersNumber: currentGameState.bystandersNumber,
    assasinsNumber: currentGameState.assasinsNumber,
  };
  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log(data);
    });

    socket.on("errorMessage", (data: any) => {
      console.log(`error: ${data}`);
    });

    socket.on("createGameRoom", (roomId: string) => {
      console.log(`Emitting createBoard event for room: ${roomId}`);
      setRoomId(roomId);
    });

    socket.on("joinGame", (roomId: string) => {
      console.log(`Emitting createBoard event for room: ${roomId}`);
      setRoomId(roomId);
    });

    socket.on("setUsername", (userName: string) => {
      setUsername(userName);
    });

    socket.on("addGameData", (gameData) => {
      console.log("adding in data for new Game");
      console.log(gameData);
      currentGameInstance.setGameData = gameData;
      let currentGameData = currentGameInstance.getGameData;
      updateCurrentGameState(currentGameData);
    });

    socket.on("updateUserInRoom", (users) => {
      setUsersInRoom(users);
    });

    socket.on("checkGameAndUpdateUsers", (users) => {
      setUsersInRoom(users);
      if (users.length < 4) {
        console.log("You dont have enough players to play the game");
        currentGameInstance.clearGameData();
        let currentGameData = currentGameInstance.getGameData;
        updateCurrentGameState(currentGameData);
      }
    });

    return () => {
      socket.off("message");
      socket.off("createBoard");
      socket.off("updateUserMap");
      socket.off("updateUserInRoom");
    };
  }, []);

  const createNewRoom = (username: string, roomId: string) => {
    if (username && roomId) {
      socket.emit("createRoom", username, roomId);
    }
  };

  const joinNewRoom = (username: string, roomId: string) => {
    if (username && roomId) {
      socket.emit("joinRoom", username, roomId);
    }
  };

  const startGame = (boardPictures: string[]) => {
    if (usersInRoom.length >= 4) {
      currentGameInstance.clearGameData();
      currentGameInstance.setUpGameValues(usersInRoom, boardPictures, roomID);
      let currentGameValues = currentGameInstance.getGameData;
      updateCurrentGameState(currentGameValues);
      socket.emit("newGameData", currentGameValues, roomID);
      socket.emit("unflipCards", roomID);
      return;
    } else {
      console.log("Not enough users!");
    }
  };

  const returnUserTeam = (userName: string) => {
    if (
      currentGameState.redTeam.length > 0 &&
      currentGameState.redTeam.includes(userName)
    ) {
      return "red";
    } else if (
      currentGameState.redTeam.length > 0 &&
      currentGameState.blueTeam.includes(userName)
    ) {
      return "blue";
    } else {
      return "yellow";
    }
  };

  const isSpymaster = (userName: string, team: string) => {
    if (team === "red" && currentGameState.redSpymaster === userName) {
      return true;
    } else if (team === "blue" && currentGameState.blueSpymaster === userName) {
      return true;
    } else return false;
  };

  // const isCurrentGuesser = (userName: string, team: string) => {
  //   return (
  //     team === currentGameState.currentTurn.team &&
  //     team === currentGameState.clue.team &&
  //     ((team === "red" && currentGameState.redOperatives.includes(userName)) ||
  //       (team === "blue" && currentGameState.blueOperatives.includes(userName)))
  //   );
  // };

  const increaseTeamScore = (team: string) => {
    currentGameInstance.increaseTeamScore(team);
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  const uncoverPiece = (position: number, color: string) => {
    currentGameInstance.uncoverPiece(position, color);
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    socket.emit("uncoverPieceInBoard", position, roomID);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  const decreaseClueNumber = () => {
    currentGameInstance.decreaseClueNumber();
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  const setWin = (team: string) => {
    currentGameInstance.setWin(team);
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    console.log("winning", team);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  const setNextTurn = (team: string) => {
    currentGameInstance.setNextTurn(team);
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  const clearClue = () => {
    currentGameInstance.clearClue();
    let currentGameValues = currentGameInstance.getGameData;
    updateCurrentGameState(currentGameValues);
    socket.emit("newGameData", currentGameValues, roomID);
  };

  // const shuffleTeams = () => {
  //   currentGameInstance.shuffleTeams();
  //   let currentGameValues = currentGameInstance.getGameData;
  //   updateCurrentGameState(currentGameValues);
  //   socket.emit("newGameData", currentGameValues, roomID);
  // };

  const setClue = (userTeam: string, clueText: string, clueCount: string) => {
    console.log("clue given new");
    if (clueText && clueCount) {
      console.log("data given");
      console.log(clueText);
      console.log(clueCount);
      currentGameInstance.setClue(userTeam, clueText, parseInt(clueCount));
      let currentGameValues = currentGameInstance.getGameData;
      updateCurrentGameState(currentGameValues);
      socket.emit("newGameData", currentGameValues, roomID);
    }
  };

  console.log(currentGameState);
  return (
    <>
      <div
        style={{
          maxHeight: "100vh",
          height: "100vh",
          width:
            screenSize === "xs" || screenSize === "sm"
              ? "100%"
              : screenSize === "md"
              ? "90%"
              : screenSize === "lg"
              ? "80%"
              : "70%",
          maxWidth: "100%",
          display: "flex",
          background:
            "radial-gradient(circle, #ffcc66 10%, #ff5500 40%, #660033 90%)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!!roomID && !!userName && (
          <Board
            gameData={currentGameState}
            userName={userName}
            roomID={roomID}
            // shuffleTeams={shuffleTeams}
            setWin={setWin}
            startGame={startGame}
            decreaseClueNumber={decreaseClueNumber}
            increaseTeamScore={increaseTeamScore}
            uncoverPiece={uncoverPiece}
            setNextTurn={setNextTurn}
            agents={agents}
            userTeam={returnUserTeam(userName)}
            setClue={setClue}
            clearClue={clearClue}
            spymaster={isSpymaster(userName, returnUserTeam(userName))}
          />
        )}
        {!roomID && !userName && (
          <RoomEntry createNewRoom={createNewRoom} joinRoom={joinNewRoom} />
        )}
      </div>
    </>
  );
};

export default HomePage;
