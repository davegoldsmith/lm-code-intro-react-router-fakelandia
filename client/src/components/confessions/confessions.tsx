import { FormEvent, useState } from "react";
import { postConfession } from "../../helper/apiCalls";
import {
  validateConfession,
  validateConfessionType,
  validateSubject,
} from "../../helper/validation";
import { JustTalk, MisdemeanourKind } from "../../types/misdemeanours.types";
import MisdemeanourSelector from "../misdemeanours/misdemeanourSelector";
import SubmitConfession from "./SubmitConfession";
import ConfessionDetails from "./ConfessionDetail";
import SubjectInput from "./ConfessionSubject";

const Confessions: React.FC = () => {

  // const saveFormData = async () => {
  //   const response = await fetch('/api/registration', {
  //     method: 'POST',
  //     body: JSON.stringify(values)
  //   });
  //   if (response.status !== 200) {
  //     throw new Error(`Request failed: ${response.status}`); 
  //   }
  // }

  const handleResponse = (response: Response) => {
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
    console.log(response);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDoSubmitValidation(true);
    try {
      const confession = {subject: subject, reason: confessionKind, details: confessionDetails};
      if (validateConfession(confession).length == 0) {
        await postConfession(confession, handleResponse);
        setSubject("");
        setConfessionKind(undefined);
        setConfessionDetails("");
        setDoSubmitValidation(false);
      }
    } catch (e) {

    }

  };

  const [confessionKind, setConfessionKind] = useState<
    MisdemeanourKind | undefined | JustTalk
  >();
  const [subject, setSubject] = useState("");
  const [confessionDetails, setConfessionDetails] = useState("");
  const [doSubmitValidation, setDoSubmitValidation] = useState(false);

  return (
    <div>
      <p>
        It's very difficult to catch people committing misdeneanours so we
        appreciate it when citizens confess to us directly.
      </p>
      <p>
        However, if you're just having a hard day and need to vent then you're
        welcome to contact us here too. Up to you!
      </p>
      <form
        className="confessionForm"
        onSubmit={(e: FormEvent) => {
          handleSubmit(e);
          // setIsSubmit(true);
        }}
      >
        <SubjectInput
          subject={subject}
          setSubject={setSubject}
          validate={validateSubject}
          doSubmitValidation={doSubmitValidation}
        />
        <MisdemeanourSelector
          misdemeanourKind={confessionKind}
          setMisdemeanourKind={(
            setConfessionChoice: MisdemeanourKind | undefined | JustTalk
          ) => setConfessionKind(setConfessionChoice)}
          labelForNoSelection={"Select"}
          includeJustTalk={true}
          validate={validateConfessionType}
          doSubmitValidation={doSubmitValidation}
        />
        <ConfessionDetails
          confessionDetails={confessionDetails}
          setConfessionDetails={setConfessionDetails}
        />
        <SubmitConfession />
      </form>
    </div>
  );
};

export default Confessions;
