import validation, { loginSchema, resSchema } from "./validate.js";

// Dom Elm
const loginTabBtn = document.getElementById("loginTab");
const resTabBtn = document.getElementById("resTab");
const logPannels = document.querySelector(".log-pannels");
const loginSubmitBtn = document.getElementById("loginSubmit");
const resSubmitBtn = document.getElementById("resSubmit");
// ---- Toggle Modal BTN
const toggleModalBtn = document.getElementById("toggleModalBtn");
// ---- Lucky Roll
const luckyRollElm = document.querySelector(".lucky-roll");
const luckyRollActionBtn = luckyRollElm.querySelector(
  ".lucky-roll-btn__roll-action"
);
const luckyDisc = document.querySelector("#luckyDisc");
const rollTurn = luckyRollElm.querySelector(
  ".lucky-roll-btn__roll-info.lucky-roll-btn__roll-number p span"
);
const rollPoint = luckyRollElm.querySelector(
  ".lucky-roll-btn__roll-info.lucky-roll-btn__curr-point p span"
);
// ---- Exchange Lists
const exchangeList = document.querySelector(".exchange__main-gifts-list");
const exchangeItems = exchangeList.querySelectorAll(
  ".exchange__main-gift-item"
);

// Pub Class
class App {
  #isLogin;
  #baseDeg;
  #degPerItem;
  #totalItem;
  #numberOfTurn;
  #currPoint;

  constructor() {
    this.#isLogin = true;
    this.#totalItem = 10;
    this.#baseDeg = 20;
    this.#degPerItem = 360 / this.#totalItem;
    this.#numberOfTurn = 1;
    this.#currPoint = 200;
  }

  handleClickLoginTab() {
    loginTabBtn.parentElement.classList.add("log-tab--active");
    resTabBtn.parentElement.classList.remove("log-tab--active");
    logPannels.classList.remove("log-pannels--register");
    logPannels.classList.add("log-pannels--login");
  }

  handleClickResTab() {
    loginTabBtn.parentElement.classList.remove("log-tab--active");
    resTabBtn.parentElement.classList.add("log-tab--active");
    logPannels.classList.remove("log-pannels--login");
    logPannels.classList.add("log-pannels--register");
  }

  handleSubmitLogin() {
    const logForm = document.querySelector(".log-pannel__login");
    const taiKhoan = logForm.querySelector("#taikhoan");
    const matKhau = logForm.querySelector("#matkhau");
    const errMessTaiKhoan =
      taiKhoan.parentElement.parentElement.querySelector(".err-mess");
    const errMessMatKhau =
      matKhau.parentElement.parentElement.querySelector(".err-mess");

    const valiTest = validate(
      { username: taiKhoan.value, password: matKhau.value },
      loginSchema
    );

    validation(
      () => {
        errMessTaiKhoan.innerHTML = "";
        errMessMatKhau.innerHTML = "";
        console.log("call api");
      },
      () => {
        if (valiTest.username)
          errMessTaiKhoan.innerHTML = `<p>*${valiTest.username[0].replace(
            "Username ",
            ""
          )}</p>`;
        else errMessTaiKhoan.innerHTML = "";
        if (valiTest.password)
          errMessMatKhau.innerHTML = `<p>*${valiTest.password[0].replace(
            "Password ",
            ""
          )}</p>`;
        else errMessMatKhau.innerHTML = "";
      },
      valiTest
    );
  }

  handleSubmitRes() {
    const resForm = document.querySelector(".log-pannel__register");
    const taiKhoan = resForm.querySelector("#taikhoan");
    const matKhau = resForm.querySelector("#matkhau");
    const xacNhanMatKhau = resForm.querySelector("#xacNhanMatKhau");
    const errMessTaiKhoan =
      taiKhoan.parentElement.parentElement.querySelector(".err-mess");
    const errMessMatKhau =
      matKhau.parentElement.parentElement.querySelector(".err-mess");
    const errMessXacNhanMatKhau =
      xacNhanMatKhau.parentElement.parentElement.querySelector(".err-mess");

    const valiTest = validate(
      {
        username: taiKhoan.value,
        password: matKhau.value,
        confirmPassword: xacNhanMatKhau.value,
      },
      resSchema
    );

    console.log(valiTest);

    validation(
      () => {
        errMessTaiKhoan.innerHTML = "";
        errMessMatKhau.innerHTML = "";
        errMessXacNhanMatKhau.innerHTML = "";
        console.log("call api");
      },
      () => {
        if (valiTest.username)
          errMessTaiKhoan.innerHTML = `<p>*${valiTest.username[0].replace(
            "Username ",
            ""
          )}</p>`;
        else errMessTaiKhoan.innerHTML = "";
        if (valiTest.password)
          errMessMatKhau.innerHTML = `<p>*${valiTest.password[0].replace(
            "Password ",
            ""
          )}</p>`;
        else errMessMatKhau.innerHTML = "";
        if (valiTest.confirmPassword)
          errMessXacNhanMatKhau.innerHTML = `<p>*Mật khẩu xác nhận không chính xác</p>`;
        else errMessXacNhanMatKhau.innerHTML = "";
      },
      valiTest
    );
  }

  handleClickLuckyRollBtn = () => {
    // Nếu chưa đăng nhập thì mở modal đăng nhập

    if (!this.#isLogin) toggleModalBtn.click();
    else {
      if (this.#numberOfTurn > 0) {
        luckyRollActionBtn.disabled = true;

        const randomRevolutions = Math.floor(Math.random() * 50);
        const randomReward = Math.floor(Math.random() * 10);

        const deg =
          this.#baseDeg +
          randomReward * this.#degPerItem +
          360 * randomRevolutions;

        luckyDisc.style.transform = `rotate(${deg}deg)`;

        setTimeout(() => {
          luckyRollActionBtn.disabled = false;
          this.notiReward(`Chúc mừng, bạn nhận được ...`);
        }, 3000);
      } else {
        alert("Bạn không đủ lượt quay!");
      }
    }
  };

  handleClickExchangeBtn(pointToExchange) {
    return () => {
      if (this.#currPoint >= pointToExchange) {
        // Call API đổi thưởng

        this.#currPoint -= pointToExchange;

        this.renderLuckyRollInfo();

        this.notiReward("Đổi thành công!");
      } else {
        this.notiReward("Chưa đủ điểm để đổi!");
      }
    };
  }

  notiReward(noti) {
    alert(noti);
  }

  handleEvents() {
    loginTabBtn.addEventListener("click", this.handleClickLoginTab);
    resTabBtn.addEventListener("click", this.handleClickResTab);
    loginSubmitBtn.addEventListener("click", this.handleSubmitLogin);
    resSubmitBtn.addEventListener("click", this.handleSubmitRes);
    luckyRollActionBtn.addEventListener("click", this.handleClickLuckyRollBtn);
    exchangeItems.forEach((item) => {
      const exchangeBtn = item.querySelector(
        ".exchange__main-gift-item__btn button"
      );

      const randomPoint = Math.floor(Math.random() * 600);

      exchangeBtn.addEventListener(
        "click",
        this.handleClickExchangeBtn(randomPoint)
      );
    });
  }

  renderLuckyRollInfo() {
    rollPoint.innerHTML = this.#currPoint;
    rollTurn.innerHTML = this.#numberOfTurn;
  }

  render() {
    this.renderLuckyRollInfo();
  }

  start() {
    this.render();
    this.handleEvents();
  }
}

const app = new App();

app.start();
