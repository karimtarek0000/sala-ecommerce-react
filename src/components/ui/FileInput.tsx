import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface IFileInput extends FormControlProps {
  setFile: (file: File) => void;
  fileExist: boolean;
  errorMessage: string;
  label: string;
}
function FileInput(props: IFileInput) {
  const { setFile, fileExist, errorMessage, label, ...rest } = props;

  // ----------------- HANDLER -----------------
  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      setFile(file);
    }
  };

  return (
    !fileExist && (
      <FormControl {...rest}>
        <FormLabel htmlFor={label}>{label}</FormLabel>
        <Input
          height={"100%"}
          p={"1rem"}
          cursor={"pointer"}
          id={label}
          accept=".jpg, .jpeg, .png"
          placeholder="Select img"
          type="file"
          onChange={onChangeFileHandler}
        />
        {!fileExist && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    )
  );
}

export default FileInput;
