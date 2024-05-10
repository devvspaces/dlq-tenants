import Button from "@/components/Button";
import ChangeAIPromptModal from "@/components/modals/AIPrompts";
import SelectGSModal from "@/components/modals/SelectGS";
import SelectVoiceModal from "@/components/modals/SelectVoice";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <div className="mt-10 md:w-1/2 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="w-full">Change AI Prompt</p>
          <Dialog>
            <DialogTrigger>
              <Button>Change</Button>
            </DialogTrigger>
            <ChangeAIPromptModal />
          </Dialog>
        </div>
        <div className="flex items-center justify-between mb-5">
          <p className="w-full">Select Voice</p>
          <Dialog>
            <DialogTrigger>
              <Button>Change</Button>
            </DialogTrigger>
            <SelectVoiceModal />
          </Dialog>
        </div>
        <div className="flex items-center justify-between mb-5">
          <p className="w-full">Set Google Sheet to send data</p>
          <Dialog>
            <DialogTrigger>
              <Button>Set</Button>
            </DialogTrigger>
            <SelectGSModal />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Settings;
