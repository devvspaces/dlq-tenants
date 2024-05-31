"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import ChangeAIPromptModal from "@/components/modals/AIPrompts";
import SelectGSModal from "@/components/modals/SelectGS";
import SelectVoiceModal from "@/components/modals/SelectVoice";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { GetSettingsQuery, UpdateSettingsMutation } from "@/services/settings";
import React, { useState } from "react";

const Settings = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [settingsData, setSettingsData] = useState({
    voice_id: "",
    begin_message: "",
  });
  const { data: settings, isLoading } = GetSettingsQuery();
  const { mutate, isLoading: isLoadingUpdateSettings } =
    UpdateSettingsMutation();

  const { toast } = useToast();

  const handleChangeVoice = (voice: any) => {
    setSettingsData({ ...settingsData, voice_id: voice });
    setIsOpened(false);
  };

  const handleUpdateSettings = () => {
    if (settingsData.voice_id && !settingsData.begin_message) {
      setSettingsData({
        ...settingsData,
        begin_message: settings.data?.begin_message,
      });
    } else if (!settingsData.voice_id && settingsData.begin_message) {
      setSettingsData({
        ...settingsData,
        voice_id: settings.data?.begin_message,
      });
    } else if (!settingsData.voice_id && !settingsData.begin_message) {
      return toast({
        title: "No changes occurred",
        variant: "destructive",
      });
    }

    //@ts-ignore
    mutate(settingsData, {
      onSuccess: (data) => {
        console.log(data);
        toast({ title: "Settings Updated successfully" });
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
          className="w-auto"
          onClick={handleUpdateSettings}
          isDisabled={isLoadingUpdateSettings}
        >
          Save
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
              <p className="text-sm">{settings.data?.begin_message}</p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button>Change</Button>
              </DialogTrigger>
              <ChangeAIPromptModal />
            </Dialog>
          </div>
          <div className="flex items-center gap-10 justify-between mb-5">
            <div className="mt-5">
              <p className="font-bold">Voice : </p>
              <p className="text-sm">{settings.data?.voice}</p>
            </div>
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
              <DialogTrigger>
                <Button>Change</Button>
              </DialogTrigger>
              <SelectVoiceModal handleChangeVoice={handleChangeVoice} />
            </Dialog>
          </div>
          <div className="flex items-center justify-between mb-5">
            <div className="mt-5">
              <p className="font-bold">Set Google Sheet: </p>
              {/* <p>{settings.data?.voice_speed}</p> */}
            </div>
            <Dialog>
              <DialogTrigger>
                <Button>Set</Button>
              </DialogTrigger>
              <SelectGSModal />
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
