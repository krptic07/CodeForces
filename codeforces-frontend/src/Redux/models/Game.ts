export default class Game {
  public roomId: string = "";
  // public gameOn: boolean = false;
  public redTeamScore: number = 0;
  public blueTeamScore: number = 0;
  public redTeam: string[] = [];
  public blueTeam: string[] = [];
  public redOperatives: string[] = [];
  public blueOperatives: string[] = [];
  public redSpymaster: string = "";
  public blueSpymaster: string = "";
  public redAgentsNumber: number[] = [];
  public blueAgentsNumber: number[] = [];
  public redPiecesCovered: number = 8;
  public bluePiecesCovered: number = 7;
  public bystandersNumber: number[] = [];
  public assasinsNumber: number[] = [];
  public boardArray: number[] = [];
  public piecesCovered: number[] = [];
  public boardImages: string[] = [];
  public users: string[] = [];
  public currentTurn: { team: string; user: string } = {
    team: "",
    user: "",
  };
  //   public userRoles: string[] = [];
  public win: boolean = false;
  public clue: {
    team: string;
    text: string;
    count: number;
  } = {
    team: "",
    text: "",
    count: 0,
  };
  public winningTeam: string = "";

  static #instance: Game;

  private constructor() {}

  public static get instance(): Game {
    if (!this.#instance) {
      this.#instance = new Game();
    }
    return this.#instance;
  }

  // public shuffleTeams() {
  //   if (this.users.length > 4) {
  //     this.users.sort(() => Math.random() - 0.5);
  //   }
  // }

  // public setAllUsers(roomId: string, users: string[]) {
  //   if (roomId === this.roomId && users.length > 0) {
  //     this.users = users;
  //   }
  // }

  public setUpGameValues(
    usersInRoom: string[],
    boardPictures: string[],
    roomId: string
  ) {
    if (usersInRoom && usersInRoom.length >= 4) {
      this.users = usersInRoom;
      this.roomId = roomId;
      this.boardImages = boardPictures.sort(() => Math.random() - 0.5);
      const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
      numbers.sort(() => Math.random() - 0.5);
      numbers.forEach((number: number) => {
        if (number % 2 === 0 && this.redAgentsNumber.length < 8) {
          this.redAgentsNumber.push(number);
        } else if (number % 2 !== 0 && this.blueAgentsNumber.length < 7) {
          this.blueAgentsNumber.push(number);
        } else if (this.bystandersNumber.length < 4) {
          this.bystandersNumber.push(number);
        } else {
          this.assasinsNumber.push(number);
        }
      });
      numbers.sort(() => Math.random() - 0.5);
      this.boardArray = numbers;
      this.piecesCovered = this.boardArray.map((_, index) => 0);
      let half = Math.floor(usersInRoom.length / 2);
      let redTeam = usersInRoom.slice(0, half);
      let blueTeam = usersInRoom.slice(half, usersInRoom.length);
      redTeam.sort(() => Math.random() - 0.5);
      blueTeam.sort(() => Math.random() - 0.5);
      this.redSpymaster = redTeam[0];
      this.blueSpymaster = blueTeam[0];
      this.redOperatives = redTeam.slice(1, redTeam.length);
      this.blueOperatives = blueTeam.slice(1, blueTeam.length);
      this.redTeam = redTeam;
      this.blueTeam = blueTeam;
      this.currentTurn = { team: "red", user: this.redOperatives[0] };
      // this.gameOn = true;
    }
  }

  public increaseTeamScore(team: string) {
    if (team === "red") {
      this.redTeamScore += 1;
    } else if (team === "blue") {
      this.blueTeamScore += 1;
    }
  }

  public setNextTurn(team: string) {
    if (team === "red") {
      this.currentTurn = {
        team: "red",
        user: this.redOperatives[0],
      };
    } else if (team === "blue") {
      this.currentTurn = {
        team: "blue",
        user: this.blueOperatives[0],
      };
    }
  }

  public clearClue() {
    this.clue = {
      team: "",
      text: "",
      count: 0,
    };
  }

  public setClue(team: string, text: string, count: number) {
    this.clue = {
      team,
      text,
      count,
    };
  }

  public uncoverPiece(position: number, color: string) {
    if (color === "red") {
      this.redPiecesCovered -= 1;
    } else if (color === "blue") {
      this.bluePiecesCovered -= 1;
    }
    this.piecesCovered[this.boardArray.indexOf(position)] = 1;
  }

  public setWin(team: string) {
    this.winningTeam = team;
    this.win = true;
    // this.gameOn = false;
  }

  public decreaseClueNumber() {
    this.clue.count -= 1;
  }

  public clearGameData() {
    this.roomId = "";
    // this.gameOn = false;
    this.redAgentsNumber = [];
    this.blueAgentsNumber = [];
    this.bystandersNumber = [];
    this.assasinsNumber = [];
    this.boardArray = [];
    this.piecesCovered = [];
    this.redTeamScore = 0;
    this.redPiecesCovered = 8;
    this.bluePiecesCovered = 7;
    this.blueTeamScore = 0;
    this.users = [];
    this.redOperatives = [];
    this.blueOperatives = [];
    this.redSpymaster = "";
    this.blueSpymaster = "";
    this.redTeam = [];
    this.blueTeam = [];
    this.boardImages = [];
    this.clue = { team: "", text: "", count: 0 };
    this.win = false;
    this.winningTeam = "";
    this.currentTurn = { team: "", user: "" };
  }

  public set setGameData(game: any) {
    this.roomId = game.roomId;
    // this.gameOn = game.gameOn;
    this.redAgentsNumber = game.redAgentsNumber;
    this.blueAgentsNumber = game.blueAgentsNumber;
    this.bystandersNumber = game.bystandersNumber;
    this.assasinsNumber = game.assasinsNumber;
    this.boardArray = game.boardArray;
    this.redTeamScore = game.redTeamScore;
    this.blueTeamScore = game.blueTeamScore;
    this.users = game.users;
    this.clue = game.clue;
    this.boardImages = game.boardImages;
    this.redPiecesCovered = game.redPiecesCovered;
    this.bluePiecesCovered = game.bluePiecesCovered;
    this.redOperatives = game.redOperatives;
    this.blueOperatives = game.blueOperatives;
    this.piecesCovered = game.piecesCovered;
    this.redSpymaster = game.redSpymaster;
    this.blueSpymaster = game.blueSpymaster;
    this.redTeam = game.redTeam;
    this.blueTeam = game.blueTeam;
    this.win = game.win;
    this.winningTeam = game.winningTeam;
    this.currentTurn = game.currentTurn;
  }

  public get getGameData() {
    return {
      roomId: this.roomId,
      // gameOn: this.gameOn,
      redAgentsNumber: this.redAgentsNumber,
      blueAgentsNumber: this.blueAgentsNumber,
      bystandersNumber: this.bystandersNumber,
      assasinsNumber: this.assasinsNumber,
      boardArray: this.boardArray,
      piecesCovered: this.piecesCovered,
      redTeamScore: this.redTeamScore,
      blueTeamScore: this.blueTeamScore,
      users: this.users,
      boardImages: this.boardImages,
      redPiecesCovered: this.redPiecesCovered,
      bluePiecesCovered: this.bluePiecesCovered,
      redOperatives: this.redOperatives,
      blueOperatives: this.blueOperatives,
      redSpymaster: this.redSpymaster,
      blueSpymaster: this.blueSpymaster,
      redTeam: this.redTeam,
      clue: this.clue,
      blueTeam: this.blueTeam,
      win: this.win,
      winningTeam: this.winningTeam,
      currentTurn: this.currentTurn,
    };
  }
}
