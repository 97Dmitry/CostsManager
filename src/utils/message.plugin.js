export default {
  install: (app) => {
    app.config.globalProperties.$message = function (text) {
      M.toast({ html: text });
    };

    app.config.globalProperties.$error = function (text) {
      M.toast({ html: `[Ошибка]: ${text}` });
    };
  },
};
