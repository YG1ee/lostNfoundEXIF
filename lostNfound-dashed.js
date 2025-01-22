import fs from "fs";

const files = fs.readdirSync(".");
// let count = 0;

const SCRIPT_NAME = "normalization.sh";
const SUCCESS = `SUCCESS`;
const PRESERVE = `PRESERVE`;

fs.writeFileSync(SCRIPT_NAME, "#!/bin/sh\n\n");
fs.appendFileSync(
  SCRIPT_NAME,
  `alias exiftool='~/Documents/util/exiftool-13.06_64/exiftool.exe'\n`
);
for (const fn of files) {
  // if (count > 2) break;
  if (!(fn.startsWith("17") && fn.endsWith(".jpg"))) continue;
  const lastIdx = fn.lastIndexOf(".");
  const num = Number(fn.slice(0, lastIdx).split("-")[0]);
  const ext = fn.slice(lastIdx);
  const _date_ = new Date(num);
  _date_.setHours(_date_.getHours() + 9);
  const date = _date_.toJSON();

  if (!date) continue;

  const [left, right] = date.split("T");
  const [year, month, day] = left.split("-");
  const [hour, minute, second] = right.split(".")[0].split(":");
  const ms = fn.slice(fn.indexOf("-") + 1, lastIdx).padStart(3, "0");

  const newName = `${year}${month}${day}_${hour}${minute}${second}-${ms}${ext}`;

  fs.appendFileSync(
    SCRIPT_NAME,
    `exiftool -alldates="${left} ${
      right.split(".")[0]
    }" ${fn} && mv ${fn} ../${SUCCESS}/${newName} && mv ${fn}_original ../${PRESERVE}/\n`
  );

  // count++;
}
