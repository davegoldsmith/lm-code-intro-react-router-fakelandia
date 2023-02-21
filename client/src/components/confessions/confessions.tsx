import { FormEvent, useContext, useState } from "react";
import { getPunishmentImage, postConfession } from "../../helper/apiCalls";
import {
  validateConfession,
  validateConfessionType,
  validateSubject,
} from "../../helper/validation";
import { JustTalk, Misdemeanour, MisdemeanourKind } from "../../types/misdemeanours.types";
import MisdemeanourSelector from "../misdemeanours/MisdemeanourSelector";
import SubmitConfession from "./SubmitConfession";
import ConfessionDetails from "./ConfessionDetail";
import SubjectInput from "./ConfessionSubject";
import { UpdateMisdemeanoursContext, MisdemeanoursContext } from "../context/MisdemeanoursProvider";
import { UserContext } from "../context/UserProvider";
import { Citizen } from "../../types/general.types";
import { getTodaysDate, showConfessionConfirmationBar } from "../../helper/helper";

const Confessions: React.FC = () => {
  const currentUser = useContext(UserContext) as Citizen;
  const handleResponse = (response: Response)  => {
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
    if (confessionKind === "just-talk") {
      setDisplayMessage("🗣️ You just want to talk about Stuff. Thanks! 💜");
    }
    else if (confessionKind !== undefined) {
      const newMisdemeanour : Misdemeanour = {citizenId: currentUser.citizenID, misdemeanour: confessionKind, date: getTodaysDate(), punishImage: getPunishmentImage(999)};
      updateMisdeamours([...misdemeanours, newMisdemeanour]);
      setDisplayMessage("Thanks for the confession, it has been added to our list of demeanours, punishment will be forthcoming!");
      
    }
    showConfessionConfirmationBar();
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDoSubmitValidation(true);
    try {
      const confession = {subject: subject, reason: confessionKind, details: confessionDetails};
      if (validateConfession(confession).length == 0) {
        const response : Response = await postConfession(confession);
        handleResponse(response);
        setSubject("");
        setConfessionKind(undefined);
        setConfessionDetails("");
        setDoSubmitValidation(false);
      }
    } catch (e) {
      setDisplayMessage("❌ Error trying to save your confession. Please try again later.");
      showConfessionConfirmationBar();
    }

  };

  const [confessionKind, setConfessionKind] = useState<
    MisdemeanourKind | undefined | JustTalk
  >();
  const [subject, setSubject] = useState("");
  const [confessionDetails, setConfessionDetails] = useState("");
  const [doSubmitValidation, setDoSubmitValidation] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const misdemeanours = useContext(MisdemeanoursContext);
  const updateMisdeamours = useContext(UpdateMisdemeanoursContext);
  return (
    <div>
      <p>
        It's very difficult to catch people committing misdemeanours so we
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
        <div id="confession-message">{displayMessage}</div>
      </form>
    </div>
  );
};

export default Confessions;
