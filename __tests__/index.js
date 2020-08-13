import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import Table from '../Table';
import $ from 'miaoxing';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

function createPromise() {
  let res, rej;

  const promise = new Promise((resolve, reject) => {
    res = (result) => {
      resolve(result);
      return promise;
    };
    rej = (result) => {
      reject(result);
      return promise;
    };
  })

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

describe('table', () => {
  test('column', async () => {
    const {container} = render(<Table
      request={async () => {
        return {
          data: [
            {
              id: 1,
              name: '内容'
            }
          ],
          page: 1,
          success: true,
          total: 1,
        };
      }}
      columns={[
        {
          title: '名称',
          dataIndex: 'name'
        }
      ]}
    />);

    expect(container.querySelector('th').innerHTML).toBe('名称');

    await waitForElementToBeRemoved(container.querySelector('.ant-empty'));
  });

  test('url', async () => {
    const promise = createPromise();
    $.get = jest.fn().mockImplementationOnce(() => promise.resolve({
      data: [
        {
          id: 1,
          name: '内容'
        }
      ]
    }));

    const {container} = render(<Table
      url="test"
      columns={[
        {
          title: '名称',
          dataIndex: 'name'
        }
      ]}
    />);

    await promise;
    expect($.get).toHaveBeenCalledWith('test?page=1&rows=20');

    await waitForElementToBeRemoved(container.querySelector('.ant-empty'));
    const cell = await screen.queryByText('内容');
    expect(cell).not.toBeNull();
  });
});
