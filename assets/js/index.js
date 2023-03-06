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

// Pub Class
class App {
  #isLogin;
  #baseDeg;
  #degPerItem;
  #totalItem;
  #numberOfTurn;

  constructor() {
    this.#isLogin = true;
    this.#totalItem = 10;
    this.#baseDeg = 20;
    this.#degPerItem = 360 / this.#totalItem;
    this.#numberOfTurn = 1;
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
        const randomRevolutions = Math.floor(Math.random() * 50);
        const randomReward = Math.floor(Math.random() * 10);

        const deg =
          this.#baseDeg +
          randomReward * this.#degPerItem +
          360 * randomRevolutions;

        luckyDisc.style.transform = `rotate(${deg}deg)`;
      } else {
        alert("Bạn không đủ lượt quay!");
      }
    }
  };

  handleEvents() {
    loginTabBtn.addEventListener("click", this.handleClickLoginTab);
    resTabBtn.addEventListener("click", this.handleClickResTab);
    loginSubmitBtn.addEventListener("click", this.handleSubmitLogin);
    resSubmitBtn.addEventListener("click", this.handleSubmitRes);
    luckyRollActionBtn.addEventListener("click", this.handleClickLuckyRollBtn);
  }

  start() {
    this.handleEvents();
  }
}

const app = new App();

app.start();
