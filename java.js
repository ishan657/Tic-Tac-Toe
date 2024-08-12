let boxs = document.querySelectorAll(".box");
let btn = document.querySelector("#btn");
let msg = document.querySelector("#msg");
let container = document.querySelector(".winner");
let draw = document.querySelector(".draw");

let turn0 = true; // playerX playerY

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

const disableBox = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
};

let resetGame = () => {
    turn0 = true;
    enableBox();
    container.classList.add("hide");
    draw.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }
    checkDraw();
};

const checkDraw = () => {
    let isDraw = true;
    for (let box of boxs) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        showDraw();
    }
};

let showDraw = () => {
    draw.classList.remove("hide");
    disableBox();
};

const showWinner = (win) => {
    msg.innerText = `WINNER is ${win}`;
    container.classList.remove("hide");
    disableBox();
};

btn.addEventListener("click", resetGame);
