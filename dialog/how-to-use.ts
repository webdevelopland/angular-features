msg() {
  this.dialog.msg("It's a message");
}

yesno() {
  this.dialog.yesno("Do you love Angular?", (answer) => {
    if (answer) console.log("<3");
    else console.log("</3");
  });
}