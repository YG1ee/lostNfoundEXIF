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
  if (!(fn.startsWith("Band") && fn.endsWith(".jpg"))) continue;
  const lastIdx = fn.lastIndexOf(".");
  const ext = fn.slice(lastIdx);

  const [_, year, month, day, hour, minute, second, ms] = fn.split("_");
  const _date_ = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}`
  );
  _date_.setHours(_date_.getHours() + 9);
  const date = _date_.toJSON();

  if (!date) continue;

  const newName = `${year}${month}${day}_${hour}${minute}${second}-${ms}`;
  const [left, right] = date.split("T");

  fs.appendFileSync(
    SCRIPT_NAME,
    `exiftool -alldates="${left} ${
      right.split(".")[0]
    }" ${fn} && mv ${fn} ../${SUCCESS}/${newName} && mv ${fn}_original ../${PRESERVE}/\n`
  );

  // count++;
}
