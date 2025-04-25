// 파일 형식 예시: 20240412_065835.jpg

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
  if (!(fn.startsWith("20") && fn.endsWith(".jpg"))) continue;
  const lastIdx = fn.lastIndexOf(".");
  const ext = fn.slice(lastIdx);
  // const _date_ = new Date(num);
  // _date_.setHours(_date_.getHours() + 9);
  // const date = _date_.toJSON();

  // if (!date) continue;

  const [left, right] = fn.slice(0, lastIdx).split("_");
  const [year, month, day] = [
    left.slice(0, 4),
    left.slice(4, 6),
    left.slice(6, 8),
  ];
  const [hour, minute, second] = [
    right.slice(0, 2),
    right.slice(2, 4),
    right.slice(4, 6),
  ];

  const newName = `${year}${month}${day}_${hour}${minute}${second}${ext}`;

  fs.appendFileSync(
    SCRIPT_NAME,
    `exiftool -alldates="${left} ${
      right.split(".")[0]
    }" '${fn}' && mv '${fn}' ../${SUCCESS}/${newName} && mv '${fn}_original' ../${PRESERVE}/\n`
  );

  // count++;
}
