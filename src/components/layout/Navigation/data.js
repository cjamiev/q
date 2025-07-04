import { ArchiveSVG, ClipboardSVG, DirectorySVG, FlaskSVG, HomeSVG, SettingSVG } from '../../../components/atoms/Icons';

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
    label: 'Storage',
    url: '/storage',
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
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: SettingSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  }
];
