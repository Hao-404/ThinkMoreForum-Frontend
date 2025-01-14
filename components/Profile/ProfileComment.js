import React from 'react';
// import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Typography, Button, Stack } from '@mui/material';

const ProfileComment = ({ comment }) => {
  const user = comment.postUsers;
  const timeStamp = new Date(comment.createTimestamp);
  return (
    <Box
      sx={{
        display: 'flex',
        pb: 4,
        mr: 2,
        // pl: 5,
      }}
    >
      <Stack>
        <Avatar src={user.profileImg} />
        <Button
          onClick={() => {}}
          sx={{
            ml: -0.5,
            pl: 0,
          }}
          size="small"
          variant="outline"
        >
          Reply
        </Button>
      </Stack>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
          borderRadius: 3,
          p: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">{user.username}</Typography>
          <Typography color="textSecondary" variant="caption">
            {formatDistanceToNow(timeStamp, { addSuffix: true })}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {comment.context}
        </Typography>
      </Box>
    </Box>
  );
};

// ProfileComment.propTypes = {
//   authorAvatar: PropTypes.string.isRequired,
//   authorName: PropTypes.string.isRequired,
//   authorRole: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   createdAt: PropTypes.number.isRequired,
//   isLiked: PropTypes.bool.isRequired,
//   likes: PropTypes.number.isRequired,
//             {formatDistanceToNow(timeStamp, { addSuffix: true })}
// };

export default ProfileComment;
