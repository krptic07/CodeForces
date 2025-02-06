import React, { useState } from "react";
import Card from "./Card";
// import styles from "./Board.module.css";
import Button from "./Button";
import FormInput from "./FormInput";
import BoardData from "./BoardData";
import useScreenSize, { ScreenSize } from "../hooks/useScreenSize";
import axios from "axios";

interface IBoard {
  gameData: any;
  userName: string;
  roomID: string;
  // shuffleTeams: any;
  setClue: any;
  userTeam: string;
  startGame: any;
  increaseTeamScore: any;
  decreaseClueNumber: any;
  uncoverPiece: any;
  setNextTurn: any;
  setWin: any;
  clearClue: any;
  agents: {
    redAgentsNumber: number[];
    blueAgentsNumber: number[];
    bystandersNumber: number[];
    assasinsNumber: number[];
  };
  spymaster: boolean;
}

const Board: React.FC<IBoard> = ({
  gameData,
  agents,
  spymaster,
  uncoverPiece,
  clearClue,
  userName,
  // shuffleTeams,
  startGame,
  setClue,
  userTeam,
  roomID,
  decreaseClueNumber,
  setWin,
  increaseTeamScore,
  setNextTurn,
}) => {
  const {
    redAgentsNumber,
    blueAgentsNumber,
    bystandersNumber,
    assasinsNumber,
  } = agents;

  const [clueTextValue, setClueText] = useState<string>("");
  const [clueCountValue, setClueCount] = useState<string>("");
  const [clueErrorValue, setClueError] = useState<string>("");
  const screenSize: ScreenSize | undefined = useScreenSize();

  const {
    boardArray,
    currentTurn,
    win,
    winningTeam,
    piecesCovered,
    redPiecesCovered,
    bluePiecesCovered,
    redSpymaster,
    blueSpymaster,
    boardImages,
    // gameOn,
    clue,
    redTeam,
    blueTeam,
    redOperatives,
    blueOperatives,
    redTeamScore,
    blueTeamScore,
  } = gameData;
  console.log(gameData);
  const returnPositionColor = (position: number) => {
    if (redAgentsNumber && redAgentsNumber.includes(position)) {
      return "red";
    } else if (blueAgentsNumber && blueAgentsNumber.includes(position)) {
      return "blue";
    } else if (bystandersNumber && bystandersNumber.includes(position)) {
      return "green";
    } else if (assasinsNumber && assasinsNumber.includes(position)) {
      return "black";
    } else {
      return "pink";
    }
  };

  const returnBoardColor = (position: number) => {
    if (redAgentsNumber && redAgentsNumber.includes(position)) {
      return "#FF5500";
    } else if (blueAgentsNumber && blueAgentsNumber.includes(position)) {
      return "#0055FF";
    } else if (bystandersNumber && bystandersNumber.includes(position)) {
      return "#228B22";
    } else if (assasinsNumber && assasinsNumber.includes(position)) {
      return "#222222";
    } else {
      return "transparent";
    }
  };
  const handlePlayerChance = (position: number) => {
    console.log("changed ", position);
    console.log("board", boardArray);
    console.log("pieces", piecesCovered);
    if (userName === redSpymaster || userName === blueSpymaster) {
      console.log("spymaster cant guess!");
      return;
    } else if (currentTurn.user !== userName) {
      console.log("its not your turn ");
      return;
    } else if (piecesCovered[boardArray.indexOf(position)] === 1) {
      console.log("that piece is already covered");
      return;
    } else if (win && winningTeam) {
      console.log(`game is already won by team ${winningTeam}`);
      return;
    } else if (!clue.text) {
      console.log(`no CLue given`);
      return;
    } else {
      if (
        currentTurn.team === "red" &&
        returnPositionColor(position) === "red" &&
        clue.count >= 1
      ) {
        uncoverPiece(position, "red");
        if (redTeamScore === 7) {
          console.log("blueSO");
          setWin("red");
          increaseTeamScore("red");
          clearClue();
          return;
        }
        increaseTeamScore("red");
        if (clue.count === 1) {
          setNextTurn("blue");
          clearClue();
        } else {
          decreaseClueNumber();
        }
      } else if (
        currentTurn.team === "blue" &&
        returnPositionColor(position) === "blue" &&
        clue.count >= 1
      ) {
        uncoverPiece(position, "blue");
        if (blueTeamScore === 6) {
          setWin("blue");
          increaseTeamScore("blue");
          clearClue();
          return;
        }
        increaseTeamScore("blue");
        if (clue.count === 1) {
          setNextTurn("red");
          clearClue();
        } else {
          decreaseClueNumber();
        }
      } else if (
        currentTurn.team === "red" &&
        returnPositionColor(position) !== "red"
      ) {
        if (returnPositionColor(position) === "blue") {
          uncoverPiece(position, "blue");
          if (blueTeamScore === 6) {
            setWin("blue");
            setNextTurn("blue");
            clearClue();
            increaseTeamScore("blue");
            return;
          }
          increaseTeamScore("blue");
          setNextTurn("blue");
          clearClue();
        } else if (returnPositionColor(position) === "green") {
          uncoverPiece(position, "green");
          setNextTurn("blue");
          clearClue();
        } else if (returnPositionColor(position) === "black") {
          uncoverPiece(position, "black");
          setWin("blue");
          setNextTurn("blue");
          return;
        }
      } else if (
        currentTurn.team === "blue" &&
        returnPositionColor(position) !== "blue"
      ) {
        if (returnPositionColor(position) === "red") {
          uncoverPiece(position, "red");
          if (redTeamScore === 7) {
            setWin("red");
            increaseTeamScore("red");
            setNextTurn("red");
            clearClue();
            return;
          }
          increaseTeamScore("red");
          setNextTurn("red");
          clearClue();
        } else if (returnPositionColor(position) === "green") {
          uncoverPiece(position, "green");
          setNextTurn("red");
          clearClue();
        } else if (returnPositionColor(position) === "black") {
          uncoverPiece(position, "black");
          setWin("red");
          setNextTurn("red");
          return;
        }
      }
    }
  };

  const returnTeamRole = () => {
    if (redTeam && blueTeam && redTeam.length > 0 && blueTeam.length > 0) {
      if (
        redOperatives.includes(userName) ||
        blueOperatives.includes(userName)
      ) {
        return "OPERATIVE";
      } else if (redSpymaster === userName || blueSpymaster === userName) {
        return "SPY-MASTER";
      }
    }
    return "";
  };

  const checkClueCount = (clueText: string, clueCount: string) => {
    if (!clueText || !clueCount) {
      setClueError("Enter higher clue count ");
      return;
    } else if (isNaN(parseInt(clueCount))) {
      setClueCount("Enter valid clue count");
    } else if (parseInt(clueCount) <= 0) {
      setClueError("Enter higher clue count ");
      return;
    } else if (
      redTeam.includes(userName) &&
      parseInt(clueCount) > redPiecesCovered
    ) {
      setClueError("Enter smaller count");
      return;
    } else if (
      blueTeam.includes(userName) &&
      parseInt(clueCount) > bluePiecesCovered
    ) {
      setClueError("Enter smaller count");
      return;
    }
    setClue(userTeam, clueText, clueCount);
    return;
  };

  const startNewGame = async () => {
    console.log(process.env.UPSHOTS_API_KEY);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random/?count=20",
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UPSHOTS_API_KEY}`,
          },
        }
      );
      let unsplashPhotos = response.data;
      if (unsplashPhotos) {
        let boardThumbPictures = unsplashPhotos.map(
          (photo: any) => photo.urls.thumb
        );
        startGame(boardThumbPictures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80%",
        maxHeight: "80%",
        width: "80%",
        maxWidth: "80%",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        padding: "4px",
        backgroundColor: "  #F4E4C1",
        borderRadius: "12px",
      }}
    >
      {/*roomNO*/}
      <div style={{ flexGrow: 1, width: "100%" }}>
        <BoardData
          roomID={roomID}
          userName={userName}
          win={win}
          winningTeam={winningTeam}
          redTeamScore={redTeamScore}
          blueTeamScore={blueTeamScore}
          redTeam={redTeam}
          blueTeam={blueTeam}
          returnTeamRole={returnTeamRole}
        />
        {/*board*/}
        {boardArray.length > 0 && (
          <div
            style={{
              width: "100%",
              height: "50%",
              padding: "20px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div>
              <div
                style={{
                  height: `${
                    screenSize === "xs" || screenSize === "sm"
                      ? "10vw"
                      : screenSize === "md"
                      ? "9vw"
                      : screenSize === "lg"
                      ? "7vw"
                      : "5vw"
                  }`,
                  width: "12px",
                  backgroundColor: `${
                    currentTurn.team === "red" ? "#FF5500" : "#A0AFAF"
                  }`,
                  borderRadius: "4px",
                  boxShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.2)",
                }}
              />
            </div>
            <div
              style={{
                border: "4px solid #5D3A1A",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="grid grid-cols-5 grid-rows-4">
                {boardArray.map((position: number, index: number) => {
                  return (
                    <Card
                      key={position}
                      cardKey={position}
                      color={
                        spymaster
                          ? returnBoardColor(position)
                          : piecesCovered[boardArray.indexOf(position)] === 1
                          ? returnBoardColor(position)
                          : "transparent"
                      }
                      isSpymaster={spymaster}
                      image={boardImages[index]}
                      handleClick={handlePlayerChance}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <div
                style={{
                  height: `${
                    screenSize === "xs" || screenSize === "sm"
                      ? "10vw"
                      : screenSize === "md"
                      ? "9vw"
                      : screenSize === "lg"
                      ? "7vw"
                      : "5vw"
                  }`,
                  width: "12px",
                  backgroundColor: `${
                    currentTurn.team === "blue" ? "#0055FF" : "#A0AFAF"
                  }`,
                  boxShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        )}

        {/*gameActions*/}

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-around",
            flexDirection: "column",
            gap: "32px",
            margin: "10px 0px",
          }}
        >
          {spymaster && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                // width: "60%",
                // maxWidth: "60%",
              }}
            >
              <div
                style={{
                  // width: "60%",
                  // maxWidth: "60%",
                  display: "flex",
                  flexDirection: "row",
                  // alignItems: "center",
                  justifyContent: "center",
                  gap: "2vw",
                }}
              >
                <FormInput
                  handleChange={setClueText}
                  name={"clueText"}
                  value={clueTextValue}
                  type={"text"}
                  size={"sm"}
                  error={clueErrorValue}
                  placeholder={"Enter Clue"}
                />
                <FormInput
                  handleChange={setClueCount}
                  name={"clueCount"}
                  value={clueCountValue}
                  type={"number"}
                  placeholder={"0"}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  handleClick={() => {
                    setClueError("");
                    checkClueCount(clueTextValue, clueCountValue);
                  }}
                  isDisabled={
                    !(!clue.text && currentTurn.team === userTeam && !win)
                  }
                  text={"SEND CLUE"}
                />
              </div>
            </div>
          )}
          {(redOperatives.includes(userName) ||
            blueOperatives.includes(userName)) && (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {((clue.team === "red" && redOperatives.includes(userName)) ||
                  (clue.team === "blue" &&
                    blueOperatives.includes(userName))) && (
                  <p
                    style={{
                      marginBottom: "20px",
                      fontWeight: 600,
                      color: "#2F4F4F",
                      fontSize: `${
                        screenSize === "xs" || screenSize === "sm"
                          ? "12px"
                          : screenSize === "md"
                          ? "14px"
                          : screenSize === "lg"
                          ? "16px"
                          : "20px"
                      }`,
                    }}
                  >{`${clue.text.toLocaleUpperCase()}    ${clue.count}`}</p>
                )}
                <Button
                  isDisabled={!(currentTurn.team === userTeam && !win)}
                  handleClick={() => {
                    setClueError("");
                    if (redOperatives.includes(userName)) {
                      setNextTurn("blue");
                      clearClue();
                    } else if (blueOperatives.includes(userName)) {
                      setNextTurn("red");
                      clearClue();
                    } else {
                      (() => {})();
                    }
                  }}
                  text={"PASS"}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/*Bottom Buttons*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          flexDirection: "row",
          width: "100%",
          marginTop: "auto",
          marginBottom: "30px",
        }}
      >
        {boardArray.length > 0 && (
          <Button
            isDisabled={true}
            handleClick={() => {}}
            text={"SHUFFLE"}
          ></Button>
        )}
        <Button
          handleClick={() => {
            setClueError("");
            startNewGame();
          }}
          text={"NEW GAME"}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Board;
