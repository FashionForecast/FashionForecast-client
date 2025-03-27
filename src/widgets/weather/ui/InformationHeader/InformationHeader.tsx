import { useState } from 'react';

import { Button, Dialog, IconButton, InformationIcon } from '@/shared/ui';

import { S } from './InformationHeader.style';

type InformationHeaderProps = {
  title: string;
  dialogContentSlot: React.ReactNode;
};

export const InformationHeader = ({
  title,
  dialogContentSlot,
}: InformationHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  return (
    <>
      <S.Header>
        <S.Title>{title}</S.Title>
        <IconButton size='small' onClick={handleDialogToggle}>
          <InformationIcon />
        </IconButton>
      </S.Header>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogToggle}
        titleSlot={title}
        contentSlot={dialogContentSlot}
        actionsSlot={
          <Button variant='outlined' onClick={handleDialogToggle}>
            닫기
          </Button>
        }
      />
    </>
  );
};
