"use client";

import Auth from "@/utils/auth";
import { RegisterCallResponse } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { useToast } from "@/components/ui/use-toast";

const agent_id = "8cf2247473195b9c0c589b50d4e56192";

const webClient = new RetellWebClient();

const RetellCall = ({ id }: { id: number }) => {
  const [isCalling, setIsCalling] = useState(false);

  const { toast } = useToast();

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

  const startCall = async () => {
    const registerCallResponse = await registerCall(agent_id);

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
  };

  const endCall = async () => {
    webClient.stopConversation();

    setIsCalling(false);
  };

  async function registerCall(agent_id: string): Promise<RegisterCallResponse> {
    try {
      const reqData = {
        agent_id,
        tenant_id: id,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}campaigns/start`,
        reqData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": Auth.getToken(),
          },
        }
      );

      if (!response.data) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: response.data?.message,
      });

      const data: RegisterCallResponse = await response.data;

      setIsCalling(true);

      return data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response.data.message,
        variant: "destructive",
      });
      if (typeof err === "string" || err instanceof Error) {
        throw new Error(`Caught error: ${err}`);
      } else {
        throw new Error("Caught unknown error");
      }
    }
  }

  return (
    <div className="">
      {isCalling ? (
        <button
          className={`px-8 py-2 rounded-lg text-sm cursor-pointer text-white bg-[red] `}
          onClick={endCall}
        >
          Stop
        </button>
      ) : (
        <button
          className={`px-8 py-2 rounded-lg text-sm cursor-pointer text-white bg-green-600`}
          onClick={startCall}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default RetellCall;
