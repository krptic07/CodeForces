import React from "react";
import styles from "./Button.module.css";
import useScreenSize, { ScreenSize } from "../hooks/useScreenSize";

interface IBoardData {
  roomID: string;
  userName: string;
  redTeam: string[];
  blueTeam: string[];
  redTeamScore: number;
  blueTeamScore: number;
  win: boolean;
  winningTeam: string;
  returnTeamRole: any;
}

const BoardData: React.FC<IBoardData> = ({
  roomID,
  redTeam,
  blueTeam,
  userName,
  win,
  winningTeam,
  redTeamScore,
  blueTeamScore,
  returnTeamRole,
}) => {
  const screenSize: ScreenSize | undefined = useScreenSize();
  console.log(typeof redTeamScore);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontSize: `${
              screenSize === "xs" || screenSize === "sm"
                ? "8px"
                : screenSize === "md"
                ? "10px"
                : screenSize === "lg"
                ? "12px"
                : "14px"
            }`,
            fontWeight: "400",
            color: "#2F4F4F",
          }}
        >
          ROOM:
          <span
            style={{
              fontSize: `${
                screenSize === "xs" || screenSize === "sm"
                  ? "8px"
                  : screenSize === "md"
                  ? "10px"
                  : screenSize === "lg"
                  ? "12px"
                  : "14px"
              }`,
              fontWeight: "600",
              color: "#FF6F61",
            }}
          >
            {` ${roomID}`}
          </span>
        </p>
      </div>

      {/*userDetails*/}
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            fontSize: `${
              screenSize === "xs" || screenSize === "sm"
                ? "10px"
                : screenSize === "md"
                ? "12px"
                : screenSize === "lg"
                ? "14px"
                : "18px"
            }`,
            fontWeight: "400",
            color: "#2F4F4F",
          }}
        >
          PLAYER:
          <span
            style={{
              fontSize: `${
                screenSize === "xs" || screenSize === "sm"
                  ? "10px"
                  : screenSize === "md"
                  ? "12px"
                  : screenSize === "lg"
                  ? "14px"
                  : "18px"
              }`,
              fontWeight: "600",
              color: "#FF6F61",
            }}
          >
            {` ${userName.toLocaleUpperCase()}`}
          </span>
        </p>
        <p
          style={{
            fontSize: `${
              screenSize === "xs" || screenSize === "sm"
                ? "10px"
                : screenSize === "md"
                ? "12px"
                : screenSize === "lg"
                ? "14px"
                : "18px"
            }`,
            fontWeight: "400",
            color: "#2F4F4F",
          }}
        >
          TEAM ROLE:
          {redTeam && blueTeam && (
            <span
              style={{
                fontSize: `${
                  screenSize === "xs" || screenSize === "sm"
                    ? "10px"
                    : screenSize === "md"
                    ? "12px"
                    : screenSize === "lg"
                    ? "14px"
                    : "18px"
                }`,
                fontWeight: "600",
                color: `${redTeam.includes(userName) ? "#FF5500" : "#0055FF"}`,
              }}
            >
              {` ${returnTeamRole()}`}
            </span>
          )}
        </p>
      </div>

      {/*scores*/}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
              width: "60%",
            }}
          >
            {win && winningTeam ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${
                        screenSize === "xs"
                          ? "6px"
                          : screenSize === "sm"
                          ? "8px"
                          : screenSize === "md"
                          ? "12px"
                          : screenSize === "lg"
                          ? "14px"
                          : "18px"
                      }`,
                      fontWeight: "600",
                      color: `${winningTeam === "red" ? "#FF5500" : "#0055FF"}`,
                    }}
                  >
                    {`THIS GAME HAS BEEN WON BY TEAM${
                      winningTeam === "red" ? " RED" : " BLUE"
                    } !! `}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${
                        screenSize === "xs" || screenSize === "sm"
                          ? "12px"
                          : screenSize === "md"
                          ? "14px"
                          : screenSize === "lg"
                          ? "16px"
                          : "20px"
                      }`,
                      fontWeight: "600",
                      color: "#2F4F4F",
                    }}
                  >
                    SCORES
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "42px",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${
                        screenSize === "xs" || screenSize === "sm"
                          ? "10px"
                          : screenSize === "md"
                          ? "12px"
                          : screenSize === "lg"
                          ? "14px"
                          : "18px"
                      }`,
                      fontWeight: "400",
                      color: "#2F4F4F",
                    }}
                  >
                    RED:
                    <span
                      style={{
                        fontSize: `${
                          screenSize === "xs" || screenSize === "sm"
                            ? "10px"
                            : screenSize === "md"
                            ? "12px"
                            : screenSize === "lg"
                            ? "14px"
                            : "18px"
                        }`,
                        fontWeight: "600",
                        color: "#FF5500",
                      }}
                    >
                      {` ${redTeamScore !== 0 ? redTeamScore : "0"}`}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: `${
                        screenSize === "xs" || screenSize === "sm"
                          ? "10px"
                          : screenSize === "md"
                          ? "12px"
                          : screenSize === "lg"
                          ? "14px"
                          : "18px"
                      }`,
                      fontWeight: "400",
                      color: "#2F4F4F",
                    }}
                  >
                    BLUE:
                    <span
                      style={{
                        fontSize: `${
                          screenSize === "xs" || screenSize === "sm"
                            ? "10px"
                            : screenSize === "md"
                            ? "12px"
                            : screenSize === "lg"
                            ? "14px"
                            : "18px"
                        }`,
                        fontWeight: "600",
                        color: "#0055FF",
                      }}
                    >
                      {` ${blueTeamScore !== 0 ? blueTeamScore : "0"}`}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default BoardData;
