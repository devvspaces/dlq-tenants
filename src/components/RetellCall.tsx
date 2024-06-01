"use client";

import Auth from "@/utils/auth";
import { RegisterCallResponse } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { useToast } from "@/components/ui/use-toast";
import { GetUserProfile } from "@/services/auth";
import { EndCampaignMutation } from "@/services/campaign";

const webClient = new RetellWebClient();

const RetellCall = ({ id }: { id: number }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [callSid, setCallSid] = useState("");

  const { data: userData, isLoading } = GetUserProfile();
  const { mutate, isLoading: isLoadingEndCampaign } = EndCampaignMutation();

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
    if (!isLoading) {
      const agent_id = userData.data.agent_id;

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
    }
  };

  const endCall = async () => {
    webClient.stopConversation();

    const endCallData = {
      tenant_id: id,
      call_sid: callSid,
    };

    //@ts-ignore
    mutate(endCallData, {
      onSuccess: (data) => {
        console.log(data);
        setIsCalling(false);
        toast({ title: "Call ended successfully" });
      },
      onError: () =>
        toast({
          title: "Error",
          description: "Unable to end call",
          variant: "destructive",
        }),
    });
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

      setCallSid(response.data?.call_sid);

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
