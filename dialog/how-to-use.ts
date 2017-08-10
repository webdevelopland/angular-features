msg() {
  var f = this;
  f.dialog.msg("It's a message");
}

yesno() {
  var f = this;
  f.dialog.yesno("Do you love Angular?", (answer) => {
    if (answer) console.log("<3");
    else console.log("</3");
  });
}