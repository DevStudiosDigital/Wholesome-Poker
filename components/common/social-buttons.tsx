import React from 'react';
import { Button } from '../ui/button';
import TelegramIcon from '../icons/telegram-icon';
import DiscordIcon from '../icons/discord-icon';
import TwitterIcon from '../icons/twitter-icon';

const SocialButtons = () => {
  return (
    <div className='flex gap-6'>
      <a
        href='https://discord.gg/wholesomepoker'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button variant={'icon'} size={'icon'}>
          <DiscordIcon className='w-6 h-6' />
        </Button>
      </a>
      <a
        href='https://x.com/wholesomepoker'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button variant={'icon'} size={'icon'}>
          <TwitterIcon className='w-6 h-6' />
        </Button>
      </a>
    </div>
  );
};

export default SocialButtons;
