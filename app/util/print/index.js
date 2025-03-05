export default class print {
  static s = {
    fg: {
      black: "\x1b[38;2;0;0;0m",
      white: "\x1b[38;2;255;255;255m",
      red: "\x1b[38;2;255;0;0m",
      reset: "\x1b[39m"
    },

    bg: {
      red: "\x1b[48;2;255;0;0m",
      white: "\x1b[48;2;255;255;255m",
      reset: "\x1b[49m"
    },

    bold: "\x1b[1m",
    reset: "\x1b[0m"
  }

  static log(...messages) {
    console.log(`${this.s.bold}${this.s.fg.black}${this.s.bg.white} LOG ${this.s.reset}`, ...messages, "\n");
  }

  static error(...messages) {
    console.log(`${this.s.bold}${this.s.fg.black}${this.s.bg.red} ERROR ${this.s.bg.reset}${this.s.fg.red}`, ...messages, `${this.s.reset}\n`);
  }
};