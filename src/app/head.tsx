import Head from "@components/Head";
import constants from "src/constants";

function CustomHead() {
  return (
    <>
      <Head
        title={"Nicholas Ray - Senior Software Engineer"}
        canonical={constants.url}
      />
    </>
  );
}

export default CustomHead;
