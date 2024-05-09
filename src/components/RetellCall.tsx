"use client";

import { RegisterCallResponse } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

const agentId = "1981c52062fd3df0537fbb93585e6afb";

const webClient = new RetellWebClient();

const RetellCall = () => {
  const [isCalling, setIsCalling] = useState(false);

  // Initialize the SDK
  useEffect(() => {
    // Setup event listeners
    webClient.on("conversationStarted", () => {
      console.log("conversationStarted");
    });

    webClient.on("audio", (audio: Uint8Array) => {
      console.log("There is audio");
    });

    webClient.on("conversationEnded", ({ code, reason }) => {
      console.log("Closed with code:", code, ", reason:", reason);
      setIsCalling(false);
    });

    webClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false);
    });

    webClient.on("update", (update) => {
      // Print live transcript as needed
      console.log("update", update);
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      webClient.stopConversation();
    } else {
      const registerCallResponse = await registerCall(agentId);

      if (registerCallResponse.callId) {
        webClient
          .startConversation({
            callId: registerCallResponse.callId,
            sampleRate: registerCallResponse.sampleRate,
            enableUpdate: true,
          })
          .catch(console.error);

        setIsCalling(true);
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Replace with your server url
      const response = await fetch(
        "https://api.retellai.com/retell-llm-new/f13ed01038718c1814253df8aebbaa2e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err: unknown) {
      console.log(err);
      if (typeof err === "string" || err instanceof Error) {
        throw new Error(`Caught error: ${err}`);
      } else {
        throw new Error("Caught unknown error");
      }
    }
  }

  return (
    <div className="">
      <header className="App-header">
        <button
          className={`px-8 py-2 rounded-lg text-sm cursor-pointer text-white ${
            isCalling ? "bg-[red]" : "bg-green-600"
          }`}
          onClick={toggleConversation}
        >
          {isCalling ? "Stop" : "Start"}
        </button>
      </header>
    </div>
  );
};

export default RetellCall;
