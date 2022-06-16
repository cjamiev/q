import * as axios from 'axios';
import api from 'api';

const mockGet = jest.fn();
const mockPost = jest.fn();
jest.mock('axios');
axios.get.mockImplementation(mockGet);
axios.post.mockImplementation(mockPost);

const url = '/test';
const payload = { key: 'value' };

describe('api', () => {
  it('get', () => {
    api.get(url);

    expect(mockGet).toHaveBeenCalledWith(url);
  });
  it('post', () => {
    api.post(url, payload);

    expect(mockPost).toHaveBeenCalledWith(url, payload);
  });
});
