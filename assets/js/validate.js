export const loginSchema = {
  username: {
    presence: true,
    exclusion: {
      within: [""],
      message: "Vui lòng nhập tài khoản",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "Mật khảu phải có ít nhất 6 ký tự",
    },
  },
};
export const resSchema = {
  username: {
    presence: true,
    exclusion: {
      within: [""],
      message: "Vui lòng nhập tài khoản",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "Mật khảu phải có ít nhất 6 ký tự",
    },
  },
  confirmPassword: {
    equality: "password",
  },
};

const validation = (onSuccess, onError, isValidate) => {
  if (isValidate) onError();
  else onSuccess();
};

export default validation;
