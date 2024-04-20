import React from "react";
import { Button } from "../ui/button";
import TelegramIcon from "../icons/telegram-icon";
import DiscordIcon from "../icons/discord-icon";
import TwitterIcon from "../icons/twitter-icon";

const SocialButtons = () => {
  return (
    <div className="flex gap-8">
      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
        <Button variant={"icon"} size={"icon"}>
          <TelegramIcon />
        </Button>
      </a>
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
        <Button variant={"icon"} size={"icon"}>
          <DiscordIcon />
        </Button>
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
        <Button variant={"icon"} size={"icon"}>
          <TwitterIcon />
        </Button>
      </a>
    </div>
  );
};

export default SocialButtons;
