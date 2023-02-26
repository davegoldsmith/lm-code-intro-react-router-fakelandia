import { FormEvent, useContext, useState } from "react";
import { getPunishmentImage, postConfession } from "../../helper/apiCalls";
import {
  validateConfession,
  validateConfessionType,
  validateSubject,
} from "../../helper/validation";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanourSelector from "../misdemeanours/MisdemeanourSelector";
import SubmitConfession from "./SubmitConfession";
import ConfessionDetails from "./ConfessionDetail";
import SubjectInput from "./ConfessionSubject";
import {
  UpdateMisdemeanoursContext,
  MisdemeanoursContext,
} from "../context/MisdemeanoursProvider";
import { UserContext } from "../context/UserProvider";
import {
  Citizen,
  CONFESS,
  ConfessionDisplayMessage,
  ERROR,
  TALK,
} from "../../types/general.types";
import {
  getDisplayMessage,
  getTodaysDate,
  showConfessionConfirmationBar,
} from "../../helper/helper";
import {
  ConfessionChangeHandler,
  ConfessionData,
} from "../../types/confession.types";

const defaultConfessionData: ConfessionData = {
  subject: "",
  reason: undefined,
  details: "",
};

const Confession: React.FC = () => {
  const [confessionData, setConfessionData] = useState<ConfessionData>(
    defaultConfessionData
  );
  const [doSubmitValidation, setDoSubmitValidation] = useState(false);
  const [displayMessage, setDisplayMessage] =
    useState<ConfessionDisplayMessage>({
      message: "initial",
      messageType: ERROR,
      messageClass: "confession-message--" + ERROR,
    });
  const misdemeanours = useContext(MisdemeanoursContext);
  const updateMisdeamours = useContext(UpdateMisdemeanoursContext);

  const resetForm = () => {
    setConfessionData(defaultConfessionData);
  };

  const onChangeHandler: ConfessionChangeHandler = <
    TKey extends keyof ConfessionData
  >(
    value: ConfessionData[TKey],
    name: TKey
  ) => {
    const newData = { ...confessionData };
    newData[name] = value;
    setConfessionData(newData);
  };

  const currentUser = useContext(UserContext) as Citizen;
  const handleResponse = async (response: Response) => {
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
    if (confessionData.reason === "just-talk") {
      setDisplayMessage(
        getDisplayMessage(
          `🗣️ You just want to talk about ${confessionData.subject}. Thanks! 💜`,
          TALK
        )
      );
    } else if (confessionData.reason !== undefined) {
      const newMisdemeanour: Misdemeanour = {
        citizenId: currentUser.citizenID,
        misdemeanour: confessionData.reason,
        date: getTodaysDate(),
        punishImage: getPunishmentImage(999),
      };
      updateMisdeamours([...misdemeanours, newMisdemeanour]);
      setDisplayMessage(
        getDisplayMessage(
          "Thanks for the confession, it has been added to our list of demeanours, punishment will be forthcoming!",
          CONFESS
        )
      );
    }

    showConfessionConfirmationBar(displayMessage.messageClass);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDoSubmitValidation(true);
    try {
      const confession = {
        subject: confessionData.subject,
        reason: confessionData.reason,
        details: confessionData.details,
      };
      if (validateConfession(confession).length == 0) {
        const response: Response = await postConfession(confession);
        await handleResponse(response);
        resetForm();
        setDoSubmitValidation(false);
      }
    } catch (e) {
      setDisplayMessage(
        getDisplayMessage(
          "❌ Error trying to save your confession. Please try again later.",
          ERROR)
      );
      showConfessionConfirmationBar(displayMessage.messageClass);
    }
  };

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
        className="confession-form"
        data-testid="confession-form"
        onSubmit={(e: FormEvent) => {
          handleSubmit(e);
        }}
      >
        <SubjectInput
          subject={confessionData.subject}
          onChangeHandler={onChangeHandler}
          validate={validateSubject}
          doSubmitValidation={doSubmitValidation}
        />
        <MisdemeanourSelector
          misdemeanourKind={confessionData.reason}
          onChangeHandler={onChangeHandler}
          labelForNoSelection={"Select"}
          includeJustTalk={true}
          validate={validateConfessionType}
          doSubmitValidation={doSubmitValidation}
        />
        <ConfessionDetails
          confessionDetails={confessionData.details}
          onChangeHandler={onChangeHandler}
        />
        <SubmitConfession />
        <div id={displayMessage.messageClass}>{displayMessage.message}</div>
      </form>
    </div>
  );
};

export default Confession;
