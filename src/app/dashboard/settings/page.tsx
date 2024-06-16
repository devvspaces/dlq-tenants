"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import ChangeAIPromptModal from "@/components/modals/AIPrompts";
import SelectGSModal from "@/components/modals/SelectGS";
import SelectVoiceModal from "@/components/modals/SelectVoice";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  GetProfile,
  GetSettingsQuery,
  UpdateSettingsMutation,
} from "@/services/settings";
import { UpdateSettings } from "@/utils/types";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [beginMessage, setBeginMessage] = useState(false);
  const [settingsData, setSettingsData] = useState<UpdateSettings>({
    voice_id: "",
    begin_message: "",
    general_prompt: "",
    voice_speed: 0,
    company_name: "",
  });

  const { data: settings, isLoading, refetch } = GetSettingsQuery();
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = GetProfile();
  const { mutate, isLoading: isLoadingUpdateSettings } =
    UpdateSettingsMutation();

  useEffect(() => {
    if (
      !isLoading &&
      !isLoadingProfile &&
      settings?.data &&
      userProfile?.data
    ) {
      setSettingsData({
        voice_id: settings.data?.voice,
        begin_message: settings.data?.begin_message,
        general_prompt: settings.data?.general_prompt,
        voice_speed: settings.data?.voice_speed,
        company_name: userProfile.data.company_name,
      });
      if (settings.data?.begin_message) {
        setBeginMessage(true);
      }
    }
  }, [isLoading, isLoadingProfile, settings?.data, userProfile?.data]);

  const { toast } = useToast();

  const handleChangeVoice = (voice: any) => {
    if (voice) {
      setSettingsData({ ...settingsData, voice_id: voice });
    }
    setIsOpened(false);
  };

  const handleUpdateSettings = () => {
    if (!settingsData.voice_id) {
      toast({
        title: "Error",
        description: "Please select a voice",
        variant: "destructive",
      });
    }

    if (!settingsData.begin_message && beginMessage) {
      toast({
        title: "Error",
        description: "Please enter a begin message",
        variant: "destructive",
      });
    }

    if (!settingsData.general_prompt) {
      toast({
        title: "Error",
        description: "Please enter a general prompt",
        variant: "destructive",
      });
    }

    if (!settingsData.company_name) {
      toast({
        title: "Error",
        description: "Please enter a company name",
        variant: "destructive",
      });
    }

    mutate(settingsData as any, {
      onSuccess: (data) => {
        console.log(data);
        toast({ title: "Settings Updated successfully" });
        refetch();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Unable to update settings",
          variant: "destructive",
        });
      },
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
          <div className="mt-5 mb-4">
            <p className="font-bold">Agent Name: </p>
            <p>{settings.data?.agent_name}</p>
          </div>
          <div
            style={{
              maxWidth: "300px",
            }}
          >
            <p className="font-bold">Company Name: </p>
            <input
              type="text"
              value={settingsData.company_name}
              className="w-full mt-2 p-2 border"
              onChange={(e) => {
                setSettingsData({
                  ...settingsData,
                  company_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="mt-5">
            <p className="font-bold">Language: </p>
            <p>{settings.data?.language}</p>
          </div>
          <div className="mt-5">
            <p className="font-bold">Voice Speed: </p>
            <input
              type="number"
              value={settingsData.voice_speed}
              onChange={(e) => {
                setSettingsData({
                  ...settingsData,
                  voice_speed: parseFloat(e.target.value),
                });
              }}
              className="w-20 mt-2 p-2 border"
            />
          </div>
          <div className="flex items-center gap-10 justify-between mb-5">
            <div className="mt-5">
              <p className="font-bold">Voice : </p>
              <p className="text-sm">{settingsData.voice_id}</p>
            </div>
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
              <DialogTrigger>
                <Button>Change</Button>
              </DialogTrigger>
              <SelectVoiceModal handleChangeVoice={handleChangeVoice} />
            </Dialog>
          </div>
          <div className="mt-5 flex items-center">
            <p className="font-bold">Begin message: </p>
            <input
              type="checkbox"
              className="ml-2 border"
              checked={beginMessage}
              onChange={(e) => setBeginMessage(e.target.checked)}
            />
          </div>
          {beginMessage && (
            <div className="flex items-center gap-10 justify-between">
              <div className="mt-5">
                <p className="font-bold">AI Begin Message: </p>
                <textarea
                  value={settingsData.begin_message}
                  onChange={(e) =>
                    setSettingsData({
                      ...settingsData,
                      begin_message: e.target.value,
                    })
                  }
                  className="w-full p-5 outline-none border border-[#EBEBEB] rounded-md"
                  rows={3}
                  style={{ width: "500px" }}
                ></textarea>
              </div>
            </div>
          )}
          {!beginMessage && settingsData.begin_message && (
            <p className="text-sm text-red-500 mt-5">
              The current AI Begin Message will be cleared
            </p>
          )}
          <div className="mt-5">
            <p className="font-bold">AI Prompt: </p>
            <textarea
              value={settingsData.general_prompt}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  general_prompt: e.target.value,
                })
              }
              className="w-full p-5 outline-none border border-[#EBEBEB] rounded-md"
              rows={10}
              style={{ width: "700px" }}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
