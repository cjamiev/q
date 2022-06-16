import { ArchiveSVG, ClipboardSVG, DirectorySVG, FlaskSVG, HomeSVG, SettingSVG } from 'components/atoms/Icons';

export const navigationMap = [
  {
    label: 'Home',
    url: '/home',
    icon: HomeSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'File',
    url: '/file',
    icon: ArchiveSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Clipboard',
    url: '/clipboard',
    icon: ClipboardSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Project',
    url: '/project',
    icon: DirectorySVG,
    isAtBottom: true,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: SettingSVG,
    isAtBottom: true,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  }
];
