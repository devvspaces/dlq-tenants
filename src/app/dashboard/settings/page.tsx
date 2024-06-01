"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import ChangeAIPromptModal from "@/components/modals/AIPrompts";
import SelectGSModal from "@/components/modals/SelectGS";
import SelectVoiceModal from "@/components/modals/SelectVoice";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { GetSettingsQuery, UpdateSettingsMutation } from "@/services/settings";
import { UpdateSettings } from "@/utils/types";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [newVoice, setNewVoice] = useState("");
  const [prompt, setPrompt] = useState("");
  const [settingsData, setSettingsData] = useState<UpdateSettings>({
    voice_id: "",
    begin_message: "",
    general_prompt: "",
  });

  const { data: settings, isLoading, refetch } = GetSettingsQuery();
  const { mutate, isLoading: isLoadingUpdateSettings } =
    UpdateSettingsMutation();

  useEffect(() => {
    if (!isLoading && settings?.data) {
      setPrompt(settings.data?.begin_message);
    }
  }, [isLoading, settings?.data]);

  const { toast } = useToast();

  const handleChangeVoice = (voice: any) => {
    setSettingsData({ ...settingsData, voice_id: voice });
    setNewVoice(voice);
    setIsOpened(false);
  };

  const handleUpdatePrompt = (val: string) => {
    setSettingsData({ ...settingsData, begin_message: val });
    setPrompt(val);
  };

  const handleUpdateSettings = () => {
    if (
      !settingsData.voice_id &&
      settingsData.begin_message === settings.data?.begin_message &&
      !settingsData.general_prompt
    ) {
      return toast({
        title: "No changes occurred",
        variant: "destructive",
      });
    }

    if (!settingsData.voice_id) {
      settingsData.voice_id = settings.data?.voice;
    }

    if (!settingsData.begin_message) {
      settingsData.begin_message = settings.data?.begin_message;
    }

    if (!settingsData.general_prompt) {
      delete settingsData.general_prompt;
    }

    //@ts-ignore
    mutate(settingsData, {
      onSuccess: (data) => {
        console.log(data);
        toast({ title: "Settings Updated successfully" });
        // Refetch settings data
        refetch();
      },
      onError: () =>
        toast({
          title: "Error",
          description: "Unable to update settings",
          variant: "destructive",
        }),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Settings</h1>
        <Button
          className="!w-auto"
          onClick={handleUpdateSettings}
          isDisabled={isLoadingUpdateSettings}
        >
          {isLoadingUpdateSettings ? "Saving" : "Save"}
        </Button>
      </div>
      {isLoading ? (
        <Loading color="#000" />
      ) : (
        <div className="mt-10 md:w-4/5 mx-auto">
          <div className="mt-5">
            <p className="font-bold">Agent Name: </p>
            <p>{settings.data?.agent_name}</p>
          </div>
          <div className="mt-5">
            <p className="font-bold">Language: </p>
            <p>{settings.data?.language}</p>
          </div>
          <div className="mt-5">
            <p className="font-bold">Voice Speed: </p>
            <p>{settings.data?.voice_speed}</p>
          </div>
          <div className="flex items-center gap-10 justify-between mb-5">
            <div className="mt-5">
              <p className="font-bold">AI Prompt: </p>
              <textarea
                value={prompt}
                onChange={(e) => handleUpdatePrompt(e.target.value)}
                className="w-full p-5 outline-none border border-[#EBEBEB] rounded-md"
                rows={3}
              ></textarea>
              <p className="text-sm mt-2 italic text-center">
                If you want the AI to speak first, clear the input box above.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10 justify-between mb-5">
            <div className="mt-5">
              <p className="font-bold">Voice : </p>
              <p className="text-sm">{settings.data?.voice}</p>
              {newVoice ? (
                <p className="text-sm">New Voice Selected: {newVoice}</p>
              ) : (
                <></>
              )}
            </div>
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
              <DialogTrigger>
                <Button>Change</Button>
              </DialogTrigger>
              <SelectVoiceModal handleChangeVoice={handleChangeVoice} />
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
