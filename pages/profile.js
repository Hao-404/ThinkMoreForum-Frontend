import { React, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { blueGrey } from '@mui/material/colors';
import ProfilePost from '../components/Profile/ProfilePost';
import ProfileComment from '../components/Profile/ProfileComment';
import ProfileFollow from '../components/Profile/ProfileFollow';
import UserAdd from '../icons/user-add';
// import Chat from '../icons/chat';
// 原来是import follow from '../services/followServices';
// 但是这样写会报错，这两种写法有啥差别？
import { follow } from '../services/followServices';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('posts');
  const [followedStatus, setFollowedStatus] = useState('not_followed');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const profileimg = {
    cover: '/cover_1.jpg',
    avatar: '/avatar-cao-yu.png',
  };

  const profile = {
    title: 'front-end developer',
    name: 'verified_user',
  };

  const handleFollowAction = (name) => {
    console.log(name);
    follow(name)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setFollowedStatus((prevFollowedStatus) =>
      prevFollowedStatus === 'not_followed' ? 'followed' : 'not_followed',
    );
  };

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Comments', value: 'comments' },
    { label: 'Following', value: 'following' },
    { label: 'Follower', value: 'follower' },
  ];

  const comments = [
    {
      id: 'd0ab3d02ef737fa6b007e35d',
      authorAvatar: '/static/mock-images/avatars/avatar-alcides_antonio.png',
      authorName: 'Alcides Antonio',
      authorRole: 'Product Designer',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      // createdAt: subHours(new Date(), 2).getTime(),
      isLiked: true,
      likes: 12,
    },
    {
      id: '3ac1e17289e38a84108efdf3',
      authorAvatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
      authorName: 'Jie Yan Song',
      authorRole: 'Web Developer',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      // createdAt: subHours(new Date(), 8).getTime(),
      isLiked: false,
      likes: 8,
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box
          style={{ backgroundImage: `url(${profileimg.cover})` }}
          sx={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: 1,
            height: 348,
            position: 'relative',
            '&:hover': {
              '& button': {
                visibility: 'visible',
              },
            },
          }}
        >
          <Button
            startIcon={<AddPhotoIcon fontSize="small" />}
            sx={{
              backgroundColor: blueGrey[900],
              bottom: {
                lg: 24,
                xs: 'auto',
              },
              color: 'common.white',
              position: 'absolute',
              right: 24,
              top: {
                lg: 'auto',
                xs: 24,
              },
              visibility: 'hidden',
              '&:hover': {
                backgroundColor: blueGrey[900],
              },
            }}
            variant="contained"
          >
            Change Cover
          </Button>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 5,
          }}
        >
          <Avatar
            src={profileimg.avatar}
            sx={{
              height: 64,
              width: 64,
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography color="textSecondary" variant="overline">
              {profile.title}
            </Typography>
            <Typography variant="h6">{profile.name}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                md: 'block',
                xs: 'none',
              },
            }}
          >
            {followedStatus === 'not_followed' && (
              <Button
                // onClick={handleFollowAction(profile.name)} 这是原来的写法
                // 这样写的话就算不点击button也会执行，而且是执行两次，还没搞懂为啥
                onClick={() => {
                  handleFollowAction(profile.name);
                }}
                size="small"
                startIcon={<UserAdd fontSize="small" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Follow
              </Button>
            )}
            {followedStatus === 'followed' && (
              <Button
                // onClick={handleFollowAction(profile.name)} 这是原来的写法
                // 这样写的话就算不点击button也会执行，而且是执行两次，还没搞懂为啥
                color="primary"
                onClick={() => {
                  handleFollowAction(profile.name);
                }}
                size="small"
                startIcon={<UserAdd fontSize="small" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Followed
              </Button>
            )}
            {/* 这个功能后面看情况再加 */}
            {/* <Button
              component="a"
              size="small"
              startIcon={<Chat fontSize="small" />}
              sx={{ ml: 1 }}
              variant="contained"
            >
              Send Message
            </Button> */}
          </Box>
        </Box>
      </Container>
      <Box sx={{ mt: 5 }}>
        <Container maxWidth="lg">
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ py: 3 }}>
            {currentTab === 'posts' && <ProfilePost />}
            {currentTab === 'comments' &&
              comments.map((comment) => {
                return <ProfileComment key={comment.id} {...comment} />;
              })}
            {currentTab === 'following' && (
              <ProfileFollow title="Following" value="verified_user" />
            )}
            {currentTab === 'follower' && (
              <ProfileFollow title="Follower" value="admin" />
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
