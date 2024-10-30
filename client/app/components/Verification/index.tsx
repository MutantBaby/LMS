import { FC, useRef, useState } from "react";
import { IProps, IVerifyNumber } from "./types";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const Verification: FC<IProps> = ({ setRoute }) => {
  const [inValidError, setInValidError] = useState(false);
  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<IVerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verifyHandler = async function () {
    console.log("Verify Test");
    setInValidError(true);
  };

  const handleInputChange = function (index: number, val: string) {
    setInValidError(false);

    const newVerifyNumber = { ...verifyNumber, [index]: val };
    setVerifyNumber(newVerifyNumber);

    if (val === "" && index > 0) inputRef[index - 1].current?.focus();
    else if (val.length === 1 && index < 3)
      inputRef[index + 1].current?.focus();
  };

  return (
    <div className="mx-auto border max-w-sm mt-20 rounded">
      <form className="shadow-md px-4 py-6">
        <div className="flex justify-center gap-2 mb-6">
          <VscWorkspaceTrusted size={40} />
          <br />
          <br />
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              required
              key={key}
              type="number"
              maxLength={1}
              ref={inputRef[index]}
              value={verifyNumber[key as keyof IVerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={`${
                inValidError
                  ? "shake border-red-500"
                  : "dark:border-white border-black"
              } w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500`}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={verifyHandler}>
            Verify
          </button>
          <span
            onClick={() => setRoute("login")}
            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4">
            Back To signin
          </span>
        </div>
      </form>
    </div>
  );
};

export default Verification;