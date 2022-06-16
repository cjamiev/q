import api from 'api';

export const mockStore = {
  alert: {
    queue: []
  },
  clipboard: {
    records: {
      recordOne: [
        {
          title: 'listOne',
          data: [
            [
              {
                label: 'label1',
                type: 'link',
                value: 'www.url1.com'
              },
              {
                label: 'username',
                type: 'copy',
                value: 'user'
              },
              {
                label: 'password',
                type: 'copy',
                value: 'password'
              }
            ],
            [
              {
                label: 'label2',
                type: 'link',
                value: 'www.url1.com'
              },
              {
                label: 'username2',
                type: 'copy',
                value: 'user'
              },
              {
                label: 'password2',
                type: 'copy',
                value: 'password'
              }
            ]
          ]
        }
      ]
    }
  },
  settings: {
    commands: [
      {
        id: 0,
        label: 'commandLabelOne',
        value: 'commandOne'
      },
      {
        id: 1,
        label: 'commandLabelTwo',
        value: 'commandTwo'
      }
    ],
    links: [
      {
        id: 0,
        label: 'linkLabelOne',
        value: 'linkOne'
      },
      {
        id: 1,
        label: 'linkLabelTwo',
        value: 'linkTwo'
      }
    ],
    copy: [
      {
        id: 0,
        label: 'copyLabelOne',
        value: 'copyOne'
      },
      {
        id: 1,
        label: 'copyLabelTwo',
        value: 'copyTwo'
      }
    ]
  },
  experiment: {},
  file: {
    directory: ['fileOne', 'fileTwo'],
    fileContent: 'fileOne contents'
  },
  home: {
    todos: [
      {
        text: 'todoOne',
        notes: ['noteOne', 'noteTwo'],
        urls: ['urlOne', 'urlTwo'],
        id: 1
      },
      {
        text: 'todoTwo',
        notes: ['noteTwoOne', 'noteTwoTwo'],
        urls: ['urlTwoOne', 'urlTwoTwo'],
        id: 2
      }
    ],
    timers: [
      {
        name: 'timer one',
        value: {
          month: 3,
          day: 1,
          year: 2022,
          hour: 5,
          minute: 0,
          second: 0
        },
        type: 'timer'
      },
      {
        name: 'timer two',
        value: {
          month: 3,
          day: 1,
          year: 2022,
          hour: 5,
          minute: 0,
          second: 0
        },
        type: 'timer'
      }
    ]
  },
  generator: {
    records: [
      {
        name: 'recordOne',
        value: {
          backgroundStyle: {
            backgroundImage: 'url("img/background.jpg")'
          },
          normalStyle: {
            height: '500',
            width: '300'
          },
          hoverStyle: {
            scaleY: '1.05',
            scaleX: '1.05'
          },
          activeStyle: {
            colorBoxShadow: '#000000'
          }
        }
      },
      {
        name: 'recordTwo',
        value: {
          backgroundStyle: {
            backgroundImage: 'url("img/background.jpg")'
          },
          normalStyle: {
            height: '600',
            width: '400'
          },
          hoverStyle: {
            scaleY: '1.1',
            scaleX: '1.1'
          },
          activeStyle: {
            colorBoxShadow: '#ffffff'
          }
        }
      }
    ]
  },
  global: {
    timers: [],
    initialized: false,
    modalQueue: [],
    loadingQueue: [],
    isSidePanelOpen: false,
    commandResponse: '',
    commands: ['commandOne', 'commandTwo', 'commandThree']
  },
  mockserver: {
    config: {
      delay: 1000,
      delayUrls: ['delayUrlOne', 'delayUrlTwo'],
      log: true,
      error: false,
      overrideUrls: ['overrideUrlOne', 'overrideUrlOne'],
      overrideStatusCode: 200,
      overrideResponse: { testing: 123 }
    },
    mocks: [
      { method: 'GET', url: '/test', responsePath: 'filename' },
      { method: 'POST', url: '/test2', responsePath: 'filename2' }
    ],
    log: [
      {
        timestamp: '7/10/2021 13:48:20',
        url: 'urlOne',
        payload: {
          testing: 1
        }
      },
      {
        timestamp: '8/10/2021 13:48:20',
        url: 'urlTwo',
        payload: {
          testing: 2
        }
      }
    ],
    mockResponse: undefined
  },
  project: {
    directories: [
      { label: 'dir1', value: '/dir1' },
      { label: 'dir2', value: '/dir2' }
    ],
    regexes: [
      {
        description: 'regexOne',
        fileRegex: '^file$',
        lineRegex: '^line$',
        modifiers: 'g',
        lineRange: {
          start: 0,
          end: 2
        },
        replace: 'test-replace'
      },
      {
        description: 'regexTwo',
        fileRegex: '^file2$',
        lineRegex: '^line2$',
        modifiers: 'g',
        lineRange: {
          start: 0,
          end: 2
        },
        replace: 'test-replace2'
      }
    ],
    remoteUrl: 'test-url',
    branches: ['branchOne', 'branchTwo'],
    stashes: ['stashOne', 'stashTwo'],
    packageJson: {
      name: 'test-name',
      description: 'test-description',
      scripts: {
        'test-script': 'test-script',
        'test-script2': 'test-script2'
      },
      devDependencies: {
        'test-dev-dep': '1.0.0',
        'test-dev-dep2': '2.0.0'
      },
      dependencies: {
        'test-dep': '3.0.0',
        'test-dep2': '4.0.0'
      }
    },
    versions: {
      devDependencies: {
        'test-dev-dep': '1.0.1',
        'test-dev-dep2': '2.0.1'
      },
      dependencies: {
        'test-dep': '3.0.1',
        'test-dep2': '4.0.0'
      }
    },
    snippets: ['snippetOne', 'snippetTwo'],
    snippetFile: 'snippet contents',
    message: ''
  }
};

const HTTP_GET = {
  '/db/?name=clipboard.json': { data: JSON.stringify(mockStore.clipboard.records) },
  '/db/?name=settings.json': { data: JSON.stringify(mockStore.config) },
  '/db/?name=generator.json': { data: JSON.stringify(mockStore.generator.records) },
  '/db/?name=home.json': { data: JSON.stringify(mockStore.home) },
  '/db/?name=project.json': {
    data: JSON.stringify({
      directories: mockStore.project.directories,
      regexes: mockStore.project.regex
    })
  },
  '/command': { data: mockStore.global.commands },
  '/file/?name=fileOne': { data: 'fileOne contents' },
  '/file/?name=fileTwo': { data: 'fileTwo contents' },
  '/file/?name=': { data: 'file contents' },
  '/file': { data: mockStore.file.directory },
  '/command?name=': { message: 'running command' },
  '/mockserver/config': { data: mockStore.mockserver.config },
  'mockserver/mockRequests': { data: mockStore.mockserver.mocks },
  'mockserver/loadLog': { data: mockStore.mockserver.log },
  'mockserver/clearLog': { message: 'Clearing log' },
  '/project/?type=template&op=read': { data: mockStore.project.templates },
  '/project/?type=template&op=read&name=': { data: mockStore.project.templateFile },
  '/project/?type=snippet&op=read': { data: mockStore.project.snippets },
  '/project/?type=snippet&op=read&name=': { data: mockStore.project.snippetFile },
  '/project/?type=package&op=read&root=': { data: mockStore.project.packageJson },
  '/project/?type=package&op=getversions&root=': { data: mockStore.project.versions },
  '/project/?type=package&op=runscript&root=': { message: 'running script' },
  '/project/?type=git&op=remoteurl&root=dir1': { data: 'dir1-url' },
  '/project/?type=git&op=remoteurl&root=incorrectdir': { data: 'The system cannot find the path specified.' },
  '/project/?type=git&op=remoteurl&root=': { data: mockStore.project.remoteUrl },
  '/project/?type=git&op=deletebranch&root=': { message: 'deleted branch' },
  '/project/?type=git&op=createbranch&root=': { message: 'created branch' },
  '/project/?type=git&op=mergebranch&root=': { message: 'merged branch' },
  '/project/?type=git&op=selectbranch&root=': { message: 'selected branch' },
  '/project/?type=git&op=viewbranches&root=': { data: '* branchOne\nbranchTwo\n' },
  '/project/?type=git&op=createstash&root=': { message: 'created stash' },
  '/project/?type=git&op=deletestash&root=': { message: 'deleted stash' },
  '/project/?type=git&op=selectstash&root=': { message: 'selected stash' },
  '/project/?type=git&op=viewstash&root=': { data: 'stash@{1}: On master: stash1\nstash@{2}: On master: stash2\n' },
  '/project/?type=git&op=resetbranch&root=': { message: 'reset branch' }
};

const HTTP_POST = {
  '/db': { message: 'Updated database' },
  '/file': { message: 'Updated file' },
  '/mockserver/config': { message: 'Updated mock config' },
  'mockserver/mockRequests': { message: 'Updated Mock Request' },
  '/mockserver/deleteMockEndpoint': { message: 'Deleted Mock Endpoint' },
  'mockserver/loadMockResponse': {
    data: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        test: 'testing get'
      }
    }
  },
  '/mockserver/updateMockEndpoint': { message: 'Updated Mock Endpoint' },
  '/mockserver/createMockEndpoint': { message: 'Created Mock Endpoint' },
  '/project/?type=template&op=create&root=': { message: 'Creating Template files' },
  '/project/?type=template&op=write&name=': { message: 'Creating New Template' },
  '/project/?type=snippet&op=write&name=': { message: 'Creating New Snippet' },
  '/project/?type=regex&root=': { message: 'Updating files using regex' },
  '/project/?type=package&op=update&root=': { message: 'Updating package version' }
};

const mockEndpoints = (url, mocks) => {
  const urlKeys = Object.keys(mocks);
  const matched = urlKeys.find((key) => url.includes(key));

  if (matched) {
    const { data, message } = mocks[matched];

    return Promise.resolve({
      data: {
        data,
        message
      }
    });
  } else {
    console.warn(`No matching endpoint for url:${url}`);

    return Promise.resolve({
      data: {
        message: 'no matching endpoint'
      }
    });
  }
};

export const mockGet = (url) => {
  return mockEndpoints(url, HTTP_GET);
};

export const mockPost = (url) => {
  return mockEndpoints(url, HTTP_POST);
};

export const mockApi = (mockMethodGet, mockMethodPost) => {
  jest.mock('api');
  api.post = jest.fn(mockMethodPost);
  api.get = jest.fn(mockMethodGet);

  return api;
};
