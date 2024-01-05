import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Paper, Typography, Tooltip, Box } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

interface Props {
  title: string | React.ReactNode;
  content: string;
  important?: boolean;
  winner?: boolean;
}

export const InfoWrapper: FC<Props> = ({
  title,
  content,
  important,
  winner,
}): JSX.Element => {
  const [showCopy, setShowCopy] = useState(false);

  const copyToClipboard = (): void => {
    try {
      navigator.clipboard.writeText(content);
      toast.success(`${title} copied to clipboard.`);
      console.log(`${title} copied to clipboard.`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        margin: '16px',
        padding: '16px',
        position: 'relative',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
      >
        {title}
      </Typography>
      <div
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
        style={{
          backgroundColor: important ? 'red' : winner ? 'whatsapp' : 'teal',
          padding: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Typography
          variant="body1"
          align="center"
          style={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </Typography>
        {showCopy && (
          <Tooltip title="Copy to Clipboard">
            <Box
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: 0,
                minWidth: 'auto',
              }}
            >
              <FileCopyIcon fontSize="small" />
            </Box>
          </Tooltip>
        )}
      </div>
    </Paper>
  );
};
