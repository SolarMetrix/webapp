import { useEffect, useState } from "react";

import { OAuthErrorEnum } from "../../../types";
import getParsedCookies from "../../utils/cookie-parser";
import AuthFailedModal from "./Modals/AuthFailedModal";
import AuthSuccessNotification from "../Notifications/AuthSuccessNotification";

export default function AuthJoinResult() {
  const [authFailureModalopen, setAuthFailureModalopen] =
    useState<boolean>(false);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);
  const [authSuccessText, setAuthSuccessText] = useState<string>("");

  useEffect(() => {
    const cookiesObj = getParsedCookies();

    if (Object.prototype.hasOwnProperty.call(cookiesObj, "authmsg")) {
      if (
        cookiesObj.authmsg === OAuthErrorEnum.EMAIL_IN_USE_WITH_OTHER_PROVIDER
      ) {
        setAuthFailureModalopen(true);
      } else if (cookiesObj.authmsg === OAuthErrorEnum.SUCCESS) {
        setAuthSuccess(true);
        setAuthSuccessText("Successfully joined!");
      }
    }
  }, []);

  return (
    <>
      <AuthFailedModal
        isOpen={authFailureModalopen}
        close={() => setAuthFailureModalopen(false)}
      />
      <AuthSuccessNotification
        show={authSuccess}
        text={authSuccessText}
        hide={() => setAuthSuccess(false)}
      />
    </>
  );
}
