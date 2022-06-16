import { updateDependencyVersions } from './helper';

const packageJson = {
  'name': 'test-name',
  'description': 'test-description',
  'scripts': {
    'test-script': 'test-script',
    'test-script2': 'test-script2'
  },
  'devDependencies': {
    'test-dev-dep': '1.0.0',
    'test-dev-dep2': '2.0.0'
  },
  'dependencies': {
    'test-dep': '3.0.0',
    'test-dep2': '4.0.0'
  }
};
const versions = [
  {
    'test-dev-dep': '1.0.1'
  },
  {
    'test-dep': '3.0.1'
  }
];

describe('helper', () => {
  it('updateDependencyVersions', () => {
    const result = updateDependencyVersions(packageJson, versions);

    expect(result).toEqual({
      'name': 'test-name',
      'description': 'test-description',
      'scripts': {
        'test-script': 'test-script',
        'test-script2': 'test-script2'
      },
      'devDependencies': {
        'test-dev-dep': '1.0.1',
        'test-dev-dep2': '2.0.0'
      },
      'dependencies': {
        'test-dep': '3.0.1',
        'test-dep2': '4.0.0'
      }
    });
  });
});